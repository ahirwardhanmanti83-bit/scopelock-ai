# ScopeLock AI 🛡️
> **Automated B2B Scope-Creep Detection, Developer Cost-Variance Calculator & Statutory UCC § 2-209 Change-Order Generator for Digital Agencies, Dev Studios & Independent Engineers.**

[![GitHub Marketplace](https://img.shields.io/badge/GitHub_Marketplace-ScopeLock_AI_v1.0.0-24292e?style=for-the-badge&logo=github&logoColor=white)](https://github.com/marketplace/actions/scopelock-ai-autonomous-scope-creep-auditor)
[![NPM Version](https://img.shields.io/npm/v/scopelock-audit?style=for-the-badge&logo=npm&logoColor=white&color=CB3837)](https://www.npmjs.com/package/scopelock-audit)
[![GitHub Stars](https://img.shields.io/github/stars/ahirwardhanmanti83-bit/scopelock-ai?style=for-the-badge&logo=github&color=gold)](https://github.com/ahirwardhanmanti83-bit/scopelock-ai/stargazers)
[![Deploy Status](https://img.shields.io/badge/Production-Live-success?style=for-the-badge&logo=githubpages&logoColor=white)](https://ahirwardhanmanti83-bit.github.io/scopelock-ai/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Pricing](https://img.shields.io/badge/Instant%20Unlock-$2-emerald?style=for-the-badge)](https://ahirwardhanmanti83-bit.github.io/scopelock-ai/)
[![Enterprise Tier](https://img.shields.io/badge/Enterprise%20Tier-$199/mo-purple?style=for-the-badge)](https://patreon.com/c/AestheticFindsUSA)

---

## ⚡ Instant Terminal CLI Audit & Git Hook (Zero Install via NPX)
Run the autonomous git repository scope auditor directly in your project terminal:

```bash
# Run interactive forensic audit
npx scopelock

# Generate UCC § 2-209 Change Order Document (.md) right inside your repo
npx scopelock --generate

# Install automatic Git Pre-Commit Hook (Freezes uncontracted commits)
npx scopelock --install-hook

# Audit with custom contractor hourly rate
npx scopelock --rate 150
```
*(or `npx scopelock-audit`)*

**What it does in 3 seconds:**
1. Scans your git commits and uncommitted diffs for out-of-scope feature creep.
2. Calculates exact hours leaked and dollar variance owed by client ($125/hr standard).
3. **Instantly generates `SCOPE_CHANGE_ORDER_UCC2209.md`** with dual signature blocks and statutory tolling clauses ready to email your client.
4. **Installs a Git Pre-Commit Hook** (`.git/hooks/pre-commit`) to protect your team against unbilled work before code is committed.

---

## 🤖 GitHub Action CI/CD Integration
Automate scope creep detection in your team's pull requests and sprint merges. Add this to `.github/workflows/scopelock.yml`:

```yaml
name: ScopeLock Audit
on: [pull_request, push]

jobs:
  audit-scope:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - name: Audit Scope Creep & Margin Bleed
        uses: ahirwardhanmanti83-bit/scopelock-ai@v1
        with:
          hourly_rate: '125'
          fail_on_creep: 'false'
```

---

## 📜 Free Bulletproof Developer Contract Template
Protect your freelance and agency projects before starting work. Use our standardized contract template with automated scope-creep clauses and statutory UCC § 2-209 change-order ratification:

👉 **[View & Copy Standard Developer Agreement (CONTRACT_TEMPLATE.md)](./CONTRACT_TEMPLATE.md)**

### Protect Your Repository (Add Badge to Your README)
Warn clients and stakeholders that out-of-scope requests require written change orders:

```markdown
[![ScopeLock Protected](https://img.shields.io/badge/ScopeLock-Protected_UCC_§_2--209-blue)](https://ahirwardhanmanti83-bit.github.io/scopelock-ai/)
```

---

## 🌐 Launch Free Web Application
Click below to audit scope creep, calculate developer loss, and generate binding change orders directly in your browser:

### 👉 [🚀 **OPEN SCOPELOCK AI WEB APPLICATION (FREE)**](https://ahirwardhanmanti83-bit.github.io/scopelock-ai/)
*(Zero installation required. 100% Client-Side Privacy — No client contract or data ever leaves your device).*

---

## 💥 The Real Agency Problem: Unbilled "Quick Favor" Scope Creep
Software agencies and freelance developers lose an estimated **15% to 27% of billable hours** to scope creep:
* *"Can you just add this small filter real quick?"*
* *"Just one more API integration before we launch."*
* *"We assumed this minor revision was included in the fixed-price quote."*

When engineers perform out-of-scope work without a formal change order, **courts consider it a gift (waiver of payment)**. **ScopeLock AI** converts informal client requests into enforceable statutory UCC § 2-209 legal change orders in 60 seconds.

---

## 🚀 Key Features

* **⚖️ Statutory UCC § 2-209 Scope Freeze**: Generates court-admissible contract amendments enforcing formal countersignatures before work proceeds.
* **⏱️ Developer-Hour Variance Engine**: Real-time formula mapping unbilled extra hours against hourly rates to show exact dollar leakage.
* **📄 Instant Legally Binding PDF Generation**: One-click generation of professional Change Orders formatted with milestone freeze disclaimers.
* **🔒 Sovereign Zero-Server Architecture**: Runs 100% client-side in React/TypeScript. No client contracts, API keys, or project details are stored on any backend server.
* **💳 Instant Mass-Scale Clearance**: Frictionless change-order unlocks ($2) and unlimited monthly passes ($19, $199, $499).

---

## 📜 Free Open-Source Statutory Contract Clauses (Copy & Paste)

You can copy and embed these battle-tested clauses directly into your agency Master Services Agreements (MSA) or Statements of Work (SOW):

### 1. Mandatory Change-Order Requirement Clause (UCC § 2-209)
```markdown
"Any request by Client for modifications, additions, or deviations from the Scope of 
Work defined herein ('Change Request') shall not be binding upon Contractor unless 
memorialized in a formal written Change Order signed by authorized representatives 
of both parties. Contractor shall not be obligated to commence work on any Change 
Request until the associated cost variance and schedule adjustment have been executed."
```

### 2. Scope Creep Delay & Liability Waiver Clause
```markdown
"In the event Client introduces requests outside the initial baseline specifications, 
any previously agreed project delivery milestones shall be automatically tolled (extended) 
by a period equal to the review, negotiation, and implementation duration of the 
resulting Change Order. Contractor shall bear zero liability for delivery delays caused 
by pending Change Order approvals."
```

### 3. Out-of-Scope Hourly Assessment Rate Clause
```markdown
"Any exploratory investigation, technical feasibility evaluation, or architectural 
drafting performed by Contractor to assess a proposed Client Change Request shall be 
billed at Contractor's standard out-of-scope variance rate of $[HOURLY_RATE]/hr, 
regardless of whether Client ultimately approves the proposed Change Order."
```

> 💡 **Need the complete binding PDF with auto-calculated rates and signature blocks?**  
> Use the **[ScopeLock AI Interactive Change Order Generator](https://ahirwardhanmanti83-bit.github.io/scopelock-ai/)**.

---

## 🛠️ Tech Stack & Zero-Overhead Deployment

* **Frontend**: React 18, TypeScript, Tailwind CSS, Lucide Icons, Canvas/Print Engine
* **Hosting**: GitHub Pages / Static Cloud CDN (Zero server maintenance costs)
* **SEO & Indexing**: Google Search Console Verified, IndexNow Protocol, JSON-LD Schema Authority

---

## ⚖️ License
Distributed under the **MIT License**. Free for agencies, consultants, software engineers, and digital contractors worldwide.
