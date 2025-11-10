// src/mdx/mdx-utils.ts
import React from "react";

export function textToSlug(text: string) {
  const limited = text.split(/\s+/).slice(0, 2).join(" ");
  return limited
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
}

export function reactNodeToText(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (typeof children === "number") return children.toString();
  if (Array.isArray(children)) return children.map(reactNodeToText).join(" ");

  // Check if it's a valid React element
  if (React.isValidElement(children)) {
    // Narrow props type
    const element = children as React.ReactElement<{ children?: React.ReactNode }>;
    return reactNodeToText(element.props.children);
  }

  return "";
}

export function getElementId(children: React.ReactNode) {
  return textToSlug(reactNodeToText(children));
}

export function getHeadingId(children: React.ReactNode) {
  return textToSlug(reactNodeToText(children));
}
