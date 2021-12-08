const MenuIcon = ({ height, width, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height !== null ? `${height}` : "24"}
      width={width !== null ? `${width}` : "24"}
      fill={color !== null ? `${color}` : "currentColor"}
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
      />
    </svg>
  );
};

const HomeIcon = ({ height, width }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height !== null ? `${height}` : "24"}
      width={width !== null ? `${width}` : "24"}
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
      />
      <path
        fillRule="evenodd"
        d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
      />
    </svg>
  );
};

const OpenEye = ({ height, width, color, customClass }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height !== null ? `${height}` : "24"}
      width={width !== null ? `${width}` : "24"}
      fill={color !== null ? `${color}` : "currentColor"}
      viewBox="0 0 16 16"
      className={customClass}
    >
      <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
      <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
    </svg>
  );
};

const CloseEye = ({ height, width, customClass, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height !== null ? `${height}` : "24"}
      width={width !== null ? `${width}` : "24"}
      fill={color !== null ? `${color}` : "currentColor"}
      viewBox="0 0 16 16"
      className={customClass}
    >
      <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
      <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
    </svg>
  );
};

export { MenuIcon, HomeIcon, CloseEye, OpenEye };
