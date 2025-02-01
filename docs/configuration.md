# Configuration Guide

## Configuration File

The tool uses `.cams-audit.json` for configuration. Create it in your project root:

```json
{
  "scan": {
    "range": "192.168.1.0/24",
    "timeout": 5000,
    "parallel": 10
  },
  "auth": {
    "username": "admin",
    "keyFile": "~/.ssh/id_rsa"
  },
  "report": {
    "format": "pdf",
    "template": "default",
    "output": "./reports"
  }
}
```

## Environment Variables

```bash
CAMS_AUDIT_SCAN_RANGE=192.168.1.0/24
CAMS_AUDIT_USERNAME=admin
CAMS_AUDIT_KEY_FILE=~/.ssh/id_rsa
```

## Command Line Options

```bash
cams-audit --scan-range=192.168.1.0/24 --timeout=5000
```

## Templates

Custom report templates can be placed in `~/.cams-audit/templates/`.

## Advanced Configuration

See [advanced-config.md](./advanced-config.md) for more options.
