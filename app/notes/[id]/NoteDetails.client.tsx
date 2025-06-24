"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import css from "./NoteDetails.module.css";

export default function NoteDetailsClient() {
  const params = useParams();
  const idParam = params?.id;
  const id = Number(idParam);

  const isValidId = !isNaN(id) && id > 0;

  const {
    data: note,
    isLoading,
    error,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    enabled: isValidId, // виконується лише якщо id валідний
    refetchOnMount: false,
  });

  if (!isValidId) {
    return (
      <p className={css.errorMessage}>
        Invalid note ID: <code>{String(idParam)}</code>
      </p>
    );
  }

  if (isError) throw error;

  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    return date.toLocaleString("uk-UA", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div>
      {isLoading && <p className={css.loadMessage}>Loading, please wait...</p>}

      {!error && !note && !isLoading && (
        <p className={css.errorMessage}>Note not found.</p>
      )}

      {note && isSuccess && (
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
              <button className={css.editBtn}>Edit note</button>
            </div>
            <p className={css.content}>{note.content}</p>
            <p className={css.date}>
              {note.updatedAt
                ? `Updated at: ${formatDate(note.updatedAt)}`
                : `Created at: ${formatDate(note.createdAt)}`}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
