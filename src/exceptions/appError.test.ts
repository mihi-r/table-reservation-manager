import AppError from './appError';
import { AppErrorInfo, ErrorType } from '../types/general';

describe('Exception::AppError', () => {
    it('contains the correct properties', () => {
        const appErrorInfo: AppErrorInfo = {
            message: 'error',
            code: 1,
            type: ErrorType.Error,
        };
        const error = new AppError(appErrorInfo);

        expect(error.message).toBe('error');
        expect(error.code).toBe(1);
        expect(error.type).toBe(ErrorType.Error);
    });
});
