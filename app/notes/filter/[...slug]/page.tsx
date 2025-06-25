import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function NotesPage({ params }: PageProps) {
  const { slug } = await params;

  const tag = slug?.[0] ?? 'All';

  const initialData = await fetchNotes({
    page: 1,
    perPage: 12,
    tag: tag === 'All' ? undefined : tag,
  });

  return <NotesClient tag={tag} initialData={initialData} />;
}
