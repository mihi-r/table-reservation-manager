import { AppErrorInfo, ErrorType } from '../types/general';

class AppError extends Error {
    /**
     * The error code.
     */
    public readonly code: number;

    /**
     * The error type.
     */
    public readonly type: ErrorType;

    /**
     * The constructor.
     * @param appErrorInfo The info that describes the error.
     */
    constructor(appErrorInfo: AppErrorInfo) {
        super(appErrorInfo.message);
        this.code = appErrorInfo.code;
        this.type = appErrorInfo.type;

        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export default AppError;
