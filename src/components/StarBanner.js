import React from 'react';
import styles from './StarBanner.module.css';
import cx from 'classnames';
import Star from './Star';

class StarBanner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dismiss: false
        };
    }
    getClassNames() {
        let hide = (!this.props.star || this.state.dismiss) ? styles.Hide : '';
        return cx(styles.StarBanner, hide);
    }
    handleClick() {
        this.setState({
            dismiss: true
        });
    }
    render() {
        return (
            <div className={this.getClassNames()}>
                <div
                    className={styles.Dismiss}
                    onClick={() => this.handleClick()}
                >
                    close
                </div>
                <h2>Puzzle Solved</h2>
                <div className={styles.StarContainer}>
                    <div className={styles.Star}>
                        <Star star={true} size="60" />
                    </div>
                    <div className={styles.Info}>
                        You got a star!
                    </div>
                </div>
            </div>
        );
    }
}

export default StarBanner;
