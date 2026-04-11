import Modal from './modal';
import { ModalProps } from './types';
import {
  createStaticHost,
  destroyStaticHost,
  renderStaticHost,
} from '../config-provider/static-host';

export type StaticModalProps = Omit<ModalProps, 'visible'>;

export interface StaticModalInstance {
  destroy: () => void;
  update: (config: StaticModalProps) => void;
}

function createStaticModal(config: StaticModalProps): StaticModalInstance {
  const container = createStaticHost();
  let currentConfig = config;
  let visible = true;

  const render = (): void => {
    renderStaticHost(
      container,
      (
        <Modal
          {...currentConfig}
          visible={visible}
          onClose={(event) => {
            if (currentConfig.onClose) {
              currentConfig.onClose(event);
            } else {
              currentConfig.onCancel?.(event);
            }
            visible = false;
            render();
          }}
          afterClose={() => {
            currentConfig.afterClose?.();
            destroyStaticHost(container);
          }}
        />
      )
    );
  };

  const destroy = (): void => {
    visible = false;
    render();
  };

  const update = (nextConfig: StaticModalProps): void => {
    currentConfig = { ...currentConfig, ...nextConfig };
    render();
  };

  render();

  return {
    destroy,
    update,
  };
}

export function openStaticModal(config: StaticModalProps): StaticModalInstance {
  return createStaticModal(config);
}

export function confirmStaticModal(config: StaticModalProps): StaticModalInstance {
  return createStaticModal(config);
}
