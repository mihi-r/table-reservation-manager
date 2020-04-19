export enum RequestMethod {
    /**
     * The POST request method.
     */
    Post = 'POST',

    /**
     * The GET request method.
     */
    Get = 'GET'
}

export enum APIStatus {
    /**
     * The status describing a successful API call.
     */
    Success = 'Success',

    /**
     * The status describing a failed API call.
     */
    Failure = 'Failure'
}

export enum ErrorType {
    /**
     * The type error.
     */
    Error = 0,

    /**
     * The type warning.
     */
    Warning = 1
}

export interface AppErrorInfo {
    /**
     * The error message.
     */
    readonly message: string;

    /**
     * The error code.
     */
    readonly code: number;

    /**
     * The error type.
     */
    readonly type: ErrorType;
}

export interface APIResult<T> {
    /**
     * The message usually encompassing a failure.
     */
    message?: string;

    /**
     * The data from the request.
     */
    data?: T;
}
