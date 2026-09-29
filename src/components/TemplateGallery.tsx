import React from 'react';
import { SeoTemplate, SEO_TEMPLATES } from '../data/seoTemplates';
import { Sparkles, ArrowRight, ShieldAlert, Cpu, FileText, CheckCircle2 } from 'lucide-react';

interface TemplateGalleryProps {
  onSelectTemplate: (template: SeoTemplate) => void;
}

export const TemplateGallery: React.FC<TemplateGalleryProps> = ({ onSelectTemplate }) => {
  return (
    <section className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-5 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold tracking-wide">
              ORGANIC INBOUND RECOVERY
            </span>
            <span className="text-xs text-slate-400">• High-Frequency Industry Benchmarks</span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-white mt-1 flex items-center gap-2">
            <FileText className="w-4 h-4 text-indigo-400" />
            <span>Ready-to-Deploy Contract Addendum Templates</span>
          </h2>
          <p className="text-xs text-slate-400">
            Select a verified industry contract template to instantly audit unbilled scope variances and enforce binding UCC § 2-209 change orders.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {SEO_TEMPLATES.map((tmpl) => (
          <div
            key={tmpl.id}
            className="bg-slate-950/80 border border-slate-800 hover:border-indigo-500/50 rounded-xl p-4 flex flex-col justify-between transition-all duration-200 group hover:shadow-lg hover:shadow-indigo-500/5"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
                  {tmpl.category}
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  ${tmpl.hourlyRate}/hr std
                </span>
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors leading-snug mb-1.5">
                {tmpl.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-3 line-clamp-2">
                {tmpl.description}
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {tmpl.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <button
                onClick={() => onSelectTemplate(tmpl)}
                className="w-full py-2 px-3 text-xs font-bold text-slate-200 hover:text-white bg-slate-900 hover:bg-indigo-600 border border-slate-800 hover:border-indigo-500 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
              >
                <span>Load Industry Template</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
