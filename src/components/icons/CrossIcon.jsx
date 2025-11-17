export const CrossIcon = ({ className = "" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="none"
      viewBox="0 0 32 32"
      className={`${className ? className : ""} fill-white`}
    >
      <path
        // fill="#fff"
        fillRule="evenodd"
        d="M25.133 8.604A1.228 1.228 0 0 0 23.4 6.867l-7.4 7.401-7.399-7.4a1.228 1.228 0 0 0-1.736 1.736l7.4 7.398-7.4 7.399A1.227 1.227 0 1 0 8.6 25.137l7.399-7.4 7.4 7.4a1.227 1.227 0 0 0 1.734-1.736l-7.4-7.399z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};
