'use client';

type Props = {
  error: Error;
  reset: () => void;
};

const NotesError = ({ error }: Props) => {
  return (
    <div>
      <p>Could not fetch the list of notes. {error.message}</p>
    </div>
  );
};
export default NotesError;
