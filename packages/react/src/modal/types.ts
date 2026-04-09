import React, {CSSProperties, ReactNode} from 'react';
import { BaseProps } from '../_utils/props';
import { OverlayMaskType } from '../overlay/types';
import { ButtonProps } from '../button/types';

export type ModalAnimation = 'slide' | 'scale';

export interface ModalProps extends BaseProps {
  visible?: boolean;
  keyboard?: boolean;
  header?: ReactNode;
  footer?: ReactNode;
  width?: number | string;
  centered?: boolean;
  closable?: boolean;
  unmountOnClose?: boolean;
  afterClose?: () => void;
  maskType?: OverlayMaskType;
  maskClosable?: boolean;
  confirmLoading?: boolean;
  onConfirm?: (e: React.MouseEvent) => void;
  onCancel?: (e: React.MouseEvent) => void;
  onClose?: (e: React.MouseEvent) => void;
  confirmText?: string;
  cancelText?: string;
  confirmButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
  animation?: ModalAnimation;
  top?: number;
  zIndex?: number;
  headerStyle?: CSSProperties;
  bodyStyle?: CSSProperties;
  footerStyle?: CSSProperties;
  maskStyle?: CSSProperties;
  children?: ReactNode;
}
