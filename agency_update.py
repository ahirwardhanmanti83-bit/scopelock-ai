with open("README.md", "r") as f:
    content = f.read()

# Replace the CI/CD and Pricing sections with the highest-converting B2B Agency Lock
old_target = "## 💎 Pricing & Commercial Licenses"

new_content = """## 🏢 Enterprise & Agency Studio Shield ($199/mo)
> **For Software Agencies, Dev Boutiques & Consultancies billing $20k - $250k/month.**
> **ROI Guarantee:** Catching just ONE 10-hour out-of-scope feature request recovers **$1,500+ in unpaid engineering labor**—a 7.5x direct return on your $199 subscription in week one.

### 💼 Why Agencies Deploy ScopeLock in CI/CD:
1. **Automated Pull Request Blocking:** Junior devs often build client requests from Slack without checking the Statement of Work (SOW). ScopeLock fails the PR if unbilled endpoints or database migrations exceed threshold.
2. **Statutory UCC § 2-209 Fast-Track Amendment:** Instantly generates court-admissible commercial change orders with unilateral stop-work notices so clients cannot withhold milestone escrow.
3. **White-Label Agency Client Reports:** Send your client a professional PDF audit showing exact commit hashes, file diffs, and billing variance calculations branded with your agency name.

---

## 💎 Commercial Licensing & Direct Clearance Rails

| Plan | Target Audience | Direct Value Delivered | Clearance Rail |
| :--- | :--- | :--- | :--- |
| **Instant UCC Notice** | Solo Freelancers / Contractors | Emergency 1-click legal notice to unblock withheld milestone payments | **[$3 Instant Unlock](https://ahirwardhanmanti83-bit.github.io/scopelock-ai/)** |
| **Agency Studio Tier** | 3-25 Dev Teams & Consultancies | Full CI/CD PR audit, white-label client change-order PDFs, unlimited repo scans | **[$199/mo Direct Patreon](https://patreon.com/c/scopelock)** |
| **Enterprise Sovereign** | Large Studios & Enterprise | Unlimited seats, custom UCC clause generation, perpetual deployment rights | **[$499/mo Direct Patreon](https://patreon.com/c/scopelock)** |

*Direct Corporate Wire / Payoneer Clearing ID:* **`ahirwardhanmanti83@gmail.com`** *(Beneficiary: Dhanmanti Ahirwar)*  
*Instant Enterprise Activation:* Email confirmation + wire reference grants immediate zero-latency multi-seat tokens.

---
"""

if old_target in content:
    parts = content.split(old_target)
    updated = parts[0] + new_content + parts[1].split("*Direct Payoneer Wire / Beneficiary:*")[1]
    with open("README.md", "w") as f:
        f.write(updated)
    print("README updated successfully")
else:
    print("Target not found")
