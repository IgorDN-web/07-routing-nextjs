import css from '@/app/notes/filter/LayoutNotes.module.css';

interface Props {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

export default function LayoutNotes({ children, sidebar }: Props) {
  return (
    <div className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <section className={css.notesWrapper}>{children}</section>
    </div>
  );
}
