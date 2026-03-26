import React, { lazy } from 'react';
import { Tag } from '@tiny-design/react';
import { SiteLocale } from './locale/types';

export interface RouterItem {
  title: string;
  route?: string;
  component?: any;
  children?: RouterItem[];
  tag?: React.ReactNode;
}

type LocalizedLazy = { en: any; zh: any };

function ll(en: () => Promise<any>, zh: () => Promise<any>): LocalizedLazy {
  return { en: lazy(en), zh: lazy(zh) };
}

function pick(l: LocalizedLazy, isZh: boolean) {
  return isZh ? l.zh : l.en;
}

// Guide components
const guide = {
  introduction: ll(
    () => import('../guides/introduction.md'),
    () => import('../guides/introduction.zh_CN.md'),
  ),
  getStarted: ll(
    () => import('../guides/get-started.md'),
    () => import('../guides/get-started.zh_CN.md'),
  ),
  useWithVite: ll(
    () => import('../guides/use-react-app.md'),
    () => import('../guides/use-react-app.zh_CN.md'),
  ),
  customiseTheme: ll(
    () => import('../guides/customise-theme.md'),
    () => import('../guides/customise-theme.zh_CN.md'),
  ),
  colors: ll(
    () => import('./containers/color'),
    () => import('./containers/color'),
  ),
  changelog: ll(
    () => import('../../../packages/react/CHANGELOG.md'),
    () => import('../../../packages/react/CHANGELOG.md'),
  ),
  faq: ll(
    () => import('../guides/faq.md'),
    () => import('../guides/faq.zh_CN.md'),
  ),
  mcpServer: ll(
    () => import('../guides/mcp-server.md'),
    () => import('../guides/mcp-server.zh_CN.md'),
  ),
  cli: ll(
    () => import('../guides/cli.md'),
    () => import('../guides/cli.zh_CN.md'),
  ),
  themeEditor: ll(
    () => import('./containers/theme-editor'),
    () => import('./containers/theme-editor'),
  ),
};

// Component lazy imports
const c = {
  button: ll(() => import('../../../packages/react/src/button/index.md'), () => import('../../../packages/react/src/button/index.zh_CN.md')),
  icon: ll(() => import('../../../packages/react/src/icon/index.md'), () => import('../../../packages/react/src/icon/index.zh_CN.md')),
  image: ll(() => import('../../../packages/react/src/image/index.md'), () => import('../../../packages/react/src/image/index.zh_CN.md')),
  link: ll(() => import('../../../packages/react/src/link/index.md'), () => import('../../../packages/react/src/link/index.zh_CN.md')),
  typography: ll(() => import('../../../packages/react/src/typography/index.md'), () => import('../../../packages/react/src/typography/index.zh_CN.md')),
  aspectRatio: ll(() => import('../../../packages/react/src/aspect-ratio/index.md'), () => import('../../../packages/react/src/aspect-ratio/index.zh_CN.md')),
  divider: ll(() => import('../../../packages/react/src/divider/index.md'), () => import('../../../packages/react/src/divider/index.zh_CN.md')),
  grid: ll(() => import('../../../packages/react/src/grid/index.md'), () => import('../../../packages/react/src/grid/index.zh_CN.md')),
  layout: ll(() => import('../../../packages/react/src/layout/index.md'), () => import('../../../packages/react/src/layout/index.zh_CN.md')),
  space: ll(() => import('../../../packages/react/src/space/index.md'), () => import('../../../packages/react/src/space/index.zh_CN.md')),
  flex: ll(() => import('../../../packages/react/src/flex/index.md'), () => import('../../../packages/react/src/flex/index.zh_CN.md')),
  split: ll(() => import('../../../packages/react/src/split/index.md'), () => import('../../../packages/react/src/split/index.zh_CN.md')),
  breadcrumb: ll(() => import('../../../packages/react/src/breadcrumb/index.md'), () => import('../../../packages/react/src/breadcrumb/index.zh_CN.md')),
  dropdown: ll(() => import('../../../packages/react/src/dropdown/index.md'), () => import('../../../packages/react/src/dropdown/index.zh_CN.md')),
  menu: ll(() => import('../../../packages/react/src/menu/index.md'), () => import('../../../packages/react/src/menu/index.zh_CN.md')),
  pagination: ll(() => import('../../../packages/react/src/pagination/index.md'), () => import('../../../packages/react/src/pagination/index.zh_CN.md')),
  steps: ll(() => import('../../../packages/react/src/steps/index.md'), () => import('../../../packages/react/src/steps/index.zh_CN.md')),
  avatar: ll(() => import('../../../packages/react/src/avatar/index.md'), () => import('../../../packages/react/src/avatar/index.zh_CN.md')),
  badge: ll(() => import('../../../packages/react/src/badge/index.md'), () => import('../../../packages/react/src/badge/index.zh_CN.md')),
  calendar: ll(() => import('../../../packages/react/src/calendar/index.md'), () => import('../../../packages/react/src/calendar/index.zh_CN.md')),
  card: ll(() => import('../../../packages/react/src/card/index.md'), () => import('../../../packages/react/src/card/index.zh_CN.md')),
  carousel: ll(() => import('../../../packages/react/src/carousel/index.md'), () => import('../../../packages/react/src/carousel/index.zh_CN.md')),
  collapse: ll(() => import('../../../packages/react/src/collapse/index.md'), () => import('../../../packages/react/src/collapse/index.zh_CN.md')),
  countdown: ll(() => import('../../../packages/react/src/countdown/index.md'), () => import('../../../packages/react/src/countdown/index.zh_CN.md')),
  empty: ll(() => import('../../../packages/react/src/empty/index.md'), () => import('../../../packages/react/src/empty/index.zh_CN.md')),
  descriptions: ll(() => import('../../../packages/react/src/descriptions/index.md'), () => import('../../../packages/react/src/descriptions/index.zh_CN.md')),
  flip: ll(() => import('../../../packages/react/src/flip/index.md'), () => import('../../../packages/react/src/flip/index.zh_CN.md')),
  list: ll(() => import('../../../packages/react/src/list/index.md'), () => import('../../../packages/react/src/list/index.zh_CN.md')),
  marquee: ll(() => import('../../../packages/react/src/marquee/index.md'), () => import('../../../packages/react/src/marquee/index.zh_CN.md')),
  popover: ll(() => import('../../../packages/react/src/popover/index.md'), () => import('../../../packages/react/src/popover/index.zh_CN.md')),
  progress: ll(() => import('../../../packages/react/src/progress/index.md'), () => import('../../../packages/react/src/progress/index.zh_CN.md')),
  statistic: ll(() => import('../../../packages/react/src/statistic/index.md'), () => import('../../../packages/react/src/statistic/index.zh_CN.md')),
  table: ll(() => import('../../../packages/react/src/table/index.md'), () => import('../../../packages/react/src/table/index.zh_CN.md')),
  tag: ll(() => import('../../../packages/react/src/tag/index.md'), () => import('../../../packages/react/src/tag/index.zh_CN.md')),
  textLoop: ll(() => import('../../../packages/react/src/text-loop/index.md'), () => import('../../../packages/react/src/text-loop/index.zh_CN.md')),
  timeline: ll(() => import('../../../packages/react/src/timeline/index.md'), () => import('../../../packages/react/src/timeline/index.zh_CN.md')),
  tooltip: ll(() => import('../../../packages/react/src/tooltip/index.md'), () => import('../../../packages/react/src/tooltip/index.zh_CN.md')),
  tree: ll(() => import('../../../packages/react/src/tree/index.md'), () => import('../../../packages/react/src/tree/index.zh_CN.md')),
  form: ll(() => import('../../../packages/react/src/form/index.md'), () => import('../../../packages/react/src/form/index.zh_CN.md')),
  cascader: ll(() => import('../../../packages/react/src/cascader/index.md'), () => import('../../../packages/react/src/cascader/index.zh_CN.md')),
  checkbox: ll(() => import('../../../packages/react/src/checkbox/index.md'), () => import('../../../packages/react/src/checkbox/index.zh_CN.md')),
  colorPicker: ll(() => import('../../../packages/react/src/color-picker/index.md'), () => import('../../../packages/react/src/color-picker/index.zh_CN.md')),
  datePicker: ll(() => import('../../../packages/react/src/date-picker/index.md'), () => import('../../../packages/react/src/date-picker/index.zh_CN.md')),
  input: ll(() => import('../../../packages/react/src/input/index.md'), () => import('../../../packages/react/src/input/index.zh_CN.md')),
  inputNumber: ll(() => import('../../../packages/react/src/input-number/index.md'), () => import('../../../packages/react/src/input-number/index.zh_CN.md')),
  inputPassword: ll(() => import('../../../packages/react/src/input-password/index.md'), () => import('../../../packages/react/src/input-password/index.zh_CN.md')),
  nativeSelect: ll(() => import('../../../packages/react/src/native-select/index.md'), () => import('../../../packages/react/src/native-select/index.zh_CN.md')),
  radio: ll(() => import('../../../packages/react/src/radio/index.md'), () => import('../../../packages/react/src/radio/index.zh_CN.md')),
  rate: ll(() => import('../../../packages/react/src/rate/index.md'), () => import('../../../packages/react/src/rate/index.zh_CN.md')),
  segmented: ll(() => import('../../../packages/react/src/segmented/index.md'), () => import('../../../packages/react/src/segmented/index.zh_CN.md')),
  slider: ll(() => import('../../../packages/react/src/slider/index.md'), () => import('../../../packages/react/src/slider/index.zh_CN.md')),
  splitButton: ll(() => import('../../../packages/react/src/split-button/index.md'), () => import('../../../packages/react/src/split-button/index.zh_CN.md')),
  switch: ll(() => import('../../../packages/react/src/switch/index.md'), () => import('../../../packages/react/src/switch/index.zh_CN.md')),
  tabs: ll(() => import('../../../packages/react/src/tabs/index.md'), () => import('../../../packages/react/src/tabs/index.zh_CN.md')),
  textarea: ll(() => import('../../../packages/react/src/textarea/index.md'), () => import('../../../packages/react/src/textarea/index.zh_CN.md')),
  timePicker: ll(() => import('../../../packages/react/src/time-picker/index.md'), () => import('../../../packages/react/src/time-picker/index.zh_CN.md')),
  transfer: ll(() => import('../../../packages/react/src/transfer/index.md'), () => import('../../../packages/react/src/transfer/index.zh_CN.md')),
  upload: ll(() => import('../../../packages/react/src/upload/index.md'), () => import('../../../packages/react/src/upload/index.zh_CN.md')),
  alert: ll(() => import('../../../packages/react/src/alert/index.md'), () => import('../../../packages/react/src/alert/index.zh_CN.md')),
  drawer: ll(() => import('../../../packages/react/src/drawer/index.md'), () => import('../../../packages/react/src/drawer/index.zh_CN.md')),
  loader: ll(() => import('../../../packages/react/src/loader/index.md'), () => import('../../../packages/react/src/loader/index.zh_CN.md')),
  loadingBar: ll(() => import('../../../packages/react/src/loading-bar/index.md'), () => import('../../../packages/react/src/loading-bar/index.zh_CN.md')),
  message: ll(() => import('../../../packages/react/src/message/index.md'), () => import('../../../packages/react/src/message/index.zh_CN.md')),
  modal: ll(() => import('../../../packages/react/src/modal/index.md'), () => import('../../../packages/react/src/modal/index.zh_CN.md')),
  notification: ll(() => import('../../../packages/react/src/notification/index.md'), () => import('../../../packages/react/src/notification/index.zh_CN.md')),
  popConfirm: ll(() => import('../../../packages/react/src/pop-confirm/index.md'), () => import('../../../packages/react/src/pop-confirm/index.zh_CN.md')),
  result: ll(() => import('../../../packages/react/src/result/index.md'), () => import('../../../packages/react/src/result/index.zh_CN.md')),
  scrollIndicator: ll(() => import('../../../packages/react/src/scroll-indicator/index.md'), () => import('../../../packages/react/src/scroll-indicator/index.zh_CN.md')),
  scrollNumber: ll(() => import('../../../packages/react/src/scroll-number/index.md'), () => import('../../../packages/react/src/scroll-number/index.zh_CN.md')),
  skeleton: ll(() => import('../../../packages/react/src/skeleton/index.md'), () => import('../../../packages/react/src/skeleton/index.zh_CN.md')),
  strengthIndicator: ll(() => import('../../../packages/react/src/strength-indicator/index.md'), () => import('../../../packages/react/src/strength-indicator/index.zh_CN.md')),
  backTop: ll(() => import('../../../packages/react/src/back-top/index.md'), () => import('../../../packages/react/src/back-top/index.zh_CN.md')),
  configProvider: ll(() => import('../../../packages/react/src/config-provider/index.md'), () => import('../../../packages/react/src/config-provider/index.zh_CN.md')),
  copyToClipboard: ll(() => import('../../../packages/react/src/copy-to-clipboard/index.md'), () => import('../../../packages/react/src/copy-to-clipboard/index.zh_CN.md')),
  keyboard: ll(() => import('../../../packages/react/src/keyboard/index.md'), () => import('../../../packages/react/src/keyboard/index.zh_CN.md')),
  sticky: ll(() => import('../../../packages/react/src/sticky/index.md'), () => import('../../../packages/react/src/sticky/index.zh_CN.md')),
  select: ll(() => import('../../../packages/react/src/select/index.md'), () => import('../../../packages/react/src/select/index.zh_CN.md')),
  speedDial: ll(() => import('../../../packages/react/src/speed-dial/index.md'), () => import('../../../packages/react/src/speed-dial/index.zh_CN.md')),
  anchor: ll(() => import('../../../packages/react/src/anchor/index.md'), () => import('../../../packages/react/src/anchor/index.zh_CN.md')),
  autoComplete: ll(() => import('../../../packages/react/src/auto-complete/index.md'), () => import('../../../packages/react/src/auto-complete/index.zh_CN.md')),
  inputOTP: ll(() => import('../../../packages/react/src/input-otp/index.md'), () => import('../../../packages/react/src/input-otp/index.zh_CN.md')),
  overlay: ll(() => import('../../../packages/react/src/overlay/index.md'), () => import('../../../packages/react/src/overlay/index.zh_CN.md')),
  waterfall: ll(() => import('../../../packages/react/src/waterfall/index.md'), () => import('../../../packages/react/src/waterfall/index.zh_CN.md')),
  chart: ll(() => import('../../../packages/charts/src/index.md'), () => import('../../../packages/charts/src/index.zh_CN.md')),
};

export const getGuideMenu = (s: SiteLocale): RouterItem[] => {
  const isZh = s.locale === 'zh_CN';
  return [
    {
      title: s.guideMenu.groups.overview,
      children: [
        { title: s.guideMenu.introduction, route: 'introduction', component: pick(guide.introduction, isZh) },
      ],
    },
    {
      title: s.guideMenu.groups.gettingStarted,
      children: [
        { title: s.guideMenu.getStarted, route: 'get-started', component: pick(guide.getStarted, isZh) },
        { title: s.guideMenu.useWithVite, route: 'use-with-vite', component: pick(guide.useWithVite, isZh) },
      ],
    },
    {
      title: s.guideMenu.groups.ai,
      children: [
        { title: s.guideMenu.mcpServer, route: 'mcp-server', component: pick(guide.mcpServer, isZh), tag: <Tag color="info">New</Tag> },
        { title: s.guideMenu.cli, route: 'cli', component: pick(guide.cli, isZh), tag: <Tag color="info">New</Tag> },
      ],
    },
    {
      title: s.guideMenu.groups.resources,
      children: [
        { title: s.guideMenu.changelog, route: 'changelog', component: pick(guide.changelog, isZh) },
        { title: s.guideMenu.faq, route: 'faq', component: pick(guide.faq, isZh) },
      ],
    },
  ];
};

export const getThemeMenu = (s: SiteLocale): RouterItem[] => {
  const isZh = s.locale === 'zh_CN';
  return [
    { title: s.themeMenu.customiseTheme, route: 'customise-theme', component: pick(guide.customiseTheme, isZh) },
    { title: s.themeMenu.colors, route: 'colors', component: pick(guide.colors, isZh) },
    { title: s.themeMenu.themeEditor, route: 'theme-editor', component: pick(guide.themeEditor, isZh) },
  ];
};

export const getComponentMenu = (s: SiteLocale): RouterItem[] => {
  const z = s.locale === 'zh_CN';
  return [
    {
      title: s.categories.foundation,
      children: [
        { title: 'Button', route: 'button', component: pick(c.button, z) },
        { title: 'Icon', route: 'icon', component: pick(c.icon, z) },
        { title: 'Image', route: 'image', component: pick(c.image, z) },
        { title: 'Link', route: 'link', component: pick(c.link, z) },
        { title: 'Typography', route: 'typography', component: pick(c.typography, z) },
      ],
    },
    {
      title: s.categories.layout,
      children: [
        { title: 'AspectRatio', route: 'aspect-ratio', component: pick(c.aspectRatio, z) },
        { title: 'Divider', route: 'divider', component: pick(c.divider, z) },
        { title: 'Flex', route: 'flex', component: pick(c.flex, z) },
        { title: 'Grid', route: 'grid', component: pick(c.grid, z) },
        { title: 'Layout', route: 'layout', component: pick(c.layout, z) },
        { title: 'Space', route: 'space', component: pick(c.space, z) },
        { title: 'Split', route: 'split', component: pick(c.split, z) },
        { title: 'Waterfall', route: 'waterfall', component: pick(c.waterfall, z) },
      ],
    },
    {
      title: s.categories.navigation,
      children: [
        { title: 'Anchor', route: 'anchor', component: pick(c.anchor, z) },
        { title: 'Breadcrumb', route: 'breadcrumb', component: pick(c.breadcrumb, z) },
        { title: 'Dropdown', route: 'dropdown', component: pick(c.dropdown, z) },
        { title: 'Menu', route: 'menu', component: pick(c.menu, z) },
        { title: 'Pagination', route: 'pagination', component: pick(c.pagination, z) },
        { title: 'SpeedDial', route: 'speed-dial', component: pick(c.speedDial, z) },
        { title: 'Steps', route: 'steps', component: pick(c.steps, z) },
      ],
    },
    {
      title: s.categories.dataDisplay,
      children: [
        { title: 'Avatar', route: 'avatar', component: pick(c.avatar, z) },
        { title: 'Badge', route: 'badge', component: pick(c.badge, z) },
        { title: 'Calendar', route: 'calendar', component: pick(c.calendar, z) },
        { title: 'Card', route: 'card', component: pick(c.card, z) },
        { title: 'Carousel', route: 'carousel', component: pick(c.carousel, z) },
        { title: 'Collapse', route: 'collapse', component: pick(c.collapse, z) },
        { title: 'Countdown', route: 'countdown', component: pick(c.countdown, z) },
        { title: 'Empty', route: 'empty', component: pick(c.empty, z) },
        { title: 'Descriptions', route: 'descriptions', component: pick(c.descriptions, z) },
        { title: 'Flip', route: 'flip', component: pick(c.flip, z) },
        { title: 'List', route: 'list', component: pick(c.list, z) },
        { title: 'Marquee', route: 'marquee', component: pick(c.marquee, z) },
        { title: 'Popover', route: 'popover', component: pick(c.popover, z) },
        { title: 'Progress', route: 'progress', component: pick(c.progress, z) },
        { title: 'ScrollNumber', route: 'scroll-number', component: pick(c.scrollNumber, z) },
        { title: 'Statistic', route: 'statistic', component: pick(c.statistic, z) },
        { title: 'Table', route: 'table', component: pick(c.table, z) },
        { title: 'Tag', route: 'tag', component: pick(c.tag, z) },
        { title: 'TextLoop', route: 'text-loop', component: pick(c.textLoop, z) },
        { title: 'Timeline', route: 'timeline', component: pick(c.timeline, z) },
        { title: 'Tooltip', route: 'tooltip', component: pick(c.tooltip, z) },
        { title: 'Tree', route: 'tree', component: pick(c.tree, z) },
        { title: 'Chart', route: 'chart', component: pick(c.chart, z), tag: <Tag color="info">New</Tag> },
      ],
    },
    {
      title: s.categories.formItem,
      children: [
        { title: 'Form', route: 'form', component: pick(c.form, z) },
        { title: 'AutoComplete', route: 'auto-complete', component: pick(c.autoComplete, z) },
        { title: 'Cascader', route: 'cascader', component: pick(c.cascader, z) },
        { title: 'Checkbox', route: 'checkbox', component: pick(c.checkbox, z) },
        { title: 'ColorPicker', route: 'color-picker', component: pick(c.colorPicker, z) },
        { title: 'DatePicker', route: 'date-picker', component: pick(c.datePicker, z) },
        { title: 'Input', route: 'input', component: pick(c.input, z) },
        { title: 'InputNumber', route: 'input-number', component: pick(c.inputNumber, z) },
        { title: 'InputPassword', route: 'input-password', component: pick(c.inputPassword, z) },
        { title: 'InputOTP', route: 'input-otp', component: pick(c.inputOTP, z) },
        { title: 'NativeSelect', route: 'native-select', component: pick(c.nativeSelect, z) },
        { title: 'Radio', route: 'radio', component: pick(c.radio, z) },
        { title: 'Rate', route: 'rate', component: pick(c.rate, z) },
        { title: 'Segmented', route: 'segmented', component: pick(c.segmented, z) },
        { title: 'Select', route: 'select', component: pick(c.select, z) },
        { title: 'Slider', route: 'slider', component: pick(c.slider, z) },
        { title: 'SplitButton', route: 'split-button', component: pick(c.splitButton, z) },
        { title: 'Switch', route: 'switch', component: pick(c.switch, z) },
        { title: 'Tabs', route: 'tabs', component: pick(c.tabs, z) },
        { title: 'Textarea', route: 'textarea', component: pick(c.textarea, z) },
        { title: 'TimePicker', route: 'time-picker', component: pick(c.timePicker, z) },
        { title: 'Transfer', route: 'transfer', component: pick(c.transfer, z) },
        { title: 'Upload', route: 'upload', component: pick(c.upload, z) },
      ],
    },
    {
      title: s.categories.feedback,
      children: [
        { title: 'Alert', route: 'alert', component: pick(c.alert, z) },
        { title: 'Drawer', route: 'drawer', component: pick(c.drawer, z) },
        { title: 'Loader', route: 'loader', component: pick(c.loader, z) },
        { title: 'Overlay', route: 'overlay', component: pick(c.overlay, z) },
        { title: 'LoadingBar', route: 'loading-bar', component: pick(c.loadingBar, z) },
        { title: 'Message', route: 'message', component: pick(c.message, z) },
        { title: 'Modal', route: 'modal', component: pick(c.modal, z) },
        { title: 'Notification', route: 'notification', component: pick(c.notification, z) },
        { title: 'PopConfirm', route: 'pop-confirm', component: pick(c.popConfirm, z) },
        { title: 'Result', route: 'result', component: pick(c.result, z) },
        { title: 'ScrollIndicator', route: 'scroll-indicator', component: pick(c.scrollIndicator, z) },
        { title: 'Skeleton', route: 'skeleton', component: pick(c.skeleton, z) },
        { title: 'StrengthIndicator', route: 'strength-indicator', component: pick(c.strengthIndicator, z) },
      ],
    },
    {
      title: s.categories.miscellany,
      children: [
        { title: 'BackTop', route: 'back-top', component: pick(c.backTop, z) },
        { title: 'ConfigProvider', route: 'config-provider', component: pick(c.configProvider, z) },
        { title: 'CopyToClipboard', route: 'copy-to-clipboard', component: pick(c.copyToClipboard, z) },
        { title: 'Keyboard', route: 'keyboard', component: pick(c.keyboard, z) },
        { title: 'Sticky', route: 'sticky', component: pick(c.sticky, z) },
      ],
    },
  ];
};
