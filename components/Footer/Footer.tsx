import css from '@/components/Footer/Footer.module.css';

const Footer = () => {
  return (
    <footer className={css.footer} aria-label="Footer">
      <div>
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: Ihor D</p>
          <p>
            Contact us:
            <a href="mailto:avtosklokyiv@gmail.com"> Ihor D</a>
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
