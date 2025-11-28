"use client";

import { useRouter } from "next/navigation";
import React from "react";

type ButtonNavigateProps = {
  href?: string; 
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

const ButtonNavigate: React.FC<ButtonNavigateProps> = ({
  href,
  className = "",
  children = "ボタン",
  disabled = false,
  type = "button",
}) => {
  const router = useRouter();

  const handleClick = () => {
    if (disabled) return;
    if (href) router.push(href);
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={className}
    >
      {children}
    </button>
  );
};

export default ButtonNavigate;
