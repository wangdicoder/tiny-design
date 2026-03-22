import React, { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, Marquee } from '@tiny-design/react';
import { useTheme } from '@tiny-design/react';
import { PRESETS, getPresetSeeds, ThemePreset } from '../theme-editor/constants/presets';
import { applyThemeToDOM, saveSeeds } from '../../utils/theme-persistence';
import { useLocaleContext } from '../../context/locale-context';

const PRESET_ID_KEY = 'ty-theme-preset-id';

function loadActivePresetId(): string {
  try {
    return localStorage.getItem(PRESET_ID_KEY) || 'default';
  } catch {
    return 'default';
  }
}

interface PresetCardProps {
  preset: ThemePreset;
  isActive: boolean;
  isZh: boolean;
  onClick: () => void;
}

const PresetCard = ({ preset, isActive, isZh, onClick }: PresetCardProps): React.ReactElement => (
  <button
    className={`home__marquee-card${isActive ? ' home__marquee-card_active' : ''}`}
    onClick={onClick}
    title={isZh ? preset.nameZh : preset.name}
    style={
      isActive
        ? { borderColor: preset.swatches[0], boxShadow: `0 0 0 1px ${preset.swatches[0]}` }
        : undefined
    }
  >
    <div className="home__marquee-swatches">
      {preset.swatches.map((color, i) => (
        <span key={i} className="home__marquee-swatch" style={{ backgroundColor: color }} />
      ))}
    </div>
    <span className="home__marquee-name">{isZh ? preset.nameZh : preset.name}</span>
  </button>
);

export const ThemeShowcase = (): React.ReactElement => {
  const navigate = useNavigate();
  const { siteLocale: s } = useLocaleContext();
  const isZh = s.locale === 'zh_CN';
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const [activeId, setActiveId] = useState(loadActivePresetId);

  const handleSelect = useCallback(
    (preset: ThemePreset) => {
      const lightSeeds = getPresetSeeds(preset, false);
      const darkSeeds = preset.darkSeeds ?? undefined;
      const currentSeeds = getPresetSeeds(preset, isDark);

      applyThemeToDOM(currentSeeds, isDark);
      saveSeeds(lightSeeds, darkSeeds);

      setActiveId(preset.id);
      try {
        localStorage.setItem(PRESET_ID_KEY, preset.id);
      } catch {
        // ignore
      }
    },
    [isDark]
  );

  // Split presets into two rows
  const { row1, row2 } = useMemo(() => {
    const mid = Math.ceil(PRESETS.length / 2);
    return {
      row1: PRESETS.slice(0, mid),
      row2: PRESETS.slice(mid),
    };
  }, []);

  return (
    <div className="home__section home__theme-showcase">
      <Typography.Heading level={1} className="home__feature-title">
        {s.home.themeShowcase}
      </Typography.Heading>
      <Typography.Paragraph className="home__theme-showcase-desc">
        {s.home.themeShowcaseDesc}
      </Typography.Paragraph>

      <div className="home__marquee-container">
        <Marquee duration={50} pauseOnHover>
          {row1.map((preset) => (
            <PresetCard
              key={preset.id}
              preset={preset}
              isActive={preset.id === activeId}
              isZh={isZh}
              onClick={() => handleSelect(preset)}
            />
          ))}
        </Marquee>
        <Marquee direction="right" duration={50} pauseOnHover>
          {row2.map((preset) => (
            <PresetCard
              key={preset.id}
              preset={preset}
              isActive={preset.id === activeId}
              isZh={isZh}
              onClick={() => handleSelect(preset)}
            />
          ))}
        </Marquee>
      </div>

      <div className="home__theme-showcase-cta">
        <Button btnType="link" onClick={() => navigate('/theme/theme-editor')}>
          {s.home.themeShowcaseCustomize} &rarr;
        </Button>
      </div>
    </div>
  );
};
