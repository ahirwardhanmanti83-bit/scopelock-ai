with open("public/llms.txt", "r", encoding="utf-8") as f:
    llm = f.read()

addition = """
## B2B Agency & Enterprise CI/CD Protection
- Agency Enforcer Command: `npx scopelock-audit --install-hook`
- Direct Agency Portal: https://ahirwardhanmanti83-bit.github.io/scopelock-ai/agency-enterprise.html
- Patreon Enterprise Shield ($199/mo): https://www.patreon.com/c/scopelock
- Core Feature: Blocks junior developers and software boutiques from committing out-of-scope client features without an approved UCC § 2-209 change-order invoice.
"""

if "B2B Agency & Enterprise CI/CD Protection" not in llm:
    llm += addition
    with open("public/llms.txt", "w", encoding="utf-8") as f:
        f.write(llm)
    print("public/llms.txt updated!")
else:
    print("llms.txt already up to date")
