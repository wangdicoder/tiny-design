import { notFound } from 'next/navigation';
import { getCategorySlugs, getCategoryInfo } from '../../../lib/categories';
import { CategoryPageClient } from './category-page-client';

export function generateStaticParams() {
  return getCategorySlugs().map((slug) => ({ category: slug }));
}

interface PageProps {
  params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const { category: slug } = await params;
  const info = getCategoryInfo(slug);
  if (!info) notFound();
  return <CategoryPageClient slug={slug} label={info.label} />;
}
