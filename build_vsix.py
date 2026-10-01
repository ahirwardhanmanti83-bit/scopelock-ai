import json, os, subprocess

with open('vscode-extension/package.json', 'r') as f:
    pkg = json.load(f)

pkg['version'] = '1.0.4'

with open('vscode-extension/package.json', 'w') as f:
    json.dump(pkg, f, indent=2)

print("Version updated to 1.0.4")
