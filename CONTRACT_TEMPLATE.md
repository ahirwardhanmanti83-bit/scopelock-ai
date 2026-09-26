# STANDARD INDEPENDENT SOFTWARE DEVELOPER AGREEMENT
### (With Automated Scope Protection & UCC § 2-209 Change-Order Ratification Rider)

---

**NOTICE TO CLIENT & DEVELOPER**: This agreement contains an automated Scope-Lock covenant. All work outside the strictly defined Milestones/SOW below is governed by mandatory cost-variance auditing via **ScopeLock AI** (`npx scopelock-audit`).

---

## 1. PARTIES & ENGAGEMENT
This Independent Software Developer Agreement ("Agreement") is entered into as of the date of execution by and between:
- **Developer / Engineering Agency**: [DEVELOPER_LEGAL_NAME / ENTITY] ("Developer")
- **Client**: [CLIENT_LEGAL_NAME / COMPANY] ("Client")

## 2. STATEMENT OF WORK (SOW) & BASELINE REPOSITORY
The Developer agrees to deliver strictly the features, technical deliverables, and milestones defined in **Exhibit A (Specifications)** attached hereto.
- **Baseline Git Repository / Target Branch**: `[GIT_REPO_URL] / [BRANCH_NAME]`
- **Agreed Project Total Budget**: `$[AMOUNT] USD`
- **Agreed Hourly Variance Rate**: `$[RATE] USD/hour`

## 3. STRICT SCOPE-LOCK COVENANT & UCC § 2-209 AMENDMENT PROCEDURE
1. **Unilateral Feature Requests**: Any request, email, message, pull request revision, or Slack message requesting modifications, additions, third-party integrations, or architecture redesigns not explicitly enumerated in Exhibit A constitutes an **"Out-of-Scope Modification"**.
2. **Automated Audit Requirement**: 
   Prior to commencement of any code commits responding to out-of-scope requests, Developer is contractually required to execute:
   ```bash
   npx scopelock-audit
   ```
   or generate an immutable cryptographic variance rider at:
   `https://ahirwardhanmanti83-bit.github.io/scopelock-ai/`
3. **Mandatory Ratification**: Under Uniform Commercial Code (UCC) § 2-209 and common law doctrine of contract modification, no verbal or informal modification to scope or price shall bind either party. The generated ScopeLock Change Order must be acknowledged in writing or digital signature before work is scheduled.
4. **Variance Fee Schedule**: Any modification exceeding 50 lines of altered functional code or requiring more than 2 engineer-hours will incur minimum billable variance billing as calculated by the ScopeLock auditor.

## 4. PAYMENT TERMS & DEPOSIT
1. **Initial Milestone Deposit**: 50% upfront before engineering begins.
2. **Final Delivery Balance**: 50% upon git repository release tag verification.
3. **Change Order Balances**: Payable immediately upon acceptance of each UCC § 2-209 Change Order Rider.

## 5. INTELLECTUAL PROPERTY & TITLE PASSAGE
All title, copyrights, and intellectual property rights in the custom software deliverable shall pass to Client **ONLY AND EXCLUSIVELY UPON FULL RECEIPT OF ALL CONTRACTED AMOUNTS AND OUTSTANDING SCOPELOCK CHANGE ORDERS**. Until final clearance of funds, Developer retains full proprietary title and lien over all code commits.

## 6. GOVERNING LAW & JURISDICTION
This Agreement shall be governed, construed, and enforced in accordance with standard commercial contract statutes and the Uniform Commercial Code.

---

### SIGNATURES & RATIFICATION

**Developer Authorized Signatory:**  
Signature: _________________________________  
Date: ______________________________________  

**Client Authorized Signatory:**  
Signature: _________________________________  
Date: ______________________________________  

---

### REPOSITORY BADGE FOR DEVELOPERS
Embed this shield in your project's `README.md` to publicly notify clients and contributors that the codebase is governed by ScopeLock:

```markdown
[![ScopeLock Protected](https://img.shields.io/badge/ScopeLock-Protected_UCC_§_2--209-blue)](https://ahirwardhanmanti83-bit.github.io/scopelock-ai/)
```
