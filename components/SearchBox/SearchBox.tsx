import css from "./SearchBox.module.css";

interface SearchBoxProps {
  onChange: (query: string) => void;
  inputValue: string;
}

export default function SearchBox({ onChange, inputValue }: SearchBoxProps) {
  function updateSearchQuery(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value);
  }

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      value={inputValue}
      onChange={updateSearchQuery}
    />
  );
}
