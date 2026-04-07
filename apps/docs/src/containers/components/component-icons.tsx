import React from 'react';

type IconFn = () => React.ReactElement;

const s = { stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

const icons: Record<string, IconFn> = {
  // Foundation
  button: () => <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="7" width="18" height="10" rx="5" {...s} /><line x1="9" y1="12" x2="15" y2="12" {...s} /></svg>,
  icon: () => <svg viewBox="0 0 24 24" fill="none"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" {...s} /></svg>,
  image: () => <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" {...s} /><circle cx="8.5" cy="8.5" r="1.5" {...s} /><polyline points="21,15 16,10 5,21" {...s} /></svg>,
  link: () => <svg viewBox="0 0 24 24" fill="none"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" {...s} /><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" {...s} /></svg>,
  typography: () => <svg viewBox="0 0 24 24" fill="none"><polyline points="4,7 4,4 20,4 20,7" {...s} /><line x1="12" y1="4" x2="12" y2="20" {...s} /><line x1="8" y1="20" x2="16" y2="20" {...s} /></svg>,

  // Layout
  'aspect-ratio': () => <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" {...s} /><path d="M7 15l3-3 3 3" {...s} /></svg>,
  divider: () => <svg viewBox="0 0 24 24" fill="none"><line x1="3" y1="12" x2="21" y2="12" {...s} /><line x1="12" y1="5" x2="12" y2="9" {...s} /><line x1="12" y1="15" x2="12" y2="19" {...s} /></svg>,
  flex: () => <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="8" width="5" height="8" rx="1" {...s} /><rect x="10" y="5" width="5" height="14" rx="1" {...s} /><rect x="17" y="9" width="5" height="6" rx="1" {...s} /></svg>,
  'grid-system': () => <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="7" rx="1" {...s} /><rect x="3" y="13" width="5" height="7" rx="1" {...s} /><rect x="10" y="13" width="5" height="7" rx="1" {...s} /><rect x="17" y="13" width="4" height="7" rx="1" {...s} /></svg>,
  grid: () => <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="1" {...s} /><rect x="14" y="3" width="7" height="7" rx="1" {...s} /><rect x="3" y="14" width="7" height="7" rx="1" {...s} /><rect x="14" y="14" width="7" height="7" rx="1" {...s} /></svg>,
  layout: () => <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" {...s} /><line x1="3" y1="9" x2="21" y2="9" {...s} /><line x1="9" y1="9" x2="9" y2="21" {...s} /></svg>,
  space: () => <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="9" width="4" height="6" rx="1" {...s} /><rect x="10" y="9" width="4" height="6" rx="1" {...s} /><rect x="17" y="9" width="4" height="6" rx="1" {...s} /></svg>,
  split: () => <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="18" rx="1" {...s} /><rect x="14" y="3" width="7" height="18" rx="1" {...s} /><line x1="12" y1="8" x2="12" y2="16" {...s} strokeDasharray="2 2" /></svg>,
  waterfall: () => <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="5" rx="1" {...s} /><rect x="14" y="3" width="7" height="8" rx="1" {...s} /><rect x="3" y="10" width="7" height="7" rx="1" {...s} /><rect x="14" y="13" width="7" height="5" rx="1" {...s} /><rect x="3" y="19" width="7" height="2" rx="1" {...s} /><rect x="14" y="20" width="7" height="1" rx="0.5" {...s} /></svg>,

  // Navigation
  anchor: () => <svg viewBox="0 0 24 24" fill="none"><line x1="7" y1="6" x2="17" y2="6" {...s} /><line x1="7" y1="12" x2="14" y2="12" {...s} /><line x1="7" y1="18" x2="11" y2="18" {...s} /><circle cx="4" cy="12" r="1.5" fill="currentColor" /></svg>,
  breadcrumb: () => <svg viewBox="0 0 24 24" fill="none"><line x1="3" y1="12" x2="7" y2="12" {...s} /><polyline points="9,8 13,12 9,16" {...s} /><line x1="13" y1="12" x2="17" y2="12" {...s} /><polyline points="19,8 23,12 19,16" {...s} /></svg>,
  dropdown: () => <svg viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="16" height="5" rx="1.5" {...s} /><polyline points="9,15 12,18 15,15" {...s} /><rect x="4" y="12" width="16" height="9" rx="1.5" {...s} strokeDasharray="3 2" /></svg>,
  menu: () => <svg viewBox="0 0 24 24" fill="none"><line x1="4" y1="6" x2="20" y2="6" {...s} /><line x1="4" y1="12" x2="20" y2="12" {...s} /><line x1="4" y1="18" x2="20" y2="18" {...s} /></svg>,
  pagination: () => <svg viewBox="0 0 24 24" fill="none"><polyline points="3,12 6,9 6,15" {...s} /><rect x="8" y="9" width="3" height="6" rx="1" fill="currentColor" opacity="0.2" {...s} /><rect x="13" y="9" width="3" height="6" rx="1" {...s} /><rect x="18" y="9" width="3" height="6" rx="1" {...s} /></svg>,
  'speed-dial': () => <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="18" r="3" {...s} /><line x1="12" y1="15" x2="12" y2="13" {...s} /><circle cx="12" cy="11" r="1.5" {...s} /><circle cx="12" cy="6" r="1.5" {...s} /></svg>,
  steps: () => <svg viewBox="0 0 24 24" fill="none"><circle cx="5" cy="12" r="2.5" fill="currentColor" opacity="0.2" {...s} /><line x1="7.5" y1="12" x2="10" y2="12" {...s} /><circle cx="12" cy="12" r="2.5" {...s} /><line x1="14.5" y1="12" x2="17" y2="12" {...s} /><circle cx="19" cy="12" r="2.5" {...s} /></svg>,

  // Data Display
  avatar: () => <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="9" r="4" {...s} /><path d="M4 21c0-4 4-7 8-7s8 3 8 7" {...s} /></svg>,
  badge: () => <svg viewBox="0 0 24 24" fill="none"><rect x="4" y="6" width="14" height="14" rx="2" {...s} /><circle cx="18" cy="6" r="4" fill="currentColor" opacity="0.3" {...s} /></svg>,
  calendar: () => <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="16" rx="2" {...s} /><line x1="3" y1="10" x2="21" y2="10" {...s} /><line x1="8" y1="3" x2="8" y2="7" {...s} /><line x1="16" y1="3" x2="16" y2="7" {...s} /></svg>,
  card: () => <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="2" {...s} /><line x1="3" y1="10" x2="21" y2="10" {...s} /><line x1="7" y1="15" x2="17" y2="15" {...s} /><line x1="7" y1="18" x2="13" y2="18" {...s} /></svg>,
  carousel: () => <svg viewBox="0 0 24 24" fill="none"><rect x="5" y="5" width="14" height="12" rx="2" {...s} /><polyline points="2,10 5,12 2,14" {...s} /><polyline points="22,10 19,12 22,14" {...s} /><circle cx="10" cy="20" r="1" fill="currentColor" /><circle cx="14" cy="20" r="1" fill="currentColor" opacity="0.3" /></svg>,
  collapse: () => <svg viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="16" height="5" rx="1.5" {...s} /><polyline points="14,6.5 12,8.5 10,6.5" {...s} /><rect x="4" y="11" width="16" height="4" rx="1.5" {...s} /><rect x="4" y="17" width="16" height="4" rx="1.5" {...s} /></svg>,
  countdown: () => <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="13" r="8" {...s} /><line x1="12" y1="9" x2="12" y2="13" {...s} /><line x1="12" y1="13" x2="15" y2="15" {...s} /><line x1="12" y1="3" x2="12" y2="5" {...s} /></svg>,
  empty: () => <svg viewBox="0 0 24 24" fill="none"><path d="M4 16l4-6h8l4 6" {...s} /><rect x="3" y="16" width="18" height="4" rx="1" {...s} /><line x1="10" y1="13" x2="14" y2="13" {...s} /></svg>,
  descriptions: () => <svg viewBox="0 0 24 24" fill="none"><line x1="4" y1="6" x2="10" y2="6" {...s} /><line x1="13" y1="6" x2="20" y2="6" {...s} /><line x1="4" y1="11" x2="10" y2="11" {...s} /><line x1="13" y1="11" x2="20" y2="11" {...s} /><line x1="4" y1="16" x2="10" y2="16" {...s} /><line x1="13" y1="16" x2="20" y2="16" {...s} /></svg>,
  flip: () => <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="7" height="14" rx="1.5" {...s} /><rect x="14" y="5" width="7" height="14" rx="1.5" {...s} strokeDasharray="3 2" /><path d="M12 8l1.5 2H10.5L12 8z" fill="currentColor" /><path d="M12 16l-1.5-2h3L12 16z" fill="currentColor" /></svg>,
  list: () => <svg viewBox="0 0 24 24" fill="none"><circle cx="5" cy="6" r="1.5" fill="currentColor" opacity="0.3" /><line x1="9" y1="6" x2="20" y2="6" {...s} /><circle cx="5" cy="12" r="1.5" fill="currentColor" opacity="0.3" /><line x1="9" y1="12" x2="20" y2="12" {...s} /><circle cx="5" cy="18" r="1.5" fill="currentColor" opacity="0.3" /><line x1="9" y1="18" x2="20" y2="18" {...s} /></svg>,
  marquee: () => <svg viewBox="0 0 24 24" fill="none"><rect x="2" y="8" width="20" height="8" rx="1.5" {...s} /><path d="M6 12h3M11 12h3M16 12h3" {...s} /><polyline points="3,6 5,8 3,10" {...s} /></svg>,
  popover: () => <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="12" rx="2" {...s} /><path d="M9 15l3 4 3-4" {...s} /><line x1="7" y1="7" x2="17" y2="7" {...s} /><line x1="7" y1="11" x2="13" y2="11" {...s} /></svg>,
  progress: () => <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="10" width="18" height="4" rx="2" {...s} /><rect x="3" y="10" width="12" height="4" rx="2" fill="currentColor" opacity="0.15" {...s} /></svg>,
  'scroll-number': () => <svg viewBox="0 0 24 24" fill="none"><rect x="7" y="3" width="10" height="18" rx="2" {...s} /><line x1="12" y1="7" x2="12" y2="7.01" {...s} strokeWidth="2" /><line x1="12" y1="12" x2="12" y2="12.01" {...s} strokeWidth="2" /><line x1="12" y1="17" x2="12" y2="17.01" {...s} strokeWidth="2" /></svg>,
  statistic: () => <svg viewBox="0 0 24 24" fill="none"><line x1="5" y1="8" x2="5" y2="19" {...s} /><line x1="10" y1="5" x2="10" y2="19" {...s} /><line x1="15" y1="11" x2="15" y2="19" {...s} /><line x1="20" y1="7" x2="20" y2="19" {...s} /></svg>,
  table: () => <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="2" {...s} /><line x1="3" y1="9" x2="21" y2="9" {...s} /><line x1="3" y1="14" x2="21" y2="14" {...s} /><line x1="10" y1="4" x2="10" y2="20" {...s} /></svg>,
  tag: () => <svg viewBox="0 0 24 24" fill="none"><path d="M4 4h7l9 9-7 7-9-9V4z" {...s} /><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" opacity="0.3" /></svg>,
  'text-loop': () => <svg viewBox="0 0 24 24" fill="none"><path d="M17 8l3 4-3 4" {...s} /><path d="M7 16l-3-4 3-4" {...s} /><line x1="8" y1="12" x2="16" y2="12" {...s} /></svg>,
  timeline: () => <svg viewBox="0 0 24 24" fill="none"><circle cx="8" cy="5" r="2" {...s} /><line x1="8" y1="7" x2="8" y2="10" {...s} /><circle cx="8" cy="12" r="2" fill="currentColor" opacity="0.2" {...s} /><line x1="8" y1="14" x2="8" y2="17" {...s} /><circle cx="8" cy="19" r="2" {...s} /><line x1="12" y1="5" x2="19" y2="5" {...s} /><line x1="12" y1="12" x2="19" y2="12" {...s} /><line x1="12" y1="19" x2="19" y2="19" {...s} /></svg>,
  tooltip: () => <svg viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="16" height="10" rx="2" {...s} /><path d="M10 14l2 3 2-3" {...s} /><line x1="8" y1="9" x2="16" y2="9" {...s} /></svg>,
  tree: () => <svg viewBox="0 0 24 24" fill="none"><circle cx="6" cy="5" r="2" {...s} /><line x1="6" y1="7" x2="6" y2="19" {...s} /><line x1="6" y1="11" x2="12" y2="11" {...s} /><circle cx="14" cy="11" r="2" {...s} /><line x1="6" y1="17" x2="12" y2="17" {...s} /><circle cx="14" cy="17" r="2" {...s} /></svg>,
  chart: () => <svg viewBox="0 0 24 24" fill="none"><polyline points="4,18 9,11 13,14 20,6" {...s} /><polyline points="16,6 20,6 20,10" {...s} /></svg>,

  // Form
  form: () => <svg viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="2" {...s} /><line x1="8" y1="8" x2="16" y2="8" {...s} /><line x1="8" y1="12" x2="16" y2="12" {...s} /><line x1="8" y1="16" x2="12" y2="16" {...s} /></svg>,
  'auto-complete': () => <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="5" rx="1.5" {...s} /><line x1="6" y1="7.5" x2="12" y2="7.5" {...s} /><rect x="3" y="12" width="18" height="9" rx="1.5" {...s} strokeDasharray="3 2" /><line x1="6" y1="15" x2="14" y2="15" {...s} /><line x1="6" y1="18" x2="12" y2="18" {...s} /></svg>,
  cascader: () => <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="6" height="16" rx="1.5" {...s} /><rect x="11" y="4" width="6" height="16" rx="1.5" {...s} /><rect x="19" y="4" width="3" height="16" rx="1" {...s} strokeDasharray="2 2" /><line x1="5" y1="8" x2="7" y2="8" {...s} /><line x1="13" y1="8" x2="15" y2="8" {...s} /></svg>,
  checkbox: () => <svg viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="16" height="16" rx="3" {...s} /><polyline points="8,12 11,15 16,9" {...s} /></svg>,
  'color-picker': () => <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" {...s} /><circle cx="12" cy="7" r="2" fill="currentColor" opacity="0.2" {...s} /><circle cx="8" cy="14" r="2" fill="currentColor" opacity="0.15" {...s} /><circle cx="16" cy="14" r="2" fill="currentColor" opacity="0.1" {...s} /></svg>,
  'date-picker': () => <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="16" rx="2" {...s} /><line x1="3" y1="10" x2="21" y2="10" {...s} /><line x1="8" y1="3" x2="8" y2="7" {...s} /><line x1="16" y1="3" x2="16" y2="7" {...s} /><circle cx="12" cy="15" r="1.5" fill="currentColor" opacity="0.3" /></svg>,
  input: () => <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="7" width="18" height="10" rx="2" {...s} /><line x1="7" y1="10" x2="7" y2="14" {...s} /></svg>,
  'input-number': () => <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="7" width="18" height="10" rx="2" {...s} /><line x1="7" y1="12" x2="11" y2="12" {...s} /><line x1="16" y1="10" x2="16" y2="14" {...s} /><line x1="14" y1="12" x2="18" y2="12" {...s} /></svg>,
  'input-password': () => <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="7" width="18" height="10" rx="2" {...s} /><circle cx="8" cy="12" r="1" fill="currentColor" /><circle cx="12" cy="12" r="1" fill="currentColor" /><circle cx="16" cy="12" r="1" fill="currentColor" /></svg>,
  'input-otp': () => <svg viewBox="0 0 24 24" fill="none"><rect x="2" y="7" width="5" height="10" rx="1.5" {...s} /><rect x="9" y="7" width="5" height="10" rx="1.5" {...s} /><rect x="16" y="7" width="5" height="10" rx="1.5" {...s} /><line x1="4.5" y1="11" x2="4.5" y2="13" {...s} /></svg>,
  'native-select': () => <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="7" width="18" height="10" rx="2" {...s} /><polyline points="15,10 17,12 15,14" {...s} /><line x1="7" y1="12" x2="12" y2="12" {...s} /></svg>,
  radio: () => <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" {...s} /><circle cx="12" cy="12" r="3.5" fill="currentColor" opacity="0.25" /></svg>,
  rate: () => <svg viewBox="0 0 24 24" fill="none"><polygon points="6,2 7.5,6.5 12,6.5 8.5,9.5 9.5,14 6,11 2.5,14 3.5,9.5 0,6.5 4.5,6.5" transform="translate(3,5) scale(0.8)" fill="currentColor" opacity="0.2" {...s} /><polygon points="6,2 7.5,6.5 12,6.5 8.5,9.5 9.5,14 6,11 2.5,14 3.5,9.5 0,6.5 4.5,6.5" transform="translate(10,5) scale(0.8)" {...s} /></svg>,
  segmented: () => <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="8" width="18" height="8" rx="4" {...s} /><rect x="4" y="9" width="7" height="6" rx="3" fill="currentColor" opacity="0.15" {...s} /></svg>,
  select: () => <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="7" width="18" height="10" rx="2" {...s} /><polyline points="14,10 17,13 14,10" {...s} /><path d="M15 10l2 2.5-2 2.5" {...s} /><line x1="7" y1="12" x2="12" y2="12" {...s} /></svg>,
  slider: () => <svg viewBox="0 0 24 24" fill="none"><line x1="3" y1="12" x2="21" y2="12" {...s} /><circle cx="14" cy="12" r="3" fill="currentColor" opacity="0.15" {...s} /></svg>,
  'split-button': () => <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="7" width="18" height="10" rx="2" {...s} /><line x1="16" y1="7" x2="16" y2="17" {...s} /><polyline points="17.5,11 19,12.5 17.5,14" {...s} /><line x1="7" y1="12" x2="13" y2="12" {...s} /></svg>,
  switch: () => <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="8" width="18" height="8" rx="4" {...s} /><circle cx="16" cy="12" r="2.5" fill="currentColor" opacity="0.2" {...s} /></svg>,
  tabs: () => <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="7" width="18" height="14" rx="2" {...s} /><line x1="3" y1="11" x2="21" y2="11" {...s} /><rect x="4" y="7" width="6" height="4" rx="1" fill="currentColor" opacity="0.15" /></svg>,
  textarea: () => <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="2" {...s} /><line x1="7" y1="8" x2="7" y2="10" {...s} /><path d="M17 16l2 2-2 2" {...s} /></svg>,
  'time-picker': () => <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" {...s} /><line x1="12" y1="7" x2="12" y2="12" {...s} /><line x1="12" y1="12" x2="16" y2="14" {...s} /></svg>,
  transfer: () => <svg viewBox="0 0 24 24" fill="none"><rect x="2" y="4" width="8" height="16" rx="1.5" {...s} /><rect x="14" y="4" width="8" height="16" rx="1.5" {...s} /><polyline points="10,10 13,12 10,14" {...s} /></svg>,
  upload: () => <svg viewBox="0 0 24 24" fill="none"><polyline points="16,8 12,4 8,8" {...s} /><line x1="12" y1="4" x2="12" y2="16" {...s} /><path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" {...s} /></svg>,

  // Feedback
  alert: () => <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" {...s} /><line x1="12" y1="9" x2="12" y2="13" {...s} /><circle cx="12" cy="15.5" r="0.5" fill="currentColor" /></svg>,
  drawer: () => <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" {...s} /><line x1="14" y1="3" x2="14" y2="21" {...s} /><line x1="17" y1="8" x2="18" y2="8" {...s} /><line x1="17" y1="12" x2="18" y2="12" {...s} /></svg>,
  loader: () => <svg viewBox="0 0 24 24" fill="none"><path d="M12 3a9 9 0 016.36 2.64" {...s} /><path d="M21 12a9 9 0 01-2.64 6.36" {...s} opacity="0.6" /><path d="M12 21a9 9 0 01-6.36-2.64" {...s} opacity="0.3" /><path d="M3 12a9 9 0 012.64-6.36" {...s} opacity="0.1" /></svg>,
  overlay: () => <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" {...s} opacity="0.3" /><rect x="6" y="6" width="12" height="12" rx="2" {...s} /></svg>,
  'loading-bar': () => <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="11" width="18" height="2" rx="1" {...s} /><rect x="3" y="11" width="10" height="2" rx="1" fill="currentColor" opacity="0.2" {...s} /></svg>,
  message: () => <svg viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="16" height="7" rx="2" {...s} /><line x1="8" y1="7.5" x2="16" y2="7.5" {...s} /><polyline points="8,4 4,4 4,11" {...s} /></svg>,
  modal: () => <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" {...s} opacity="0.15" /><rect x="5" y="6" width="14" height="12" rx="2" {...s} /><line x1="5" y1="10" x2="19" y2="10" {...s} /><line x1="16" y1="8" x2="16" y2="8.01" {...s} strokeWidth="2" /></svg>,
  notification: () => <svg viewBox="0 0 24 24" fill="none"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" {...s} /><path d="M13.73 21a2 2 0 01-3.46 0" {...s} /></svg>,
  'pop-confirm': () => <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="12" rx="2" {...s} /><path d="M9 15l3 4 3-4" {...s} /><line x1="12" y1="7" x2="12" y2="10" {...s} /><circle cx="12" cy="12" r="0.5" fill="currentColor" /></svg>,
  tour: () => <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" {...s} strokeDasharray="4 2" /><circle cx="12" cy="12" r="4" {...s} /><circle cx="12" cy="12" r="1.5" fill="currentColor" /><polyline points="18,4 20,2" {...s} /><line x1="20" y1="2" x2="21" y2="2" {...s} /></svg>,
  result: () => <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="10" r="6" {...s} /><polyline points="9,10 11,12.5 15,8" {...s} /><line x1="8" y1="19" x2="16" y2="19" {...s} /></svg>,
  'scroll-indicator': () => <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="3" rx="1.5" {...s} /><rect x="3" y="3" width="10" height="3" rx="1.5" fill="currentColor" opacity="0.2" {...s} /></svg>,
  skeleton: () => <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="4" rx="2" {...s} strokeDasharray="3 3" /><rect x="3" y="11" width="12" height="4" rx="2" {...s} strokeDasharray="3 3" /><rect x="3" y="18" width="15" height="3" rx="1.5" {...s} strokeDasharray="3 3" /></svg>,
  'strength-indicator': () => <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="14" width="4" height="6" rx="1" fill="currentColor" opacity="0.15" {...s} /><rect x="9" y="10" width="4" height="10" rx="1" fill="currentColor" opacity="0.15" {...s} /><rect x="15" y="6" width="4" height="14" rx="1" {...s} /></svg>,

  // Miscellany
  'back-top': () => <svg viewBox="0 0 24 24" fill="none"><polyline points="8,10 12,6 16,10" {...s} /><line x1="12" y1="6" x2="12" y2="18" {...s} /><line x1="6" y1="20" x2="18" y2="20" {...s} /></svg>,
  'config-provider': () => <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" {...s} /><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" {...s} /></svg>,
  'copy-to-clipboard': () => <svg viewBox="0 0 24 24" fill="none"><rect x="9" y="9" width="12" height="12" rx="2" {...s} /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" {...s} /></svg>,
  keyboard: () => <svg viewBox="0 0 24 24" fill="none"><rect x="2" y="6" width="20" height="12" rx="2" {...s} /><line x1="6" y1="10" x2="6" y2="10.01" {...s} strokeWidth="2" /><line x1="10" y1="10" x2="10" y2="10.01" {...s} strokeWidth="2" /><line x1="14" y1="10" x2="14" y2="10.01" {...s} strokeWidth="2" /><line x1="18" y1="10" x2="18" y2="10.01" {...s} strokeWidth="2" /><line x1="8" y1="14" x2="16" y2="14" {...s} /></svg>,
  sticky: () => <svg viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="6" rx="1.5" {...s} /><line x1="12" y1="9" x2="12" y2="14" {...s} strokeDasharray="2 2" /><rect x="4" y="14" width="16" height="6" rx="1.5" {...s} strokeDasharray="3 2" /></svg>,
};

export const getComponentIcon = (route: string): React.ReactElement | null => {
  const iconFn = icons[route];
  return iconFn ? iconFn() : null;
};
