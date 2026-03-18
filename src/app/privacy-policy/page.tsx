import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'KidGear Reviews privacy policy.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="article-content">
      <h1 className="article-title">Privacy Policy</h1>
      <p>
        <em>Last updated: March 18, 2026</em>
      </p>

      <p>
        KidGear Reviews (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;)
        operates the KidGear Reviews website. This page informs you of our
        policies regarding the collection, use, and disclosure of personal
        information when you use our site.
      </p>

      <h2>Information We Collect</h2>
      <p>
        We do not directly collect personal information from visitors. However,
        third-party services used on this site may collect information as
        described below.
      </p>

      <h2>Analytics</h2>
      <p>
        We may use third-party analytics services to help us understand how
        visitors use our site. These services may collect information such as
        your IP address, browser type, pages visited, and time spent on pages.
        This data is used solely to improve our content and user experience.
      </p>

      <h2>Cookies</h2>
      <p>
        Our site may use cookies — small data files stored on your device — to
        improve your browsing experience. Third-party services, including
        Amazon Associates, may also set cookies when you click on affiliate
        links. You can control cookie settings through your browser
        preferences.
      </p>

      <h2>Amazon Associates Program</h2>
      <p>
        KidGear Reviews is a participant in the Amazon Services LLC Associates
        Program, an affiliate advertising program designed to provide a means
        for sites to earn advertising fees by advertising and linking to
        Amazon.com. When you click on an Amazon affiliate link on our site,
        Amazon may collect information about your visit and any purchases you
        make. Please refer to{' '}
        <a
          href="https://www.amazon.com/gp/help/customer/display.html?nodeId=468496"
          target="_blank"
          rel="noopener noreferrer"
        >
          Amazon&apos;s Privacy Notice
        </a>{' '}
        for details on their data practices.
      </p>

      <h2>Third-Party Links</h2>
      <p>
        Our site contains links to Amazon.com and potentially other external
        websites. We are not responsible for the privacy practices of these
        external sites. We encourage you to review their privacy policies
        before providing any personal information.
      </p>

      <h2>Children&apos;s Privacy</h2>
      <p>
        Our site is intended for parents and guardians shopping for children's
        sports equipment. We do not knowingly collect personal information
        from children under 13. If you believe we have inadvertently collected
        such information, please contact us so we can promptly remove it.
      </p>

      <h2>Changes to This Policy</h2>
      <p>
        We may update this privacy policy from time to time. Any changes will
        be posted on this page with an updated revision date.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have questions about this privacy policy, please visit our{' '}
        <a href="/contact">contact page</a>.
      </p>
    </div>
  );
}
