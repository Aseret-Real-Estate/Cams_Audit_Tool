export class AuditError extends Error {
    constructor(
        message: string,
        public code: string,
        public details?: any
    ) {
        super(message);
        this.name = 'AuditError';
    }
}

export class ConfigurationError extends AuditError {
    constructor(message: string, details?: any) {
        super(message, 'CONFIG_ERROR', details);
        this.name = 'ConfigurationError';
    }
}

export class NetworkError extends AuditError {
    constructor(message: string, details?: any) {
        super(message, 'NETWORK_ERROR', details);
        this.name = 'NetworkError';
    }
}

export class DatabaseError extends AuditError {
    constructor(message: string, details?: any) {
        super(message, 'DB_ERROR', details);
        this.name = 'DatabaseError';
    }
}
