import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Heading, Marquee, Paragraph } from '@tiny-design/react';
import {
  buildThemeDocumentFromDraft,
  getPresetDraft,
  inferPresetIdFromThemeDocument,
  THEME_EDITOR_PRESETS,
  type ThemeMode,
} from '../theme-studio/presets';
import {
  applyThemeDocumentToDOM,
  loadStoredThemeDocument,
  saveThemeDocument,
} from '../../utils/theme-persistence';
import { useLocaleContext } from '../../context/locale-context';

const PRESET_ID_KEY = 'ty-theme-preset-id';

function loadActivePresetId(): string {
  try {
    const storedTheme = loadStoredThemeDocument();
    if (storedTheme) {
      return inferPresetIdFromThemeDocument(storedTheme);
    }

    return localStorage.getItem(PRESET_ID_KEY) || 'default';
  } catch {
    return 'default';
  }
}

function getCurrentMode(): ThemeMode {
  if (typeof document === 'undefined') return 'light';
  return document.documentElement.getAttribute('data-tiny-theme') === 'dark' ? 'dark' : 'light';
}

export const ThemeShowcase = (): React.ReactElement => {
  const navigate = useNavigate();
  const { siteLocale: s } = useLocaleContext();
  const [activeId, setActiveId] = useState(loadActivePresetId);

  useEffect(() => {
    const syncActivePreset = () => setActiveId(loadActivePresetId());

    syncActivePreset();
    window.addEventListener('pageshow', syncActivePreset);
    document.addEventListener('visibilitychange', syncActivePreset);

    return () => {
      window.removeEventListener('pageshow', syncActivePreset);
      document.removeEventListener('visibilitychange', syncActivePreset);
    };
  }, []);

  const { row1, row2 } = useMemo(() => {
    const mid = Math.ceil(THEME_EDITOR_PRESETS.length / 2);
    return {
      row1: THEME_EDITOR_PRESETS.slice(0, mid),
      row2: THEME_EDITOR_PRESETS.slice(mid),
    };
  }, []);

  const handleSelect = (presetId: string) => {
    const themeDocument = buildThemeDocumentFromDraft(getPresetDraft(presetId, getCurrentMode()));
    setActiveId(presetId);
    saveThemeDocument(themeDocument);
    applyThemeDocumentToDOM(themeDocument, { respectThemeMode: true });

    try {
      localStorage.setItem(PRESET_ID_KEY, presetId);
    } catch {
      // ignore
    }
  };

  const handleOpenStudio = () => {
    navigate('/theme/theme-studio');
  };

  return (
    <div className="home__section home__theme-showcase">
      <Heading level={1} className="home__feature-title">
        {s.home.themeShowcase}
      </Heading>
      <Paragraph className="home__theme-showcase-desc">{s.home.themeShowcaseDesc}</Paragraph>

      <div className="home__marquee-container">
        <Marquee duration={50} pauseOnHover>
          {row1.map((preset) => (
            <button
              key={preset.id}
              className={`home__marquee-card${preset.id === activeId ? ' home__marquee-card_active' : ''}`}
              onClick={() => handleSelect(preset.id)}
              title={preset.name}
              style={
                preset.id === activeId
                  ? {
                      borderColor: preset.swatches[0],
                      boxShadow: `0 0 0 1px ${preset.swatches[0]}`,
                    }
                  : undefined
              }>
              <div className="home__marquee-swatches">
                {preset.swatches.map((color, index) => (
                  <span
                    key={`${preset.id}-${color}-${index}`}
                    className="home__marquee-swatch"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <span className="home__marquee-name">{preset.name}</span>
            </button>
          ))}
        </Marquee>
        <Marquee direction="right" duration={50} pauseOnHover>
          {row2.map((preset) => (
            <button
              key={preset.id}
              className={`home__marquee-card${preset.id === activeId ? ' home__marquee-card_active' : ''}`}
              onClick={() => handleSelect(preset.id)}
              title={preset.name}
              style={
                preset.id === activeId
                  ? {
                      borderColor: preset.swatches[0],
                      boxShadow: `0 0 0 1px ${preset.swatches[0]}`,
                    }
                  : undefined
              }>
              <div className="home__marquee-swatches">
                {preset.swatches.map((color, index) => (
                  <span
                    key={`${preset.id}-${color}-${index}`}
                    className="home__marquee-swatch"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <span className="home__marquee-name">{preset.name}</span>
            </button>
          ))}
        </Marquee>
      </div>

      <div className="home__theme-showcase-cta">
        <Button variant="link" color="primary" onClick={handleOpenStudio}>
          {s.home.themeShowcaseCustomize} &rarr;
        </Button>
      </div>
    </div>
  );
};
