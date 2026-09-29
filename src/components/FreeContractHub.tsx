import React, { useState } from 'react';
import { FileText, Copy, Check, Download, ShieldCheck, Sparkles, ChevronRight, Lock } from 'lucide-react';
import { copyToClipboard } from '../utils/clipboard';

interface FreeContractTemplate {
  id: string;
  title: string;
  category: string;
  targetAudience: string;
  statute: string;
  sampleClause: string;
  fullMarkdown: string;
}

const FREE_TEMPLATES: FreeContractTemplate[] = [
  {
    id: 'ucc-2209-change-order',
    title: 'Statutory UCC § 2-209 Change Order Agreement',
    category: 'Master Service Agreement',
    targetAudience: 'Software Development Agencies & Dev Studios',
    statute: 'Uniform Commercial Code § 2-209 (Bilateral Modification)',
    sampleClause: '"No verbal communication, Slack message, or ticket status shift shall constitute binding modification of the delivery timeline or financial consideration without this executed addendum."',
    fullMarkdown: `================================================================================
STATUTORY STATEMENT OF WORK (SOW) AMENDMENT & CHANGE ORDER
PURSUANT TO UNIFORM COMMERCIAL CODE (UCC) § 2-209
================================================================================

1. RECITALS & REFERENCE
This Amendment to Statement of Work (the "Change Order") is entered into by and 
between Contractor ("Agency") and Client ("Purchaser") modifying the referenced
Master Services Agreement / Statement of Work.

2. STATUTORY CONSIDERATION REQUIREMENT (UCC § 2-209)
Pursuant to UCC § 2-209 and prevailing commercial contract law, the parties 
expressly stipulate that any deviation, expansion, or addition of deliverables 
beyond the baseline SOW constitutes new consideration requiring formal 
compensation adjustment and delivery timeline modification.

3. SCHEDULE & FINANCIAL RATIFICATION
- Baseline Billable Engineering Rate: Applicable Standard Studio Hourly Rate
- Engineering Allocation: All out-of-scope tasks shall be tracked and compensated.
- Milestone Adjustment: Client agrees that delivery targets automatically extend 
  pro-rata with additional specification approvals.

4. BINDING SIGNATURE & DIGITAL RATIFICATION
IN WITNESS WHEREOF, the parties hereto have executed this statutory amendment.

Agency Officer: __________________________   Date: _________________
Client Officer: __________________________   Date: _________________

[GENERATED VIA SCOPELOCK AI™ — VERIFIED ENTERPRISE B2B SCOPE DEFENSE ENGINE]`
  },
  {
    id: 'slack-email-scope-waiver',
    title: 'Slack / Email Out-of-Scope Disavowal Notice',
    category: 'Client Communications',
    targetAudience: 'Freelancers & Agile Engineering Teams',
    statute: 'Statute of Frauds & Bilateral Assent Protocols',
    sampleClause: '"Informal chat requests are explicitly non-binding estimates. Development will not commence without formal change-order deposit."',
    fullMarkdown: `================================================================================
FORMAL NOTICE: OUT-OF-SCOPE SPECIFICATION RECEIPT & CHANGE-ORDER REQUIREMENT
================================================================================

DATE: [CURRENT DATE]
TO: [CLIENT STAKEHOLDER / PROJECT SPONSOR]
FROM: [ENGINEERING LEAD / CONTRACTOR]
SUBJECT: Scope Clarification regarding recent Slack / Email feature request

Dear [Client Name],

We have received your recent request regarding:
[INSERT REQUESTED FEATURE / REVISION DESCRIPTION]

Upon review of our operative Statement of Work (SOW), this capability falls outside 
the contracted baseline deliverables. Under our engineering governance protocol:

1. WORK HALT ON UNCONTRACTED FEATURES: In order to protect your core milestone 
   delivery date, engineering cannot proceed with this feature under the current budget.
2. AUTOMATIC VARIANCE AUDIT: Our team has generated a formal ScopeLock change order
   specifying the engineering hours ($/hr) and required schedule extension.
3. NEXT ACTION: Please review and execute the attached Change Order so we can 
   schedule developer sprint capacity.

Review official ScopeLock Change Order:
[ATTACHED SCOPELOCK AMENDMENT]

Sincerely,
[Engineering Project Management Team]`
  },
  {
    id: 'milestone-acceptance-freeze',
    title: 'Sprint Milestone Acceptance & Scope Freeze Sign-Off',
    category: 'Agile Governance',
    targetAudience: 'Product Managers & Full-Stack Consultancies',
    statute: 'Commercial Acceptance & Waiver of Latent Defect Claims',
    sampleClause: '"Once signed, milestone deliverables are accepted as complete. Subsequent revisions are billed under a new ScopeLock change order."',
    fullMarkdown: `================================================================================
MILESTONE ACCEPTANCE & COMPREHENSIVE SCOPE FREEZE SIGN-OFF
================================================================================

PROJECT: [PROJECT NAME]
MILESTONE: [SPRINT / MILESTONE NUMBER]
DELIVERY RELEASE: [RELEASE VERSION]

1. FORMAL ACCEPTANCE OF DELIVERABLES
Client confirms that all deliverables specified under Milestone [X] have been 
inspected, tested, and accepted in accordance with functional specifications.

2. SCOPE FREEZE & SUBSEQUENT AMENDMENTS
Upon digital or physical execution of this certificate:
a) The deliverables for this milestone are deemed fully satisfied.
b) Any subsequent feature enhancements, aesthetic modifications, or logic changes 
   shall be classified as Scope Variance and billed via ScopeLock Change Orders.

Authorized Client Acceptance:
Signature: __________________________   Date: _________________
Name & Title: _______________________   Entity: _______________

[AUDITED & PROTECTED VIA SCOPELOCK AI™ GOVERNANCE SYSTEM]`
  }
];

interface FreeContractHubProps {
  onUnlockTool: () => void;
  onOpenLicenseModal: () => void;
}

export const FreeContractHub: React.FC<FreeContractHubProps> = ({ onUnlockTool, onOpenLicenseModal }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<FreeContractTemplate>(FREE_TEMPLATES[0]);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await copyToClipboard(selectedTemplate.fullMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([selectedTemplate.fullMarkdown], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `${selectedTemplate.id}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 sm:p-7 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-extrabold uppercase tracking-wider">
              100% FREE LEGAL DOWNLOADS
            </span>
            <span className="text-xs text-slate-400">• High-Intent Agency Contract Hub</span>
          </div>
          <h2 className="text-base sm:text-xl font-bold text-white mt-1 flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-400" />
            <span>Standard Agency Scope-Creep Defense Legal Templates</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-3xl">
            Free copy-paste legal clauses for software studios, freelance engineers, and digital consultancies to block unpaid out-of-scope work under statutory contract law.
          </p>
        </div>

        <button
          onClick={onOpenLicenseModal}
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all whitespace-nowrap cursor-pointer"
        >
          <span>Automate Everything ($199/mo)</span>
        </button>
      </div>

      {/* Template selector tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {FREE_TEMPLATES.map((tmpl) => {
          const isSelected = selectedTemplate.id === tmpl.id;
          return (
            <button
              key={tmpl.id}
              onClick={() => setSelectedTemplate(tmpl)}
              className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-indigo-950/40 border-indigo-500 ring-1 ring-indigo-500/50'
                  : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 text-slate-400'
              }`}
            >
              <div className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider mb-1 font-semibold">
                {tmpl.category}
              </div>
              <div className="text-xs font-bold text-white mb-1 leading-snug">
                {tmpl.title}
              </div>
              <div className="text-[11px] text-slate-400 line-clamp-2">
                {tmpl.targetAudience}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Template Viewer with Upsell Banner */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-900 pb-3">
          <div>
            <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-950/60 border border-emerald-900/50 px-2 py-0.5 rounded">
              {selectedTemplate.statute}
            </span>
            <h3 className="text-sm font-bold text-white mt-1.5">{selectedTemplate.title}</h3>
          </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onOpenLicenseModal}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors cursor-pointer shadow-sm shadow-indigo-500/20"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Unlock Full Contract ($199/mo)</span>
              </button>
            </div>
        </div>

        {/* Highlighted key clause */}
        <div className="bg-indigo-950/20 border border-indigo-500/20 rounded-lg p-3 text-xs text-indigo-200 italic">
          <span className="font-bold not-italic text-indigo-400">Core Legal Provision: </span>
          {selectedTemplate.sampleClause}
        </div>

        {/* Code/Text Viewer */}
        <div className="bg-slate-900/90 border border-slate-800/80 rounded-lg p-3.5 font-mono text-[11px] text-slate-300 leading-relaxed max-h-[220px] overflow-y-auto whitespace-pre">
          {selectedTemplate.fullMarkdown}
        </div>

        {/* High Conversion Upsell Box */}
        <div className="bg-gradient-to-r from-indigo-950/60 via-slate-900 to-indigo-950/60 border border-indigo-500/30 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600/20 text-indigo-400 rounded-lg shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-white">Don't manually copy-paste Word documents</h4>
              <p className="text-[11px] text-slate-400">
                ScopeLock AI automatically detects unbudgeted tasks, computes dev-hour variance, and emails client change orders instantly.
              </p>
            </div>
          </div>
          <button
            onClick={onUnlockTool}
            className="w-full sm:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <span>Generate Instant Change Order ($19 Pass)</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
