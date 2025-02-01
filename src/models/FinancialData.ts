export interface FinancialStatement {
    id: string;
    period: string;
    assets: number;
    liabilities: number;
    equity: number;
    revenue: number;
    expenses: number;
    notes?: string[];
}

export interface ConsolidatedStatement extends FinancialStatement {
    subsidiaries: string[];
    adjustments: Adjustment[];
}

interface Adjustment {
    type: 'addition' | 'subtraction';
    amount: number;
    description: string;
}
