# API Documentation

## Core Modules

### Scanner Module
```typescript
import { Scanner } from 'cams-audit-tool';

const scanner = new Scanner(options);
await scanner.scan();
```

### Reporter Module
```typescript
import { Reporter } from 'cams-audit-tool';

const reporter = new Reporter();
await reporter.generateReport();
```

## API Reference

### Scanner Class
- `scan()`: Initiates network scan
- `validateConfig()`: Validates camera configurations
- `testConnection()`: Tests camera connectivity

### Reporter Class
- `generateReport()`: Creates audit report
- `exportPDF()`: Exports to PDF format
- `exportCSV()`: Exports to CSV format

## Examples

See the [examples](../examples) directory for implementation samples.

## Error Handling

All API methods return Promises and include proper error handling:

```typescript
try {
  await scanner.scan();
} catch (error) {
  console.error('Scan failed:', error.message);
}
```
