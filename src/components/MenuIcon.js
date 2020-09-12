import React from 'react';
import { Link } from "react-router-dom";
import styles from './MenuIcon.module.css';
import cx from 'classnames';

function MenuIcon(props) {
    return (
        <div className={styles.MenuIcon}>
            <Link to={"/" + props.name} className={styles.LinkArea}>
                <div className={cx(styles.Dot, props.className)}></div>
                <div className={cx(styles.Name, props.className)}>{props.name}</div>
            </Link>
        </div>
    );
}

export default MenuIcon;
