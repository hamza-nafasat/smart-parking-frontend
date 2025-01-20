import React from "react";

const AlertSideIcon = ({ alertType }) => {
  const color =
    alertType === "alert"
      ? "#FF8C00"
      : alertType === "notification"
      ? "#32CD32"
      : "#FF0000";
  return (
    <svg
      width="8"
      height="35"
      viewBox="0 0 8 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="8" height="8" rx="4" fill={color} />
      <path
        d="M4 8V34"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default AlertSideIcon;
