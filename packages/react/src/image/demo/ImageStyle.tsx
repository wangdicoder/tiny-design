import React from 'react';
import { Image, Radio, Select, Switch } from '@tiny-design/react';

const OBJECT_FIT_OPTIONS = ['cover', 'contain', 'fill', 'none', 'scale-down'] as const;

function createSvgDataUrl(svg: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg.trim())}`;
}

function createTallPoster(): string {
  return createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="180" height="540" viewBox="0 0 180 540" preserveAspectRatio="none">
      <rect width="180" height="540" rx="28" fill="#111827" />
      <rect width="180" height="180" fill="#0f766e" />
      <rect y="180" width="180" height="180" fill="#2563eb" />
      <rect y="360" width="180" height="180" fill="#7c3aed" />
      <rect x="18" y="18" width="144" height="504" rx="22" fill="none" stroke="rgba(255,255,255,0.72)" stroke-width="6" stroke-dasharray="16 10" />
      <line x1="28" y1="180" x2="152" y2="180" stroke="rgba(255,255,255,0.45)" stroke-width="5" />
      <line x1="28" y1="360" x2="152" y2="360" stroke="rgba(255,255,255,0.45)" stroke-width="5" />
      <circle cx="90" cy="270" r="34" fill="#f8fafc" fill-opacity="0.92" />
      <text x="90" y="84" text-anchor="middle" fill="white" font-size="28" font-family="Arial, sans-serif" font-weight="700">TOP</text>
      <text x="90" y="280" text-anchor="middle" fill="white" font-size="28" font-family="Arial, sans-serif" font-weight="700">CENTER</text>
      <text x="90" y="458" text-anchor="middle" fill="white" font-size="28" font-family="Arial, sans-serif" font-weight="700">BOTTOM</text>
    </svg>
  `);
}

function createStretchChart(): string {
  return createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240" preserveAspectRatio="none">
      <rect width="240" height="240" rx="28" fill="#082f49" />
      <rect x="18" y="18" width="204" height="204" rx="20" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="5" stroke-dasharray="12 8" />
      <path d="M30 120 H210" stroke="rgba(255,255,255,0.38)" stroke-width="4" />
      <path d="M120 30 V210" stroke="rgba(255,255,255,0.38)" stroke-width="4" />
      <circle cx="120" cy="120" r="62" fill="#facc15" fill-opacity="0.96" />
      <rect x="50" y="50" width="140" height="140" rx="18" fill="none" stroke="#f8fafc" stroke-width="8" />
      <path d="M52 52 L188 188" stroke="rgba(255,255,255,0.28)" stroke-width="5" />
      <path d="M188 52 L52 188" stroke="rgba(255,255,255,0.28)" stroke-width="5" />
      <text x="120" y="34" text-anchor="middle" fill="white" font-size="20" font-family="Arial, sans-serif" font-weight="700">CIRCLE</text>
      <text x="120" y="230" text-anchor="middle" fill="white" font-size="20" font-family="Arial, sans-serif" font-weight="700">SQUARE</text>
    </svg>
  `);
}

function createSmallBadge(): string {
  return createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="96" height="64" viewBox="0 0 96 64" preserveAspectRatio="none">
      <rect width="96" height="64" rx="16" fill="#c2410c" />
      <rect x="8" y="8" width="80" height="48" rx="10" fill="none" stroke="rgba(255,255,255,0.72)" stroke-width="4" stroke-dasharray="8 6" />
      <circle cx="48" cy="22" r="10" fill="#fdba74" />
      <path d="M18 50 L48 28 L78 50 Z" fill="#facc15" fill-opacity="0.96" />
      <text x="48" y="42" text-anchor="middle" fill="white" font-size="18" font-family="Arial, sans-serif" font-weight="700">96×64</text>
    </svg>
  `);
}

const focusOptions = [
  { label: 'Center', value: 'center center' },
  { label: 'Top section', value: 'center 15%' },
  { label: 'Bottom section', value: 'center 85%' },
];

const tallSrc = createTallPoster();
const chartSrc = createStretchChart();
const smallSrc = createSmallBadge();

const checkerboardStyle: React.CSSProperties = {
  boxShadow: '0 8px 24px rgba(15, 23, 42, 0.12)',
  backgroundColor: '#e2e8f0',
  backgroundImage:
    'linear-gradient(45deg, rgba(148, 163, 184, 0.18) 25%, transparent 25%), linear-gradient(-45deg, rgba(148, 163, 184, 0.18) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(148, 163, 184, 0.18) 75%), linear-gradient(-45deg, transparent 75%, rgba(148, 163, 184, 0.18) 75%)',
  backgroundSize: '18px 18px',
  backgroundPosition: '0 0, 0 9px, 9px -9px, -9px 0',
};

const captionStyle: React.CSSProperties = {
  fontSize: 12,
  color: '#64748b',
  lineHeight: 1.5,
};

export default function ImageStyleDemo() {
  const [objectFit, setObjectFit] = React.useState<(typeof OBJECT_FIT_OPTIONS)[number]>('cover');
  const [objectPosition, setObjectPosition] = React.useState('center center');
  const [round, setRound] = React.useState(false);
  const previewWidth = round ? 160 : 240;
  const previewHeight = round ? 160 : 120;

  return (
    <div style={{ display: 'grid', gap: 18 }}>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 16,
          padding: 16,
          border: '1px solid #e2e8f0',
          borderRadius: 12,
          background: '#f8fafc',
        }}
      >
        <div>
          <div style={{ marginBottom: 8, fontSize: 12, color: '#64748b', fontWeight: 600 }}>objectFit</div>
          <Radio.Group value={objectFit} onChange={(value) => setObjectFit(value as (typeof OBJECT_FIT_OPTIONS)[number])}>
            {OBJECT_FIT_OPTIONS.map((option) => (
              <Radio key={option} value={option}>
                {option}
              </Radio>
            ))}
          </Radio.Group>
        </div>

        <div style={{ minWidth: 200 }}>
          <div style={{ marginBottom: 8, fontSize: 12, color: '#64748b', fontWeight: 600 }}>Focal point</div>
          <Select value={objectPosition} onChange={(value) => setObjectPosition(String(value))} options={focusOptions} />
        </div>

        <div style={{ display: 'grid', gap: 8 }}>
          <div style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>Round preview</div>
          <Switch checked={round} onChange={setRound} />
        </div>
      </div>

      <div style={{ display: 'grid', gap: 8 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#64748b' }}>Interactive comparison</div>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <div style={{ fontSize: 12, color: '#64748b' }}>Tall graphic in a wide frame</div>
            <Image
              width={previewWidth}
              height={previewHeight}
              src={tallSrc}
              alt="Tall test graphic"
              objectFit={objectFit}
              round={round}
              imageStyle={{ objectPosition }}
              style={checkerboardStyle}
            />
            <div style={captionStyle}>
              Best for comparing <code>cover</code>, <code>contain</code>, <code>none</code>, and
              <code> scale-down</code>. Changing the focal point moves the visible band.
            </div>
          </div>

          <div style={{ display: 'grid', gap: 8 }}>
            <div style={{ fontSize: 12, color: '#64748b' }}>Square graphic in a wide frame</div>
            <Image
              width={previewWidth}
              height={previewHeight}
              src={chartSrc}
              alt="Square chart test graphic"
              objectFit={objectFit}
              round={round}
              style={checkerboardStyle}
            />
            <div style={captionStyle}>
              Best for spotting <code>fill</code>: <code>contain</code> keeps a centered square, while
              <code> fill</code> stretches the circle and square across the whole frame.
            </div>
          </div>

          <div style={{ display: 'grid', gap: 8 }}>
            <div style={{ fontSize: 12, color: '#64748b' }}>Small asset in a large frame</div>
            <Image
              width={previewWidth}
              height={previewHeight}
              src={smallSrc}
              alt="Small test graphic in a large frame"
              objectFit={objectFit}
              round={round}
              style={checkerboardStyle}
            />
            <div style={captionStyle}>
              Useful for seeing why <code>scale-down</code> often matches <code>none</code> when the source is
              already smaller than the frame.
            </div>
          </div>
        </div>
        <div style={{ color: '#64748b', fontSize: 13, lineHeight: 1.5 }}>
          Use the tall preview for crop behavior, the square preview for stretch behavior, and the small preview for
          <code> none</code> versus <code>scale-down</code>.
        </div>
      </div>
    </div>
  );
}
