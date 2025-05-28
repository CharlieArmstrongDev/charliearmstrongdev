import React from "react";

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: "sm" | "md" | "lg";
}

const Card: React.FC<CardProps> = ({
  children,
  className = "",
  padding = "md",
}) => {
  const baseClasses = "bg-white rounded-lg border border-gray-200 shadow-sm";

  const paddingClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  const combinedClasses =
    `${baseClasses} ${paddingClasses[padding]} ${className}`.trim();

  return <div className={combinedClasses}>{children}</div>;
};

export default Card;
