export default function CursorChanger(props) {
  switch (props.option) {
    case "preview":
      return (
        <svg viewBox="6 2 12 13.5" className="PlayIcon ml-[1px]">
          <path d="M16.25 8.625L7.10317 2.52183V14.7282L16.25 8.625Z"></path>
        </svg>
      );
    case "trailer":
      return (
        <svg
          className="XIcon"
          xmlns="http://www.w3.org/2000/svg"
          fillRule="evenodd"
          clipRule="evenodd"
        >
          <path d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z" />
        </svg>
      );
    case "blank":
      return <span className="text-white font-DMSans text-[25%]">Loading</span>;
  }
}
