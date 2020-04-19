import { AppErrorInfo, ErrorType } from '../../types/general';

class AppWarnings {
    /**
     * The code prefix for regular warnings.
     */
    public static readonly codePrefix = 2000;

    /**
     * The warning for server conflicts.
     * @param message The message to give more details to the warning.
     * @returns The warning.
     */
    public static conflictWarning(message: string): AppErrorInfo {
        return {
            code: AppWarnings.codePrefix + 1,
            message: `A conflict occurred: ${message}`,
            type: ErrorType.Warning,
        };
    }

    /**
     * The warning for semantic issues.
     * @param message The message to give more details to the warning.
     * @returns The warning.
     */
    public static semanticWarning(message: string): AppErrorInfo {
        return {
            code: AppWarnings.codePrefix + 2,
            message: `Opps. You may need to change something: ${message}`,
            type: ErrorType.Warning,
        };
    }
}

export default AppWarnings;
