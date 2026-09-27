# ScopeLock AI — VS Code Extension
### Real-Time Git Scope Creep Auditor & Statutory UCC § 2-209 Change Order Generator

**Stop building client features for free.**  
ScopeLock AI sits inside your VS Code status bar, audits your git commits in real-time, calculates dollar leakage at your agency's hourly rate, and generates court-admissible legal change orders directly in your project.

---

## ⚡ Key Features

1. **Real-Time Status Bar Dollar Monitor**:
   - Continuously analyzes recent git commits.
   - Highlights unbilled scope creep in real-time: `$(shield) ScopeLock: $625 Unbilled (5.0h)`.
   - Warns developers before they write uncontracted code for demanding clients.

2. **1-Click Statutory UCC § 2-209 Change Order (`.md`)**:
   - Generates `SCOPE_CHANGE_ORDER_UCC2209.md` directly in your workspace.
   - Includes itemized commit breakdown, calculated hourly dollar variance ($125/hr default), statutory UCC § 2-209 clauses, schedule tolling, and client signature lines.

3. **Git Pre-Commit Scope Freeze Guard**:
   - Installs `.git/hooks/pre-commit` into your local repository with a single command.
   - Prevents your team from committing uncontracted features without notifying project managers.

4. **Zero-Server Overhead**:
   - Runs 100% locally on your machine using standard git plumbing. No remote server tracking your proprietary code.

---

## 🚀 Quick Start & Commands

Open the VS Code Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`):

- `ScopeLock: Audit Unbilled Scope Creep`: Runs a deep scan on the last 50 commits and shows dollar loss.
- `ScopeLock: Generate UCC § 2-209 Change Order (.md)`: Emits a signed legal change order into your workspace.
- `ScopeLock: Install Git Pre-Commit Scope Freeze`: Secures your `.git/hooks/pre-commit`.
- `ScopeLock: Open Web Generator ($2 Unlock / Pro)`: Opens the official cloud generator with PDF exports.

---

## ⚙️ Configuration Settings

Customize in VS Code Settings (`Ctrl+,` or `Cmd+,`) search for `scopelock`:

| Setting | Type | Default | Description |
| :--- | :---: | :---: | :--- |
| `scopelock.hourlyRate` | `number` | `125` | Your agency hourly billing rate in USD ($/hr) |
| `scopelock.autoAuditIntervalMinutes` | `number` | `10` | Frequency of background git audits in minutes |
| `scopelock.alertOnUnbilledHoursThreshold` | `number` | `2.0` | Hours of unbilled variance before highlighting status bar |

---

## ⚖️ Legal Framework

Built strictly on **Uniform Commercial Code (UCC) § 2-209**, establishing that good faith modifications to commercial software agreements are legally enforceable and that verbal scope expansion without compensation is statutorily contestable.

- Official Clearance Rails: [ScopeLock AI Live Platform](https://ahirwardhanmanti83-bit.github.io/scopelock-ai/)
- Inquiries & Support: `ahirwardhanmanti83@gmail.com`
