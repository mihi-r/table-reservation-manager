import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';
import tribunalLogo from '../../images/tribunal-logo.png';

/**
 * The navigation bar displayed on all pages.
 */
function Navbar(): React.ReactElement {
    return (
        <nav className={styles.nav}>
            <div className={styles.navContents}>
                <a href="https://tribunal.uc.edu" className={styles.logo}>
                    <img src={tribunalLogo} alt="CEAS Tribunal logo" />
                </a>
                <div className={styles.links}>
                    <NavLink to="/" activeClassName={styles.selected} exact>Reserve</NavLink>
                    <NavLink to="/status" activeClassName={styles.selected}>Status</NavLink>
                    <NavLink to="/admin" activeClassName={styles.selected}>Admin</NavLink>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
