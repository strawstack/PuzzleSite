import React from 'react';
import styles from "./Ken.module.css";
import StarBanner from '../StarBanner';
import BackToMain from '../BackToMain';
import ResetBtn from '../ResetBtn';
import HelpBtn from '../HelpBtn';

class Ken extends React.Component {
    constructor(props) {
        super(props);
        let lst = {};
        for (let i=0; i < 16; i++) {
            lst[i] = 0
        }
        this.state = {
            cell: lst
        };
    }
    reset() {
        let lst = {};
        for (let i=0; i < 16; i++) {
            lst[i] = 0
        }
        this.setState({
            cell: lst
        });
    }
    getClass(right, bot) {
        let rightClass = right ? styles.Right : "";
        let botClass = bot ? styles.Bottom : "";
        return `${styles.Cell} ${rightClass} ${botClass}`;
    }
    copy() {
        let d = {};
        for (let k in this.state.cell) {
            d[k] = this.state.cell[k];
        }
        return d;
    }
    handleClick(id) {
        let cs = this.copy();
        cs[id] = (cs[id] + 1) % 5;
        this.setState({
            cell: cs
        }, () => {
            if (this.solved()) {
                this.props.solveEvent();
            }
        });
    }
    solved() {
        let ans = [1,3,2,4,3,4,1,2,4,2,3,1,2,1,4,3];
        for (let key in this.state.cell) {
            let val = this.state.cell[key];
            if (ans[key] !== val) {
                return false;
            }
        }
        return true;
    }
    getValue(id) {
        if (this.state.cell[id] === 0) {
            return "";
        } else {
            return this.state.cell[id];
        }
    }
    render() {
        return (
            <div className={styles.Ken}>
                <StarBanner star={this.props.star}/>
                <BackToMain />
                <ResetBtn reset={() => this.reset()}/>
                <HelpBtn text="Search for KenKen!" />
                <div className={styles.PuzzleContainer}>

                    {/* 0 */}
                    <div className={styles.Cell}
                        onClick={() => this.handleClick(0)}
                    >
                        <div className={styles.Total}>4</div>
                        <span>{this.getValue(0)}</span>
                    </div>
                        <div className={styles.Line}></div>
                    <div className={styles.Cell}
                        onClick={() => this.handleClick(1)}
                    >
                        <span>{this.getValue(1)}</span>
                    </div>
                        <div className={styles.LineRed}></div>
                    <div className={styles.Cell}
                        onClick={() => this.handleClick(2)}
                    >
                        <div className={styles.Total}>3</div>
                        <span>{this.getValue(2)}</span>
                    </div>
                        <div className={styles.LineRed}></div>
                    <div className={styles.Cell}
                        onClick={() => this.handleClick(3)}
                    >
                        <div className={styles.Total}>4</div>
                        <span>{this.getValue(3)}</span>
                    </div>

                    <div className={styles.LineRed}></div>
                        <div className={styles.PointRed}></div>
                    <div className={styles.LineRed}></div>
                        <div className={styles.PointRed}></div>
                    <div className={styles.Line}></div>
                        <div className={styles.PointRed}></div>
                    <div className={styles.LineRed}></div>

                    {/* 1 */}
                    <div className={styles.Cell}
                        onClick={() => this.handleClick(4)}
                    >
                        <div className={styles.Total}>7</div>
                        <span>{this.getValue(4)}</span>
                    </div>
                        <div className={styles.Line}></div>
                    <div className={styles.Cell}
                        onClick={() => this.handleClick(5)}
                    >
                        <span>{this.getValue(5)}</span>
                    </div>
                        <div className={styles.LineRed}></div>
                    <div className={styles.Cell}
                        onClick={() => this.handleClick(6)}
                    >
                        <span>{this.getValue(6)}</span>
                    </div>
                        <div className={styles.LineRed}></div>
                    <div className={styles.Cell}
                        onClick={() => this.handleClick(7)}
                    >
                        <div className={styles.Total}>3</div>
                        <span>{this.getValue(7)}</span>
                    </div>

                    <div className={styles.LineRed}></div>
                        <div className={styles.PointRed}></div>
                    <div className={styles.LineRed}></div>
                        <div className={styles.PointRed}></div>
                    <div className={styles.LineRed}></div>
                        <div className={styles.PointRed}></div>
                    <div className={styles.Line}></div>

                    {/* 2 */}
                    <div className={styles.Cell}
                        onClick={() => this.handleClick(8)}
                    >
                        <div className={styles.Total}>6</div>
                        <span>{this.getValue(8)}</span>
                    </div>
                        <div className={styles.LineRed}></div>
                    <div className={styles.Cell}
                        onClick={() => this.handleClick(9)}
                    >
                        <div className={styles.Total}>3</div>
                        <span>{this.getValue(9)}</span>
                    </div>
                        <div className={styles.LineRed}></div>
                    <div className={styles.Cell}
                        onClick={() => this.handleClick(10)}
                    >
                        <div className={styles.Total}>3</div>
                        <span>{this.getValue(10)}</span>
                    </div>
                        <div className={styles.LineRed}></div>
                    <div className={styles.Cell}
                        onClick={() => this.handleClick(11)}
                    >
                        <span>{this.getValue(11)}</span>
                    </div>

                    <div className={styles.Line}></div>
                        <div className={styles.PointRed}></div>
                    <div className={styles.Line}></div>
                        <div className={styles.PointRed}></div>
                    <div className={styles.LineRed}></div>
                        <div className={styles.PointRed}></div>
                    <div className={styles.LineRed}></div>

                    {/* 3 */}
                    <div className={styles.Cell}
                        onClick={() => this.handleClick(12)}
                    >
                        <span>{this.getValue(12)}</span>
                    </div>
                        <div className={styles.LineRed}></div>
                    <div className={styles.Cell}
                        onClick={() => this.handleClick(13)}
                    >
                        <span>{this.getValue(13)}</span>
                    </div>
                        <div className={styles.LineRed}></div>
                    <div className={styles.Cell}
                        onClick={() => this.handleClick(14)}
                    >
                        <div className={styles.Total}>7</div>
                        <span>{this.getValue(14)}</span>
                    </div>
                        <div className={styles.Line}></div>
                    <div className={styles.Cell}
                        onClick={() => this.handleClick(15)}
                    >
                        <span>{this.getValue(15)}</span>
                    </div>

                </div>
            </div>
        );
    }
}

export default Ken;
