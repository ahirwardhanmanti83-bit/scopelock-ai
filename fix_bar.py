with open("src/App.tsx", "r", encoding="utf-8") as f:
    text = f.read()

# 1. Remove the incorrectly placed bar
old_bar_marker = "{/* Sovereign Conversion Bar (Instant $3 Unlock & $199 Agency Shield) */}"
if old_bar_marker in text:
    parts = text.split(old_bar_marker)
    # The bar ends before the next tag or end of div
    end_part = parts[1]
    # find closing </div> of this bar
    bar_end_idx = end_part.find("</div>\n      </div>")
    if bar_end_idx != -1:
        rest = end_part[bar_end_idx + len("</div>\n      </div>"):]
        text = parts[0] + rest
    else:
        # fallback search
        bar_end_idx = end_part.find("</a>\n        </div>\n      </div>")
        if bar_end_idx != -1:
            rest = end_part[bar_end_idx + len("</a>\n        </div>\n      </div>"):]
            text = parts[0] + rest

bar_code = """
      {/* Sovereign Conversion Bar (Instant $3 Unlock & $199 Agency Shield) */}
      <aside aria-label="Sovereign Quick Checkout" className="fixed bottom-0 inset-x-0 z-[9999] bg-slate-950/95 border-t border-cyan-500/40 backdrop-blur-md px-4 py-2.5 shadow-2xl flex flex-wrap items-center justify-between gap-3 text-xs md:text-sm">
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
            className="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shadow-lg transition flex items-center gap-1.5 cursor-pointer"
          >
            <span>⚡ Instant $3 PDF Unlock</span>
          </a>
          <a
            href="https://ahirwardhanmanti83-bit.github.io/scopelock-ai/agency-enterprise.html"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackAnalyticsConversion('agency_shield_click', 199, 'Agency Enterprise Pass')}
            className="px-3.5 py-1.5 rounded-lg bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/40 font-semibold transition cursor-pointer"
          >
            🏢 Agency Pro ($199/mo)
          </a>
        </div>
      </aside>
"""

# Place it right before the last closing </div> of export default function App
last_div_idx = text.rfind("</div>")
if last_div_idx != -1:
    text = text[:last_div_idx] + bar_code + "\n    " + text[last_div_idx:]
    with open("src/App.tsx", "w", encoding="utf-8") as f:
        f.write(text)
    print("Bar repositioned to outermost container successfully")
else:
    print("Could not find outermost div")
