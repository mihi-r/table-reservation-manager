import {
    RequestMethod,
    APIResult,
} from '../../types/general';
import AppError from '../../exceptions/appError';
import AppErrors from '../../exceptions/appErrors/appErrors';
import AppWarnings from '../../exceptions/appWarnings/appWarnings';

/**
 * Creates a fetch request.
 * @param url The URL of the request.
 * @param method The HTTP request method.
 * @param body The body to send with the request.
 * @returns The response data or null.
 */
async function fetchData<T>(url: string, method: RequestMethod, body?: FormData) {
    let result: T | null = null;

    const requestInit: RequestInit = {
        method,
    };

    if (body) {
        requestInit.body = body;
    }

    let response: Response;
    try {
        response = await fetch(url, requestInit);
    } catch (err) {
        throw new AppError(AppErrors.networkError());
    }

    let data: APIResult<T>;
    try {
        data = await response.json();
    } catch (err) {
        data = {};
    }

    if (response.ok) {
        if (data.data) {
            result = data.data;
        }
    } else if (response.status === 404) {
        throw new AppError(AppErrors.notFoundError());
    } else if (response.status === 409 && data.message) {
        throw new AppError(AppWarnings.conflictWarning(data.message));
    } else if (response.status === 422 && data.message) {
        throw new AppError(AppWarnings.semanticWarning(data.message));
    } else if (response.status === 500 && data.message) {
        throw new AppError(AppErrors.internalServerError(data.message));
    } else {
        throw new AppError(AppErrors.unknownRequestError());
    }

    return result;
}

export default fetchData;
