import React from 'react';
import { useAsync } from 'react-async';
import fetchData from '../../services/apiService/apiService';
import { Admins } from '../../types/apiResponseData';
import APIResources from '../../constants/apiResourses';
import { RequestMethod } from '../../types/general';
import styles from './ReservationOpener.module.css';

/**
 * Gets all of the admins.
 * @returns The admins.
 */
export async function getAdmins() {
    const data = await fetchData<Admins>(APIResources.GET_ADMINS_URL, RequestMethod.Get);
    return data;
}

/**
 * Builds a sentence component with the admins name and email to later to be
 * integrated into the final text.
 * @param admins The admins.
 * @returns The sentence component.
 */
export function formatAdminsText(admins: Admins) {
    let text = ' ';

    admins.forEach((admin, index) => {
        if (index === admins.length - 1) {
            text += `${admin.name} (${admin.email})`;
        } else if ((index === admins.length - 2) && (admins.length > 2)) {
            text += `${admin.name} (${admin.email}), or `;
        } else if ((index === admins.length - 2)) {
            text += `${admin.name} (${admin.email}) or `;
        } else {
            text += `${admin.name} (${admin.email}), `;
        }
    });

    return text;
}

/**
 * The opening text for the reservation intro.
 * @returns A React element or null.
 */
function ReservationOpener(): React.ReactElement {
    const { data, isPending } = useAsync({ promiseFn: getAdmins });

    if (isPending) {
        if (window.innerWidth > 600) {
            return (
                <div className={styles.skeleton} role="status">
                    <div className={styles.line} />
                    <div className={styles.line} />
                    <div className={styles.line} />
                </div>
            );
        }
        return (
            <div className={styles.skeleton} role="status">
                <div className={styles.line} />
                <div className={styles.line} />
                <div className={styles.line} />
                <div className={styles.line} />
                <div className={styles.line} />
                <div className={styles.line} />
            </div>
        );
    }

    if (data) {
        return (
            <p>
                Reserve tables in Baldwin Hall for events sponsered by your organization or for
                other organizational needs. To proceed, choose from our selection of lobby
                tables and request for your desired event time. Your request will not be
                confirmed until it is approved by us. Please allow 1-3 days to either approve
                or deny your request. Reserve at least one week in advance to allow for the
                most optimal outcome. If you have any questions, please email
                {formatAdminsText(data)}
                .
            </p>
        );
    }

    return <p>Error</p>;
}

export default ReservationOpener;
