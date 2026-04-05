import React from 'react';
import LoadingBar from './loading-bar';
import {
  createStaticHost,
  destroyStaticHost,
  renderStaticHost,
} from '../config-provider/static-host';

let rafId: number | null = null;
let loadingBar: HTMLElement | null = null;
let outerDiv: HTMLElement | null = null;
let width = 0;

const reset = (): void => {
  if (outerDiv) {
    destroyStaticHost(outerDiv);
  }
  loadingBar = null;
  outerDiv = null;
  width = 0;
};

const move = (): void => {
  if (width < 55) {
    width += .4;
    rafId = requestAnimationFrame(move);
  } else if (width < 90) {
    width += .1;
    rafId = requestAnimationFrame(move);
  }

  loadingBar && (loadingBar.style.width = `${width}%`);
};

const createComponent = (): void => {
  outerDiv = createStaticHost();
  renderStaticHost(outerDiv, React.createElement(LoadingBar, {
    didMount: () => {
      loadingBar = document.getElementById('ty-loading-bar');
      rafId = requestAnimationFrame(move);
    },
  }));
};

const unmountDom = (): void => {
  setTimeout(() => {
    loadingBar && (loadingBar.style.opacity = '0');
  }, 300);
  setTimeout(() => {
    reset();
  }, 700);
};

const start = (): void => {
  if (!outerDiv) {
    reset();
    createComponent();
  }
};

const succeed = (): void => {
  if (rafId) cancelAnimationFrame(rafId);

  if (outerDiv && loadingBar) {
    loadingBar.style.width = '100%';
    unmountDom();
  }
};

const fail = (): void => {
  if (rafId) cancelAnimationFrame(rafId);

  if (outerDiv && loadingBar) {
    loadingBar.style.width = '100%';
    loadingBar.style.backgroundColor = '#f30';
    unmountDom();
  }
};

export default {
  start,
  succeed,
  fail,
};

export type * from './types';
