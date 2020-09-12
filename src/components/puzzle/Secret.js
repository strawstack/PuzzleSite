import React from 'react';
import styles from "./Secret.module.css";
import StarBanner from '../StarBanner';
import BackToMain from '../BackToMain';
import HelpBtn from '../HelpBtn';

class Secret extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
        window.somethingStrange = () => {
            this.props.solveEvent();
        };
    }
    render() {
        return (
            <div className={styles.Secret}>
                <StarBanner star={this.props.star}/>
                <BackToMain />
                <HelpBtn text="Try looking at the 'window' for a bit. There's no better view than from the console." />
                <div className={styles.PuzzleContainer}>
                    Do you see 'somethingStrange' on the window?
                </div>
            </div>
        );
    }
}

export default Secret;
