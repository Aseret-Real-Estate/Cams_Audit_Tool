import { SystemChecker, CheckResult } from '../src/systemCheck';

describe('SystemChecker', () => {
    let checker: SystemChecker;

    beforeEach(() => {
        checker = new SystemChecker();
    });

    test('performFullCheck returns array of results', async () => {
        const results = await checker.performFullCheck();
        expect(Array.isArray(results)).toBeTruthy();
        results.forEach(result => {
            expect(result).toHaveProperty('status');
            expect(result).toHaveProperty('message');
            expect(result).toHaveProperty('timestamp');
            expect(result).toHaveProperty('duration');
        });
    });

    test('checkConfigurations validates environment variables', async () => {
        process.env.DB_HOST = 'localhost';
        process.env.DB_USER = 'test';
        process.env.API_KEY = 'test-key';

        const result = await checker['checkConfigurations']();
        expect(result.status).toBe('pass');
    });
});
