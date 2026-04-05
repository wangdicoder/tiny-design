import React, { ReactNode, MouseEventHandler } from 'react';
import Notification from './notification';
import { camelCaseToDash } from '../_utils/general';
import { NotificationProps, NotificationType } from './types';
import {
  createStaticHost,
  destroyStaticHost,
  renderStaticHost,
} from '../config-provider/static-host';

const className = 'ty-notification-container';

type Direction = 'top' | 'bottom';
type NotificationPlacement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
type Options = {
  margin?: number;
  offset?: number;
  title?: ReactNode;
  description?: ReactNode;
  footer?: ReactNode;
  duration?: number;
  placement?: NotificationPlacement;
  onClose?: MouseEventHandler;
  onClick?: MouseEventHandler;
  icon?: ReactNode;
};
type UnmountDom = (
  queryName: string,
  containerDiv: HTMLElement,
  position: number,
  height: number,
  direction: Direction
) => void;

let offset: number;

const unmountDom: UnmountDom = (queryName, containerDiv, position, height, direction) => {
  destroyStaticHost(containerDiv);
  requestAnimationFrame(() => {
    const containers = document.querySelectorAll(`.${queryName}`);
    const len = containers.length;
    for (let i = 0; i < len; i++) {
      const element = containers[i] as HTMLElement;
      const elementPosition = parseInt((element as HTMLElement).style[direction] || '0', 10);
      elementPosition > position &&
        (element.style[direction] = `${elementPosition - height - offset}px`);
    }
  });
};

const createComponent = (options: Options, type: NotificationType) => {
  const placement = options.placement || 'topRight';
  const queryName = `${className}_${camelCaseToDash(placement)}`;
  const containers = document.querySelectorAll(`.${queryName}`);
  const lastContainer =
    containers.length > 0 ? (containers[containers.length - 1] as HTMLElement) : null;

  const div = createStaticHost(`${className} ${queryName}`);

  offset = options.offset || 24;
  const direction: Direction = placement.includes('top') ? 'top' : 'bottom';
  const position = lastContainer
    ? parseInt(lastContainer.style[direction] || '0', 10) + lastContainer.offsetHeight + offset
    : options.margin || 16;
  div.style[direction] = `${position}px`;

  const props: NotificationProps = {
    type,
    title: options.title,
    description: options.description,
    footer: options.footer,
    duration: options.duration,
    onClose: options.onClose,
    onClick: options.onClick,
    icon: options.icon,
    didMount: () => {
      placement.includes('Right') ? (div.style.right = `0px`) : (div.style.left = `0px`);
    },
    willUnmount: (height) => {
      const updatedPosition = parseInt(div.style[direction] || '0', 10);
      unmountDom(queryName, div, updatedPosition, height, direction);
    },
  };
  renderStaticHost(div, React.createElement(Notification, props));
};

const open = (options: Options) => {
  createComponent(options, undefined);
};

const notificationContainer: any = {};

['success', 'error', 'warning', 'info'].forEach((type) => {
  notificationContainer[type] = (options: Options) => {
    createComponent(options, type as NotificationType);
  };
});

notificationContainer.open = open;
notificationContainer.warn = notificationContainer.warning;

export default notificationContainer;
