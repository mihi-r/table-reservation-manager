import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import styles from './ErrorMessage.module.css';

interface ErrorMessageProps {
    /**
     * The message to display for the error.
     */
    message: string;

    /**
     * The code to add as reference to the error.
     */
    code: number;

    /**
     * The click handler to close the message.
     */
    closeClickHandler: (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void,
}

/**
 * Displays an error alert.
 * @param props The props.
 * @param props.message The message to display for the error.
 * @param props.code The code to add as reference to the error.
 * @param props.closeClickHandler The click handler to close the message.
 * @returns A React element.
 */
function ErrorMessage({ message, code, closeClickHandler }: ErrorMessageProps): React.ReactElement {
    return (
        <div className={styles.container} role="alert">
            <div className={styles.content}>
                <FontAwesomeIcon
                  icon={faTimes}
                  className={styles.closeIcon}
                  onClick={closeClickHandler}
                  role="button"
                  aria-label="Close"
                />
                <div className={styles.errorContent}>
                    <FontAwesomeIcon icon={faExclamationCircle} className={styles.errorIcon} />

                    <div className={styles.errorBody}>
                        <h2>Error</h2>
                        <p className={styles.message}>{ message }</p>
                        <p className={styles.code}>{ `Code: ${code}`}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ErrorMessage;
