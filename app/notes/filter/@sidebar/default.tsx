import Link from 'next/link';
import css from './SidebarNotes.module.css';
import { TAGS } from '@/lib/constants';

export default function SidebarNotes() {
  return (
    <nav aria-label="Sidebar note tags">
      <ul className={css.menuList}>
        {TAGS.map(tag => (
          <li key={tag} className={css.menuItem}>
            <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
