import React from "react";
import  getAssetUrl from "..//getAssetUrl";

interface MdxImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export const MdxImage: React.FC<MdxImageProps> = ({ src, alt, width, height, className }) => {
  // Example: support 1x/2x srcset automatically
  const src1x = getAssetUrl(src, { w: width});
  const src2x = width ? getAssetUrl(src, { w: width * 2 }) : undefined;

  return (
    <img
      src={src1x}
      srcSet={src2x ? `${src1x} 1x, ${src2x} 2x` : undefined}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      className={className}
      style={{ maxWidth: "100%", height: "auto" }}
    />
  );
};
