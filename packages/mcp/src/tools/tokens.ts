import type { TokenData } from '../types.js';
import tokensData from '../data/tokens.json';

const tokens = tokensData as TokenData;

export function getDesignTokens(category?: string): TokenData {
  if (category) {
    if (!(category in tokens)) return {} as TokenData;
    return { [category]: tokens[category] } as TokenData;
  }
  return tokens;
}
