import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { DailyQuoterStandup } from './components/DailyQuoterStandup';
import { ScopeAuditor } from './components/ScopeAuditor';
import { ChangeOrderGenerator } from './components/ChangeOrderGenerator';
import { MarginCalculator } from './components/MarginCalculator';
import { VaultDefense } from './components/VaultDefense';
import { PricingModal } from './components/PricingModal';
import { ProfileModal } from './components/ProfileModal';
import { ClientApprovalPortal } from './components/ClientApprovalPortal';
import { LandingSections } from './components/LandingSections';
import { LicenseState, ScopeAuditResult, ChangeOrderDocument } from './types';
import { GitBranch, ShieldCheck, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'daily_quoter' | 'auditor' | 'change_order' | 'margin' | 'vault' | 'chat'>('auditor');
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('orderId');
    }
    return null;
  });

  const [license, setLicense] = useState<LicenseState>({
    isPro: false,
    tier: 'free',
    tierName: 'Free Community Tier',
    scansUsedThisMonth: 0,
  });

  const [changeOrderData, setChangeOrderData] = useState<Partial<ChangeOrderDocument> | undefined>(undefined);

  // Load saved license on mount and check for redeem url parameter
  useEffect(() => {
    try {
      const saved = localStorage.getItem('scopelock_license');
      if (saved) {
        setLicense(JSON.parse(saved));
      }
      if (typeof window !== 'undefined') {
        const p = new URLSearchParams(window.location.search);
        if (p.get('redeem') || p.get('appsumo') || p.get('code') || p.get('key')) {
          setIsPricingOpen(true);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleUnlockPass = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (
      clean.includes('PRO') ||
      clean.includes('AGENCY') ||
      clean === 'DEMO-PRO-2026' ||
      clean === 'PRO-DEMO-2026'
    ) {
      const isAgency = clean.includes('AGENCY') || clean === 'DEMO-PRO-2026';
      const updated: LicenseState = {
        ...license,
        tier: isAgency ? 'agency' : 'pro',
        isPro: true,
        tierName: isAgency ? 'Agency ($199/mo)' : 'Pro ($19/mo)',
      };
      setLicense(updated);
      localStorage.setItem('scopelock_license', JSON.stringify(updated));
      return true;
    }
    return false;
  };

  const handleLoadAuditIntoChangeOrder = (audit: ScopeAuditResult, hourlyRate: number) => {
    const formattedItems = (audit.detectedItems || []).map((item) => ({
      description: item.title + (item.riskExplanation ? ` (${item.riskExplanation})` : ''),
      hours: item.estimatedHours,
      cost: item.costImpact,
    }));

    setChangeOrderData({
      projectName: 'Client Milestone Revision Deliverable',
      hourlyRate,
      totalHours: audit.totalHours,
      totalCost: audit.totalCostUSD,
      timelineExtensionDays: audit.timelineDelayDays,
      items: formattedItems.length > 0 ? formattedItems : [
        { description: 'Unscheduled feature revisions outside baseline SOW', hours: audit.totalHours, cost: audit.totalCostUSD }
      ],
    });
    setActiveTab('change_order');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (orderId) {
    return (
      <ClientApprovalPortal
        orderId={orderId}
        onExitToDashboard={() => {
          setOrderId(null);
          try {
            const url = new URL(window.location.href);
            url.searchParams.delete('orderId');
            window.history.replaceState({}, '', url.pathname);
          } catch {
            window.location.href = '/';
          }
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white pb-24">
      {/* Navigation & Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        license={license}
        onOpenPricing={() => setIsPricingOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* Main Content View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-12">
        {activeTab === 'auditor' && (
          <ScopeAuditor onLoadIntoChangeOrder={handleLoadAuditIntoChangeOrder} />
        )}

        {activeTab === 'daily_quoter' && (
          <DailyQuoterStandup
            license={license}
            onOpenPricing={() => setIsPricingOpen(true)}
            onUnlockInstantPass={handleUnlockPass}
            onLoadIntoChangeOrder={handleLoadAuditIntoChangeOrder}
          />
        )}

        {activeTab === 'change_order' && (
          <ChangeOrderGenerator
            initialDocument={changeOrderData}
            license={license}
            onOpenPricing={() => setIsPricingOpen(true)}
          />
        )}

        {activeTab === 'margin' && (
          <MarginCalculator onOpenPricing={() => setIsPricingOpen(true)} />
        )}

        {activeTab === 'vault' && (
          <VaultDefense />
        )}

        {activeTab === 'chat' && (
          <ScopeAuditor onLoadIntoChangeOrder={handleLoadAuditIntoChangeOrder} />
        )}

        {/* Landing Page Content: 3 Screenshots, 3 Simple Steps, Free Email Signup, and FAQs */}
        <LandingSections
          license={license}
          onOpenPricing={() => setIsPricingOpen(true)}
          onStartScanning={() => {
            setActiveTab('auditor');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onEmailSignupSuccess={(email) => {
            setLicense((prev) => ({ ...prev, email }));
          }}
        />
      </main>

      {/* Sticky Bottom Floating Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 border-t border-slate-800 px-4 py-3 backdrop-blur-md shadow-2xl">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="font-semibold text-slate-200">Scope Defense Active:</span>
            <span className="text-slate-400 hidden sm:inline">
              Stop doing free work. Detect scope creep in your Git repo before you ship.
            </span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              onClick={() => setIsPricingOpen(true)}
              className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-md shadow-indigo-600/20"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Pro Plan ($19/mo)</span>
            </button>
            <button
              onClick={() => setIsPricingOpen(true)}
              className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-medium text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Agency ($199/mo)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Pricing / Licensing Modal */}
      <PricingModal
        isOpen={isPricingOpen}
        onClose={() => setIsPricingOpen(false)}
        license={license}
        onActivateLicense={(newLic) => setLicense(newLic)}
      />

      {/* Creator Signatory & Payout Profile Modal */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
