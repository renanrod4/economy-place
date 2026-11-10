import { ListingContent } from '@/components/listing/ListingContent';

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  return <ListingContent query={q ?? ''} />;
}