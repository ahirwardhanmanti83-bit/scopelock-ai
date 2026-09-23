import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
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
import { FounderTelemetryDashboard } from './components/FounderTelemetryDashboard';
import { ChromeExtensionModal } from './components/ChromeExtensionModal';
import { UnlockPaymentModal } from './components/UnlockPaymentModal';
import { AgencyPortalModal } from './components/AgencyPortalModal';
import { ScopeAuditReport, AgencyBranding } from './types';
import { parseScopeComparison } from './utils/parser';
import { SeoTemplate } from './data/seoTemplates';
import { initSessionTelemetry, recordTelemetryEvent } from './utils/telemetry';
import { OpenVaultDirectory } from './components/OpenVaultDirectory';
import { PublicVaultCase } from './data/publicVaultData';
import { 
  ShieldCheck, 
  Shield, 
  FileText, 
  MessageSquareQuote, 
  Calculator, 
  Terminal, 
  BarChart3,
  BookOpen
} from 'lucide-react';

const DEFAULT_BRANDING: AgencyBranding = {
  agencyName: 'Apex Engineering Labs',
  supportEmail: 'deliveries@apexlabs.dev'
};

export function App() {
  const [branding, setBranding] = useState<AgencyBranding>(DEFAULT_BRANDING);
  const [isLicenseOpen, setIsLicenseOpen] = useState(false);
  const [isBrandingOpen, setIsBrandingOpen] = useState(false);
  const [isRedeemOpen, setIsRedeemOpen] = useState(false);
  const [isExtensionOpen, setIsExtensionOpen] = useState(false);
  const [isUnlockModalOpen, setIsUnlockModalOpen] = useState(false);
  const [isAgencyPortalOpen, setIsAgencyPortalOpen] = useState(false);
  const [, setActivePlan] = useState('Agency Pro Suite');
  const [activeTab, setActiveTab] = useState<'audit' | 'vault' | 'chat' | 'calculator' | 'templates' | 'cli' | 'telemetry'>('audit');

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

  const handleSendEmail = () => {
    recordTelemetryEvent('change_order_copy', `Initiated statutory client change order email notice for "${auditReport.projectName}" ($${auditReport.totalScopeCreepCost.toLocaleString()})`);
    const subject = encodeURIComponent(`Statutory Notice: Scope Variance & Change Order - ${auditReport.projectName}`);
    const body = encodeURIComponent(`Hi ${auditReport.clientName},\n\nPlease find attached the statutory Scope Forensic Audit report documenting uncontracted feature requests and the formal Change Order.\n\nTotal Scope Creep Value: $${auditReport.totalScopeCreepCost.toLocaleString()}\nTimeline Adjustment: +${auditReport.totalDelayDays} days.\n\nPlease review and countersign under UCC § 2-209.\n\nCertified via ScopeLock AI: https://scopelock.ai`);
    window.open(`mailto:${auditReport.clientEmail || 'client@company.com'}?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
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

              <button
                onClick={() => setActiveTab('telemetry')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'telemetry'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Founder Telemetry HUD</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-6 space-y-6 sm:space-y-8">
        {activeTab === 'audit' && (
          <>
            <ChatScopeScanner 
              onApplyToAudit={handleApplyChatScope} 
              onOpenLicense={() => setIsLicenseOpen(true)}
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

        {activeTab === 'telemetry' && (
          <FounderTelemetryDashboard />
        )}

        <SeoResourceSection
          onSelectKeywordTemplate={() => {
            setActiveTab('templates');
            window.scrollTo({ top: 380, behavior: 'smooth' });
          }}
        />
      </main>

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
