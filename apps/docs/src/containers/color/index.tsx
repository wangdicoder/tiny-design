import React from 'react';
import './color-page.scss';
import { useLocaleContext } from '../../context/locale-context';

type ColorCardProps = {
  name: string;
  hex: string;
  cssVar?: string;
  nameLabel: string;
  hexLabel: string;
};

const ColorCard = ({ name, hex, cssVar, nameLabel, hexLabel }: ColorCardProps): React.ReactElement => (
  <div className="color-card">
    <div
      className="color-card__header"
      style={{ backgroundColor: cssVar ? `var(${cssVar})` : hex }}
    />
    <div className="color-card__footer">
      <div>
        <p className="color-card__title">{nameLabel}</p>
        <p className="color-card__subtitle">{name}</p>
      </div>
      <div>
        <p className="color-card__title">{hexLabel}</p>
        <p className="color-card__subtitle">{hex}</p>
      </div>
    </div>
  </div>
);

const NEUTRALS = [
  { name: 'Gray 100', hex: '#f6f9fc' },
  { name: 'Gray 200', hex: '#e9ecef' },
  { name: 'Gray 300', hex: '#dee2e6' },
  { name: 'Gray 400', hex: '#ced4da' },
  { name: 'Gray 500', hex: '#adb5bd' },
  { name: 'Gray 600', hex: '#8898aa' },
  { name: 'Gray 700', hex: '#525f7f' },
  { name: 'Gray 800', hex: '#32325d' },
  { name: 'Gray 900', hex: '#212529' },
];

const ColorPage = (): React.ReactElement => {
  const { siteLocale: s } = useLocaleContext();

  return (
    <div className="color-page">
      <h1 className="markdown__heading-1">{s.color.title}</h1>
      <p className="markdown__p">{s.color.intro}</p>

      <h2 className="markdown__heading-2">{s.color.primaryTitle}</h2>
      <p className="markdown__p">{s.color.primaryDesc}</p>
      <div className="color-page__color-panel">
        <ColorCard name={s.color.primary} hex="#6e41bf" cssVar="--ty-color-primary" nameLabel={s.color.nameLabel} hexLabel={s.color.hexLabel} />
        <ColorCard name={s.color.info} hex="#1890ff" cssVar="--ty-color-info" nameLabel={s.color.nameLabel} hexLabel={s.color.hexLabel} />
        <ColorCard name={s.color.success} hex="#52c41a" cssVar="--ty-color-success" nameLabel={s.color.nameLabel} hexLabel={s.color.hexLabel} />
        <ColorCard name={s.color.warning} hex="#ff9800" cssVar="--ty-color-warning" nameLabel={s.color.nameLabel} hexLabel={s.color.hexLabel} />
        <ColorCard name={s.color.danger} hex="#f44336" cssVar="--ty-color-danger" nameLabel={s.color.nameLabel} hexLabel={s.color.hexLabel} />
      </div>

      <h2 className="markdown__heading-2">{s.color.neutralsTitle}</h2>
      <p className="markdown__p">{s.color.neutralsDesc}</p>

      <div className="code-table-container">
        <table className="color-page__table">
          <tbody>
            {NEUTRALS.map((color) => (
              <tr key={color.hex}>
                <td>
                  <span
                    className="color-page__color-block"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span>{color.name}</span>
                </td>
                <td>{color.hex}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ColorPage;
