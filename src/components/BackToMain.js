import React from 'react';
import { Link } from "react-router-dom";
import styles from './BackToMain.module.css';

class BackToMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        let lightClass = this.props.light ? styles.Light : "";
        return (
            <div className={`${styles.BackToMain} ${lightClass}`}>
                <Link to="/" className={`${styles.Link} ${lightClass}`}>
                    {"< back"}
                </Link>
            </div>
        );
    }
}

export default BackToMain;
