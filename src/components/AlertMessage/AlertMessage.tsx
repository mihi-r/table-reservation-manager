import React, { useState } from 'react';
import AppErrors from '../../exceptions/appErrors/appErrors';
import AppError from '../../exceptions/appError';
import { ErrorType } from '../../types/general';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import WarningMessage from '../WarningMessage/WarningMessage';

interface AlertMessageProps {
    /**
     * The error.
     */
    error: Error | undefined
}

/**
 * Displays an alert message based on the type of error.
 * @param props The props.
 * @param props.error The error.
 * @returns A React element.
 */
function AlertMessage({ error }: AlertMessageProps): React.ReactElement | null {
    const [isOpen, setIsOpen] = useState(true);
    let { message, code, type } = AppErrors.unknownError();

    function handleCloseClick() {
        if (isOpen) {
            setIsOpen(false);
        }
    }

    if (isOpen) {
        if (error instanceof AppError) {
            message = error.message;
            code = error.code;
            type = error.type;
        }

        if (type === ErrorType.Error) {
            return (
                <ErrorMessage
                  message={message}
                  code={code}
                  closeClickHandler={handleCloseClick}
                />
            );
        }

        return (
            <WarningMessage
              message={message}
              code={code}
              closeClickHandler={handleCloseClick}
            />
        );
    }

    return null;
}

export default AlertMessage;
