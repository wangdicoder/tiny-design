import ConfigProvider from './config-provider';
import { useConfig } from './config-context';

export type * from './types';
export type { ThemeConfig, ThemeDocument, ThemeDocumentTokens, ThemeTokenValue } from './token-utils';
export type { StaticConfig } from './static-config';
export default ConfigProvider;
export { useConfig };
