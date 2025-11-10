import { describe, it, expect } from "vitest";
import { getAllPosts, getPostBySlug } from "../src/mdx/loadMdxPosts";

describe("MDX Loader", () => {
  it("returns all posts with slug, desc, and date", () => {
    const posts = getAllPosts();
    expect(posts.length).toBeGreaterThan(0);

    posts.forEach((post) => {
      expect(post.slug).toBeDefined();
      expect(post.desc).toBeDefined();
      expect(post.date).toBeDefined();
    });
  });

  it("returns a post by slug with component and matching frontmatter", () => {
    const posts = getAllPosts();
    const slug = posts[0].slug;
    const post = getPostBySlug(slug);

    expect(post.Component).toBeDefined();
    expect(post.frontmatter.date).toBe(posts[0].date);
    expect(post.frontmatter.desc).toBe(posts[0].desc);
  });

  it("throws an error for invalid slug", () => {
    expect(() => getPostBySlug("non-existent-slug")).toThrowError(
      /Post not found/
    );
  });
}); 
/// nedn
