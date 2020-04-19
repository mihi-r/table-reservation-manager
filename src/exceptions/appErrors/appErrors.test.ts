import AppErrors from './appErrors';

describe('Exception::AppErrors Tests', () => {
    it('returns a network error', () => {
        expect(AppErrors.networkError().code).toBe(1001);
    });

    it('returns an unknown request error', () => {
        expect(AppErrors.unknownRequestError().code).toBe(1002);
    });

    it('returns an internal server error', () => {
        expect(AppErrors.internalServerError('').code).toBe(1003);
    });

    it('returns an not found  error', () => {
        expect(AppErrors.notFoundError().code).toBe(1004);
    });
});
