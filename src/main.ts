import { CameraAuditor } from './audit/cameraAuditor';
import { ReportGenerator } from './report/reportGenerator';
import { ConfigManager } from './config/configManager';
import { Logger } from './utils/logger';

class CamsAuditTool {
    private auditor: CameraAuditor;
    private reporter: ReportGenerator;
    private config: ConfigManager;
    private logger: Logger;

    constructor() {
        this.config = new ConfigManager();
        this.logger = new Logger();
        this.auditor = new CameraAuditor(this.config);
        this.reporter = new ReportGenerator();
    }

    private async validateConfig(): Promise<boolean> {
        const requiredConfigs = [
            'DB_HOST',
            'DB_USER',
            'DB_PASSWORD',
            'API_KEY',
            'LOG_LEVEL'
        ];

        const missingConfigs = requiredConfigs.filter(
            config => !process.env[config]
        );

        if (missingConfigs.length > 0) {
            this.logger.error(`Missing required configurations: ${missingConfigs.join(', ')}`);
            return false;
        }

        return true;
    }

    private setupGracefulShutdown(): void {
        const shutdown = async (signal: string) => {
            this.logger.info(`Received ${signal}. Starting graceful shutdown...`);
            
            try {
                // Clean up resources
                await this.auditor.cleanup();
                await this.reporter.cleanup();
                
                this.logger.info('Cleanup completed successfully');
                process.exit(0);
            } catch (error) {
                this.logger.error('Error during cleanup:', error);
                process.exit(1);
            }
        };

        process.on('SIGTERM', () => shutdown('SIGTERM'));
        process.on('SIGINT', () => shutdown('SIGINT'));
    }

    async start() {
        this.setupGracefulShutdown();

        try {
            const configValid = await this.validateConfig();
            if (!configValid) {
                this.logger.error('Invalid configuration. Exiting...');
                process.exit(1);
            }

            this.logger.info('Starting camera audit...');
            const auditResults = await this.auditor.performAudit();
            const report = this.reporter.generateReport(auditResults);
            await this.reporter.saveReport(report);
            this.logger.info('Audit completed successfully');
        } catch (error) {
            this.logger.error('Error during audit:', error);
            process.exit(1);
        }
    }
}

// Start the application
const tool = new CamsAuditTool();
tool.start();
