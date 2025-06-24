import css from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: Ihor D</p>
          <p>
            Contact us:
            <a href="mailto:avtosklokyiv@gmail.com"> avtosklokyiv@gmail.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
