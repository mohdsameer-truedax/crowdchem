import React from "react";

// Define the shape of frontmatter (matching your MDX structure)
interface Frontmatter {
  id: number;
  date: string;
  desc: string;
  img: string;
  title: string;
  tags: string[];
  twitterCard: string;
}

// Define the MDX module interface
interface MDXModule {
  default: React.ComponentType;
  frontmatter: Frontmatter;
}

// Dynamically import all MDX files from /src/mdx/news
const modules: Record<string, MDXModule> = import.meta.glob(
  "/src/mdx/news/*.mdx",
  { eager: true }
) as Record<string, MDXModule>;

/**
 * Get all posts with their frontmatter metadata
 */
export function getAllPosts() {
  return Object.entries(modules).map(([path, mod]) => {
    const slug = path.split("/").pop()!.replace(".mdx", "");
    const { id, date, desc, img } = mod.frontmatter;
    return { slug, id, date, desc, img };
  });
}

/**
 * Get a single post by its slug (filename)
 */
export function getPostBySlug(slug: string) {
  const matchKey = Object.keys(modules).find((key) => key.includes(`${slug}.mdx`));
  if (!matchKey) throw new Error(`Post not found: ${slug}`);

  const mod = modules[matchKey];
  return { Component: mod.default, frontmatter: mod.frontmatter };
}
