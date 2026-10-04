with open("cli/scopelock-audit.js", "r", encoding="utf-8") as f:
    c = f.read()

bad = "exec(, { stdio: 'ignore' }, (err) => {"
good = "exec(`${startCmd} \"${targetUrl}\"`, { stdio: 'ignore' }, (err) => {"

if bad in c:
    c = c.replace(bad, good)
    with open("cli/scopelock-audit.js", "w", encoding="utf-8") as f:
        f.write(c)
    print("Fixed openBrowserUrl exec syntax!")
else:
    print("bad pattern not found")
