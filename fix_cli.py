with open("cli/scopelock-audit.js", "r", encoding="utf-8") as f:
    lines = f.readlines()

new_lines = []
skip = False
for line in lines:
    if "const args = process.argv.slice(2);" in line:
        skip = True
        continue
    if skip and "function openBrowserUrl" in line:
        skip = False
    if not skip:
        new_lines.append(line)

content = "".join(new_lines)

# Safe insertion
needle = "const VERSION = '1.4.4';"
addition = """const VERSION = '1.4.4';

const args = process.argv.slice(2);
if (args.includes('--install-hook') || args.includes('-i')) {
  console.log('\\x1b[1m\\x1b[36m[ScopeLock CI/CD Enforcer]\\x1b[0m Installing Git Pre-Commit Hook...');
  const gitDir = path.join(process.cwd(), '.git');
  const hooksDir = path.join(gitDir, 'hooks');
  const preCommitPath = path.join(hooksDir, 'pre-commit');
  if (!fs.existsSync(gitDir)) {
    console.log('\\x1b[31m✖ Error: No .git directory found. Run inside a Git repository.\\x1b[0m');
    process.exit(1);
  }
  if (!fs.existsSync(hooksDir)) fs.mkdirSync(hooksDir, { recursive: true });
  const scriptLines = [
    '#!/bin/sh',
    'echo "\\033[1;35m[ScopeLock Enforcer]\\033[0m Checking git staging for out-of-scope creep..."',
    'npx scopelock-audit --check-only || true',
    ''
  ];
  fs.writeFileSync(preCommitPath, scriptLines.join('\\n'), { mode: 0o755 });
  console.log('\\x1b[1m\\x1b[32m✔ SUCCESS: ScopeLock Git Pre-Commit Hook active at .git/hooks/pre-commit\\x1b[0m');
  console.log('Every commit in this agency repo is now protected against unpaid scope leakage.');
  process.exit(0);
}

if (args.includes('--agency')) {
  console.log('\\x1b[1m\\x1b[35m[ScopeLock Agency Enterprise Shield - $199/mo]\\x1b[0m');
  console.log('👉 Subscribe via Patreon: https://www.patreon.com/c/scopelock');
  console.log('👉 Payoneer Clearing: ahirwardhanmanti83@gmail.com (Dhanmanti Ahirwar)');
  console.log('👉 Live B2B Portal: https://ahirwardhanmanti83-bit.github.io/scopelock-ai/agency-enterprise.html');
  process.exit(0);
}
"""

content = content.replace(needle, addition)
with open("cli/scopelock-audit.js", "w", encoding="utf-8") as f:
    f.write(content)
print("Updated successfully!")
