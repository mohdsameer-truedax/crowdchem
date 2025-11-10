import React, { useRef } from "react";
import { MDXErrorBoundary } from "../../mdx/MDXErrorBoundary";
import { MDXAccessibilityChecker } from "../../mdx/MDXAccessibilityChecker";
import { AccessibleImage } from "./Image";
import { MdxImage } from "./MdxImage";
import { getElementId, getHeadingId } from "../utils/mdx-utils";

interface NewsContentProps {
  Component: React.ComponentType<{ components?: Record<string, React.ElementType> }>;
  filePath?: string;
}

type MDXComponents = Record<string, React.ElementType>;


// ✅ Tailwind-based MDX component styling + semantic preservation
const components: MDXComponents = {
  // Headings (preserve anchors/IDs)
  h1: ({ id, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const headingId = id || getHeadingId(children);
    return (
      <h1
        id={headingId}
        className="text-4xl font-bold mb-4 text-black scroll-mt-24"
        {...props}
      >
        {children}
      </h1>
    );
  },
  h2: ({ id, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const headingId = id || getHeadingId(children);
    return (
      <h2
        id={headingId}
        className="text-3xl font-semibold mb-4 text-black scroll-mt-24"
        {...props}
      >
        {children}
      </h2>
    );
  },
  h3: ({ id, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const headingId = id || getHeadingId(children);
    return (
      <h3
        id={headingId}
        className="text-2xl font-semibold mb-3 text-black scroll-mt-24"
        {...props}
      >
        {children}
      </h3>
    );
  },
  h4: ({ id, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const headingId = id || getHeadingId(children);
    return (
      <h4
        id={headingId}
        className="text-xl font-medium mb-3 text-black scroll-mt-24"
        {...props}
      >
        {children}
      </h4>
    );
  },
  h5: ({ id, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const headingId = id || getHeadingId(children);
    return (
      <h5
        id={headingId}
        className="text-lg font-medium mb-2 text-black scroll-mt-24"
        {...props}
      >
        {children}
      </h5>
    );
  },
  h6: ({ id, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const headingId = id || getHeadingId(children);
    return (
      <h6
        id={headingId}
        className="text-base font-medium mb-2 text-black scroll-mt-24"
        {...props}
      >
        {children}
      </h6>
    );
  },

  // Paragraphs
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => {
    const id = getElementId(children);
    return (
      <p id={id} className="text-base md:text-lg leading-relaxed mb-4 text-gray-800" {...props}>
        {children}
      </p>
    );
  },

  // Inline formatting
  strong: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => {
    const id = getElementId(children);
    return (
      <strong id={id} className="font-bold" {...props}>
        {children}
      </strong>
    );
  },
  em: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => {
    const id = getElementId(children);
    return (
      <em id={id} className="italic" {...props}>
        {children}
      </em>
    );
  },
  del: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => {
    const id = getElementId(children);
    return (
      <del id={id} className="line-through" {...props}>
        {children}
      </del>
    );
  },
  code: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => {
    const id = getElementId(children);
    return (
      <code id={id} className="bg-gray-100 px-1 rounded text-sm font-mono text-gray-900" {...props}>
        {children}
      </code>
    );
  },
  pre: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => {
    const id = getElementId(children);
    return (
      <pre id={id} className="bg-gray-100 p-4 rounded overflow-x-auto mb-4 text-sm font-mono" {...props}>
        {children}
      </pre>
    );
  },

  // Lists
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => {
    const id = getElementId(children);
    return (
      <ul id={id} className="list-disc list-inside mb-4 pl-4" {...props}>
        {children}
      </ul>
    );
  },
  ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => {
    const id = getElementId(children);
    return (
      <ol id={id} className="list-decimal list-inside mb-4 pl-4" {...props}>
        {children}
      </ol>
    );
  },
  li: ({ children, ...props }: React.LiHTMLAttributes<HTMLLIElement>) => {
    const id = getElementId(children);
    return (
      <li id={id} className="mb-2 text-base md:text-lg text-gray-800" {...props}>
        {children}
      </li>
    );
  },

  // Input
  input: (props: React.InputHTMLAttributes<HTMLInputElement>) => {
    const id = props.id || getElementId(props.value || props.placeholder);
    return props.type === "checkbox" ? (
      <input id={id} type="checkbox" className="mr-2 accent-blue-600" {...props} />
    ) : (
      <input id={id} {...props} />
    );
  },

  // Blockquote & HR
  blockquote: ({ children, ...props }: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => {
    const id = getElementId(children);
    return (
      <blockquote id={id} className="border-l-4 border-gray-300 pl-4 italic mb-4 text-gray-700" {...props}>
        {children}
      </blockquote>
    );
  },
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => {
    const id = getElementId("");
    return (
      <hr id={id} className="border-t border-gray-300 my-6" {...props} />
    );
  },

  // Tables
  table: ({ children, ...props }: React.TableHTMLAttributes<HTMLTableElement>) => {
    const id = getElementId(children);
    return (
      <table id={id} className="table-auto border-collapse border border-gray-300 mb-4 w-full" {...props}>
        {children}
      </table>
    );
  },
  thead: ({ children, ...props }: React.TableHTMLAttributes<HTMLTableSectionElement>) => {
    const id = getElementId(children);
    return (
      <thead id={id} className="bg-gray-100" {...props}>
        {children}
      </thead>
    );
  },
  tbody: ({ children, ...props }: React.TableHTMLAttributes<HTMLTableSectionElement>) => {
    const id = getElementId(children);
    return (
      <tbody id={id} {...props}>
        {children}
      </tbody>
    );
  },
  th: ({ children, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) => {
    const id = getElementId(children);
    return (
      <th id={id} className="border border-gray-300 px-4 py-2 bg-gray-200 text-left font-semibold" {...props}>
        {children}
      </th>
    );
  },
  td: ({ children, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) => {
    const id = getElementId(children);
    return (
      <td id={id} className="border border-gray-300 px-4 py-2 text-left" {...props}>
        {children}
      </td>
    );
  },
  tr: ({ children, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => {
    const id = getElementId(children);
    return (
      <tr id={id} className="hover:bg-gray-50" {...props}>
        {children}
      </tr>
    );
  },

  // Links
  a: ({ href = "", children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const id = getElementId(children);
    const isExternal = href.startsWith("http");
    return (
      <a
        id={id}
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="text-blue-600 hover:text-blue-700 underline"
        {...props}
      >
        {children}
      </a>
    );
  },

  // Images
  img: MdxImage,
  AccessibleImage: AccessibleImage,

  // Other semantic
  small: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => {
    const id = getElementId(children);
    return (
      <small id={id} className="text-sm text-gray-500" {...props}>
        {children}
      </small>
    );
  },
  sub: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => {
    const id = getElementId(children);
    return (
      <sub id={id} {...props}>
        {children}
      </sub>
    );
  },
  sup: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => {
    const id = getElementId(children);
    return (
      <sup id={id} {...props}>
        {children}
      </sup>
    );
  },

  // Embeds
  iframe: (props: React.IframeHTMLAttributes<HTMLIFrameElement>) => {
    const id = props.id || getElementId(props.title || "iframe");
    return (
      <iframe id={id} className="w-full rounded-md my-4 aspect-video" allowFullScreen {...props} />
    );
  },
  video: (props: React.VideoHTMLAttributes<HTMLVideoElement>) => {
    const id = props.id || getElementId(props.title || "video");
    return (
      <video id={id} className="w-full rounded-md my-4" controls {...props} />
    );
  },

  // Admonition blocks
  div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    const id = props.id || getElementId(children);
    if (props.className?.includes("admonition")) {
      const type = props.className.match(/admonition-(\w+)/)?.[1] ?? "note";
      return (
        <div
          id={id}
          className={`border-l-4 p-4 my-4 rounded-md ${
            type === "warning"
              ? "border-yellow-500 bg-yellow-50"
              : type === "danger"
              ? "border-red-500 bg-red-50"
              : "border-blue-500 bg-blue-50"
          }`}
          {...props}
        >
          {children}
        </div>
      );
    }
    return <div id={id} {...props} />;
  },

  // Custom MDX component
  FlexImageText: ({
    imgSrc,
    imgAlt = "",
    imgPosition = "left",
    className = "",
    children,
  }: {
    imgSrc: string;
    imgAlt?: string;
    imgPosition?: "left" | "right";
    className?: string;
    children: React.ReactNode;
  }) => {
    const isRight = imgPosition === "right";
    const id = getElementId(children);
    return (
      <div id={id} className={`flex flex-col md:flex-row gap-4 md:items-start ${className}`}>
        {isRight ? (
          <>
            <div className="flex-1">{children}</div>
            <img src={imgSrc} alt={imgAlt} className="rounded-lg w-full md:w-1/2 h-auto" />
          </>
        ) : (
          <>
            <img src={imgSrc} alt={imgAlt} className="rounded-lg w-full md:w-1/2 h-auto" />
            <div className="flex-1">{children}</div>
          </>
        )}
      </div>
    );
  },

  // Alert component
  Alert: ({
    type = "info",
    children,
    className = "",
  }: {
    type?: "info" | "error";
    children: React.ReactNode;
    className?: string;
  }) => {
    const id = getElementId(children);
    return (
      <div
        id={id}
        className={`p-4 rounded border ${
          type === "error"
            ? "border-red-400 bg-red-50"
            : "border-blue-400 bg-blue-50"
        } ${className}`}
      >
        {children}
      </div>
    );
  },

  // Footnotes
  supFootnote: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => {
    const id = getElementId(children);
    return (
      <sup id={id} className="text-xs text-blue-500" {...props}>
        {children}
      </sup>
    );
  },
};

export const NewsContent: React.FC<NewsContentProps> = ({
  Component,
  filePath = "unknown",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <MDXErrorBoundary filePath={filePath}>
      <div ref={containerRef}>
        <Component components={components} />
        <MDXAccessibilityChecker containerRef={containerRef} />
      </div>
      
    </MDXErrorBoundary>
  );
};
