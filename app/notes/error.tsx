"use client";

import { useEffect } from "react";
import styles from "./NotesError.module.css";

type NotesErrorProps = {
  error: Error;
  reset: () => void;
};

export default function NotesError({ error, reset }: NotesErrorProps) {
  useEffect(() => {
    console.error("Error in /notes route:", error);
  }, [error]);

  return (
    <div className={styles.errorWrapper}>
      <h2 className={styles.title}>Oops! Something went wrong</h2>
      <p className={styles.message}>
        We couldn`t load your notes right now. Please try again later.
      </p>
      <p className={styles.techMessage}>{error.message}</p>
      <button className={styles.retryButton} onClick={reset}>
        Try again
      </button>
    </div>
  );
}
