# User Guide

## Getting Started

### Basic Usage
```bash
cams-audit scan              # Run default scan
cams-audit scan --quick      # Quick scan mode
cams-audit scan --deep       # Deep inspection
```

### Scan Modes
- Quick Scan: Basic connectivity and config check
- Standard Scan: Full configuration audit
- Deep Scan: Security vulnerability assessment

### Report Types
- Summary Report: High-level overview
- Detailed Report: Complete system analysis
- Compliance Report: Regulatory compliance check

## Advanced Features

### Custom Scan Profiles
```json
{
  "name": "high-security",
  "checks": ["ssl", "firmware", "passwords"],
  "depth": "extensive"
}
```

### Automated Scheduling
```bash
cams-audit schedule --daily="23:00"
cams-audit schedule --weekly="Sunday"
```

### Batch Processing
```bash
cams-audit batch --input=cameras.txt
```

## Best Practices

- Regular scanning schedule
- Secure credential management
- Report archiving
- Incident response planning
