import Modal from './modal';
import {
  ModalProvider,
  ModalRegister,
  createModalStore,
  modalStore,
  useModal,
  useModalActions,
  useModalSelf,
} from './modal-context';
import type {
  ModalComponent,
  ModalProviderProps,
  ModalRecord,
  ModalRegisterProps,
  ModalState,
  ModalStore,
  UseModalActionsReturn,
  UseModalReturn,
  UseModalSelfReturn,
} from './modal-context';
import {
  confirmStaticModal,
  openStaticModal,
  StaticModalInstance,
  StaticModalProps,
} from './static-modal';

type ModalComponentDecorated = typeof Modal & {
  Provider: typeof ModalProvider;
  Register: typeof ModalRegister;
  useModal: typeof useModal;
  useModalActions: typeof useModalActions;
  useModalSelf: typeof useModalSelf;
  store: typeof modalStore;
  open: (config: StaticModalProps) => StaticModalInstance;
  confirm: (config: StaticModalProps) => StaticModalInstance;
};

const ModalWithContext = Modal as ModalComponentDecorated;
ModalWithContext.Provider = ModalProvider;
ModalWithContext.Register = ModalRegister;
ModalWithContext.useModal = useModal;
ModalWithContext.useModalActions = useModalActions;
ModalWithContext.useModalSelf = useModalSelf;
ModalWithContext.store = modalStore;
ModalWithContext.open = openStaticModal;
ModalWithContext.confirm = confirmStaticModal;

// `createModalStore` is exposed as a named import only — it's an advanced
// escape hatch (tests, SSR, multi-tenant trees), not part of the default
// `Modal.*` ergonomics.
export { createModalStore };

export default ModalWithContext;
export type * from './types';
export type {
  ModalComponent,
  ModalProviderProps,
  ModalRecord,
  ModalRegisterProps,
  ModalState,
  ModalStore,
  StaticModalInstance,
  StaticModalProps,
  UseModalActionsReturn,
  UseModalReturn,
  UseModalSelfReturn,
};
