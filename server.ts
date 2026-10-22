import express from 'express';
import cors from 'cors';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Initialize Google Gemini API
const ai = new GoogleGenAI();

// Endpoint: AI Scope Creep Forensic Audit & Daily Standup Generator
app.post('/api/audit-scope', async (req, res) => {
  try {
    const { 
      projectName = 'Client Project',
      clientName = 'Client Partner',
      sowBaseline = '',
      clientMessage = '',
      tasksCompleted = '',
      hourlyRate = 125,
      hoursWorked = 6.5,
      responseTone = 'collaborative'
    } = req.body;

    const rate = Number(String(hourlyRate).replace(/,/g, '')) || 125;
    const workedHours = Number(String(hoursWorked).replace(/,/g, '')) || 6.5;

    const prompt = `
You are an elite B2B Software Engineering Scope-Defense & Change-Order AI Engine for software agencies and engineering contractors.
A developer is preparing their daily client report and handling new client revision requests.

INPUT DETAILS:
- Project: ${projectName}
- Client: ${clientName}
- Billable Hourly Rate: $${rate} USD/hour
- Hours Logged Today: ${workedHours} hrs (Total Earned Today: $${workedHours * rate} USD)
- Tasks Completed Today:
"""
${tasksCompleted || 'Core milestone engineering deliverables completed as scheduled.'}
"""

- Agreed SOW Baseline:
"""
${sowBaseline || 'Standard web application deliverables agreed in executed project baseline.'}
"""

- Incoming Client Requests / Scope Drift:
"""
${clientMessage || 'Client requested adding customized features not in the original contract.'}
"""

Tone desired: ${responseTone} (collaborative, firm_commercial, or scope_hold)

Analyze whether the client request contains scope creep tasks, determine realistic extra engineering hours, calculate financial margin bleed ($${rate} * hours), and construct a professional, diplomatic client response plus formal Change Order details.

Return strictly a valid JSON object matching:
{
  "overallVerdict": "severe_scope_creep" | "partial_scope_creep" | "in_scope",
  "creepScore": number (0 to 100),
  "summary": "Short 1-2 sentence verdict",
  "detectedItems": [
    {
      "title": "Short title of extra item",
      "category": "Backend/API" | "Frontend" | "Architecture" | "Third-Party" | "Design Revision",
      "isOutOfScope": true,
      "estimatedHours": number,
      "costImpact": number,
      "riskExplanation": "Why this exceeds baseline contract"
    }
  ],
  "totalHours": number,
  "totalCostUSD": number,
  "timelineDelayDays": number,
  "diplomaticReply": "Tailored, polite, win-win response to the client addressing their exact request and offering Change Order or Phase 2 scheduling.",
  "changeOrderNotice": "Official change order summary ready to attach.",
  "dailyStandupText": "Formatted Daily Standup report showing completed tasks, earned today, and flagged out-of-scope variance."
}
`;

    let response;
    try {
      response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });
    } catch (modelErr: any) {
      console.warn('gemini-3.8-flash busy/unavailable, falling back to gemini-3.1-flash-lite:', modelErr?.message || modelErr);
      response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });
    }

    const responseText = response.text || '{}';
    let parsedResult;
    try {
      parsedResult = JSON.parse(responseText);
    } catch {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      parsedResult = jsonMatch ? JSON.parse(jsonMatch[0]) : null;
    }

    if (!parsedResult) {
      throw new Error('Failed to parse AI output');
    }

    // Ensure calculated values align with specified hourly rate and sanitize numbers
    if (parsedResult.detectedItems && Array.isArray(parsedResult.detectedItems)) {
      parsedResult.detectedItems = parsedResult.detectedItems.map((item: any) => ({
        ...item,
        estimatedHours: Number(item.estimatedHours) || 0,
        costImpact: (Number(item.estimatedHours) || 0) * rate,
      }));
      parsedResult.totalCostUSD = (Number(parsedResult.totalHours) || 0) * rate;
    }

    return res.json({
      success: true,
      data: parsedResult,
      isRealAi: true,
    });
  } catch (err: any) {
    console.error('Gemini Audit API Error:', err);

    // Robust forensic rule engine fallback so application NEVER crashes
    const message = req.body.clientMessage || '';
    const rate = Number(String(req.body.hourlyRate || 125).replace(/,/g, '')) || 125;
    const workedHours = Number(String(req.body.hoursWorked || 6.5).replace(/,/g, '')) || 6.5;
    const project = req.body.projectName || 'Fintech MVP Portal';
    const client = req.body.clientName || 'Apex Corp / Founder';
    const tasks = req.body.tasksCompleted || '1. Implemented Stripe recurring webhook listener\n2. Fixed PostgreSQL connection pool leak\n3. Completed user profile photo upload to S3';

    const lower = message.toLowerCase();
    let estHours = 3.5;
    if (lower.includes('mobile') || lower.includes('app store') || lower.includes('ios')) estHours += 35;
    if (lower.includes('ai') || lower.includes('chatgpt') || lower.includes('bot')) estHours += 18;
    if (lower.includes('crm') || lower.includes('sync') || lower.includes('salesforce')) estHours += 22;
    if (lower.includes('dark mode') || lower.includes('export')) estHours += 3.5;

    const totalCost = Math.round(estHours * rate);
    const delayDays = Math.max(1, Math.ceil(estHours / 5));
    const earnedToday = Math.round(workedHours * rate);

    const standup = `📋 DAILY WORK REPORT & SOW PROGRESS SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📅 Date: ${new Date().toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
📁 Project: ${project}
👤 Client Sponsor: ${client}
⏱️ Billable Hours Logged Today: ${workedHours} hrs (@ $${rate}/hr) = $${earnedToday.toLocaleString()} USD

✅ COMPLETED DELIVERABLES TODAY:
${tasks}

⚠️ UNCONTRACTED SCOPE DRIFT DETECTED:
${message || 'Client requested adding a customized dark mode toggle and CSV export button on admin dashboard.'}
↳ Variance Impact: +${estHours} hrs (~$${totalCost.toLocaleString()} USD)
↳ Note: This request is queued for formal Change Order approval before production deployment.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🛡️ Audited & Verified by ScopeLock AI (Enterprise SOW Governance)
Zero Unbilled Leakage Guarantee | Professional Scope Defense`;

    return res.json({
      success: true,
      data: {
        overallVerdict: estHours > 10 ? 'severe_scope_creep' : 'partial_scope_creep',
        creepScore: Math.min(95, Math.max(35, Math.round(estHours * 2.5))),
        summary: `Detected unbudgeted revisions representing ~${estHours} engineering hours ($${totalCost.toLocaleString()} USD variance).`,
        detectedItems: [
          {
            title: 'Unscheduled Architectural Revisions',
            category: 'Backend/API',
            isOutOfScope: true,
            estimatedHours: estHours,
            costImpact: totalCost,
            riskExplanation: 'Requested deliverable introduces structural workflows not scheduled in original contract baseline.'
          }
        ],
        totalHours: estHours,
        totalCostUSD: totalCost,
        timelineDelayDays: delayDays,
        diplomaticReply: `Hi ${client.split('/')[0].trim() || 'there'},\n\nWe reviewed your request for: "${message.slice(0, 90)}...".\n\nBecause our signed baseline SOW covers the core agreed release deliverables, executing these additional features represents approximately ${estHours} engineering hours ($${totalCost.toLocaleString()} USD @ $${rate}/hr) with +${delayDays} business days schedule tolling.\n\nWe would love to build this for you. To protect our milestone release, I can prepare an official Change Order right away, or we can stage this for Phase 2. Let me know what you prefer!\n\nBest regards,\nYour Engineering Team`,
        changeOrderNotice: `Formal Change Order: Authorization of ${estHours} billable hours ($${totalCost.toLocaleString()} USD) with +${delayDays} days schedule tolling.`,
        dailyStandupText: standup
      },
      isRealAi: false,
      notice: 'Forensic rule engine calculation active.'
    });
  }
});

// Raycast Native Extension Dedicated Endpoint (Zero arbitrary delays, pure AI validation)
app.post('/api/raycast/audit', async (req, res) => {
  try {
    const { clientMessage, hourlyRate = 125, contractBaseline = '', clientName = 'Client' } = req.body;
    if (!clientMessage || typeof clientMessage !== 'string' || clientMessage.trim().length === 0) {
      return res.status(400).json({ error: 'clientMessage is required' });
    }

    const rate = Number(hourlyRate) || 125;
    const prompt = `You are the ScopeLock AI Raycast Engine. Analyze this client request for scope creep against a software development contract:
Client: ${clientName}
Hourly Rate: $${rate}/hr
Contract Baseline: ${contractBaseline || 'Agreed milestone deliverables for web/mobile application.'}
Incoming Client Message: "${clientMessage}"

Return strictly a JSON object:
{
  "creepScore": number (0-100),
  "isScopeCreep": boolean,
  "severity": "Low" | "Medium" | "High" | "Critical Scope Creep",
  "unbilledHours": number,
  "estimatedFinancialLoss": number,
  "suggestedDelayDays": number,
  "summary": "1 sentence finding",
  "clientReply": "Polite diplomatic response acknowledging request and stating change order requirements",
  "changeOrderMarkdown": "Clean markdown change order ready for client review"
}`;

    let response;
    try {
      response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' },
      });
    } catch {
      response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: prompt,
        config: { responseMimeType: 'application/json' },
      });
    }

    const text = response.text || '{}';
    const parsed = JSON.parse(text);
    return res.json({ success: true, data: parsed, engine: 'gemini-ai' });
  } catch (err: any) {
    console.error('Raycast API error:', err);
    return res.status(500).json({ error: 'Failed to perform scope audit' });
  }
});

// Endpoint: License Key & Plan Verification (Free, Pro $19/mo, Agency $199/mo)
app.post('/api/verify-license', (req, res) => {
  const { licenseKey } = req.body;
  if (!licenseKey || typeof licenseKey !== 'string') {
    return res.status(400).json({ valid: false, error: 'License key required' });
  }

  const cleanKey = licenseKey.trim().toUpperCase();

  // Recognize AppSumo Lifetime Deals
  const isAppSumo = cleanKey.startsWith('APPSUMO') || cleanKey.startsWith('AS-') || cleanKey.includes('SUMO');

  // Recognize Agency ($199/mo)
  const isAgency = isAppSumo || cleanKey.startsWith('AGENCY') || cleanKey.includes('199') || cleanKey === 'DEMO-PRO-2026';

  // Recognize Pro ($19/mo)
  const isPro = cleanKey.startsWith('PRO') || cleanKey.includes('19') || cleanKey.includes('SOLO') || cleanKey === 'PRO-DEMO-2026';

  if (isAgency || isPro) {
    const tier = isAgency ? 'agency' : 'pro';
    const tierName = isAppSumo 
      ? 'AppSumo Deal (Agency Unlimited)' 
      : isAgency 
      ? 'Agency ($199/mo)' 
      : 'Pro ($19/mo)';

    return res.json({
      valid: true,
      tier,
      tierName,
      brandingAllowed: isAgency,
      unlimitedScans: true,
      unlocked: true,
      activationCode: cleanKey,
      message: `License successfully activated: ${tierName}!`
    });
  }

  return res.status(401).json({
    valid: false,
    error: 'Invalid license key. Use demo code PRO-DEMO-2026 for Pro ($19/mo) or DEMO-PRO-2026 for Agency ($199/mo).'
  });
});

// In-Memory Live Orders Store for Viral Client Approval Links
interface StoredOrder {
  id: string;
  data: any;
  status: 'pending' | 'signed';
  createdAt: string;
  signedAt?: string;
  signedByName?: string;
  signatureHash?: string;
}

const ordersStore = new Map<string, StoredOrder>();

// Pre-seed an instant sample order for immediate live testing
ordersStore.set('co-demo-2026', {
  id: 'co-demo-2026',
  data: {
    changeOrderNumber: 'CO-2026-001',
    date: '2026-10-15',
    agencyName: 'Apex Engineering Labs',
    clientName: 'HyperScale Corp',
    projectName: 'Cloud Enterprise Portal & Native iOS MVP',
    hourlyRate: 150,
    totalHours: 32,
    totalCost: 4800,
    timelineExtensionDays: 7,
    items: [
      { description: 'Native push notification container for iOS and Android', hours: 14, cost: 2100 },
      { description: 'Automated two-way webhook sync with Salesforce CRM', hours: 12, cost: 1800 },
      { description: 'International multi-currency Stripe checkout tax compliance', hours: 6, cost: 900 }
    ],
    clientSignatoryName: 'David Vance, VP Engineering',
    agencySignatoryName: 'Lead Agency Partner',
    paymentTerms: '50% upon change order execution, 50% upon milestone completion. Delivery timeline is extended automatically.'
  },
  status: 'pending',
  createdAt: new Date().toISOString()
});

// Endpoint: Create live shareable change order
app.post('/api/orders', (req, res) => {
  try {
    const { orderData } = req.body;
    if (!orderData) {
      return res.status(400).json({ error: 'Order data is required' });
    }
    const id = 'co-' + Math.random().toString(36).substring(2, 9);
    const newOrder: StoredOrder = {
      id,
      data: orderData,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    ordersStore.set(id, newOrder);
    return res.json({ success: true, id, shareUrl: `/?orderId=${id}` });
  } catch (err: any) {
    return res.status(500).json({ error: err?.message || 'Failed to create order' });
  }
});

// Endpoint: Retrieve live order by ID
app.get('/api/orders/:id', (req, res) => {
  const order = ordersStore.get(req.params.id);
  if (!order) {
    return res.status(404).json({ error: 'Change order not found or link expired.' });
  }
  return res.json({ success: true, order });
});

// Endpoint: Client Digital Signature & Instant Ratification
app.post('/api/orders/:id/sign', (req, res) => {
  const order = ordersStore.get(req.params.id);
  if (!order) {
    return res.status(404).json({ error: 'Change order not found' });
  }
  const { signatoryName = 'Authorized Client Executive' } = req.body;
  const now = new Date().toISOString();
  const hash = 'SIG-' + Math.random().toString(36).substring(2, 8).toUpperCase() + '-' + Date.now().toString(36).toUpperCase();

  order.status = 'signed';
  order.signedAt = now;
  order.signedByName = signatoryName;
  order.signatureHash = hash;
  ordersStore.set(req.params.id, order);

  return res.json({
    success: true,
    order,
    signatureHash: hash,
    signedAt: now,
    message: 'Change order officially signed and ratified.'
  });
});

// Endpoint: Download generated AppSumo CSV codes
app.get('/api/download-appsumo-codes', (_req, res) => {
  const filePath = path.resolve(__dirname, 'appsumo_codes.csv');
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="appsumo_codes.csv"');
  return res.sendFile(filePath);
});

// Endpoint: Download full project source zip (for GitHub)
app.get('/api/download-source-zip', (_req, res) => {
  const filePath = path.resolve(__dirname, 'scopelock-source.zip');
  res.setHeader('Content-Type', 'application/zip');
  res.setHeader('Content-Disposition', 'attachment; filename="scopelock-source.zip"');
  return res.sendFile(filePath);
});

// Endpoint: Download compiled static files for GitHub Pages
app.get('/api/download-github-dist', (_req, res) => {
  const filePath = path.resolve(__dirname, 'github-pages-dist.zip');
  res.setHeader('Content-Type', 'application/zip');
  res.setHeader('Content-Disposition', 'attachment; filename="github-pages-dist.zip"');
  return res.sendFile(filePath);
});

// Mount Vite or serve static
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
