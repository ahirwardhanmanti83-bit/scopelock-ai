import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Copy, 
  Check, 
  ArrowRight, 
  AlertTriangle, 
  ShieldCheck,
  FileText
} from 'lucide-react';

interface CaseStudy {
  id: string;
  title: string;
  clientMessage: string;
  trapExplanation: string;
  unbilledHours: string;
  contractClauseTemplate: string;
  diplomaticReply: string;
}

const VAULT_CASES: CaseStudy[] = [
  {
    id: 'mobile-app',
    title: 'Client requesting native mobile app on responsive web budget',
    clientMessage: '“We assumed responsive meant it will also be available on Apple App Store and Google Play Store. Can you quickly export the React code into mobile APK and iOS app? We launch Monday.”',
    trapExplanation: 'Conflating responsive web CSS viewport media queries with complete native mobile OS architecture, device permissions, and Apple/Google review compliance.',
    unbilledHours: '80–140 dev hours ($8,000–$14,000)',
    contractClauseTemplate: 'Deliverable Boundary Rider: Software deliverables are limited strictly to responsive web applications accessible via standard desktop and mobile web browsers. Native compilation (iOS/Android) and store certification require a bilateral addendum.',
    diplomaticReply: 'Hi [Client Name], our executed SOW covers the responsive web application accessible via mobile web browsers. Deploying native iOS and Android packages to the App Store requires a separate native container, store submission review, and device certification pipeline. We would love to build this for you—I have created a formal Change Order with the adjusted timeline and investment schedule.'
  },
  {
    id: 'ai-api',
    title: 'Client asking for ChatGPT / LLM API integration for free',
    clientMessage: '“Can we just connect ChatGPT to the user dashboard so it auto-answers customer support tickets? It\'s just a simple API key connection right? Shouldn\'t take more than 30 minutes.”',
    trapExplanation: 'Treating LLM prompt engineering, vector database retrieval (RAG), rate limit management, streaming UI, and API cost liability as a trivial toggle.',
    unbilledHours: '35–60 dev hours ($3,500–$6,000)',
    contractClauseTemplate: 'Third-Party AI Integration Clause: Baseline scope excludes autonomous third-party inference endpoints, LLM API credentials, streaming socket states, and operational token usage quotas.',
    diplomaticReply: 'Hi [Client Name], integrating generative AI involves backend security proxies, vector embedding pipelines, streaming response states, and token usage safeguards to prevent runaway billing. This represents a distinct architectural module outside our signed baseline. I have drafted an official addendum outlining the integration hours and token management architecture.'
  },
  {
    id: 'crm-sync',
    title: 'Client demanding HubSpot & Salesforce two-way sync',
    clientMessage: '“We need all contact leads to sync bi-directionally with our Salesforce and HubSpot enterprise accounts in real time. We mentioned CRM in our kickoff chat.”',
    trapExplanation: 'Equating casual conversation about CRM interest with contractual execution of OAuth webhooks, field mapping conflicts, and automated de-duplication engines.',
    unbilledHours: '50–90 dev hours ($5,000–$9,000)',
    contractClauseTemplate: 'Four-Corners Integration Rider: Verbal exploratory discussions regarding external CRM platforms are extinguished by the executed Statement of Work. Third-party OAuth synchronization requires dedicated change order authorization.',
    diplomaticReply: 'Hi [Client Name], while we discussed CRM possibilities during initial discovery, the executed Statement of Work explicitly defines local database storage as the baseline deliverable. Bi-directional enterprise CRM synchronization requires custom OAuth authentication flows, webhook retry daemons, and automated field conflict resolution. Let\'s schedule this under Change Order #2.'
  },
  {
    id: 'endless-redesign',
    title: 'Client demanding complete redesigns after milestone approval',
    clientMessage: '“We don\'t like the color palette and typography anymore. Let\'s try 4 completely new creative concepts with animations and dark mode toggle. As the client, we have unlimited revisions until satisfied.”',
    trapExplanation: 'Interpreting minor bug fixes during acceptance testing as an open license for subjective aesthetic overhauls after design sign-off.',
    unbilledHours: '40–75 dev hours ($4,000–$7,500)',
    contractClauseTemplate: 'Acceptance & Aesthetic Freezing: Formal sign-off on design milestones constitutes milestone acceptance. Subsequent visual restyling or architectural redesigns constitute billable scope adjustments.',
    diplomaticReply: 'Hi [Client Name], as documented in our milestone sign-off dated [Date], the design system, color palette, and layout were formally approved for development. Re-architecting the aesthetic foundation, dark mode engine, and animation hierarchy at this stage involves rebuilding approved components. We are happy to execute these enhancements under an aesthetic variance change order.'
  },
  {
    id: 'rbac-roles',
    title: 'Client requesting complex Role-Based Access Control (RBAC)',
    clientMessage: '“Can we quickly add Google, Apple, GitHub logins, plus 5 different user roles (Super Admin, Regional Manager, Viewer, Auditor) with custom granular permission toggles? It\'s just auth.”',
    trapExplanation: 'Equating standard email/password authentication with multi-provider OAuth protocols, session state encryption, and granular hierarchical permission trees.',
    unbilledHours: '45–80 dev hours ($4,500–$8,000)',
    contractClauseTemplate: 'Security Architecture Scope: Standard authentication includes single-tier user sessions. Hierarchical multi-tier Role-Based Access Control (RBAC) constitutes core security infrastructure requiring separate authorization.',
    diplomaticReply: 'Hi [Client Name], our baseline agreement specified standard email/password authentication. Introducing multi-provider OAuth alongside 5-tier hierarchical Role-Based Access Control (RBAC) requires architectural security tables, token refresh middleware, and granular permission enforcement guards. I have prepared an addendum covering this enterprise security upgrade.'
  },
  {
    id: 'multi-currency',
    title: 'Client demanding international taxes & multi-currency payments',
    clientMessage: '“Instead of just US Dollar card checkout, we now need automatic VAT calculation for Europe, GST for India, Apple Pay, PayPal, and recurring metered subscriptions. Launch date cannot change.”',
    trapExplanation: 'Treating international tax compliance, webhook reconciliation, and multi-currency exchange rates as a cosmetic checkout tweak.',
    unbilledHours: '55–95 dev hours ($5,500–$9,500)',
    contractClauseTemplate: 'Cross-Border Fiscal Compliance Rider: Deliverables baseline includes single-currency credit card settlement. Dynamic VAT/GST calculation, multi-currency conversion, and digital wallet integrations constitute fiscal additions.',
    diplomaticReply: 'Hi [Client Name], single-currency checkout was our agreed delivery baseline. Multi-currency processing with dynamic VAT/GST compliance and cross-border webhooks requires dedicated tax integration services and compliance testing. To protect our launch deadline, we can either stage this for Phase 2 or execute an expedited Change Order immediately.'
  }
];

export const VaultDefense: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCase, setSelectedCase] = useState<CaseStudy>(VAULT_CASES[0]);
  const [copiedScript, setCopiedScript] = useState(false);
  const [copiedClause, setCopiedClause] = useState(false);

  const filtered = VAULT_CASES.filter(
    (c) =>
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.trapExplanation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopyScript = () => {
    navigator.clipboard.writeText(selectedCase.diplomaticReply);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2500);
  };

  const handleCopyClause = () => {
    navigator.clipboard.writeText(selectedCase.contractClauseTemplate);
    setCopiedClause(true);
    setTimeout(() => setCopiedClause(false), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 uppercase mb-1">
            Free Public Defense Repository
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Agency Scope Creep Defense Vault
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Battle-tested contract templates and diplomatic client negotiation scripts indexed for software development agencies and freelancers.
          </p>
        </div>

        <div className="w-full md:w-72 relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search trap (e.g. mobile app, AI, CRM)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Cases List */}
        <div className="lg:col-span-5 space-y-2 max-h-[600px] overflow-y-auto pr-1">
          {filtered.map((item) => {
            const isSelected = item.id === selectedCase.id;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedCase(item)}
                className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600/10 border-indigo-500/60 shadow-lg shadow-indigo-600/10'
                    : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-850'
                }`}
              >
                <div className="flex justify-between items-start gap-2 mb-1">
                  <span className="font-bold text-xs text-slate-200 line-clamp-1">{item.title}</span>
                  <span className="text-[10px] font-mono text-rose-400 font-bold shrink-0">
                    {item.unbilledHours.split(' ')[0]}
                  </span>
                </div>
                <p className="text-xs text-slate-400 line-clamp-2 italic">{item.clientMessage}</p>
              </button>
            );
          })}
        </div>

        {/* Case Detail */}
        <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-[10px] font-mono text-indigo-400 uppercase font-bold">Case Study Inspection</span>
            <h3 className="text-lg font-black text-white mt-1">{selectedCase.title}</h3>
            <p className="text-xs text-rose-400 font-mono mt-1">
              Estimated Unbilled Exposure: <strong>{selectedCase.unbilledHours}</strong>
            </p>
          </div>

          {/* Client Message */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-850 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Incoming Client Message</span>
            <p className="text-xs text-slate-200 italic font-sans">{selectedCase.clientMessage}</p>
          </div>

          {/* Hidden Trap */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-amber-900/40 space-y-1">
            <span className="text-[10px] font-bold text-amber-400 uppercase flex items-center gap-1.5">
              <AlertTriangle className="w-3 h-3" />
              <span>Disguised Scope Trap</span>
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">{selectedCase.trapExplanation}</p>
          </div>

          {/* Contract Template */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-indigo-300 uppercase flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-indigo-400" />
                <span>Contract Deliverable Boundary Rider</span>
              </span>
              <button
                onClick={handleCopyClause}
                className="text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
              >
                {copiedClause ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedClause ? 'Copied' : 'Copy Rider'}</span>
              </button>
            </div>
            <p className="text-xs text-slate-300 font-mono leading-relaxed bg-slate-900 p-3 rounded-lg border border-slate-850">
              {selectedCase.contractClauseTemplate}
            </p>
          </div>

          {/* Diplomatic Client Script */}
          <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-emerald-400 uppercase flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Diplomatic Client Response (Copy & Paste)</span>
              </span>
              <button
                onClick={handleCopyScript}
                className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] flex items-center gap-1 cursor-pointer transition-colors"
              >
                {copiedScript ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copiedScript ? 'Copied' : 'Copy Reply'}</span>
              </button>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed bg-slate-900 p-3 rounded-lg border border-slate-850">
              {selectedCase.diplomaticReply}
            </p>
          </div>

          <div className="text-[10px] text-slate-500 italic pt-1 border-t border-slate-850">
            * Disclaimer: Provided as a professional communication and project management template. Not formal legal counsel.
          </div>
        </div>
      </div>
    </div>
  );
};
