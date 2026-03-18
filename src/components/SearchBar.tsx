'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface SearchResult {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
}

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [allPosts, setAllPosts] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Load search index on first focus
  const loadIndex = async () => {
    if (allPosts.length > 0) return;
    try {
      const res = await fetch('/api/search-index');
      const data = await res.json();
      setAllPosts(data);
    } catch {
      // Silently fail — search just won't work
    }
  };

  const handleSearch = (value: string) => {
    setQuery(value);
    if (value.length < 2) {
      setResults([]);
      return;
    }
    const lower = value.toLowerCase();
    const filtered = allPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(lower) ||
        post.excerpt.toLowerCase().includes(lower) ||
        post.category.toLowerCase().includes(lower)
    );
    setResults(filtered.slice(0, 5));
  };

  const handleSelect = (slug: string) => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    router.push(`/posts/${slug}`);
  };

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="search-bar" ref={wrapperRef}>
      <input
        ref={inputRef}
        type="search"
        placeholder="Search reviews..."
        className="search-bar__input"
        value={query}
        onFocus={() => {
          setIsOpen(true);
          loadIndex();
        }}
        onChange={(e) => handleSearch(e.target.value)}
      />
      {isOpen && results.length > 0 && (
        <ul className="search-bar__results">
          {results.map((post) => (
            <li key={post.slug}>
              <button
                className="search-bar__result"
                onClick={() => handleSelect(post.slug)}
              >
                <span className="search-bar__result-title">{post.title}</span>
                <span className="search-bar__result-category">
                  {post.category}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
