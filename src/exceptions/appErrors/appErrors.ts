import { AppErrorInfo, ErrorType } from '../../types/general';

class AppErrors {
    /**
     * The code prefix for errors.
     */
    public static readonly codePrefix = 1000;

    /**
     * The error for network issues.
     * @returns The error.
     */
    public static networkError(): AppErrorInfo {
        return {
            code: AppErrors.codePrefix + 1,
            message: 'An error occurred when sending or retrieving data. Please check your network connection.',
            type: ErrorType.Error,
        };
    }

    /**
     * The error for when the cause of the request error is unknown.
     * @returns The error.
     */
    public static unknownRequestError(): AppErrorInfo {
        return {
            code: AppErrors.codePrefix + 2,
            message: 'An unknown error occurred when sending or retrieving data. Please try again and report the error to the admins if the error persists.',
            type: ErrorType.Error,
        };
    }

    /**
     * The error for an internal server error.
     * @param message The message to give more details to the error.
     * @returns The error.
     */
    public static internalServerError(message: string): AppErrorInfo {
        return {
            code: AppErrors.codePrefix + 3,
            message: `Internal server error: ${message}`,
            type: ErrorType.Error,
        };
    }

    /**
     * The error for a resource not found.
     * @returns The error.
     */
    public static notFoundError(): AppErrorInfo {
        return {
            code: AppErrors.codePrefix + 4,
            message: 'Requested resource not found. Please report this error to the admins.',
            type: ErrorType.Error,
        };
    }

    /**
     * The error for when the cause of the error is unknown.
     * @returns The error.
     */
    public static unknownError(): AppErrorInfo {
        return {
            code: AppErrors.codePrefix + 5,
            message: 'An unknown error occured. If this error is preventing you from performing '
                + 'your desired action, please try again and report the error to the admins if the error persists.',
            type: ErrorType.Error,
        };
    }
}

export default AppErrors;
