import { ConsolidationService } from './services/Consolidation';
import { ReportGenerator } from './services/ReportGenerator';
import { FinancialStatement } from './models/FinancialData';
import { SystemChecker } from './systemCheck';

export class AuditTool {
    private consolidationService: ConsolidationService;
    private reportGenerator: ReportGenerator;

    constructor() {
        this.consolidationService = new ConsolidationService();
        this.reportGenerator = new ReportGenerator();
    }

    public performAudit(statements: FinancialStatement[]) {
        const consolidated = this.consolidationService.consolidateStatements(statements);
        const financialReport = this.reportGenerator.generateFinancialReport(consolidated);
        const attorneyLetter = this.reportGenerator.generateAttorneyLetter();

        return {
            consolidated,
            financialReport,
            attorneyLetter
        };
    }

    public async performFinalAudit(statements: FinancialStatement[]) {
        // Perform system check first
        const checker = new SystemChecker();
        const checkResults = await checker.performFullCheck();
        
        if (checkResults.some(r => r.status === 'fail')) {
            throw new Error('System check failed, cannot proceed with audit');
        }

        const auditResults = this.performAudit(statements);
        
        return {
            systemCheck: checkResults,
            ...auditResults,
            timestamp: new Date(),
            status: 'completed'
        };
    }
}

export async function performSystemCheck(): Promise<void> {
    const checker = new SystemChecker();
    const results = await checker.performFullCheck();
    
    console.log('Final System Check Results:');
    results.forEach(result => {
        console.log(`[${result.status.toUpperCase()}] ${result.message}`);
        console.log(`Duration: ${result.duration}ms`);
        if (result.details) {
            console.log('Details:', JSON.stringify(result.details, null, 2));
        }
        console.log('---');
    });

    const hasFailures = results.some(r => r.status === 'fail');
    if (hasFailures) {
        throw new Error('System check failed - please review the logs');
    }
}

// Execute if run directly
if (require.main === module) {
    performSystemCheck()
        .then(() => console.log('Final system check completed successfully'))
        .catch(error => {
            console.error('Final system check failed:', error.message);
            process.exit(1);
        });
}
