import React from 'react';
import ReservationOpener from '../ReservationOpener/ReservationOpener';
import styles from './ReservationIntro.module.css';

/**
 * Introduction to the reservation page.
 * @returns A React element.
 */
function ReservationIntro(): React.ReactElement {
    return (
        <div className={styles.background}>
            <div className={styles.contents}>
                <h1>Table Reservation</h1>
                <ReservationOpener />
            </div>
        </div>
    );
}

export default ReservationIntro;
