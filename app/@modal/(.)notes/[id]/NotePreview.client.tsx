'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';
import css from './NotePreview.module.css';

interface NotePreviewModalProps {
  id: number;
}

export default function NotePreviewModal({ id }: NotePreviewModalProps) {
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const handleClose = () => router.back();

  if (isLoading) return <Modal onClose={handleClose}>Loading...</Modal>;
  if (isError || !data)
    return <Modal onClose={handleClose}>Note not found</Modal>;

  return (
    <Modal onClose={handleClose}>
      <div className={css.container}>
        <div className={css.header}>
          <h2>{data.title}</h2>
          <button onClick={handleClose} className={css.backBtn}>
            ✖
          </button>
        </div>

        <div className={css.content}>
          {data.content.length > 150
            ? `${data.content.slice(0, 150)}...`
            : data.content}
        </div>

        <div className={css.footer}>
          <p className={css.date}>
            {new Date(data.createdAt).toLocaleString()}
          </p>
          <span className={css.tag}>{data.tag}</span>
        </div>
      </div>
    </Modal>
  );
}
