import React from 'react';
import styles from './HelpBtn.module.css';

class HelpBtn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }
    handleClick() {
        this.setState({
            open: !this.state.open
        });
    }
    getBtnClass() {
        let openClass = (this.state.open) ? styles.Open : "";
        let lightClass = this.props.light ? styles.Light : "";
        return `${styles.HelpText} ${openClass} ${lightClass}`;
    }
    render() {
        let lightClass = this.props.light ? styles.Light : "";
        return (
            <div className={`${styles.HelpBtn} ${lightClass}`}>
                <div className={`${styles.Btn} ${lightClass}`}
                    onClick={() => this.handleClick()}
                >
                    {(this.state.open) ? "!" : "?"}
                </div>
                <div className={this.getBtnClass()}>
                    {this.props.text}
                </div>
            </div>
        );
    }
}

export default HelpBtn;
