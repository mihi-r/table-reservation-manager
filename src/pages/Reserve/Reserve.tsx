import React from 'react';
import ReservationIntro from '../../components/ReservationIntro/ReservationIntro';

/**
 * The page that allows a user reserve a table.
 * @returns A React element.
 */
function Reserve(): React.ReactElement {
    return (
        <main>
            <ReservationIntro />
        </main>
    );
}

export default Reserve;
