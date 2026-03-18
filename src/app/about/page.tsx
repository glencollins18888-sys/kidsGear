import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about KidGear Reviews and our mission to help parents find the best sports training equipment for their children.',
};

export default function AboutPage() {
  return (
    <div className="article-content">
      <h1 className="article-title">About KidGear Reviews</h1>

      <p>
        Welcome to KidGear Reviews! We're a team of parents, coaches, and youth
        sports enthusiasts dedicated to helping families find the best training
        equipment for their young athletes.
      </p>

      <h2>Our Mission</h2>
      <p>
        Choosing the right sports equipment for kids can be overwhelming. With
        countless products on the market, it's hard to know what's worth your
        money and what's right for your child's age and skill level. That's
        where we come in.
      </p>
      <p>
        We research, compare, and review children's sports training equipment
        across every major sport — from soccer and basketball to swimming,
        gymnastics, and martial arts. Our goal is to give you honest,
        practical recommendations so you can make confident purchasing
        decisions.
      </p>

      <h2>What We Cover</h2>
      <p>
        Every week, we publish a new in-depth review covering training
        equipment for a different sport. Our reviews include:
      </p>
      <ul>
        <li>Detailed product breakdowns with pros and cons</li>
        <li>Age-appropriate recommendations</li>
        <li>Safety considerations for young athletes</li>
        <li>Value-for-money assessments</li>
        <li>Buying guides to help you choose the right gear</li>
      </ul>

      <h2>Our Review Process</h2>
      <p>
        We take our reviews seriously. We research products thoroughly,
        analyze customer feedback, consult with youth coaches, and consider
        factors like durability, safety, and age-appropriateness. We only
        recommend products we genuinely believe will help your child enjoy
        their sport and improve their skills.
      </p>

      <h2>Affiliate Disclosure</h2>
      <p>
        KidGear Reviews is a participant in the Amazon Services LLC Associates
        Program, an affiliate advertising program designed to provide a means
        for sites to earn advertising fees by advertising and linking to
        Amazon.com. This means we may earn a small commission when you
        purchase products through our links, at no extra cost to you. This
        helps us keep the site running and continue producing free content.
      </p>

      <h2>Get in Touch</h2>
      <p>
        Have questions, suggestions, or a product you'd like us to review?
        We'd love to hear from you! Visit our{' '}
        <a href="/contact">contact page</a> to reach out.
      </p>
    </div>
  );
}
