import React, { useMemo } from 'react';
import './component-overview.scss';
import { useNavigate } from 'react-router-dom';
import { getComponentMenu } from '../../routers';
import { useLocaleContext } from '../../context/locale-context';
import { getComponentIcon } from './component-icons';

const ComponentOverview = () => {
  const navigate = useNavigate();
  const { siteLocale: s } = useLocaleContext();
  const componentMenu = useMemo(() => getComponentMenu(s), [s]);
  const numOfComps = componentMenu.reduce((res, i) => {
    res += i.children!.length;
    return res;
  }, 0);

  return (
    <div className="component-overview">
      <h1 className="component-overview__title">{s.overview.title}</h1>
      <p className="component-overview__desc">{s.overview.desc(numOfComps)}</p>
      {componentMenu.map((router) => (
        <div key={router.title} className="component-overview__category">
          <div className="component-overview__category-header">
            <h3 className="component-overview__category-title">{router.title}</h3>
            <span className="component-overview__category-count">{router.children?.length}</span>
          </div>
          <div className="component-overview__grid">
            {router.children!.map((item) => (
              <button
                className="component-overview__card"
                key={item.route}
                onClick={() => navigate(`/components/${item.route!}`)}>
                <span className="component-overview__card-icon">
                  {getComponentIcon(item.route!)}
                </span>
                <span className="component-overview__card-name">{item.title}</span>
                <svg className="component-overview__card-arrow" width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ComponentOverview;
