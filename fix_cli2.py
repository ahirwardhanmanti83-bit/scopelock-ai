with open("cli/scopelock-audit.js", "r", encoding="utf-8") as f:
    c = f.read()

c = c.replace(r'\033[1;35m', r'\x1b[1;35m').replace(r'\033[0m', r'\x1b[0m')
with open("cli/scopelock-audit.js", "w", encoding="utf-8") as f:
    f.write(c)
print("Replaced octal escapes with hex escapes!")
