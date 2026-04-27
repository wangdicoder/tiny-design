import React, {
  createContext,
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from 'react';

// ============================================================================
// Types
// ============================================================================

export interface ModalRecord<P = unknown> {
  readonly id: string;
  readonly visible: boolean;
  readonly props: P;
  readonly resolver?: ModalResolver;
}

interface ModalResolver {
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
}

export type ModalState = Readonly<Record<string, ModalRecord>>;

export type ModalComponent<P = unknown> = React.ComponentType<P>;

type Listener = () => void;

// ============================================================================
// Store
// ============================================================================

export interface ModalStore {
  getState: () => ModalState;
  subscribe: (listener: Listener) => () => void;
  register: (id: string, component: ModalComponent) => () => void;
  isRegistered: (id: string) => boolean;
  getRegisteredComponent: (id: string) => ModalComponent | undefined;
  show: <R = unknown, P = unknown>(id: string, props?: P) => Promise<R>;
  hide: (id: string, result?: unknown) => void;
  remove: (id: string) => void;
  hideAll: () => void;
}

export function createModalStore(): ModalStore {
  let state: ModalState = {};
  const registry = new Map<string, ModalComponent>();
  const listeners = new Set<Listener>();

  const emit = (): void => {
    listeners.forEach((listener) => listener());
  };

  const setState = (next: ModalState): void => {
    if (next === state) return;
    state = next;
    emit();
  };

  return {
    getState: () => state,

    subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },

    register(id, component) {
      registry.set(id, component);
      // Re-emit so any record stored before registration gets picked up by the outlet.
      emit();
      return () => {
        registry.delete(id);
        emit();
      };
    },

    isRegistered: (id) => registry.has(id),
    getRegisteredComponent: (id) => registry.get(id),

    show<R = unknown, P = unknown>(id: string, props?: P): Promise<R> {
      return new Promise<R>((resolve, reject) => {
        // If a previous show() is still pending, drop its resolver to avoid leaks.
        state[id]?.resolver?.resolve(undefined);
        const record: ModalRecord<P | undefined> = {
          id,
          visible: true,
          props,
          resolver: { resolve: resolve as (v: unknown) => void, reject },
        };
        setState({ ...state, [id]: record as ModalRecord });
      });
    },

    hide(id, result) {
      const record = state[id];
      if (!record || !record.visible) return;
      record.resolver?.resolve(result);
      const next: ModalRecord = { ...record, visible: false, resolver: undefined };
      setState({ ...state, [id]: next });
    },

    remove(id) {
      const record = state[id];
      if (!record) return;
      // Drain a still-pending resolver so callers awaiting `show()` don't hang
      // when `remove()` is invoked directly without going through `hide()`.
      record.resolver?.resolve(undefined);
      const next: Record<string, ModalRecord> = { ...state };
      delete next[id];
      setState(next);
    },

    hideAll() {
      let changed = false;
      const next: Record<string, ModalRecord> = { ...state };
      for (const id of Object.keys(next)) {
        const record = next[id];
        if (record.visible) {
          record.resolver?.resolve(undefined);
          next[id] = { ...record, visible: false, resolver: undefined };
          changed = true;
        }
      }
      if (changed) setState(next);
    },
  };
}

/**
 * Process-wide singleton store. Use this — and only this — when you need to
 * trigger modals from **outside React** (event handlers attached to globals,
 * route guards, error reporters, sagas). `<Modal.Provider>` defaults to this
 * store, so calls made via `modalStore.show()` are picked up by the outlet.
 *
 * Inside React, prefer `useModalActions()` so refactors that change which
 * store backs a subtree (e.g. tests, multi-tenant) keep working.
 *
 * Use `createModalStore()` instead when you need an isolated store —
 * unit tests, SSR per-request stores, or independent modal trees.
 */
export const modalStore: ModalStore = createModalStore();

// ============================================================================
// Contexts
// ============================================================================

const StoreContext = createContext<ModalStore>(modalStore);

interface ModalSelfContextValue {
  id: string;
  store: ModalStore;
}

const ModalSelfContext = createContext<ModalSelfContextValue | null>(null);

// ============================================================================
// Provider + Outlet
// ============================================================================

export interface ModalProviderProps {
  /**
   * Optional store override. Defaults to the package-level `modalStore`
   * singleton, which also accepts imperative calls from outside React.
   */
  store?: ModalStore;
  children: React.ReactNode;
}

export function ModalProvider({
  store = modalStore,
  children,
}: ModalProviderProps): React.JSX.Element {
  return (
    <StoreContext.Provider value={store}>
      {children}
      <ModalOutlet />
    </StoreContext.Provider>
  );
}

function ModalOutlet(): React.JSX.Element {
  const store = useContext(StoreContext);
  const state = useSyncExternalStore(store.subscribe, store.getState, store.getState);

  return (
    <>
      {Object.values(state).map((record) => {
        const Component = store.getRegisteredComponent(record.id);
        if (!Component) return null;
        return (
          <ModalMount
            key={record.id}
            id={record.id}
            store={store}
            component={Component}
            props={record.props as Record<string, unknown>}
          />
        );
      })}
    </>
  );
}

interface ModalMountProps {
  id: string;
  store: ModalStore;
  component: ModalComponent;
  props: Record<string, unknown> | undefined;
}

function ModalMount({ id, store, component: Component, props }: ModalMountProps): React.JSX.Element {
  const ctx = useMemo<ModalSelfContextValue>(() => ({ id, store }), [id, store]);
  return (
    <ModalSelfContext.Provider value={ctx}>
      <Suspense fallback={null}>
        <Component {...(props ?? {})} />
      </Suspense>
    </ModalSelfContext.Provider>
  );
}

// ============================================================================
// Declarative registration
// ============================================================================

export interface ModalRegisterProps {
  id: string;
  component: ModalComponent;
}

export function ModalRegister({ id, component }: ModalRegisterProps): null {
  const store = useContext(StoreContext);
  useEffect(() => store.register(id, component), [id, component, store]);
  return null;
}

// ============================================================================
// Hooks
// ============================================================================

export interface UseModalActionsReturn {
  show: <R = unknown, P = unknown>(id: string, props?: P) => Promise<R>;
  hide: (id: string, result?: unknown) => void;
  hideAll: () => void;
  register: (id: string, component: ModalComponent) => () => void;
}

export interface UseModalReturn {
  visible: boolean;
  show: () => void;
  close: () => void;
  toggle: () => void;
}

/**
 * Per-id state hook for modals you mount and control yourself
 * (the legacy/manual pattern). Re-renders only when this id's visibility flips.
 */
export function useModal(id: string): UseModalReturn {
  const store = useContext(StoreContext);

  const getSnapshot = useCallback((): boolean => !!store.getState()[id]?.visible, [id, store]);
  const visible = useSyncExternalStore(store.subscribe, getSnapshot, getSnapshot);

  return useMemo<UseModalReturn>(
    () => ({
      visible,
      show: () => {
        store.show(id);
      },
      close: () => store.hide(id),
      toggle: () => {
        if (store.getState()[id]?.visible) store.hide(id);
        else store.show(id);
      },
    }),
    [id, store, visible]
  );
}

/**
 * Imperative actions for the surrounding store. Does not subscribe to state —
 * calling components do not re-render when modals open/close. Use this to
 * trigger modals from inside React components (event handlers, mutations).
 */
export function useModalActions(): UseModalActionsReturn {
  const store = useContext(StoreContext);
  return useMemo<UseModalActionsReturn>(
    () => ({
      show: store.show,
      hide: store.hide,
      hideAll: store.hideAll,
      register: store.register,
    }),
    [store]
  );
}

export interface UseModalSelfReturn<P = unknown, R = unknown> {
  /** Stable id of the surrounding registered modal. */
  id: string;
  /** True between `show()` and `hide()`. Drive the underlying Modal's `visible` prop. */
  visible: boolean;
  /** Runtime props passed to `show(id, props)`. */
  props: P;
  /**
   * Close the modal and resolve the awaiting `show()` promise with `result`.
   * Modal stays mounted while the exit animation runs — call `remove()` in `afterClose`.
   */
  hide: (result?: R) => void;
  /** Reject the awaiting `show()` promise without resolving. Does not close. */
  reject: (reason?: unknown) => void;
  /** Hard-remove the record from store; typically wired to `afterClose`. */
  remove: () => void;
}

/**
 * Read this modal's own state from inside a registered component.
 * Throws if used outside an outlet-rendered modal.
 */
export function useModalSelf<P = unknown, R = unknown>(): UseModalSelfReturn<P, R> {
  const ctx = useContext(ModalSelfContext);
  if (!ctx) {
    throw new Error('useModalSelf must be used inside a registered <Modal.Provider> modal');
  }
  const { id, store } = ctx;

  const getSnapshot = useCallback(() => store.getState()[id], [id, store]);
  const record = useSyncExternalStore(store.subscribe, getSnapshot, getSnapshot);

  return useMemo<UseModalSelfReturn<P, R>>(
    () => ({
      id,
      visible: !!record?.visible,
      props: (record?.props ?? ({} as P)) as P,
      hide: (result?: R) => store.hide(id, result),
      reject: (reason?: unknown) => record?.resolver?.reject(reason),
      remove: () => store.remove(id),
    }),
    [id, store, record]
  );
}
