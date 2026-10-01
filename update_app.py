with open("src/App.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Check if conversion event function exists or add it
conversion_helper = """
// Google Analytics 4 Sovereign Conversion Dispatcher
function trackAnalyticsConversion(actionName: string, value: number, tier: string) {
  try {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'begin_checkout', {
        event_category: 'Monetization',
        event_label: actionName,
        value: value,
        currency: 'USD',
        items: [{ item_name: tier, price: value }]
      });
      (window as any).gtag('event', 'conversion', {
        send_to: 'G-S28NSEJQMV',
        value: value,
        currency: 'USD'
      });
    }
  } catch (err) {}
}
"""

if "function trackAnalyticsConversion" not in content:
    # insert before export function App or default App component
    if "export function App" in content:
        content = content.replace("export function App", conversion_helper + "\nexport function App")
    elif "export default function App" in content:
        content = content.replace("export default function App", conversion_helper + "\nexport default function App")
    elif "function App" in content:
        content = content.replace("function App", conversion_helper + "\nfunction App")
    
    with open("src/App.tsx", "w", encoding="utf-8") as f:
        f.write(content)
    print("Added trackAnalyticsConversion to src/App.tsx")
else:
    print("trackAnalyticsConversion already present")
