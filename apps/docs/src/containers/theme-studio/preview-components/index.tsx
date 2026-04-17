import React from 'react';
import { Flex } from '@tiny-design/react';
import type { ThemeEditorFields, ThemeEditorSection, ThemePreviewTemplate } from '../types';
import { CardsPreview } from './cards-preview';
import { DashboardPreview } from './dashboard-preview';
import { MailPreview } from './mail-preview';
import { PricingPreview } from './pricing-preview';

export function renderPreview(
  template: ThemePreviewTemplate,
  _fields: ThemeEditorFields,
  _section: ThemeEditorSection
): React.ReactElement {
  const content =
    template === 'dashboard' ? (
      <DashboardPreview />
    ) : template === 'mail' ? (
      <MailPreview />
    ) : template === 'pricing' ? (
      <PricingPreview />
    ) : (
      <CardsPreview />
    );

  return (
    <Flex vertical className="theme-studio__preview-stack">
      {content}
    </Flex>
  );
}
