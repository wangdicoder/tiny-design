import Modal from './modal';
import { ModalProvider, useModal } from './modal-context';
import type { ModalProviderProps, UseModalReturn } from './modal-context';
import {
  confirmStaticModal,
  openStaticModal,
  StaticModalInstance,
  StaticModalProps,
} from './static-modal';

type ModalComponent = typeof Modal & {
  Provider: typeof ModalProvider;
  useModal: typeof useModal;
  open: (config: StaticModalProps) => StaticModalInstance;
  confirm: (config: StaticModalProps) => StaticModalInstance;
};

const ModalWithContext = Modal as ModalComponent;
ModalWithContext.Provider = ModalProvider;
ModalWithContext.useModal = useModal;
ModalWithContext.open = openStaticModal;
ModalWithContext.confirm = confirmStaticModal;

export default ModalWithContext;
export type * from './types';
export type { ModalProviderProps, UseModalReturn, StaticModalInstance, StaticModalProps };
