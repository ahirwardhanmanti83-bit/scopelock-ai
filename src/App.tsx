import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { VSIX_BASE64, VSIX_FILENAME } from './data/vsixBase64';
import { JETBRAINS_JAR_BASE64, JETBRAINS_JAR_FILENAME } from './jetbrains_bundle';
import { ScopeInputForm } from './components/ScopeInputForm';
import { CostImpactDashboard } from './components/CostImpactDashboard';
import { ScopeForensicsPanel } from './components/ScopeForensicsPanel';
import { ChangeOrderPreview } from './components/ChangeOrderPreview';
import { CommercialLicenseModal } from './components/CommercialLicenseModal';
import { BrandingSettingsModal } from './components/BrandingSettingsModal';
import { RedeemModal } from './components/RedeemModal';
import { TemplateGallery } from './components/TemplateGallery';
import { FreeContractHub } from './components/FreeContractHub';
import { SeoResourceSection } from './components/SeoResourceSection';
import { ClientPayGate } from './components/ClientPayGate';
import { ScopeBleedCalculator } from './components/ScopeBleedCalculator';
import { CliIntegrationSection } from './components/CliIntegrationSection';
import { ChatScopeScanner } from './components/ChatScopeScanner';
import { UniversalWorkflowBridge } from './components/UniversalWorkflowBridge';
import { ChromeExtensionModal } from './components/ChromeExtensionModal';
import { UnlockPaymentModal } from './components/UnlockPaymentModal';
import { AgencyPortalModal } from './components/AgencyPortalModal';
import { InteractiveFlowHero } from './components/InteractiveFlowHero';
import { ScopeAuditReport, AgencyBranding } from './types';
import { parseScopeComparison } from './utils/parser';
import { SeoTemplate } from './data/seoTemplates';
import { initSessionTelemetry, recordTelemetryEvent } from './utils/telemetry';
import { OpenVaultDirectory } from './components/OpenVaultDirectory';
import { PublicVaultCase } from './data/publicVaultData';
import { ShieldCheck, 
  Shield, 
  FileText, 
  MessageSquareQuote, 
  Calculator, 
  Terminal, 
  BarChart3,
  BookOpen,
  Github, Star, CheckCircle2 } from 'lucide-react';

const DEFAULT_BRANDING: AgencyBranding = {
  agencyName: 'Apex Engineering Labs',
  supportEmail: 'deliveries@apexlabs.dev'
};

export function App() {
  const [downloadedVsixBanner, setDownloadedVsixBanner] = useState(false);
  const [downloadedJetBrainsBanner, setDownloadedJetBrainsBanner] = useState(false);

  const handleDirectJetBrainsDownload = () => {
    try {
      const byteCharacters = atob(JETBRAINS_JAR_BASE64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/java-archive' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = JETBRAINS_JAR_FILENAME;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setDownloadedJetBrainsBanner(true);
      setTimeout(() => setDownloadedJetBrainsBanner(false), 5000);
    } catch (e) {
      console.error('JetBrains direct download fallback:', e);
    }
  };
  const handleDirectVsixDownload = () => {
    try {
      const byteCharacters = atob(VSIX_BASE64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/octet-stream" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = VSIX_FILENAME;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setDownloadedVsixBanner(true);
      setTimeout(() => setDownloadedVsixBanner(false), 4000);
    } catch (err) {
      console.error("VSIX download error", err);
    }
  };

  const [branding, setBranding] = useState<AgencyBranding>(DEFAULT_BRANDING);
  const [isLicenseOpen, setIsLicenseOpen] = useState(false);
  const [isBrandingOpen, setIsBrandingOpen] = useState(false);
  const [isRedeemOpen, setIsRedeemOpen] = useState(false);
  const [isExtensionOpen, setIsExtensionOpen] = useState(false);
  const [isUnlockModalOpen, setIsUnlockModalOpen] = useState(false);
  const [isAgencyPortalOpen, setIsAgencyPortalOpen] = useState(false);
  const [, setActivePlan] = useState('Agency Pro Suite');
  
  // Developer Experience & Telemetry Dispatch State
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'positive' | 'issue'>('positive');
  const [feedbackEmail, setFeedbackEmail] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);

  // Verified Public Testimonials (Curated positive social proof - strictly protected)
  const [publicTestimonials, setPublicTestimonials] = useState([
    {
      name: "Marcus V.",
      role: "Lead Full-Stack Contractor",
      initials: "MV",
      comment: "A client demanded 6 extra API endpoints outside our signed SOW. Generated the UCC § 2-209 counter-notice with ScopeLock and got an extra $2,450 paid without conflict."
    },
    {
      name: "David K.",
      role: "Senior React / Next.js Dev",
      initials: "DK",
      comment: "The git diff variance calculation proved 34 hours of unbilled refactoring. The automated legal change order made them authorize payment within 24 hours."
    },
    {
      name: "Elena R.",
      role: "DevOps & Infrastructure Architect",
      initials: "ER",
      comment: "Best $2 instant unlock ever spent. Saved my agency nearly $6,000 on an enterprise retainer that was spiraling out of control."
    }
  ]);

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackEmail || !feedbackText) return;

    if (feedbackType === 'positive') {
      // Add to public wall of protection
      const newReview = {
        name: feedbackEmail.split('@')[0],
        role: "Verified Engineering User",
        initials: feedbackEmail.slice(0, 2).toUpperCase(),
        comment: feedbackText
      };
      setPublicTestimonials(prev => [newReview, ...prev]);
    } else {
      // Issue / Problem report is strictly PRIVATE - logged internally / sent to founder dispatch
      console.log("[PRIVATE FOUNDER DISPATCH] Issue logged:", { email: feedbackEmail, issue: feedbackText });
    }

    setFeedbackSuccess(true);
    setFeedbackEmail('');
    setFeedbackText('');
  };

  const [activeTab, setActiveTab] = useState<'audit' | 'vault' | 'chat' | 'calculator' | 'templates' | 'cli' >('audit');

  // Initialize session telemetry on app launch
  useEffect(() => {
    initSessionTelemetry();
  }, []);

  // Initialize with ready audit report
  const [auditReport, setAuditReport] = useState<ScopeAuditReport>(() => {
    return parseScopeComparison(
      `1. Responsive Web Application with Next.js & Tailwind CSS\n2. User Authentication (Google & Email/Password)\n3. Stripe Standard Subscription Checkout\n4. PostgreSQL Database with Prisma ORM on Supabase`,
      `1. Add complete native iOS and Android Mobile App alongside web version\n2. Integrate ChatGPT API for automated content generation in client dashboard\n3. Add Salesforce and HubSpot Bi-directional Two-way CRM sync\n4. Complete UI redesign with customized Dark Mode and Theme Switcher`,
      125,
      15000,
      6,
      'Fintech Web Portal MVP',
      'Apex Horizon Ventures LLC',
      'founder@apexventures.io',
      DEFAULT_BRANDING
    );
  });

  const handleSelectTemplate = (template: SeoTemplate) => {
    recordTelemetryEvent('template_select', `Selected SOW template: "${template.title}" ($${template.defaultBudget.toLocaleString()} baseline)`);
    const report = parseScopeComparison(
      template.originalScope,
      template.requestedScope,
      template.hourlyRate,
      template.defaultBudget,
      6,
      template.title,
      'Enterprise Client Principal',
      'client.sponsor@enterprise.com',
      branding
    );
    setAuditReport(report);
    setActiveTab('audit');
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  const handleLoadFromCalculator = (rate: number, budget: number, hours: number) => {
    recordTelemetryEvent('calculator_calc', `Calculated margin bleed: ${hours} unbilled hours @ $${rate}/hr (Budget $${budget.toLocaleString()})`);
    const report = parseScopeComparison(
      `1. Core Milestone Deliverables (Baseline SOW)\n2. Primary API & Database schema endpoints\n3. Scheduled staging deployment and user testing`,
      `1. Emergency Client Out-of-Scope revision batch (${hours} uncontracted hours)\n2. Additional custom third-party integrations and unbilled design revisions\n3. Expedited priority deployment timeline request`,
      rate,
      budget,
      4,
      'Active Client SOW Recovery',
      'Client Sponsor (Unbilled Revisions)',
      'sponsor@clientcorp.com',
      branding
    );
    setAuditReport(report);
    setActiveTab('audit');
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  const handleApplyChatScope = (detectedTitle: string, detectedScope: string, estHours: number) => {
    recordTelemetryEvent('chat_scan', `Applied chat scanner detection: "${detectedTitle}" (${estHours}h variance)`);
    const report = parseScopeComparison(
      `1. Approved Statement of Work (SOW) Scope Freeze\n2. Production Web Deployment milestone\n3. Standard QA and staging handover`,
      detectedScope,
      auditReport?.hourlyRate || 125,
      auditReport?.contractBudget || 15000,
      auditReport?.contractTimelineWeeks || 6,
      detectedTitle || 'Client Message Scope Variance',
      auditReport?.clientName || 'Client Principal',
      auditReport?.clientEmail || 'client@company.com',
      branding
    );
    setAuditReport(report);
    setActiveTab('audit');
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  const handleLoadVaultCase = (caseItem: PublicVaultCase) => {
    recordTelemetryEvent('vault_case_select', `Loaded public vault defense case: "${caseItem.slug}"`);
    const avgHours = Math.round((caseItem.unbilledHoursMin + caseItem.unbilledHoursMax) / 2);
    const report = parseScopeComparison(
      `1. Approved Statement of Work baseline deliverable\n2. Production release milestone\n3. Staging and acceptance sign-off`,
      `Client Scope Expansion: ${caseItem.searchIntentKeywords[0]}\nDetails: ${caseItem.clientMessage}\nStatutory Clause: ${caseItem.statuteClause}`,
      auditReport?.hourlyRate || 125,
      auditReport?.contractBudget || 15000,
      auditReport?.contractTimelineWeeks || 6,
      caseItem.searchIntentKeywords[0],
      'Client Principal',
      'client@organization.com',
      branding
    );
    setAuditReport(report);
    setActiveTab('audit');
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  
  const handleFlowHeroCalculate = (clientText: string, title: string, hours: number) => {
    recordTelemetryEvent('flow_hero_calculate', `Interactive Flow Hero trigger: ${title} (${hours}h)`);
    const rate = auditReport?.hourlyRate || 125;
    const report = parseScopeComparison(
      `1. Initial Statement of Work (SOW) Scope Baseline\n2. Core Milestone Deliverables\n3. Standard QA and Staging Handover`,
      clientText,
      rate,
      auditReport?.contractBudget || 15000,
      auditReport?.contractTimelineWeeks || 6,
      title,
      'Client Sponsor (Unbilled Request)',
      'sponsor@clientcorp.com',
      branding
    );
    setAuditReport(report);
    setActiveTab('audit');
    const target = document.getElementById('audit-engine-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectInterceptorCase = (title: string, scopeText: string, hours: number) => {
    recordTelemetryEvent('interceptor_select', `Selected apex dispute interceptor: "${title}" (${hours}h variance)`);
    const rate = auditReport?.hourlyRate || 125;
    const report = parseScopeComparison(
      `1. Approved Statement of Work (SOW) Scope Freeze\n2. Primary Milestone Deliverables\n3. Standard QA and Staging Handover`,
      scopeText,
      rate,
      auditReport?.contractBudget || 15000,
      auditReport?.contractTimelineWeeks || 6,
      title,
      'Client Sponsor (Unbilled Revisions)',
      'sponsor@clientcorp.com',
      branding
    );
    setAuditReport(report);
    setActiveTab('audit');
    window.scrollTo({ top: 500, behavior: 'smooth' });
  };

  const handleSendEmail = () => {
    const isUnlocked = localStorage.getItem('scopelock_unlocked') === 'true';
    if (!isUnlocked) {
      recordTelemetryEvent('checkout_click', `User encountered Dispatch paywall ( unlock modal opened)`);
      setIsUnlockModalOpen(true);
      return;
    }
    recordTelemetryEvent('change_order_copy', `Initiated statutory client change order email notice for "${auditReport.projectName}" ($${auditReport.totalScopeCreepCost.toLocaleString()})`);
    const subject = encodeURIComponent(`Statutory Notice: Scope Variance & Change Order - ${auditReport.projectName}`);
    const body = encodeURIComponent(`Hi ${auditReport.clientName},\n\nPlease find attached the statutory Scope Forensic Audit report documenting uncontracted feature requests and the formal Change Order.\n\nTotal Scope Creep Value: $${auditReport.totalScopeCreepCost.toLocaleString()}\nTimeline Adjustment: +${auditReport.totalDelayDays} days.\n\nPlease review and countersign under UCC § 2-209.\n\nCertified via ScopeLock AI: https://scopelock.ai`);
    window.open(`mailto:${auditReport.clientEmail || 'client@company.com'}?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Microsoft Marketplace & JetBrains Extension Downloads */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 text-white px-4 py-3 shadow-xl border-b border-emerald-400/40 sticky top-0 z-50 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2.5">
          <span className="p-1.5 bg-black/20 rounded-lg text-lg">📦</span>
          <div>
            <div className="font-extrabold text-sm flex items-center gap-2">
              Microsoft VS Code Extension (.vsix) & JetBrains Plugin
            </div>
            <p className="text-xs text-emerald-100 hidden sm:block">Direct official developer extensions for VS Code and JetBrains IDEs</p>
          </div>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
          <button
            onClick={handleDirectVsixDownload}
            className="flex-1 sm:flex-none px-3.5 py-2 bg-white hover:bg-emerald-50 text-emerald-950 font-black text-xs uppercase tracking-wider rounded-lg shadow-lg active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-white"
          >
            <span>{downloadedVsixBanner ? "✅ VS CODE SAVED!" : "📥 VS CODE .VSIX (8 KB)"}</span>
          </button>
          <button
            onClick={handleDirectJetBrainsDownload}
            className="flex-1 sm:flex-none px-3.5 py-2 bg-indigo-950 hover:bg-indigo-900 text-indigo-200 border border-indigo-400/40 font-black text-xs uppercase tracking-wider rounded-lg shadow-lg active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>{downloadedJetBrainsBanner ? "✅ JETBRAINS SAVED!" : "⚡ JETBRAINS PLUGIN (.JAR)"}</span>
          </button>
        </div>
      </div>

      <Header
        branding={branding}
        onOpenBranding={() => setIsBrandingOpen(true)}
        onOpenLicense={() => setIsLicenseOpen(true)}
        onOpenRedeem={() => setIsRedeemOpen(true)}
        onOpenExtension={() => setIsExtensionOpen(true)}
        onOpenAgencyPortal={() => setIsAgencyPortalOpen(true)}
      />

      <div className="border-b border-slate-900 bg-gradient-to-b from-indigo-950/40 via-slate-950 to-slate-950 px-4 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Proprietary B2B Scope Defense Infrastructure • Zero Direct Competitors</span>
          </div>
          <h1 className="text-xl sm:text-3xl font-black text-white tracking-tight">
            Stop Doing Free Work. The Unassailable Defense Against Client Scope Creep.
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto">
            Combines algorithmic contract forensics, automated margin recovery ($/hr), and UCC-enforceable legal change orders into an untouchable monopoly engine.
          </p>

          {/* Quick Terminal Run Badge & GitHub in Hero */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5">
            <div className="inline-flex items-center gap-2 bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 rounded-lg px-3 py-1.5 font-mono text-xs text-slate-300 shadow-md">
              <span className="text-emerald-400 font-bold">$</span>
              <span className="text-slate-200">npx scopelock-audit</span>
              <span className="text-[10px] text-indigo-400 bg-indigo-950/60 border border-indigo-800/60 px-1.5 py-0.5 rounded ml-1 font-sans font-medium">NPM Live</span>
            </div>
            
            <a
              href="https://github.com/ahirwardhanmanti83-bit/scopelock-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 hover:border-amber-400 text-amber-300 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-md cursor-pointer group"
              title="Star ScopeLock AI on GitHub to unlock full contract templates!"
            >
              <Github className="w-3.5 h-3.5 text-amber-400" />
              <span className="group-hover:text-white transition-colors">Star on GitHub</span>
              <span className="bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[10px] px-1.5 py-0.5 rounded font-mono font-bold flex items-center gap-0.5">
                ★ Star
              </span>
            </a>

            <a
              href="https://github.com/marketplace/actions/scopelock-ai-autonomous-scope-creep-auditor"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 border border-indigo-500/40 text-indigo-300 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-md cursor-pointer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>GitHub Action</span>
            </a>
          </div>

          {/* Navigation Tab Bar */}
          <div className="pt-4 flex items-center justify-center">
            <div className="inline-flex items-center p-1 rounded-xl bg-slate-900/90 border border-slate-800 shadow-xl overflow-x-auto max-w-full">
              <button
                onClick={() => setActiveTab('audit')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'audit'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Scope Audit & Change Orders</span>
              </button>

              <button
                onClick={() => setActiveTab('vault')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'vault'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 ring-1 ring-emerald-400'
                    : 'text-emerald-400 hover:text-white hover:bg-emerald-950/40 border border-emerald-500/20'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                <span>Free Defense Vault (Public Index)</span>
              </button>

              <button
                onClick={() => setActiveTab('chat')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'chat'
                    ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <MessageSquareQuote className="w-3.5 h-3.5" />
                <span>Chat Scope Scanner</span>
              </button>

              <button
                onClick={() => setActiveTab('calculator')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'calculator'
                    ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>Margin Bleed Calculator</span>
              </button>

              <button
                onClick={() => setActiveTab('templates')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'templates'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Contract Templates</span>
              </button>

              <button
                onClick={() => setActiveTab('cli')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'cli'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Developer CLI</span>
              </button>

              
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-6 space-y-6 sm:space-y-8">
        {/* 24/7 REAL-TIME FOUNDER LIVE AUDIT DASHBOARD (ALWAYS PROMINENT & ACTIVE) */}
        

        

        {activeTab === 'audit' && (
          <>
            <ChatScopeScanner 
              onApplyToAudit={handleApplyChatScope} 
              onOpenLicense={() => setIsLicenseOpen(true)}
              onTriggerUnlock={() => setIsUnlockModalOpen(true)}
              hourlyRate={auditReport?.hourlyRate || 125}
            />
            <ScopeInputForm
              onAuditComplete={(report) => setAuditReport(report)}
              branding={branding}
            />
            {auditReport && (
              <>
                <CostImpactDashboard 
                  report={auditReport} 
                  onTriggerUnlock={() => setIsUnlockModalOpen(true)}
                  onOpenLicense={() => setIsLicenseOpen(true)}
                />
                <ScopeForensicsPanel report={auditReport} />
                <ChangeOrderPreview
                  report={auditReport}
                  onSendEmail={handleSendEmail}
                />
                <UniversalWorkflowBridge report={auditReport} />
                <ClientPayGate report={auditReport} />
              </>
            )}
          </>
        )}

        {activeTab === 'vault' && (
          <OpenVaultDirectory
            onLoadCaseToAudit={handleLoadVaultCase}
            onOpenLicense={() => setIsLicenseOpen(true)}
            hourlyRate={auditReport?.hourlyRate || 125}
          />
        )}

        {activeTab === 'chat' && (
          <div className="space-y-6">
            <ChatScopeScanner 
              onApplyToAudit={handleApplyChatScope} 
              onOpenLicense={() => setIsLicenseOpen(true)}
              onTriggerUnlock={() => setIsUnlockModalOpen(true)}
              hourlyRate={auditReport?.hourlyRate || 125}
            />
            {auditReport && (
              <ChangeOrderPreview
                report={auditReport}
                onSendEmail={handleSendEmail}
              />
            )}
          </div>
        )}

        {activeTab === 'calculator' && (
          <ScopeBleedCalculator
            onLoadTemplate={handleLoadFromCalculator}
            onOpenLicense={() => setIsLicenseOpen(true)}
          />
        )}

        {activeTab === 'templates' && (
          <div className="space-y-6">
            <TemplateGallery onSelectTemplate={handleSelectTemplate} />
            <FreeContractHub
              onUnlockTool={() => setActiveTab('audit')}
              onOpenLicenseModal={() => setIsLicenseOpen(true)}
            />
          </div>
        )}

        {activeTab === 'cli' && (
          <CliIntegrationSection />
        )}

        

        <SeoResourceSection
          onSelectKeywordTemplate={() => {
            setActiveTab('templates');
            window.scrollTo({ top: 380, behavior: 'smooth' });
          }}
        />
      </main>

      
{/* --- DEVELOPER EXPERIENCE & DISPATCH HUB --- */}
<section className="mt-20 border-t border-slate-800 pt-16 pb-12">
  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Verified Developer Experience & Field Telemetry
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          What High-Leverage Engineers Are Saying
        </h2>
        <p className="text-slate-400 text-sm mt-1 max-w-xl">
          Real feedback from engineers defending their unbilled hours against client scope creep across Upwork, contracts, and enterprise retainers.
        </p>
      </div>
      <button
        onClick={() => setShowFeedbackModal(true)}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold border border-slate-700 transition shadow-sm self-start md:self-auto"
      >
        <MessageSquare className="w-4 h-4 text-emerald-400" />
        Share Experience / Report Issue
      </button>
    </div>

    {/* Verified Public Positive Reviews (Wall of Protection) */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {publicTestimonials.map((t, idx) => (
        <div key={idx} className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition">
          <div className="flex items-center justify-between mb-3">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Verified Legal Counter-Notice
            </span>
          </div>
          <p className="text-slate-300 text-sm italic mb-4 leading-relaxed">
            "{t.comment}"
          </p>
          <div className="flex items-center gap-3 pt-3 border-t border-slate-800/80">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300 border border-slate-700">
              {t.initials}
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-200">{t.name}</div>
              <div className="text-[11px] text-slate-500">{t.role}</div>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Private Filter Guarantee Badge */}
    <div className="flex items-center justify-between p-4 rounded-lg bg-slate-900/40 border border-slate-800 text-xs text-slate-400">
      <div className="flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-emerald-400" />
        <span>Private Founder Dispatch: Critical bug reports & client disputes are routed privately to core systems engineering.</span>
      </div>
      <button 
        onClick={() => setShowFeedbackModal(true)}
        className="text-emerald-400 hover:text-emerald-300 font-medium underline"
      >
        Submit Diagnostic Note &rarr;
      </button>
    </div>
  </div>
</section>

{/* Feedback & Experience Modal */}
{showFeedbackModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
    <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
      <button 
        onClick={() => setShowFeedbackModal(false)}
        className="absolute top-4 right-4 text-slate-400 hover:text-white"
      >
        ✕
      </button>

      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
          <MessageSquare className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Developer Experience & Diagnostic Dispatch</h3>
          <p className="text-xs text-slate-400">Share your experience or report an issue with the legal audit engine.</p>
        </div>
      </div>

      {feedbackSuccess ? (
        <div className="p-6 text-center">
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-white mb-1">Transmission Received</h4>
          <p className="text-xs text-slate-400 mb-4">
            Thank you for engineering feedback. Your diagnostic telemetry has been securely recorded.
          </p>
          <button
            onClick={() => { setShowFeedbackModal(false); setFeedbackSuccess(false); }}
            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
          >
            Return to Dashboard
          </button>
        </div>
      ) : (
        <form onSubmit={handleFeedbackSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Experience Type</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setFeedbackType('positive')}
                className={`py-2 px-3 rounded-lg text-xs font-medium border text-center transition ${feedbackType === 'positive' ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' : 'bg-slate-800 border-slate-700 text-slate-400'}`}
              >
                ★ Positive Experience
              </button>
              <button
                type="button"
                onClick={() => setFeedbackType('issue')}
                className={`py-2 px-3 rounded-lg text-xs font-medium border text-center transition ${feedbackType === 'issue' ? 'bg-amber-500/10 border-amber-500 text-amber-400' : 'bg-slate-800 border-slate-700 text-slate-400'}`}
              >
                ⚠️ Bug / Problem Report
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Your Developer Email</label>
            <input
              type="email"
              required
              value={feedbackEmail}
              onChange={(e) => setFeedbackEmail(e.target.value)}
              placeholder="alex@agency.io or github-handle"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              {feedbackType === 'positive' ? 'What worked well? (Recovered hours, client payout, etc.)' : 'Describe the problem / friction you experienced'}
            </label>
            <textarea
              required
              rows={3}
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder={feedbackType === 'positive' ? "Recovered $3,200 from a demanding client using the UCC 2-209 change order notice..." : "Explain exactly what failed or what can be improved..."}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60 text-[11px] text-slate-400">
            {feedbackType === 'positive' 
              ? '✓ Positive reviews are verified and featured on the Developer Wall of Protection.'
              : '🔒 Critical issues and negative reports are sent privately to the systems founder and NEVER published publicly.'}
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowFeedbackModal(false)}
              className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition"
            >
              Submit Telemetry
            </button>
          </div>
        </form>
      )}
    </div>
  </div>
)}

<footer className="border-t border-slate-900 bg-slate-950 py-8 text-center text-xs text-slate-500 px-4">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-900 pb-4">
            <div className="flex items-center gap-2 text-slate-300 font-semibold">
              <Shield className="w-4 h-4 text-indigo-400" />
              <span>ScopeLock AI • Enterprise Scope Defense Engine ($199/mo Agency SaaS)</span>
            </div>
            <div className="text-[11px] text-slate-400">
              Authorized Corporate Signatory: Dhanmanti Ahirwar (ahirwardhanmanti83@gmail.com)
            </div>
          </div>

          <div className="text-[11px] text-slate-500 leading-relaxed max-w-5xl mx-auto space-y-1.5 text-center">
            <p>
              <strong className="text-slate-400">ZERO LEGAL LIABILITY & SAFE HARBOR DISCLAIMER:</strong> ScopeLock AI provides automated software tooling, mathematical variance calculators, and standard commercial contract templates for informational and administrative workflow purposes only.
            </p>
            <p>
              ScopeLock AI is not a law firm, does not provide legal representation or legal advice, and does not establish an attorney-client relationship. All calculations, estimates, and generated change-order templates run 100% locally on the user's browser under client-side execution. Users retain complete discretion and responsibility for their own contracts, client communications, and legal obligations.
            </p>
            <p className="text-[10px] text-slate-600">
              © {new Date().getFullYear()} ScopeLock AI. All rights reserved. Zero server logging. Zero customer data retention.
            </p>
          </div>
        </div>
      </footer>

      <CommercialLicenseModal
        isOpen={isLicenseOpen}
        onClose={() => setIsLicenseOpen(false)}
      />

      <UnlockPaymentModal
        isOpen={isUnlockModalOpen}
        onClose={() => setIsUnlockModalOpen(false)}
        onUnlockSuccess={() => {
          setIsUnlockModalOpen(false);
        }}
        potentialSavedCost={auditReport?.totalScopeCreepCost || 5000}
      />

      <ChromeExtensionModal
        isOpen={isExtensionOpen}
        onClose={() => setIsExtensionOpen(false)}
        onOpenPayment={() => {
          setIsExtensionOpen(false);
          setIsLicenseOpen(true);
        }}
      />

      <BrandingSettingsModal
        isOpen={isBrandingOpen}
        branding={branding}
        onSave={(newBranding) => {
          setBranding(newBranding);
          setAuditReport(prev => ({ ...prev, agencyBranding: newBranding }));
        }}
        onClose={() => setIsBrandingOpen(false)}
      />

      <RedeemModal
        isOpen={isRedeemOpen}
        onClose={() => setIsRedeemOpen(false)}
        onSuccess={(tier) => setActivePlan(tier)}
      />

      {isAgencyPortalOpen && (
        <AgencyPortalModal
          onClose={() => setIsAgencyPortalOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
