import { AuditConfig } from './types';
import { ConfigurationError } from '../utils/errors';
import * as fs from 'fs/promises';
import path from 'path';

export class ConfigManager {
    private config: AuditConfig;
    private readonly configPath: string;

    constructor(configPath: string = '.cams-audit.json') {
        this.configPath = configPath;
    }

    async load(): Promise<void> {
        try {
            const configFile = await fs.readFile(this.configPath, 'utf8');
            this.config = JSON.parse(configFile);
            this.validate();
        } catch (error) {
            throw new ConfigurationError(
                `Failed to load configuration: ${error.message}`,
                error
            );
        }
    }

    private validate(): void {
        const required = ['database', 'network', 'logging'];
        const missing = required.filter(key => !this.config[key]);
        
        if (missing.length > 0) {
            throw new ConfigurationError(
                `Missing required configuration sections: ${missing.join(', ')}`
            );
        }
    }

    get(): AuditConfig {
        if (!this.config) {
            throw new ConfigurationError('Configuration not loaded');
        }
        return this.config;
    }
}
