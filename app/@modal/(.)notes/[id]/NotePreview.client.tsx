'use client';

import { useState } from 'react';
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';
import css from './NotePreview.module.css';

interface NotePreviewModalProps {
  id: number;
  dehydratedState: unknown;
}

export default function NotePreviewModal({
  id,
  dehydratedState,
}: NotePreviewModalProps) {
  const [queryClient] = useState(() => new QueryClient());
  const router = useRouter();

  const handleClose = () => router.back();

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>
        <Modal onClose={handleClose}>
          <NoteContent id={id} onClose={handleClose} />
        </Modal>
      </HydrationBoundary>
    </QueryClientProvider>
  );
}

interface NoteContentProps {
  id: number;
  onClose: () => void;
}

function NoteContent({ id, onClose }: NoteContentProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id,
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Note not found</p>;

  return (
    <div className={css.container}>
      <div className={css.header}>
        <h2>{data.title}</h2>
        <button onClick={onClose} className={css.backBtn}>
          ✖
        </button>
      </div>

      <div className={css.content}>
        {data.content.length > 150
          ? `${data.content.slice(0, 150)}...`
          : data.content}
      </div>

      <div className={css.footer}>
        <p className={css.date}>{new Date(data.createdAt).toLocaleString()}</p>
        <span className={css.tag}>{data.tag}</span>
        <button className={css.backBtn} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
