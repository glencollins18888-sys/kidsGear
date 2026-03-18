import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with KidGear Reviews. Questions, suggestions, and product review requests welcome.',
};

export default function ContactPage() {
  return (
    <div className="article-content">
      <h1 className="article-title">Contact Us</h1>

      <p>
        We'd love to hear from you! Whether you have a question about one of
        our reviews, a product suggestion, or just want to say hello, feel
        free to reach out.
      </p>

      <h2>Get in Touch</h2>
      <p>
        Email us at:{' '}
        <strong>hello@kidgearreviews.com</strong>
      </p>

      <h2>What You Can Reach Out About</h2>
      <ul>
        <li>
          <strong>Product review requests</strong> — Have a product you'd like
          us to review? Let us know!
        </li>
        <li>
          <strong>Corrections</strong> — If you spot an error in one of our
          reviews, we want to fix it.
        </li>
        <li>
          <strong>General questions</strong> — Need help choosing equipment
          for your child's sport? We're happy to help point you in the right
          direction.
        </li>
        <li>
          <strong>Business inquiries</strong> — For partnerships or
          advertising inquiries, please include &quot;Business&quot; in your
          subject line.
        </li>
      </ul>

      <p>We aim to respond to all inquiries within 48 hours.</p>
    </div>
  );
}
