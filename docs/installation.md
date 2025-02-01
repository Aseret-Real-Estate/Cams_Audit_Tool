# Installation Guide

## System Requirements

- Node.js 14.x or higher
- 4GB RAM minimum
- Network access to target systems
- Administrative privileges

## Basic Installation

```bash
npm install -g cams-audit-tool
```

## Development Installation

```bash
git clone https://github.com/yourusername/Cams_Audit_Tool.git
cd Cams_Audit_Tool
npm install
npm run build
```

## Configuration

1. Create a configuration file:
   ```bash
   cams-audit init
   ```

2. Edit `.cams-audit.json` with your settings:
   ```json
   {
     "scanRange": "192.168.1.0/24",
     "outputFormat": "pdf",
     "concurrency": 10
   }
   ```

## Verification

To verify installation:
```bash
cams-audit --version
cams-audit --test
```

## Troubleshooting

Common issues and solutions are documented in our [troubleshooting guide](./troubleshooting.md).
