with open("src/components/Header.tsx", "r") as f:
    c = f.read()

target = '<button\n            id="open-license-btn"'
replacement = """<a
            href="./agency-enterprise.html"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-purple-300 bg-purple-950/70 hover:bg-purple-900 border border-purple-500/50 rounded-lg whitespace-nowrap transition-all shadow-sm shadow-purple-500/20 animate-pulse"
            title="Enterprise & Agency Tier ($199/mo) - Dedicated B2B CI/CD Protection"
          >
            <Shield className="w-3.5 h-3.5 shrink-0 text-purple-400" />
            <span>Agency Shield ($199/mo)</span>
          </a>
          <button
            id="open-license-btn" """

if target in c:
    c = c.replace(target, replacement, 1)
    with open("src/components/Header.tsx", "w") as f:
        f.write(c)
    print("Header updated successfully!")
else:
    print("Target not found!")
