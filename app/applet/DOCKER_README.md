# ScopeLock AI - Official Docker Image

> Autonomous B2B Scope-Creep Detection & Statutory UCC § 2-209 Change Order Engine for Enterprise CI/CD & Engineering Teams.

[![NPM Version](https://img.shields.io/npm/v/scopelock-audit.svg)](https://www.npmjs.com/package/scopelock-audit)
[![License: Commercial](https://img.shields.io/badge/License-Proprietary-blue.svg)](https://patreon.com/c/scopelock)

---

## ⚡ Instant Usage

Run ScopeLock audit inside any repository without installing Node.js or local dependencies:

```bash
docker run --rm -v $(pwd):/workspace scopelock/scopelock-audit:latest
```

### Options:
```bash
# Generate legal change order UCC § 2-209 document
docker run --rm -v $(pwd):/workspace scopelock/scopelock-audit:latest -g

# Full deep audit with JSON export
docker run --rm -v $(pwd):/workspace scopelock/scopelock-audit:latest -a
```

---

## 🏢 CI/CD Pipeline Integration (GitLab, Bitbucket, Jenkins, CircleCI)

Add ScopeLock into your enterprise CI/CD pipeline to block unbilled feature bleed before code reaches staging:

```yaml
# GitLab CI example
scopelock_audit:
  image: scopelock/scopelock-audit:latest
  stage: test
  script:
    - scopelock-audit --audit
```

---

## 💳 Enterprise Licensing & Unlocks

- **Instant Legal Unlock ($2 / ₹99):** Unlock court-admissible signature blocks.
- **Agency Pass ($19/mo):** Unlimited client projects with custom agency branding.
- **Enterprise Vault ($199/mo):** Multi-seat team license & SLA warranty.

👉 **Official Patreon Gateway:** [https://patreon.com/c/scopelock](https://patreon.com/c/scopelock)  
👉 **Direct Wire / Payoneer Clearance:** `ahirwardhanmanti83@gmail.com`
