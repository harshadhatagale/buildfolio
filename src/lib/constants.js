export const pricingCards = [
  {
    id: 'starter',
    title: "Starter",
    desc: "Perfect for individuals building their first portfolio",
    price: "Free",
    duration: '',
    highlight: "Everything you need to begin",
    features: [
      '1 Portfolio project', 
      'Basic templates & themes',
      '5 Section limit',
      '500MB storage',
      'Custom domain support',
      'Basic analytics',
      'Email support'
    ],
    cta: "Get Started",
    priceId: '',
    recommended: false
  },
  {
    id: 'professional',
    title: "Professional",
    desc: "For freelancers and creatives showcasing their work",
    price: "$9",
    duration: 'month',
    highlight: "Popular choice for independent professionals",
    features: [
      '5 Portfolio projects',
      'Premium templates & themes',
      'Unlimited sections',
      '5GB storage',
      'Custom domain + SSL',
      'Advanced analytics',
      'Priority email support',
      'Basic SEO tools',
      'Password protection'
    ],
    cta: "Start Building",
    priceId: 'price_professional',
    recommended: true
  },
  {
    id: 'agency',
    title: "Agency",
    desc: "For teams and agencies managing multiple portfolios",
    price: "$29",
    duration: 'month',
    highlight: "Complete portfolio management",
    features: [
      'Unlimited portfolio projects',
      'All premium templates & themes',
      'Unlimited sections',
      '50GB storage',
      'White-label options',
      'Team collaboration',
      'Client access controls',
      'Advanced SEO tools',
      '24/7 priority support',
      'API access',
      'Custom theme development'
    ],
    cta: "Scale Your Business",
    priceId: 'price_agency',
    recommended: false
  },
  {
    id: 'enterprise',
    title: "Enterprise",
    desc: "Custom solutions for large organizations",
    price: "Custom",
    duration: '',
    highlight: "Tailored to your needs",
    features: [
      'Everything in Agency',
      'Dedicated account manager',
      'Custom integrations',
      'On-premise deployment',
      'SLA guarantees',
      'Training & onboarding',
      'Volume discounts',
      'Custom contract terms'
    ],
    cta: "Contact Sales",
    priceId: '',
    recommended: false
  }
];