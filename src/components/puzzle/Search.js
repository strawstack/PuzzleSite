import React from 'react';
import styles from "./Search.module.css";
import StarBanner from '../StarBanner';
import BackToMain from '../BackToMain';
import ResetBtn from '../ResetBtn';
import HelpBtn from '../HelpBtn';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            0: 0,
            1: 0,

            2: 0,
            3: 0,
            4: 0,

            5: 0,
            6: 0,
            7: 0
        };
        this.answer = 64234234;
    }
    reset() {
        this.setState({
            0: 0,
            1: 0,

            2: 0,
            3: 0,
            4: 0,

            5: 0,
            6: 0,
            7: 0
        });
    }
    componentDidMount() {
        this.input = document.querySelector(`.${styles.Input}`);
    }
    getInfoText() {
        let guess = this.getGuess();
        if (guess === this.answer) {
            return "CORRECT";
        } else if (guess < this.answer) {
            return "TOO LOW";
        } else {
            return "TOO HIGH";
        }
    }
    getGuess() {
        let total = 0;
        for (let i=0; i < 8; i++) {
            total += this.state[i] * Math.pow(10, 7 - i);
        }
        return total;
    }
    handleClick(id) {
        let val = this.state[id];
        let ch = {};
        ch[id] = (val + 1) % 10;
        this.setState(ch, () => {
            if (this.getGuess() === this.answer) {
                this.props.solveEvent();
            }
        });
    }
    render() {
        return (
            <div className={styles.Search}>
                <StarBanner star={this.props.star}/>
                <BackToMain />
                <ResetBtn reset={() => this.reset()}/>
                <HelpBtn text="You could just keep trying... or you could search in a binary fashion?" />
                <div className={styles.PuzzleContainer}>
                    <div className={`${styles.Cell} ${styles.Info}`}>
                        { this.getInfoText() }
                    </div>
                    <div className={`${styles.Cell} ${styles.Input}`}>
                        <div className={styles.Pad}
                            onClick={() => this.handleClick(0)}
                        >{this.state[0]}</div>
                        <div className={styles.Pad}
                            onClick={() => this.handleClick(1)}
                        >{this.state[1]}</div>

                        <div className={styles.Pad}
                            onClick={() => this.handleClick(2)}
                        >{this.state[2]}</div>
                        <div className={styles.Pad}
                            onClick={() => this.handleClick(3)}
                        >{this.state[3]}</div>
                        <div className={styles.Pad}
                            onClick={() => this.handleClick(4)}
                        >{this.state[4]}</div>

                        <div className={styles.Pad}
                            onClick={() => this.handleClick(5)}
                        >{this.state[5]}</div>
                        <div className={styles.Pad}
                            onClick={() => this.handleClick(6)}
                        >{this.state[6]}</div>
                        <div className={styles.Pad}
                            onClick={() => this.handleClick(7)}
                        >{this.state[7]}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Search;
