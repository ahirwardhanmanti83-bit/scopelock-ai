import zipfile, os, json

os.chdir("vscode-extension")

# Read package.json
with open("package.json", "r") as f:
    manifest = f.read()

# Read extension.js
with open("extension.js", "r") as f:
    ext_code = f.read()

# Read README.md
with open("README.md", "r") as f:
    readme = f.read()

# Unzip 1.0.3 vsix to inspect its exact structure
with zipfile.ZipFile("scopelock-ai-1.0.3.vsix", "r") as zin:
    with zipfile.ZipFile("scopelock-ai-1.0.4.vsix", "w", zipfile.ZIP_DEFLATED) as zout:
        for item in zin.infolist():
            content = zin.read(item.filename)
            if item.filename == "extension/package.json":
                content = manifest.encode('utf-8')
            elif item.filename == "extension/extension.js":
                content = ext_code.encode('utf-8')
            elif item.filename == "extension/README.md":
                content = readme.encode('utf-8')
            elif item.filename == "extension.vsixmanifest":
                content = content.replace(b'Version="1.0.3"', b'Version="1.0.4"')
            zout.writestr(item, content)

print("SUCCESS: scopelock-ai-1.0.4.vsix generated successfully!")
