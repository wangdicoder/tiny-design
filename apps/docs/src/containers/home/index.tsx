import React, { useMemo } from 'react';
import './home.scss';
import { useNavigate } from 'react-router-dom';
import { Button, Flex, Typography, Statistic, Card, Row, Col } from '@tiny-design/react';
import {
  IconColorlens, IconOrgUnit, IconPuzzle, IconAccessible,
  IconStar, IconStructure, IconProcess, IconEye, IconEditFile, IconFeedback,
  IconGithub,
} from '@tiny-design/icons';
import type { IconProps } from '@tiny-design/icons';
import { Footer } from './footer';
import { ThemeShowcase } from './theme-showcase';
import { useLocaleContext } from '../../context/locale-context';
import { getComponentMenu } from '../../routers';
import pkg from '../../../../../packages/react/package.json';
import reactLogoSvg from '../../assets/logo/react-logo.svg';
import logoSvg from '../../assets/logo/logo.svg';

const { repository } = pkg;

const HomePage = (): React.ReactElement => {
  const navigate = useNavigate();
  const { siteLocale: s } = useLocaleContext();

  const features: { Icon: React.FC<IconProps>; title: string; desc: string }[] = [
    { Icon: IconColorlens, title: s.home.features.themeable, desc: s.home.features.themeableDesc },
    { Icon: IconOrgUnit, title: s.home.features.elegant, desc: s.home.features.elegantDesc },
    { Icon: IconPuzzle, title: s.home.features.composable, desc: s.home.features.composableDesc },
    { Icon: IconAccessible, title: s.home.features.accessible, desc: s.home.features.accessibleDesc },
  ];

  const categoryIcons: React.FC<IconProps>[] = [IconStar, IconStructure, IconProcess, IconEye, IconEditFile, IconFeedback, IconPuzzle];

  const { stats, categories } = useMemo(() => {
    const menu = getComponentMenu(s);
    const totalComponents = menu.reduce((sum, cat) => sum + (cat.children?.length ?? 0), 0);
    const cats = menu.map((cat, i) => ({
      Icon: categoryIcons[i] ?? IconPuzzle,
      name: cat.title,
      count: cat.children?.length ?? 0,
      route: cat.children?.[0]?.route ?? '',
    }));
    return {
      stats: [
        { value: `${totalComponents}+`, label: s.home.stats.components },
        { value: String(menu.length), label: s.home.stats.categories },
        { value: '100%', label: s.home.stats.typescript },
        { value: 'MIT', label: s.home.stats.license },
      ],
      categories: cats,
    };
  }, [s]);

  return (
    <div className="home">
      <div className="home__react-login-container">
        <img
          src={reactLogoSvg}
          alt="react"
          className="home__react-logo"
        />
      </div>
      <div className="home__slider">
        <img src={logoSvg} alt="logo" className="home__logo" />
        <Typography.Heading level={1} className="home__title">Tiny UI</Typography.Heading>
        <Typography.Heading level={2} className="home__subtitle">{s.home.subtitle}</Typography.Heading>
        <Flex gap="sm" className="home__btn-group">
          <Button
            className="home__btn"
            btnType="primary"
            size="lg"
            onClick={() => navigate('/guide')}>
            {s.home.getStarted}
          </Button>
          <Button
            className="home__btn"
            size="lg"
            icon={<IconGithub color="currentColor" />}
            onClick={() => window.open(repository.url)}>
            {s.home.github}
          </Button>
        </Flex>
      </div>

      <ThemeShowcase />

      <div className="home__section">
        <Typography.Heading level={1} className="home__feature-title">{s.home.designPrinciple}</Typography.Heading>
        <Row gutter={[24, 24]} justify="center" className="home__features">
          {features.map((feature, i) => (
            <Col key={i} xs={12} sm={12} lg={6}>
              <Card bordered={false} className="home__feature-card" style={{ animationDelay: `${i * 0.1}s` }}>
                <Flex vertical align="center" gap="md">
                  <div className="home__feature-icon">
                    <feature.Icon size={24} />
                  </div>
                  <Typography.Heading level={3}>{feature.title}</Typography.Heading>
                  <Typography.Paragraph>{feature.desc}</Typography.Paragraph>
                </Flex>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <Flex justify="center" gap={60} wrap="wrap" className="home__stats">
        {stats.map((stat, i) => (
          <Statistic key={i} value={stat.value} title={stat.label} style={{ animationDelay: `${i * 0.1}s` }} />
        ))}
      </Flex>

      <div className="home__section">
        <Typography.Heading level={1} className="home__feature-title">{s.home.componentCategories}</Typography.Heading>
        <div className="home__categories">
          {categories.map((cat, i) => (
            <Card
              key={i}
              hoverable
              className="home__category"
              onClick={() => navigate(`/components/${cat.route}`)}
              style={{ animationDelay: `${i * 0.08}s` }}>
              <Flex vertical align="center" gap="sm">
                <cat.Icon size={32} color="currentColor" />
                <Typography.Text strong>{cat.name}</Typography.Text>
                <Typography.Text className="home__category-count">{s.home.nComponents(cat.count)}</Typography.Text>
              </Flex>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
