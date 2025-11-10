// components/MDXAccessibilityChecker.tsx
import React, { useEffect } from "react";

type Props = { containerRef: React.RefObject<HTMLElement | null> };

export const MDXAccessibilityChecker: React.FC<Props> = ({ containerRef }) => {
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // 1. Check images
        const images = container.querySelectorAll("img");
        images.forEach((img) => {
            if (!img.alt || img.alt.trim() === "") {
                console.error(`[A11Y] Image missing alt: ${img.src}`);
            }
        });

        // 2. Check heading hierarchy
        const headings = Array.from(container.querySelectorAll("h1, h2, h3, h4, h5, h6"));
        let lastLevel = 0;
        headings.forEach((h) => {
            const level = parseInt(h.tagName[1]);
            if (lastLevel && level > lastLevel + 1) {
                console.error(
                    `[A11Y] Heading hierarchy skipped from h${lastLevel} to h${level}: "${h.textContent}"`
                );
            }
            lastLevel = level;
        });

        // 3. Check tables for headers
        const tables = container.querySelectorAll("table");
        tables.forEach((table) => {
            const th = table.querySelectorAll("th");
            if (th.length === 0) {
                console.error("[A11Y] Table missing headers");
            }
        });

        // 4. Check links for focusability
        const links = container.querySelectorAll("a");
        links.forEach((link) => {
            const href = link.getAttribute("href");
            if (!href || href.trim() === "") {
                console.error("[A11Y] Link has empty or missing href:", link);
            }

        });
    }, [containerRef]);

    return null;
};
