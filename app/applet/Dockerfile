# ScopeLock AI Autonomous Docker Engine
# Ultra-lightweight alpine container for CI/CD & Enterprise Scope Audits
FROM node:20-alpine

LABEL org.opencontainers.image.title="ScopeLock AI Audit"
LABEL org.opencontainers.image.description="Autonomous B2B Scope-Creep Detection & Statutory UCC § 2-209 Change Order Engine"
LABEL org.opencontainers.image.authors="Krishna Ahirwar <ahirwardhanmanti83@gmail.com>"
LABEL org.opencontainers.image.url="https://patreon.com/c/scopelock"

# Install git for repo analysis
RUN apk add --no-cache git bash

WORKDIR /workspace

# Install scopelock-audit globally from live npm registry
RUN npm install -g scopelock-audit@latest

# Default entrypoint runs the audit and generates UCC § 2-209 change order
ENTRYPOINT ["scopelock-audit"]
CMD ["--audit"]
