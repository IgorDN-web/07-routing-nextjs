import css from "./ErrorMessage.module.css";

interface ErrorMessageTextProps {
  message?: string;
}

export default function ErrorMessageText({ message }: ErrorMessageTextProps) {
  return (
    <div className={css.errorBox}>
      <p className={css.errorMessage}>{message || "Something went wrong"}</p>
    </div>
  );
}
