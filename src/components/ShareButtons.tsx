'use client';

interface ShareButtonsProps {
  title: string;
  slug: string;
}

export default function ShareButtons({ title, slug }: ShareButtonsProps) {
  const siteUrl = 'https://kids-gear.vercel.app';
  const url = `${siteUrl}/posts/${slug}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="share-buttons">
      <span className="share-buttons__label">Share:</span>
      <a
        href={`https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="share-btn share-btn--pinterest"
        aria-label="Share on Pinterest"
      >
        Pin It
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="share-btn share-btn--facebook"
        aria-label="Share on Facebook"
      >
        Facebook
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="share-btn share-btn--twitter"
        aria-label="Share on X"
      >
        X / Twitter
      </a>
    </div>
  );
}
