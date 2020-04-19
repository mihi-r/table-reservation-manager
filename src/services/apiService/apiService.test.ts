import apiService from './apiService';
import { APIResult, RequestMethod } from '../../types/general';
import AppError from '../../exceptions/appError';

describe('Service::ApiService Tests', () => {
    it('returns the data after a successful fetch request', async () => {
        const mockSuccessfuResponse: APIResult<string> = {
            data: 'data',
        };
        const mockFetchResponse = Promise.resolve({
            json: () => Promise.resolve(mockSuccessfuResponse),
            ok: true,
            status: 200,
        });

        Object.defineProperty(window, 'fetch', { writable: true, configurable: true, value: () => mockFetchResponse });

        const response = await apiService<string>('', RequestMethod.Get);
        expect(response).toBe('data');
    });

    it('returns no data after a successful fetch request', async () => {
        const mockFetchResponse = Promise.resolve({
            ok: true,
            status: 200,
        });

        Object.defineProperty(window, 'fetch', { writable: true, configurable: true, value: () => mockFetchResponse });

        const response = await apiService<string>('', RequestMethod.Post, new FormData());
        expect(response).toBeNull();
    });

    it('throws a network error if fetch results in an error', async () => {
        const mockFetchResponse = Promise.reject(new Error());
        Object.defineProperty(window, 'fetch', { writable: true, configurable: true, value: () => mockFetchResponse });

        let outputErrorCode: number | null = null;
        try {
            await apiService<string>('', RequestMethod.Get);
        } catch (err) {
            if (err instanceof AppError) {
                outputErrorCode = err.code;
            }
        }

        expect(outputErrorCode).toBe(1001);
    });

    it('throws a not found error', async () => {
        const mockFetchResponse = Promise.resolve({
            json: () => Promise.resolve({}),
            ok: false,
            status: 404,
        });

        Object.defineProperty(window, 'fetch', { writable: true, configurable: true, value: () => mockFetchResponse });

        let outputErrorCode: number | null = null;
        try {
            await apiService<string>('', RequestMethod.Get);
        } catch (err) {
            if (err instanceof AppError) {
                outputErrorCode = err.code;
            }
        }

        expect(outputErrorCode).toBe(1004);
    });

    it('throws a conflict warning', async () => {
        const mockSuccessfuResponse: APIResult<string> = {
            message: 'message',
        };

        const mockFetchResponse = Promise.resolve({
            json: () => Promise.resolve(mockSuccessfuResponse),
            ok: false,
            status: 409,
        });

        Object.defineProperty(window, 'fetch', { writable: true, configurable: true, value: () => mockFetchResponse });

        let outputErrorCode: number | null = null;
        try {
            await apiService<string>('', RequestMethod.Get);
        } catch (err) {
            if (err instanceof AppError) {
                outputErrorCode = err.code;
            }
        }

        expect(outputErrorCode).toBe(2001);
    });

    it('throws a semantic warning', async () => {
        const mockSuccessfuResponse: APIResult<string> = {
            message: 'message',
        };

        const mockFetchResponse = Promise.resolve({
            json: () => Promise.resolve(mockSuccessfuResponse),
            ok: false,
            status: 422,
        });

        Object.defineProperty(window, 'fetch', { writable: true, configurable: true, value: () => mockFetchResponse });

        let outputErrorCode: number | null = null;
        try {
            await apiService<string>('', RequestMethod.Get);
        } catch (err) {
            if (err instanceof AppError) {
                outputErrorCode = err.code;
            }
        }

        expect(outputErrorCode).toBe(2002);
    });

    it('throws an internal server error', async () => {
        const mockSuccessfuResponse: APIResult<string> = {
            message: 'message',
        };

        const mockFetchResponse = Promise.resolve({
            json: () => Promise.resolve(mockSuccessfuResponse),
            ok: false,
            status: 500,
        });

        Object.defineProperty(window, 'fetch', { writable: true, configurable: true, value: () => mockFetchResponse });

        let outputErrorCode: number | null = null;
        try {
            await apiService<string>('', RequestMethod.Get);
        } catch (err) {
            if (err instanceof AppError) {
                outputErrorCode = err.code;
            }
        }

        expect(outputErrorCode).toBe(1003);
    });

    it('throws an unknown request error when the error could not be handled', async () => {
        const mockFetchResponse = Promise.resolve({
            json: () => Promise.resolve({}),
            ok: false,
            status: 410,
        });

        Object.defineProperty(window, 'fetch', { writable: true, configurable: true, value: () => mockFetchResponse });

        let outputErrorCode: number | null = null;
        try {
            await apiService<string>('', RequestMethod.Get);
        } catch (err) {
            if (err instanceof AppError) {
                outputErrorCode = err.code;
            }
        }

        expect(outputErrorCode).toBe(1002);
    });
});
