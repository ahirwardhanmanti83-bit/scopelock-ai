# ScopeLock AI — Automated Scope Creep CI Auditor & Change Order Generator

[![GitHub Marketplace](https://img.shields.io/badge/Marketplace-ScopeLock%20AI-purple?style=flat&logo=github)](https://github.com/marketplace/actions/scopelock-ai-autonomous-scope-creep-auditor)
[![UCC § 2-209 Enforceable](https://img.shields.io/badge/Statutory-UCC%20§%202--209-emerald)](https://ahirwardhanmanti83-bit.github.io/scopelock-ai/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

**Stop absorbing unpaid client feature creep.** ScopeLock AI analyzes Git commit logs, diff statutes, and PR descriptions during your GitHub Actions CI pipeline to detect uncontracted scope creep, calculate dev-hour dollar variance, and generate statutory UCC § 2-209 binding change orders before you merge unbilled code.

---

## ⚡ Quick Start (`.github/workflows/scopelock.yml`)

Add this workflow to any GitHub repository to automatically inspect every Pull Request and commit for scope leakage:

```yaml
name: ScopeLock Audit

on:
  pull_request:
    branches: [main, master]
  push:
    branches: [main]

jobs:
  audit-scope:
    runs-on: ubuntu-latest
    name: Audit Scope Creep & Margin Bleed
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0 # Full git history for accurate variance calculation

      - name: Run ScopeLock AI Auditor
        uses: ahirwardhanmanti83-bit/scopelock-ai@v1.0.0
        with:
          hourly_rate: 125 # Your agency or freelance hourly rate in USD ($)
          fail_on_creep: false # Set to true to block PR merge until change order is signed
```

---

## 🛠️ Inputs

| Input | Description | Required | Default |
| :--- | :--- | :--- | :--- |
| `hourly_rate` | Billing rate ($/hr) used to calculate dollar leakage | No | `125` |
| `baseline_ref` | Git ref or commit SHA to compare scope against | No | `HEAD~1` |
| `fail_on_creep`| Whether to fail the PR build if unbilled scope creep is detected | No | `false` |

---

## 📤 Outputs

| Output | Description |
| :--- | :--- |
| `creep_detected` | `true` if uncontracted scope drift was identified |
| `estimated_hours` | Number of unbilled engineering hours leaked |
| `dollar_leakage` | Total monetary loss in USD at specified billing rate |
| `change_order_url` | Direct 1-click legal UCC § 2-209 change order generator |

---

## 📋 Markdown Job Summary

When run, ScopeLock AI automatically creates a rich GitHub Action summary table right inside your Pull Request:

```markdown
### 🛡️ ScopeLock AI — Scope Creep CI Forensic Audit
| Metric | Measured Value |
| :--- | :--- |
| Uncontracted Variance Detected | 3 Items |
| Unbilled Engineering Hours | +13.5 Hours |
| Direct Margin Bleed | $1,688 USD (@ $125/hr) |
| Legal Status | ⚠️ Informal Waiver Risk (UCC § 2-209) |
```

---

## 🏛️ Sovereign Governance
- **Architect & Founder**: Krishna Ahirwar
- **Authorized Legal Signatory**: Dhanmanti Ahirwar (`ahirwardhanmanti83@gmail.com`)
- **Web App**: [https://ahirwardhanmanti83-bit.github.io/scopelock-ai/](https://ahirwardhanmanti83-bit.github.io/scopelock-ai/)
