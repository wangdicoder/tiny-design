import { useEffect, useMemo, useState } from 'react';
import type { ThemeDocument } from '@tiny-design/react';
import { buildThemeDocumentFromSeeds, clearPendingThemeDocument, loadPendingThemeDocument, resolveThemeDocument } from '../../../utils/theme-document';
import { getPresetSeeds, PRESETS } from '../constants/presets';
import { getTokensForGroup, STUDIO_GROUPS, STUDIO_TOKENS } from '../utils/studio-registry';
import { loadFontFromValue } from '../utils/font-loader';

const DRAFT_KEY = 'ty-theme-studio-draft';

function loadDraft(): ThemeDocument | undefined {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    return raw ? JSON.parse(raw) as ThemeDocument : undefined;
  } catch {
    return undefined;
  }
}

function saveDraft(theme: ThemeDocument): void {
  localStorage.setItem(DRAFT_KEY, JSON.stringify(theme));
}

function getInitialThemeDocument(): ThemeDocument {
  const pending = loadPendingThemeDocument();
  if (pending) {
    clearPendingThemeDocument();
    return pending;
  }

  return loadDraft() ?? buildThemeDocumentFromSeeds({}, false);
}

export type StudioPreviewMode = 'foundation' | 'components' | 'templates';
export type StudioTemplateView = 'dashboard' | 'commerce' | 'settings';

export function useStudioState() {
  const [themeDocument, setThemeDocument] = useState<ThemeDocument>(getInitialThemeDocument);
  const [activeGroup, setActiveGroup] = useState<string>(STUDIO_GROUPS[0].id);
  const [selectedTokenKey, setSelectedTokenKey] = useState<string | undefined>();
  const [previewMode, setPreviewMode] = useState<StudioPreviewMode>('components');
  const [templateView, setTemplateView] = useState<StudioTemplateView>('dashboard');
  const [search, setSearch] = useState('');
  const [showChangedOnly, setShowChangedOnly] = useState(false);
  const [activePresetId, setActivePresetId] = useState<string>('default');

  useEffect(() => {
    saveDraft(themeDocument);
  }, [themeDocument]);

  useEffect(() => {
    const bodyFont = themeDocument.tokens?.semantic?.['font-family'];
    const monoFont = themeDocument.tokens?.semantic?.['font-family-monospace'];
    if (typeof bodyFont === 'string') loadFontFromValue(bodyFont);
    if (typeof monoFont === 'string') loadFontFromValue(monoFont);
  }, [themeDocument.tokens?.semantic]);

  const resolvedVars = useMemo(() => resolveThemeDocument(themeDocument), [themeDocument]);
  const groupTokens = useMemo(() => getTokensForGroup(activeGroup), [activeGroup]);
  const filteredTokens = useMemo(() => {
    return groupTokens.filter((token) => {
      const matchesSearch = search.trim().length === 0 ||
        token.key.toLowerCase().includes(search.toLowerCase()) ||
        token.description?.toLowerCase().includes(search.toLowerCase());

      if (!matchesSearch) return false;
      if (!showChangedOnly) return true;

      const semanticTokens = themeDocument.tokens?.semantic ?? {};
      const componentTokens = themeDocument.tokens?.components ?? {};
      return token.category === 'semantic'
        ? token.key in semanticTokens
        : token.key in componentTokens;
    });
  }, [groupTokens, search, showChangedOnly, themeDocument.tokens?.semantic, themeDocument.tokens?.components]);

  const groupCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const group of STUDIO_GROUPS) {
      counts[group.id] = STUDIO_TOKENS.filter((token) => {
        const matchesGroup = group.match(token);
        if (!matchesGroup) return false;
        if (search.trim().length === 0) return !showChangedOnly || (
          token.category === 'semantic'
            ? token.key in (themeDocument.tokens?.semantic ?? {})
            : token.key in (themeDocument.tokens?.components ?? {})
        );
        const matchesSearch = token.key.toLowerCase().includes(search.toLowerCase()) ||
          token.description?.toLowerCase().includes(search.toLowerCase());
        if (!matchesSearch) return false;
        if (!showChangedOnly) return true;
        return token.category === 'semantic'
          ? token.key in (themeDocument.tokens?.semantic ?? {})
          : token.key in (themeDocument.tokens?.components ?? {});
      }).length;
    }
    return counts;
  }, [search, showChangedOnly, themeDocument.tokens?.semantic, themeDocument.tokens?.components]);

  const selectedToken = useMemo(
    () => filteredTokens.find((token) => token.key === selectedTokenKey) ?? groupTokens[0],
    [filteredTokens, groupTokens, selectedTokenKey]
  );

  const changedCount = useMemo(() => {
    const semanticCount = Object.keys(themeDocument.tokens?.semantic ?? {}).length;
    const componentCount = Object.keys(themeDocument.tokens?.components ?? {}).length;
    return semanticCount + componentCount;
  }, [themeDocument.tokens?.semantic, themeDocument.tokens?.components]);

  useEffect(() => {
    if (!selectedTokenKey && groupTokens[0]) {
      setSelectedTokenKey(groupTokens[0].key);
    }
  }, [groupTokens, selectedTokenKey]);

  const setThemeMode = (mode: ThemeDocument['mode']) => {
    setThemeDocument((prev) => ({ ...prev, mode, extends: mode === 'dark' ? 'tiny-dark' : 'tiny-light' }));
  };

  const replaceThemeDocument = (nextTheme: ThemeDocument) => {
    setThemeDocument(nextTheme);
  };

  const updateMeta = (patch: Partial<NonNullable<ThemeDocument['meta']>>) => {
    setThemeDocument((prev) => ({
      ...prev,
      meta: {
        ...(prev.meta ?? {}),
        ...patch,
      },
    }));
  };

  const updateToken = (key: string, value: string) => {
    setThemeDocument((prev) => {
      const next = { ...prev, tokens: { semantic: { ...(prev.tokens?.semantic ?? {}) }, components: { ...(prev.tokens?.components ?? {}) } } };
      if (key.includes('.')) {
        next.tokens!.components![key] = value;
      } else {
        next.tokens!.semantic![key] = value;
      }
      return next;
    });
  };

  const resetToken = (key: string) => {
    setThemeDocument((prev) => {
      const next = { ...prev, tokens: { semantic: { ...(prev.tokens?.semantic ?? {}) }, components: { ...(prev.tokens?.components ?? {}) } } };
      if (key.includes('.')) {
        delete next.tokens!.components![key];
      } else {
        delete next.tokens!.semantic![key];
      }
      return next;
    });
  };

  const resetAll = () => {
    setThemeDocument((prev) => ({
      ...prev,
      tokens: { semantic: {}, components: {} },
    }));
  };

  const applyPreset = (presetId: string) => {
    const preset = PRESETS.find((item) => item.id === presetId);
    if (!preset) return;
    const isDark = themeDocument.mode === 'dark';
    setThemeDocument(buildThemeDocumentFromSeeds(getPresetSeeds(preset, isDark), isDark));
    setActivePresetId(presetId);
  };

  const getTokenValue = (key: string, cssVar: string, defaultValue: string): string => {
    const explicit = key.includes('.')
      ? themeDocument.tokens?.components?.[key]
      : themeDocument.tokens?.semantic?.[key];
    if (explicit != null) return String(explicit);
    return resolvedVars[cssVar] ?? defaultValue;
  };

  return {
    themeDocument,
    replaceThemeDocument,
    setThemeMode,
    updateMeta,
    resolvedVars,
    activeGroup,
    setActiveGroup,
    previewMode,
    setPreviewMode,
    templateView,
    setTemplateView,
    search,
    setSearch,
    showChangedOnly,
    setShowChangedOnly,
    filteredTokens,
    groupCounts,
    changedCount,
    selectedToken,
    setSelectedTokenKey,
    updateToken,
    resetToken,
    resetAll,
    activePresetId,
    applyPreset,
    getTokenValue,
  };
}
