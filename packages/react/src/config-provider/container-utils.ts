import { ConfigContextProps } from './config-context';

export function resolveTargetContainer(
  config: ConfigContextProps,
  targetContainer?: () => HTMLElement | Window
): HTMLElement | Window {
  return targetContainer?.() ?? config.getTargetContainer?.() ?? window;
}

export function resolvePopupContainer(
  config: ConfigContextProps,
  trigger?: HTMLElement | null,
  popupContainer?: (trigger?: HTMLElement | null) => HTMLElement
): HTMLElement {
  return popupContainer?.(trigger) ?? config.getPopupContainer?.(trigger) ?? document.body;
}
