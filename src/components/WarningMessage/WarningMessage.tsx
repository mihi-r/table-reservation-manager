import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import styles from './WarningMessage.module.css';

interface WarningMessageProps {
    /**
     * The message to display for the warning.
     */
    message: string;

    /**
     * The code to add as reference to the warning.
     */
    code: number;

    /**
     * The click handler to close the message.
     */
    closeClickHandler: (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void,
}

/**
 * Displays a warning alert.
 * @param props The props.
 * @param props.message The message to display for the warning.
 * @param props.code The code to add as reference to the warning.
 * @param props.closeClickHandler The click handler to close the message.
 * @returns A React element.
 */
function WarningMessage(
    { message, code, closeClickHandler }: WarningMessageProps,
): React.ReactElement {
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
                <div className={styles.warningContent}>
                    <FontAwesomeIcon icon={faExclamationCircle} className={styles.warningIcon} />

                    <div className={styles.warningBody}>
                        <h2>Warning</h2>
                        <p className={styles.message}>{ message }</p>
                        <p className={styles.code}>{ `Code: ${code}`}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WarningMessage;
