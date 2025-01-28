type Props = {
  color: string;
  rotate?: string;
};

export const ArrowIcon: React.FC<Props> = ({ color, rotate = '0deg' }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: `rotate(${rotate})` }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.4715 3.52864C10.2111 3.26829 9.789 3.26829 9.52865 3.52864L5.52865 7.52864C5.2683 7.78899 5.2683 8.2111 5.52865 8.47145L9.52865 12.4714C9.789 12.7318 10.2111 12.7318 10.4715 12.4714C10.7318 12.2111 10.7318 11.789 10.4715 11.5286L6.94286 8.00004L10.4715 4.47145C10.7318 4.2111 10.7318 3.78899 10.4715 3.52864Z"
        fill={color}
      />
    </svg>
  );
};
