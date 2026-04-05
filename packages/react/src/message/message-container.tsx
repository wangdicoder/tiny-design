import React, { ReactNode } from 'react';
import Message from './message';
import { MessageProps, MessageType } from './types';
import {
  createStaticHost,
  destroyStaticHost,
  renderStaticHost,
} from '../config-provider/static-host';

const className = '.ty-message-container';

export type Options = {
  top?: number;
  offset?: number;
  icon?: ReactNode;
  extra?: ReactNode;
  className?: string;
};

type CreateComponent = (
  type: MessageType,
  content: string,
  duration: number,
  onClose: () => void,
  options: Options
) => void;

type UnmountDom = (
  containerDiv: HTMLElement,
  top: number,
  height: number,
  onClose?: () => void
) => void;

let offset: number;

const unmountDom: UnmountDom = (containerDiv, top, height, onClose) => {
  destroyStaticHost(containerDiv);
  requestAnimationFrame(() => {
    const containers = document.querySelectorAll(className);
    const len = containers.length;
    for (let i = 0; i < len; i++) {
      const element = containers[i] as HTMLElement;
      const elementTop = parseInt((element as HTMLElement).style.top || '0', 10);
      elementTop > top && (element.style.top = `${elementTop - height - offset}px`);
    }
  });
  onClose && onClose();
};

const createComponent: CreateComponent = (
  type,
  content,
  duration = 3000,
  onClose,
  options: Options = {}
) => {
  const containers = document.querySelectorAll(className);
  const lastContainer =
    containers.length > 0 ? (containers[containers.length - 1] as HTMLElement) : null;

  offset = options.offset || 16;
  const top = lastContainer
    ? parseInt(lastContainer.style.top || '0', 10) + lastContainer.offsetHeight + offset
    : options.top || 15;

  const div = createStaticHost('ty-message-container');
  div.style.top = `${top}px`;

  const props: MessageProps = {
    type,
    content,
    duration,
    icon: options.icon,
    extra: options.extra,
    className: options.className,
    willUnmount: (height) => {
      const updatedTop = parseInt(div.style.top || '0', 10);
      unmountDom(div, updatedTop, height, onClose);
    },
  };
  renderStaticHost(div, React.createElement(Message, props));
};

const messageContainer: any = (
  content: string,
  duration: number,
  onClose: () => void,
  options: Options
) => {
  createComponent(undefined, content, duration, onClose, options);
};

['success', 'error', 'warning', 'info', 'loading'].forEach((type) => {
  messageContainer[type] = (
    content: string,
    duration: number,
    onClose: () => void,
    options: Options
  ) => {
    createComponent(type as MessageType, content, duration, onClose, options);
  };
});

messageContainer.warn = messageContainer.warning;

export default messageContainer;
