export interface PublicVaultCase {
  id: string;
  slug: string;
  clientMessage: string;
  disguisedTrap: string;
  contractRisk: string;
  statuteClause: string;
  unbilledHoursMin: number;
  unbilledHoursMax: number;
  freeDiplomaticReply: string;
  searchIntentKeywords: string[];
}

export const PUBLIC_VAULT_CASES: PublicVaultCase[] = [
  {
    id: "quick-tweak-mobile-app",
    slug: "client-asking-for-mobile-app-on-web-budget",
    clientMessage: "“Hey! We assumed responsive meant it will also be available on Apple App Store and Google Play Store. Can you quickly export the React code into mobile APK and iOS app? We launch Monday.”",
    disguisedTrap: "Conflating responsive web CSS viewport media queries with complete native mobile OS architecture, device permissions, and Apple/Google review compliance.",
    contractRisk: "Absorbing 80–140 hours of native mobile compilation, push notifications, and App Store submission loops without compensation ($10,000–$17,500 unbilled loss).",
    statuteClause: "UCC § 2-209 Modification Rider: Web deliverable contracts exclude native device runtime environments unless explicitly scheduled in Exhibit A.",
    unbilledHoursMin: 80,
    unbilledHoursMax: 140,
    freeDiplomaticReply: "Hi [Client Name], our executed SOW covers the responsive web application accessible via mobile web browsers. Deploying native iOS and Android packages to the App Store requires a separate native container, store submission review, and device certification pipeline. We would love to build this for you—I have created a formal Change Order with the adjusted timeline and investment schedule.",
    searchIntentKeywords: ["client asking for mobile app on web budget", "how to respond when client wants mobile app for free", "scope creep responsive vs native app"]
  },
  {
    id: "quick-ai-chatbot-integration",
    slug: "client-asking-for-chatgpt-ai-features-for-free",
    clientMessage: "“Can we just connect ChatGPT to the user dashboard so it auto-answers customer support tickets? It's just a simple API key connection right? Shouldn't take more than 30 minutes.”",
    disguisedTrap: "Treating LLM prompt engineering, vector database retrieval (RAG), rate limit management, streaming UI, and API cost liability as a 'simple toggle'.",
    contractRisk: "Absorbing 35–60 engineering hours plus unbudgeted API consumption token costs ($4,375–$7,500 developer margin bleed).",
    statuteClause: "UCC § 2-209 Section 3: Third-party LLM API integrations and operational inference token quotas constitute material scope expansion.",
    unbilledHoursMin: 35,
    unbilledHoursMax: 60,
    freeDiplomaticReply: "Hi [Client Name], integrating generative AI involves backend security proxies, vector embedding pipelines, streaming response states, and token usage safeguards to prevent runaway billing. This represents a distinct architectural module outside our signed baseline. I have drafted an official addendum outlining the integration hours and token management architecture.",
    searchIntentKeywords: ["client wants chatgpt integration for free", "scope creep ai feature request", "how to charge client for openai api integration"]
  },
  {
    id: "two-way-crm-sync",
    slug: "client-demands-hubspot-salesforce-bi-directional-sync",
    clientMessage: "“We need all contact leads to sync bi-directionally with our Salesforce and HubSpot enterprise accounts in real time. We mentioned CRM in our kickoff chat.”",
    disguisedTrap: "Equating casual conversation about CRM interest with contractual execution of OAuth webhooks, field mapping conflicts, and automated de-duplication engines.",
    contractRisk: "Absorbing 50–90 hours of schema reconciliation, OAuth token refresh logic, and webhook retry handlers ($6,250–$11,250 unbilled margin bleed).",
    statuteClause: "Four-Corners Contract Integration Rule: Prior verbal discussions regarding CRM platforms are extinguished by the executed Statement of Work.",
    unbilledHoursMin: 50,
    unbilledHoursMax: 90,
    freeDiplomaticReply: "Hi [Client Name], while we discussed CRM possibilities during initial discovery, the executed Statement of Work explicitly defines local database storage as the baseline deliverable. Bi-directional enterprise CRM synchronization requires custom OAuth authentication flows, webhook retry daemons, and automated field conflict resolution. Let's schedule this under Change Order #2.",
    searchIntentKeywords: ["client wants salesforce sync for free", "scope creep crm webhook integration", "bi directional sync scope variance"]
  },
  {
    id: "unlimited-revisions-trap",
    slug: "client-demanding-endless-redesigns-after-approval",
    clientMessage: "“We don't like the color palette and typography anymore. Let's try 4 completely new creative concepts with animations and dark mode toggle. As the client, we have unlimited revisions until satisfied.”",
    disguisedTrap: "Interpreting minor bug fixes during acceptance testing as an open license for subjective aesthetic overhauls after design sign-off.",
    contractRisk: "Absorbing 40–75 hours of redundant design, CSS refactoring, and state management rewriting ($5,000–$9,375 unbilled dev loss).",
    statuteClause: "UCC § 2-606 (Constructive Acceptance): Milestone sign-off constitutes statutory acceptance; subsequent stylistic variations require bilateral compensatory amendments.",
    unbilledHoursMin: 40,
    unbilledHoursMax: 75,
    freeDiplomaticReply: "Hi [Client Name], as documented in our milestone sign-off dated [Date], the design system, color palette, and layout were formally approved for development. Re-architecting the aesthetic foundation, dark mode engine, and animation hierarchy at this stage involves rebuilding approved components. We are happy to execute these enhancements under an aesthetic variance change order.",
    searchIntentKeywords: ["client wants unlimited revisions freelance", "how to stop client endless redesigns", "statutory acceptance milestone freelance"]
  },
  {
    id: "social-media-login-and-roles",
    slug: "client-asking-for-complex-rbac-user-roles-for-free",
    clientMessage: "“Can we quickly add Google, Apple, GitHub logins, plus 5 different user roles (Super Admin, Regional Manager, Viewer, Auditor) with custom granular permission toggles? It's just auth.”",
    disguisedTrap: "Equating standard email/password authentication with multi-provider OAuth protocols, session state encryption, and granular hierarchical permission trees.",
    contractRisk: "Absorbing 45–80 hours of middleware security engineering, permission table indexing, and OAuth security audits ($5,625–$10,000 unbilled loss).",
    statuteClause: "UCC § 2-209 Mandatory Cost Variance: Hierarchical role-based access control (RBAC) represents a structural core security addition.",
    unbilledHoursMin: 45,
    unbilledHoursMax: 80,
    freeDiplomaticReply: "Hi [Client Name], our baseline agreement specified standard email/password authentication. Introducing multi-provider OAuth alongside 5-tier hierarchical Role-Based Access Control (RBAC) requires architectural security tables, token refresh middleware, and granular permission enforcement guards. I have prepared an addendum covering this enterprise security upgrade.",
    searchIntentKeywords: ["client says its just auth scope creep", "how to charge for user roles permissions freelance", "rbac scope creep response"]
  },
  {
    id: "payment-gateway-multi-currency",
    slug: "client-asking-for-multi-currency-tax-compliance-stripe",
    clientMessage: "“Instead of just US Dollar card checkout, we now need automatic VAT calculation for Europe, GST for India, Apple Pay, PayPal, and recurring metered subscriptions. Launch date cannot change.”",
    disguisedTrap: "Treating international tax compliance, webhook reconciliation, and multi-currency exchange rates as a cosmetic checkout tweak.",
    contractRisk: "Absorbing 55–95 hours of financial compliance engineering and multi-currency webhook audit trails ($6,875–$11,875 margin bleed).",
    statuteClause: "Statutory Tax & Regulatory Shield Rider: International fiscal compliance and merchant of record integrations constitute statutory scope expansion.",
    unbilledHoursMin: 55,
    unbilledHoursMax: 95,
    freeDiplomaticReply: "Hi [Client Name], single-currency checkout was our agreed delivery baseline. Multi-currency processing with dynamic VAT/GST compliance and cross-border webhooks requires dedicated tax integration services and compliance testing. To protect our launch deadline, we can either stage this for Phase 2 or execute a expedited Change Order immediately.",
    searchIntentKeywords: ["client wants international payments scope creep", "how to charge for stripe tax multi currency freelance", "payment gateway scope variance"]
  }
];
