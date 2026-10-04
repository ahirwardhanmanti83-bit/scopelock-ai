with open("cli/scopelock-audit.js", "r") as f:
    code = f.read()

# find where report is printed
lines = code.split('\n')
for idx, l in enumerate(lines):
    if "FINAL AUDIT REPORT" in l or "STATUTORY BILLING" in l or "Change Order" in l:
        print(f"Line {idx}: {l[:80]}")
