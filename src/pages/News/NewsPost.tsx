import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostBySlug } from "../../mdx/loadMdxPosts";
import NotFound from "../ErrorPage/NotFound";
import { NewsContent } from "../../mdx/Component/NewsContent";
import { Analytics } from "../../utils/Analytics";

interface MetaData {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  twitterCard?: string;
}

type NewsPostComponentProps = object;

interface Post {
  Component: React.ComponentType<NewsPostComponentProps>;
}

export default function NewsPost() {
  const { slug } = useParams<{ slug: string }>();
  const [meta, setMeta] = useState<MetaData | null>(null);
  const [post, setPost] = useState<Post | null>(null);
  const [notFound, setNotFound] = useState(false);

  // Load meta
  useEffect(() => {
    if (!slug) return;

    async function fetchMeta() {
      try {
        const res = await fetch(`/meta/${slug}.json`);
        if (!res.ok) throw new Error("Meta not found");
        const data: MetaData = await res.json();
        setMeta(data);
      } catch (err) {
        console.warn(err);
      }
    }

    fetchMeta();
  }, [slug]);
  useEffect(() => {
    Analytics.track({ type: "page_view", url: window.location.pathname });
    if (slug) Analytics.track({ type: "news_read", slug });
  }, [slug]);
  // Load post safely
  useEffect(() => {
    if (!slug) {
      setNotFound(true);
      return;
    }

    try {
      const fetchedPost = getPostBySlug(slug);
      setPost(fetchedPost);
    } catch {
      setNotFound(true);
    }
  }, [slug]);

  // Set meta tags
  useEffect(() => {
    if (!meta) return;

    document.title = meta.title;

    let metaDesc = document.querySelector("meta[name='description']") as HTMLMetaElement | null;
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = meta.description;

    let canonicalLink = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = meta.canonical;

    const ogTags: Record<string, string | undefined> = {
      "og:type": "article",
      "og:title": meta.title,
      "og:description": meta.description,
      "og:image": meta.ogImage,
      "og:url": meta.canonical,
    };
    Object.entries(ogTags).forEach(([property, content]) => {
      if (!content) return;
      let tag = document.querySelector(`meta[property='${property}']`) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("property", property);
        document.head.appendChild(tag);
      }
      tag.content = content;
    });

    const twitterTags: Record<string, string | undefined> = {
      "twitter:card": meta.twitterCard,
      "twitter:title": meta.title,
      "twitter:description": meta.description,
      "twitter:image": meta.ogImage,
    };
    Object.entries(twitterTags).forEach(([name, content]) => {
      if (!content) return;
      let tag = document.querySelector(`meta[name='${name}']`) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", name);
        document.head.appendChild(tag);
      }
      tag.content = content;
    });
  }, [meta]);

  if (notFound || !post) return <NotFound />;

  const { Component } = post;

  return (
    <div className="pt-25 px-4 md:px-6 xl:px-12 pb-12 overflow-auto">
      <div className="prose pt-15 prose-invert max-w-none">
        <NewsContent Component={Component} />
      </div>
    </div>
  );
}
