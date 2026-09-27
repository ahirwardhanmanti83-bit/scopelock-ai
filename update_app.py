with open('src/App.tsx', 'r') as f:
    content = f.read()

# Replace the download button logic or banner to provide direct .JAR download
old_btn = "JETBRAINS PLUGIN (.ZIP)"
if old_btn in content:
    content = content.replace("JETBRAINS PLUGIN (.ZIP)", "JETBRAINS PLUGIN (.JAR)")

old_import = "JETBRAINS_ZIP_FILENAME, JETBRAINS_ZIP_BASE64"
if old_import in content:
    content = content.replace(old_import, "JETBRAINS_JAR_FILENAME, JETBRAINS_JAR_BASE64")

# Also check downloadJetbrainsPlugin function
content = content.replace("JETBRAINS_ZIP_FILENAME", "JETBRAINS_JAR_FILENAME")
content = content.replace("JETBRAINS_ZIP_BASE64", "JETBRAINS_JAR_BASE64")
content = content.replace("application/zip", "application/java-archive")

with open('src/App.tsx', 'w') as f:
    f.write(content)

print("Updated App.tsx to use standalone .JAR distribution!")
