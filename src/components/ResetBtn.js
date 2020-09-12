import React from 'react';
import styles from './ResetBtn.module.css';

class ResetBtn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    handleClick() {
        let ans = window.confirm("Reset puzzle and keep star progress?");
        if (ans) {
            this.props.reset();
        }
    }
    render() {
        let lightClass = this.props.light ? styles.Light : "";
        return (
            <div className={`${styles.ResetBtn} ${lightClass}`}>
                <div className={`${styles.Btn} ${lightClass}`}
                    onClick={() => this.handleClick()}
                >
                    {"reset"}
                </div>
            </div>
        );
    }
}

export default ResetBtn;
