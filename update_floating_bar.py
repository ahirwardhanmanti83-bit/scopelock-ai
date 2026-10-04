with open("src/App.tsx", "r", encoding="utf-8") as f:
    code = f.read()

# Floating Sovereign Conversion Bar JSX
floating_bar = """
      {/* Sovereign Conversion Bar (Instant $3 Unlock & $199 Agency Shield) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 border-t border-cyan-500/30 backdrop-blur-md px-4 py-2.5 shadow-2xl flex flex-wrap items-center justify-between gap-3 text-xs md:text-sm">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-semibold text-slate-200">
            <span className="text-cyan-400 font-bold">UCC § 2-209 Statutory Shield Active:</span> Stop unpaid scope creep before shipping.
          </span>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="https://www.patreon.com/c/scopelock"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackAnalyticsConversion('patreon_instant_unlock', 3, 'Instant ScopeLock PDF Unlock')}
            className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shadow-lg transition flex items-center gap-1.5"
          >
            <span>⚡ Instant $3 PDF Unlock</span>
          </a>
          <a
            href="https://ahirwardhanmanti83-bit.github.io/scopelock-ai/agency-enterprise.html"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackAnalyticsConversion('agency_shield_click', 199, 'Agency Enterprise Pass')}
            className="px-3 py-1.5 rounded-lg bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/40 font-semibold transition"
          >
            🏢 Agency Pro ($199/mo)
          </a>
        </div>
      </div>
"""

# Place it right before the last closing tag of the main container </main> or </div>
if "Sovereign Conversion Bar" not in code:
    # insert before </main> or </div> at the end of return statement
    if "</main>" in code:
        code = code.replace("</main>", floating_bar + "\n    </main>")
        with open("src/App.tsx", "w", encoding="utf-8") as f:
            f.write(code)
        print("Floating bar injected before </main>")
    else:
        print("Could not find </main>")
else:
    print("Floating bar already exists")
