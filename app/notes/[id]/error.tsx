"use client";

import { useEffect } from "react";

type NoteDetailsErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function NoteDetailsError({ error, reset }: NoteDetailsErrorProps) {
  useEffect(() => {
    console.error("Error in /notes/[id] route:", error);
  }, [error]);

  return (
    <div>
      <p>Could not fetch note details. {error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
}