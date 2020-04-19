import AppErrors from './appWarnings';

describe('Exception::AppWarnings Tests', () => {
    it('returns a confict warning', () => {
        expect(AppErrors.conflictWarning('').code).toBe(2001);
    });

    it('returns an semantic request error', () => {
        expect(AppErrors.semanticWarning('').code).toBe(2002);
    });
});
