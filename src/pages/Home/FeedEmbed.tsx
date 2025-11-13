import React from 'react';
import { useEffect, useState, useMemo, useRef } from "react";
import { useTranslation } from '../../i18n/TranslationContext';
import { XEmbed, LinkedInEmbed } from 'react-social-media-embed'; 
// Assuming this function returns the array of social media posts
import { getAllPosts as getSocialPosts } from '../../data/LatestUpdates';

/**
 * Interface for the social media feed item. 
 * NOTE: The 'slug' field remains for data structure consistency, but is unused for navigation.
 */
interface FeedItem {
    slug: string;
    id: number;
    date: string;
    type: 'twitter' | 'linkedin';
    caption: string;
    url: string;
    publicUrl?: string;
}

// --- Helper Component to Handle Rendering Embeds ---
interface EmbedProps {
    type: FeedItem['type'];
    url: string;
}

const EmbedContainer: React.FC<EmbedProps> = ({ type, url }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const embedWrapperClasses = "w-full h-48 md:h-[25.375rem] sm:p-2 flex items-center justify-center overflow-hidden radius-[1rem] sm:rounded-3xl";
    const embedInnerStyles = { height: '100%', width: '100%', maxWidth: '550px' };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [isVisible]);

    if (!url) return null;

    switch (type) {
        case 'twitter':
            return (
                <div ref={ref} className={embedWrapperClasses}>
                    {isVisible && <XEmbed url={url} style={embedInnerStyles} />}
                </div>
            );
        case 'linkedin':
            return (
                <div ref={ref} className={embedWrapperClasses}>
                    {isVisible && <LinkedInEmbed url={url} style={embedInnerStyles} height={400} width="100%" />}
                </div>
            );
        default:
            return <div className={embedWrapperClasses}><p className="text-gray-500">Unsupported Post Type: {type}</p></div>;
    }
}


const FeedEmbed = () => {
    const { t } = useTranslation();
    const [socialData, setSocialData] = useState<FeedItem[]>([]); 
    const [isPaused, setIsPaused] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const startXRef = useRef(0);
    const scrollOffsetRef = useRef(0);
    const isDraggingRef = useRef(false);
    // ✅ NEW HELPER: Calculates time ago without external packages
    const timeAgo = (dateString: string): string => {
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
        let interval = seconds / 31536000; // Years
        
        if (interval > 1) {
            return Math.floor(interval) + "y ago";
        }
        interval = seconds / 2592000; // Months
        if (interval > 1) {
            return Math.floor(interval) + "mo ago";
        }
        interval = seconds / 86400; // Days
        if (interval > 1) {
            return Math.floor(interval) + "d ago";
        }
        interval = seconds / 3600; // Hours
        if (interval > 1) {
            return Math.floor(interval) + "h ago";
        }
        interval = seconds / 60; // Minutes
        if (interval > 1) {
            return Math.floor(interval) + "m ago";
        }
        // Handle future dates (e.g., if the current time is before the post date)
        if (seconds < 0) {
            return "soon"; 
        }

        return "just now";
    };

    // ✅ Memoize and sort posts
    const sortedPosts = useMemo(() => {
        // Get all posts from the data source and filter out posts without URLs
        return getSocialPosts
            .filter(post => (post.type === 'twitter' || post.type === 'linkedin') && post.url)
            .map(post => ({ ...post, url: post.url! })) // Type assertion since we filtered out undefined URLs
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            
    }, []); 

    
    useEffect(() => {
        setSocialData(sortedPosts);
    }, [sortedPosts]);

    // ✅ Truncate helper
    const truncateWords = (text: string, limit = 10) => {
        const words = text.trim().split(/\s+/);
        return words.length > limit
            ? words.slice(0, limit).join(" ") + "..."
            : text;
    };

    // Swipe handlers
    const handleMouseDown = (e: React.MouseEvent) => {
        isDraggingRef.current = true;
        setIsPaused(true);
        startXRef.current = e.pageX;
        if (containerRef.current?.firstElementChild) {
            const transform = window.getComputedStyle(containerRef.current.firstElementChild as Element).transform;
            if (transform !== 'none') {
                const matrix = new DOMMatrix(transform);
                scrollOffsetRef.current = matrix.m41;
            }
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDraggingRef.current || startXRef.current === 0) return;
        e.preventDefault();
        const diff = (e.pageX - startXRef.current) * 1.2;
        if (containerRef.current?.firstElementChild) {
            (containerRef.current.firstElementChild as HTMLElement).style.transform = `translateX(${scrollOffsetRef.current + diff}px)`;
            (containerRef.current.firstElementChild as HTMLElement).style.animation = 'none';
        }
    };

    const handleMouseUp = () => {
        isDraggingRef.current = false;
        if (containerRef.current?.firstElementChild) {
            (containerRef.current.firstElementChild as HTMLElement).style.animation = '';
        }
        startXRef.current = 0;
        scrollOffsetRef.current = 0;
        setIsPaused(false);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        isDraggingRef.current = true;
        setIsPaused(true);
        startXRef.current = e.touches[0].clientX;
        if (containerRef.current?.firstElementChild) {
            const transform = window.getComputedStyle(containerRef.current.firstElementChild as Element).transform;
            if (transform !== 'none') {
                const matrix = new DOMMatrix(transform);
                scrollOffsetRef.current = matrix.m41;
            }
        }
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDraggingRef.current || startXRef.current === 0) return;
        const diff = (e.touches[0].clientX - startXRef.current) * 1.2;
        if (containerRef.current?.firstElementChild) {
            (containerRef.current.firstElementChild as HTMLElement).style.transform = `translateX(${scrollOffsetRef.current + diff}px)`;
            (containerRef.current.firstElementChild as HTMLElement).style.animation = 'none';
        }
    };

    const handleTouchEnd = () => {
        isDraggingRef.current = false;
        if (containerRef.current?.firstElementChild) {
            (containerRef.current.firstElementChild as HTMLElement).style.animation = '';
        }
        startXRef.current = 0;
        scrollOffsetRef.current = 0;
        setIsPaused(false);
    };

    return (
        <div className="w-full font-deca">
            <div 
                ref={containerRef}
                className="overflow-hidden cursor-grab active:cursor-grabbing"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div className={`flex gap-6 ${isPaused ? '' : 'animate-scroll'}`}>
                    {socialData.concat(socialData).map((item, index) => {
                        const timeAgoText = timeAgo(item.date);
                        if (!item.url) return null;
                        return (
                            <article
                                key={`${item.id}-${index}`}
                                onMouseEnter={() => setIsPaused(true)}
                                onMouseLeave={() => setIsPaused(false)}
                                className="flex-shrink-0 w-full sm:max-w-[28.9375rem] sm:w-full lg:w-1/3 bg-white rounded-xl hover:shadow-lg transition-all duration-300"
                            >
                                <div className="w-full h-[11.31rem] sm:h-[25.5rem]">
                                    <EmbedContainer type={item.type} url={item.url} />
                                </div>

                                <div className="px-0 sm:px-5 pb-5">
                                    <h3 className="font-medium text-[0.75rem] pt-8 sm:pt-0 md:text-[0.6667rem] lg:text-[0.7600rem] xl92r:text-[0.8333rem] 2xl:text-[1rem] text-black leading-2 sm:leading-9 tracking-[0.08em]">
                                        {timeAgoText}
                                    </h3>

                                    <p className="text-black font-light pt-2 sm:font-normal text-sm md:text-[0.6667rem] lg:text-[0.7600rem] xl92r:text-[0.8333rem] 2xl:text-[1rem] leading-[1.8] sm:leading-[2.25rem] tracking-[0.08em] mb-1">
                                        {truncateWords(item.caption, 8)}
                                    </p>

                                    <button
                                        onClick={() => window.open(item.publicUrl)}
                                        className="border-3 sm:border-4 cursor-pointer text-black border-gray-900 rounded-full text-[0.875rem] md:text-[0.5833rem] lg:text-[0.6650rem] xl92r:text-[0.7292rem] 2xl:text-[0.875rem] leading-[1.8] sm:leading-[2.25rem] tracking-[0.12em] font-regular sm:font-light px-3 sm:px-6 text-sm hover:bg-gray-100 transition-colors"
                                    >
                                        {t("news.readMore")}
                                    </button>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default FeedEmbed;