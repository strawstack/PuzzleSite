import React from 'react';
import styles from './PuzzleIcon.module.css';
import cx from 'classnames';
import { Link } from "react-router-dom";
import Star from './Star';

class PuzzleIcon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    getClass() {
        let hideClass = (this.props.hide) ? styles.Hide : "";
        return `${styles.PuzzleIcon} ${hideClass}`;
    }
    render() {
        let props = this.props;
        return (
            <div className={this.getClass()}>
                <Link to={"/" + props.name} className={cx(styles.LinkArea, props.className)}>
                    <div className={styles.Star}>
                        <Star star={props.star} size="40"/>
                    </div>
                    <div className={styles.Name}>{props.name}</div>
                </Link>
            </div>
        );
    }
}

export default PuzzleIcon;
