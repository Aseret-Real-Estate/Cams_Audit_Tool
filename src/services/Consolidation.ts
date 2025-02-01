import { FinancialStatement, ConsolidatedStatement } from '../models/FinancialData';

export class ConsolidationService {
    private exchangeRates: Map<string, number> = new Map();

    constructor() {
        // Initialize with some default exchange rates
        this.exchangeRates.set('USD', 1);
        this.exchangeRates.set('EUR', 1.1);
        this.exchangeRates.set('GBP', 1.3);
    }

    public consolidateStatements(statements: FinancialStatement[]): ConsolidatedStatement {
        const convertedStatements = statements.map(stmt => 
            this.convertCurrency(stmt, 'USD'));

        const consolidated: ConsolidatedStatement = {
            id: `CONS-${new Date().getTime()}`,
            period: convertedStatements[0].period,
            assets: 0,
            liabilities: 0,
            equity: 0,
            revenue: 0,
            expenses: 0,
            subsidiaries: statements.map(s => s.companyId),
            adjustments: []
        };

        // Consolidate all statements
        convertedStatements.forEach(statement => {
            consolidated.assets += statement.assets;
            consolidated.liabilities += statement.liabilities;
            consolidated.equity += statement.equity;
            consolidated.revenue += statement.revenue;
            consolidated.expenses += statement.expenses;
        });

        return consolidated;
    }

    private sumField(statements: FinancialStatement[], field: keyof FinancialStatement): number {
        return statements.reduce((sum, stmt) => sum + (stmt[field] as number), 0);
    }

    private convertCurrency(statement: FinancialStatement, targetCurrency: string): FinancialStatement {
        const rate = this.exchangeRates.get(statement.currency) ?? 1;
        return {
            ...statement,
            assets: statement.assets * rate,
            liabilities: statement.liabilities * rate,
            equity: statement.equity * rate,
            revenue: statement.revenue * rate,
            expenses: statement.expenses * rate,
            currency: targetCurrency
        };
    }
}
