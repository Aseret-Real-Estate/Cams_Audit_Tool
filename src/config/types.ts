export interface DatabaseConfig {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    ssl?: boolean;
}

export interface NetworkConfig {
    timeout: number;
    retries: number;
    concurrency: number;
    scanRange: string;
}

export interface LogConfig {
    level: 'debug' | 'info' | 'warn' | 'error';
    path: string;
    maxSize: string;
    maxFiles: number;
}

export interface AuditConfig {
    database: DatabaseConfig;
    network: NetworkConfig;
    logging: LogConfig;
    outputDir: string;
    reportFormat: 'pdf' | 'html' | 'json';
}
