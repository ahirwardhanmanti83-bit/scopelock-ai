export interface SeoTemplate {
  id: string;
  title: string;
  category: 'Shopify' | 'Webflow' | 'React / Next.js' | 'Mobile App' | 'WordPress';
  description: string;
  originalScope: string;
  requestedScope: string;
  defaultBudget: number;
  hourlyRate: number;
  tags: string[];
}

export const SEO_TEMPLATES: SeoTemplate[] = [
  {
    id: 'shopify-agency-scope-creep',
    title: 'Shopify Plus Custom App & Checkout Extensibility Variance',
    category: 'Shopify',
    description: 'Contract amendment and forensic change order for unbudgeted Checkout Extensibility, custom metafield sync, and ERP integration.',
    originalScope: `1. Standard Shopify Plus theme customization and setup\n2. Migration of 500 products with existing imagery\n3. Native Shopify Payments & standard Stripe setup\n4. Responsive mobile navigation and collection filters`,
    requestedScope: `1. Build bespoke Checkout UI extension with custom upsell logic\n2. Custom two-way real-time ERP inventory sync with NetSuite\n3. Multi-currency geo-redirection with custom B2B wholesale portal\n4. Re-engineer product pages with dynamic 3D AR model viewer`,
    defaultBudget: 18000,
    hourlyRate: 140,
    tags: ['Shopify Plus', 'Checkout UI', 'NetSuite ERP', 'UCC § 2-209']
  },
  {
    id: 'webflow-creative-agency-addendum',
    title: 'Webflow Enterprise 3D Spline & CMS Expansion Order',
    category: 'Webflow',
    description: 'Protect agency margins when creative clients request interactive 3D Spline canvases, unbudgeted CMS collections, and custom Memberstack logic.',
    originalScope: `1. 5-page marketing website built on standard Webflow components\n2. Basic contact form connected to Webflow native submissions\n3. SEO meta tags setup and responsive tablet/mobile layouts`,
    requestedScope: `1. Embed interactive 3D WebGL / Spline physics animation in hero\n2. Add custom gated membership portal using Memberstack & Stripe\n3. Build programmatic CMS directory with 45 filterable category taxonomies\n4. Multi-language localization with custom Weglot styling`,
    defaultBudget: 9500,
    hourlyRate: 125,
    tags: ['Webflow', 'Spline 3D', 'Memberstack', 'Creative Studio']
  },
  {
    id: 'nextjs-saas-mvp-audit',
    title: 'Full-Stack Next.js 14 AI & Bi-directional CRM Creep',
    category: 'React / Next.js',
    description: 'Forensic audit and legal change order for uncontracted LLM integrations, real-time WebSockets, and enterprise CRM sync.',
    originalScope: `1. Responsive Web Application with Next.js & Tailwind CSS\n2. User Authentication (Google & Email/Password)\n3. Stripe Standard Subscription Checkout\n4. PostgreSQL Database with Prisma ORM on Supabase`,
    requestedScope: `1. Add complete native iOS and Android Mobile App alongside web version\n2. Integrate ChatGPT API for automated content generation in client dashboard\n3. Add Salesforce and HubSpot Bi-directional Two-way CRM sync\n4. Complete UI redesign with customized Dark Mode and Theme Switcher`,
    defaultBudget: 22000,
    hourlyRate: 150,
    tags: ['Next.js', 'Prisma', 'LLM Integration', 'SaaS MVP']
  },
  {
    id: 'mobile-app-native-creep',
    title: 'Flutter / React Native Cross-Platform Background Services',
    category: 'Mobile App',
    description: 'Contract enforcement for unbudgeted Bluetooth BLE pairing, offline-first SQLite sync, and custom push notification architecture.',
    originalScope: `1. Cross-platform React Native MVP with 4 primary consumer views\n2. Standard REST API integration with staging backend\n3. Firebase push notification setup for system alerts`,
    requestedScope: `1. Implement background BLE (Bluetooth Low Energy) hardware device pairing\n2. Full offline-first sync engine with local SQLite database reconciliation\n3. Custom encrypted peer-to-peer audio messaging channel\n4. Automated App Store / Google Play localized screenshot generation pipeline`,
    defaultBudget: 25000,
    hourlyRate: 145,
    tags: ['React Native', 'BLE Pairing', 'Offline Sync', 'iOS / Android']
  },
  {
    id: 'wordpress-woocommerce-custom-b2b',
    title: 'WooCommerce B2B Wholesale Pricing & Custom Tax Compliance',
    category: 'WordPress',
    description: 'Instant change order when e-commerce clients request complex tiered pricing rules, Avalara tax integration, and warehouse barcode scanning.',
    originalScope: `1. WooCommerce store setup with Astra Pro and Elementor\n2. Standard PayPal and Stripe card payment gateways\n3. Configuration of 20 flat-rate shipping zones`,
    requestedScope: `1. Implement tiered wholesale customer roles with minimum quantity rules\n2. Real-time automated tax compliance sync via Avalara AvaTax API\n3. Custom warehouse packing slip PDF generator with Code-128 barcodes\n4. Dedicated QuickBooks Enterprise multi-warehouse inventory reconciliation`,
    defaultBudget: 12000,
    hourlyRate: 110,
    tags: ['WooCommerce', 'B2B Wholesale', 'Avalara', 'QuickBooks']
  }
];
