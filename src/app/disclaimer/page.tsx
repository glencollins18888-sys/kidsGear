import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disclaimer & Disclosure',
  description:
    'FTC disclosure and affiliate disclaimer for KidGear Reviews.',
};

export default function DisclaimerPage() {
  return (
    <div className="article-content">
      <h1 className="article-title">Disclaimer &amp; Affiliate Disclosure</h1>
      <p>
        <em>Last updated: March 18, 2026</em>
      </p>

      <h2>FTC Affiliate Disclosure</h2>
      <p>
        KidGear Reviews is a participant in the Amazon Services LLC Associates
        Program, an affiliate advertising program designed to provide a means
        for sites to earn advertising fees by advertising and linking to
        Amazon.com and affiliated sites.
      </p>
      <p>
        This means that when you click on certain links on our site and make a
        purchase on Amazon, we may receive a small commission at no additional
        cost to you. These commissions help us maintain and improve our site
        so we can continue to provide free, helpful content.
      </p>

      <h2>Product Reviews</h2>
      <p>
        All product reviews and recommendations on KidGear Reviews are based
        on our research and analysis. We strive to provide accurate, honest,
        and helpful information. However, we cannot guarantee that all
        information is complete, accurate, or up to date at all times.
      </p>
      <p>
        Product prices, availability, ratings, and details are subject to
        change. We recommend verifying current information on Amazon before
        making a purchase.
      </p>

      <h2>Not Professional Advice</h2>
      <p>
        The content on this site is for informational purposes only and should
        not be considered professional medical, coaching, or safety advice.
        Always consult with qualified professionals regarding your child's
        specific athletic needs, and follow manufacturer guidelines for all
        equipment.
      </p>

      <h2>Product Safety</h2>
      <p>
        While we consider safety in our reviews, parents and guardians are
        ultimately responsible for ensuring that any equipment purchased is
        appropriate for their child's age, size, and skill level. Always
        supervise children during athletic activities and follow all product
        safety instructions.
      </p>

      <h2>Trademarks</h2>
      <p>
        Amazon and the Amazon logo are trademarks of Amazon.com, Inc. or its
        affiliates. All other product names, logos, and brands mentioned on
        this site are property of their respective owners.
      </p>

      <h2>Contact</h2>
      <p>
        If you have any questions about this disclosure, please visit our{' '}
        <a href="/contact">contact page</a>.
      </p>
    </div>
  );
}
