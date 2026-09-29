import React, { useState } from 'react';
import { 
  GitPullRequest, 
  Copy, 
  CheckCircle2, 
  Download, 
  Terminal, 
  FileCode, 
  Share2, 
  Layers, 
  ExternalLink,
  Kanban,
  CheckSquare
} from 'lucide-react';
import { ScopeAuditReport } from '../types';
import { recordTelemetryEvent } from '../utils/telemetry';
import { copyToClipboard } from '../utils/clipboard';

interface UniversalWorkflowBridgeProps {
  report: ScopeAuditReport;
}

export const UniversalWorkflowBridge: React.FC<UniversalWorkflowBridgeProps> = ({ report }) => {
  const [activeFormat, setActiveFormat] = useState<'jira' | 'github' | 'json' | 'markdown'>('github');
  const [copied, setCopied] = useState(false);

  // Generate payloads for Jira, GitHub, Markdown, JSON
  const githubIssueMarkdown = `## 🚨 Scope Variance & Change Order: ${report.projectName}
**Client:** ${report.clientName}
**Audit Date:** ${report.auditDate}
**Total Financial Impact:** $${report.totalScopeCreepCost.toLocaleString()} (${report.totalScopeCreepHours} unbudgeted dev-hours)
**Timeline Delay:** +${report.totalDelayDays} calendar days

### 📋 Out-of-Scope Items Detected:
${report.items
  .filter(item => item.status === 'scope_creep')
  .map(item => `- [ ] **${item.title}**: ${item.description} (~${item.estimatedHours} hrs / $${item.costImpact.toLocaleString()})`)
  .join('\n')}

> **Notice:** Under statutory UCC § 2-209, implementation requires countersigned bilateral change order prior to sprint queueing. Certified via ScopeLock AI.`;

  const jiraTicketPayload = `h1. Scope Variance Change Order - ${report.projectName}
*Client:* ${report.clientName}
*Cost Variance:* $${report.totalScopeCreepCost.toLocaleString()}
*Hours:* ${report.totalScopeCreepHours} hours
*Timeline Impact:* +${report.totalDelayDays} days

h2. Detected Out-of-Scope Deliverables
${report.items
  .filter(item => item.status === 'scope_creep')
  .map(item => `* *${item.title}*: ${item.description} [${item.estimatedHours}h | $${item.costImpact.toLocaleString()}]`)
  .join('\n')}

_Generated via ScopeLock AI statutory UCC § 2-209 engine_`;

  const jsonPayload = JSON.stringify(
    {
      version: '1.0.0',
      system: 'ScopeLock AI',
      standard: 'UCC § 2-209 Bilateral Amendment',
      reportId: report.id,
      project: report.projectName,
      client: report.clientName,
      metrics: {
        totalCostUSD: report.totalScopeCreepCost,
        totalHours: report.totalScopeCreepHours,
        totalDelayDays: report.totalDelayDays,
        hourlyRate: report.hourlyRate
      },
      creepItems: report.items.filter(i => i.status === 'scope_creep')
    },
    null,
    2
  );

  const getActiveContent = () => {
    switch (activeFormat) {
      case 'github':
        return githubIssueMarkdown;
      case 'jira':
        return jiraTicketPayload;
      case 'json':
        return jsonPayload;
      case 'markdown':
        return githubIssueMarkdown;
    }
  };

  const handleCopy = async () => {
    await copyToClipboard(getActiveContent());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    recordTelemetryEvent('bridge_export', `Exported audit format: ${activeFormat.toUpperCase()}`);
  };

  const handleDownload = () => {
    const ext = activeFormat === 'json' ? 'json' : 'md';
    const blob = new Blob([getActiveContent()], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `scopelock-change-order-${report.projectName.toLowerCase().replace(/[^a-z0-9]/g, '-')}.${ext}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              UNIVERSAL WORKFLOW BRIDGE
            </span>
            <span className="text-xs font-semibold text-slate-400">GitHub • Linear • Jira • Notion • CI/CD</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-1 flex items-center gap-2">
            <GitPullRequest className="w-6 h-6 text-indigo-400" />
            <span>Developer & PM Tool Integration</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Instantly synchronize this scope audit into your team's ticketing and project management pipeline.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
          >
            {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied to Clipboard!' : `Copy ${activeFormat.toUpperCase()}`}</span>
          </button>

          <button
            onClick={handleDownload}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </button>
        </div>
      </div>

      {/* Format selector tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800/80 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveFormat('github')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
            activeFormat === 'github'
              ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
              : 'text-slate-400 hover:text-white bg-slate-950/60'
          }`}
        >
          <GitPullRequest className="w-3.5 h-3.5" />
          <span>GitHub / Linear Markdown</span>
        </button>

        <button
          onClick={() => setActiveFormat('jira')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
            activeFormat === 'jira'
              ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
              : 'text-slate-400 hover:text-white bg-slate-950/60'
          }`}
        >
          <Kanban className="w-3.5 h-3.5" />
          <span>Jira Ticket Markup</span>
        </button>

        <button
          onClick={() => setActiveFormat('json')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
            activeFormat === 'json'
              ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
              : 'text-slate-400 hover:text-white bg-slate-950/60'
          }`}
        >
          <FileCode className="w-3.5 h-3.5" />
          <span>Raw Structured JSON</span>
        </button>
      </div>

      {/* Code preview area */}
      <div className="relative">
        <pre className="p-4 rounded-xl bg-slate-950 border border-slate-850 font-mono text-xs text-slate-300 overflow-x-auto max-h-72 leading-relaxed selection:bg-indigo-500 selection:text-white">
          {getActiveContent()}
        </pre>
      </div>
    </div>
  );
};
