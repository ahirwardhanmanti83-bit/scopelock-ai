import re, time

with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

# Add a timestamp query param to main.tsx or bundle to bypass mobile cache completely
t = int(time.time())
print(f"Bumping cache-buster version: {t}")
html = html.replace('src="/src/main.tsx"', f'src="/src/main.tsx?v={t}"')

with open("index.html", "w", encoding="utf-8") as f:
    f.write(html)
