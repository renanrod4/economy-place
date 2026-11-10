import { ListingContent } from '@/components/listing/ListingContent';

export default async function ListingPage({ params }: { params: Promise<{ cat: string }> }) {
  const { cat } = await params;
  return <ListingContent cat={cat} />;
}