'use client';

import { useState } from 'react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store in localStorage for now — integrate with Mailchimp/Buttondown later
    const subscribers = JSON.parse(
      localStorage.getItem('newsletter_subscribers') || '[]'
    );
    if (!subscribers.includes(email)) {
      subscribers.push(email);
      localStorage.setItem(
        'newsletter_subscribers',
        JSON.stringify(subscribers)
      );
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="newsletter newsletter--success">
        <p>Thanks for subscribing! You&apos;ll get our weekly gear picks.</p>
      </div>
    );
  }

  return (
    <div className="newsletter">
      <h3 className="newsletter__title">Get Weekly Gear Picks</h3>
      <p className="newsletter__desc">
        Join parents who get our best equipment recommendations delivered every
        Monday.
      </p>
      <form className="newsletter__form" onSubmit={handleSubmit}>
        <input
          type="email"
          required
          placeholder="your@email.com"
          className="newsletter__input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="newsletter__button">
          Subscribe
        </button>
      </form>
    </div>
  );
}
