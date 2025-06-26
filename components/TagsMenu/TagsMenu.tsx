'use client';

import { useState } from 'react';
import css from './TagsMenu.module.css';
import { TAGS } from '@/lib/constants';
import Link from 'next/link';

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(prev => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className={css.menuContainer}>
      <button
        className={css.menuButton}
        onClick={toggleMenu}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls="tags-menu"
      >
        Notes ▾
      </button>

      {isOpen && (
        <ul
          id="tags-menu"
          role="menu"
          className={css.menuList}
          aria-label="Tag filter menu"
        >
          {TAGS.map(tag => (
            <li key={tag} role="none" className={css.menuItem}>
              <Link
                href={`/notes/filter/${tag}`}
                role="menuitem"
                className={css.menuLink}
                onClick={closeMenu}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
