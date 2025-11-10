// AccessibleImage.tsx
import React from "react";

interface AccessibleImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  wrapper?: boolean; // Flag to enable wrapper div
  wrapperClassName?: string; // Custom wrapper classes
}

export const AccessibleImage: React.FC<AccessibleImageProps> = (props) => {
  const { alt, src, width, height, className, wrapper, wrapperClassName, ...restProps } = props;

  // Accessibility check for missing alt text
  if (!alt || alt.trim() === "") {
    console.error(`[MDX a11y] Missing alt attribute on image: ${src}`);
  }

  const imgElement = (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      className={`max-w-full h-auto my-4 rounded ${className || ""}`}
      {...restProps}
    />
  );

  // If wrapper is needed, wrap in div
  if (wrapper) {
    return (
      <div className={wrapperClassName || "flex justify-end"}>
        {imgElement}
      </div>
    );
  }

  return imgElement;
};