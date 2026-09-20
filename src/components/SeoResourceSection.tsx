import React, { useState } from 'react';
import { HelpCircle, BookOpen, Calculator, FileCheck, CheckCircle2, ChevronDown, ChevronUp, ArrowRight, ShieldCheck } from 'lucide-react';

interface SeoResourceSectionProps {
  onSelectKeywordTemplate: (type: string) => void;
}

export const SeoResourceSection: React.FC<SeoResourceSectionProps> = ({ onSelectKeywordTemplate }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "What is Scope Creep and how does ScopeLock AI detect it?",
      a: "Scope creep refers to unbudgeted, unauthorized feature requests and deliverables added after a Statement of Work (SOW) or sprint contract is signed. ScopeLock AI performs algorithmic clause forensics between the signed scope and new client requests, calculating exact dev-hour variance and statutory cost impact."
    },
    {
      q: "How does statutory UCC § 2-209 make Change Orders legally enforceable?",
      a: "Under the Uniform Commercial Code (UCC) § 2-209, written modifications and notices of variance signed or ratified by contracting parties legally amend delivery timelines, financial liability, and contract consideration without requiring an entirely new master service agreement."
    },
    {
      q: "Can agencies white-label these Change Orders for their clients?",
      a: "Yes. ScopeLock AI includes instant corporate branding settings where digital agencies, consultancies, and freelancers can embed their custom company name, delivery emails, and legal notice clauses on every generated PDF and email."
    },
    {
      q: "How does the Cost Impact Calculator compute unbilled margin loss?",
      a: "The engine multiplies identified scope variance tasks by industry benchmark developer hours, applies your standard agency hourly rate (e.g., $125 - $175/hr), and factors in project timeline drift to provide a verifiable billable total."
    }
  ];

  const programmaticKeywords = [
    {
      title: "Fixed-Price Contract Out-of-Scope Protection",
      category: "Agency Legal",
      desc: "Stop eating $5k - $20k in developer hours on fixed-bid project agreements.",
      badge: "FREE CALCULATOR"
    },
    {
      title: "Statutory UCC § 2-209 Contract Amendment Notice",
      category: "Contract Law",
      desc: "Formal statutory notification template for client scope variance ratification.",
      badge: "LEGAL SPEC"
    },
    {
      title: "Shopify Plus & Webflow Agency Margin Recovery",
      category: "E-Commerce",
      desc: "Instant change order generator for custom theme expansions and ERP integrations.",
      badge: "HIGH SEARCH"
    },
    {
      title: "Sprint Scope Creep & Velocity Drift Audit",
      category: "Agile / Scrum",
      desc: "Measure engineering sprint velocity erosion caused by unbudgeted stakeholder asks.",
      badge: "AUDIT TOOL"
    }
  ];

  return (
    <section className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 sm:p-7 space-y-8">
      {/* High Intent Google Indexing Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-[10px] font-extrabold uppercase tracking-wider">
            FREE AGENCY RESOURCE DIRECTORY
          </span>
          <span className="text-xs text-slate-400">• Programmatic SEO Knowledge Hub</span>
        </div>
        <h2 className="text-base sm:text-xl font-bold text-white mt-1.5 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-indigo-400" />
          <span>Scope-Creep Defense & Change-Order Knowledge Base</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
          Everything software consultancies, freelance engineers, and digital agencies need to calculate unbudgeted deliverables, recover project margins, and legally enforce client change orders.
        </p>
      </div>

      {/* Programmatic Tool Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {programmaticKeywords.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-indigo-500/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-mono text-indigo-400 bg-indigo-950/50 px-2 py-0.5 rounded border border-indigo-900/50">
                  {item.category}
                </span>
                <span className="text-[10px] font-extrabold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900/40">
                  {item.badge}
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-100 mb-1">
                {item.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
            <button
              onClick={() => onSelectKeywordTemplate(item.title)}
              className="mt-3 text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
            >
              <span>Launch interactive calculator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* FAQ Section with Rich Schema compatibility */}
      <div className="border-t border-slate-800/80 pt-6 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-indigo-400" />
          <span>Frequently Asked Questions (Agency Scope & Contract Law)</span>
        </h3>

        <div className="space-y-2.5">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="rounded-xl border border-slate-800/90 bg-slate-950/40 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full text-left p-3.5 flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-200 hover:text-white cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-indigo-400 shrink-0 ml-2" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                  )}
                </button>
                {isOpen && (
                  <div className="p-3.5 pt-0 text-xs text-slate-400 border-t border-slate-900/60 leading-relaxed bg-slate-950/80">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
