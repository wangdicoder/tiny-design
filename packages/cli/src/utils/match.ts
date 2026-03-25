/**
 * Fuzzy component name matching with Levenshtein distance.
 */

function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }

  return dp[m][n];
}

function kebabToPascal(str: string): string {
  return str
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

export interface MatchResult {
  match: string | null;
  suggestion?: string;
}

/**
 * Find the best matching name from a list.
 * Priority: exact match > case-insensitive > kebab-to-pascal > substring > Levenshtein
 */
export function findBestMatch(input: string, candidates: string[]): MatchResult {
  // Exact match
  const exact = candidates.find((c) => c === input);
  if (exact) return { match: exact };

  // Case-insensitive
  const lower = input.toLowerCase();
  const caseMatch = candidates.find((c) => c.toLowerCase() === lower);
  if (caseMatch) return { match: caseMatch };

  // Kebab-case to PascalCase
  if (input.includes('-')) {
    const pascal = kebabToPascal(input);
    const kebabMatch = candidates.find((c) => c.toLowerCase() === pascal.toLowerCase());
    if (kebabMatch) return { match: kebabMatch };
  }

  // Substring match
  const substringMatches = candidates.filter((c) => c.toLowerCase().includes(lower));
  if (substringMatches.length === 1) return { match: substringMatches[0] };

  // Levenshtein distance
  let bestDist = Infinity;
  let bestCandidate = '';
  for (const c of candidates) {
    const dist = levenshtein(lower, c.toLowerCase());
    if (dist < bestDist) {
      bestDist = dist;
      bestCandidate = c;
    }
  }

  // Only suggest if distance is reasonable (less than half the input length)
  if (bestDist <= Math.max(2, Math.floor(input.length / 2))) {
    return { match: null, suggestion: bestCandidate };
  }

  return { match: null };
}
