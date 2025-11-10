import React, { type ReactNode } from "react";

interface FlexImageTextProps {
  imgSrc: string;
  imgAlt?: string;
  imgPosition?: "left" | "right";
  className?: string;
  children: ReactNode;
}

export const FlexImageText: React.FC<FlexImageTextProps> = ({
  imgSrc,
  imgAlt = "",
  imgPosition = "left",
  className = "",
  children,
}) => {
  const isRight = imgPosition === "right";

  return (
    <div className={`flex flex-col md:flex-row gap-4 md:items-start ${className}`}>
      {isRight ? (
        <>
          <div className="flex-1">{children}</div>
          <img src={imgSrc} alt={imgAlt} loading="lazy" decoding="async" className="rounded-lg w-full md:w-1/2 h-auto" />
        </>
      ) : (
        <>
          <img src={imgSrc} alt={imgAlt} loading="lazy" decoding="async" className="rounded-lg w-full md:w-1/2 h-auto" />
          <div className="flex-1">{children}</div>
        </>
      )}
    </div>
  );
};

export default FlexImageText;
