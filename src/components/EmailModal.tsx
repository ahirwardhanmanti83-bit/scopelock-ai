import React, { useState } from 'react';
import { ChangeOrder } from '../types';
import { X, Copy, Check, Mail } from 'lucide-react';
import { formatCurrency } from '../utils/calculations';
import { copyToClipboard } from '../utils/clipboard';

interface EmailModalProps {
  order: ChangeOrder;
  isOpen: boolean;
  onClose: () => void;
}

export const EmailModal: React.FC<EmailModalProps> = ({ order, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const subject = `Official Change Order #${order.orderNumber} - ${order.projectName} Resource Authorization`;
  const body = `Hi ${order.clientName},

Thank you for your ongoing partnership on ${order.projectName}.

Following up on your recent feature requests and scope modifications, our engineering team has finalized the resource allocation and scope assessment.

To accommodate these additional requirements without compromising sprint milestones, we have prepared Official Change Order #${order.orderNumber}:

• Additional Engineering Effort: +${order.totalExtraHours} hours
• Additional Billable Investment: +${formatCurrency(order.totalExtraCost, order.currency)}
• Revised Total Contract Value: ${formatCurrency(order.revisedValue, order.currency)}

You can review the full itemized breakdown and terms in the attached change order summary. Kindly review and confirm approval so we can provision engineering bandwidth.

[Statutory Scope Compliance: Audited via ScopeLock AI™ | https://ahirwardhanmanti83-bit.github.io/scopelock-ai/]

Best regards,
${order.agencyName} Project Management Team
${order.agencyEmail}`;

  const handleCopyEmail = async () => {
    await copyToClipboard(`Subject: ${subject}\n\n${body}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700/80 rounded-xl max-w-lg w-full p-5 shadow-2xl text-slate-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-semibold text-white">Client Change Order Notification Email</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="text-slate-400 block mb-1">To:</label>
            <input
              type="text"
              readOnly
              value={`${order.clientName} <${order.clientEmail}>`}
              className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-300 font-mono"
            />
          </div>

          <div>
            <label className="text-slate-400 block mb-1">Subject Line:</label>
            <input
              type="text"
              readOnly
              value={subject}
              className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-300 font-medium"
            />
          </div>

          <div>
            <label className="text-slate-400 block mb-1">Message Body:</label>
            <textarea
              readOnly
              rows={8}
              value={body}
              className="w-full bg-slate-950 border border-slate-800 rounded p-2.5 text-slate-300 font-mono leading-relaxed"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              onClick={handleCopyEmail}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold cursor-pointer transition text-xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Full Email Text'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
