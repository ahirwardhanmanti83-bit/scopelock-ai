with open("README.md", "r", encoding="utf-8") as f:
    readme = f.read()

target = "## 🚀 Instant Quickstart"
replacement = """## 🏢 Enterprise & Agency Enforcer (Lock Entire Team's Repo)

To enforce scope protection across your whole development agency and block junior developers from leaking unpaid client hours:

```bash
# 1. Install Pre-Commit Scope Shield directly into any Git repo:
npx scopelock-audit --install-hook

# 2. Inspect Agency Pro Tier ($199/mo) & CI/CD Protection:
npx scopelock-audit --agency
```

👉 **Live B2B Portal & Patreon Gateway ($199/mo):** [https://ahirwardhanmanti83-bit.github.io/scopelock-ai/agency-enterprise.html](https://ahirwardhanmanti83-bit.github.io/scopelock-ai/agency-enterprise.html)

## 🚀 Instant Quickstart"""

if target in readme and "Enterprise & Agency Enforcer" not in readme:
    readme = readme.replace(target, replacement)
    with open("README.md", "w", encoding="utf-8") as f:
        f.write(readme)
    print("README.md updated successfully with agency hook instructions!")
else:
    print("README.md already contains or target missing")
