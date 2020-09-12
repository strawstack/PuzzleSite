import React from 'react';
import styles from "./Nano.module.css";
import StarBanner from '../StarBanner';
import BackToMain from '../BackToMain';
import ResetBtn from '../ResetBtn';
import HelpBtn from '../HelpBtn';

class Nano extends React.Component {
    constructor(props) {
        super(props);
        let lst = [];
        for (let i=0; i < 7*7; i++) {
            lst.push(false);
        }
        this.state = {
            data: lst
        };
    }
    reset() {
        let lst = [];
        for (let i=0; i < 7*7; i++) {
            lst.push(false);
        }
        this.setState({
            data: lst
        });
    }
    handleClick(val) {
        let lst = this.state.data.slice();
        lst[val] = !lst[val];
        this.setState({
            data: lst
        }, () => {
            this.solve();
        });
    }
    gc(val) {
        // Return classes for GameCell
        let selected = this.state.data[val] ? styles.Selected : '';
        return `${styles.GameCell} ${selected}`;
    }
    rc(top, left, right, bot) {
        // Return classes for RuleCell
        // top, right, bot, left are bools or undefined
        let _top   = top ? styles.top : '';
        let _left  = left ? styles.left : '';
        let _right = right ? styles.right : '';
        let _bot   = bot ? styles.bot : '';
        return `${styles.RuleCell} ${_top} ${_left} ${_right} ${_bot}`;
    }
    rc2(top, left, right, bot) {
        // Return classes for RuleCell
        // top, right, bot, left are bools or undefined
        let _top   = top ? styles.top : '';
        let _left  = left ? styles.left : '';
        let _right = right ? styles.right : '';
        let _bot   = bot ? styles.bot : '';
        return `${_top} ${_left} ${_right} ${_bot}`;
    }
    solve() {
        let data = this.state.data;
        let valid = true;
        let ans = [
            true, true, true, false, true, true, true,
            true, false, false, false, true, false, true,
            true, true, true, false, true, true, true,
            false, false, false, false, false, false, false,
            true, true, true, false, true, false, false,
            true, false, true, false, true, false, false,
            true, true, true, false, true, true, true
        ];
        for (let i=0; i < 7*7; i++) {
            if (ans[i] !== data[i]) {
                valid = false;
                break;
            }
        }
        if (valid) {
            this.props.solveEvent();
        }
    }
    render() {
        return (
            <div className={styles.Nano}>
                <StarBanner star={this.props.star}/>
                <BackToMain />
                <ResetBtn reset={() => this.reset()}/>
                <HelpBtn text="Search for Nonogram puzzle!" />
                <div className={styles.PuzzleContainer}>
                    {/* Row 1 */}
                    <div></div>
                    <div></div>
                    <div></div>
                    <div
                        className={this.rc2(false, false, true, false)}
                    ></div>
                    <div className={this.rc(true)}>1</div>
                    <div
                        className={this.rc2(false, false, false, true)}
                    ></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>

                    {/* Row 2 */}
                    <div></div>
                    <div></div>
                    <div></div>
                    <div
                        className={this.rc2(false, false, true, true)}
                    ></div>
                    <div className={styles.RuleCell}>1</div>
                    <div className={styles.RuleCell}>1</div>
                    <div></div>
                    <div
                        className={this.rc2(false, false, true, true)}
                    ></div>
                    <div className={this.rc(true)}>1</div>
                    <div
                        className={this.rc2(false, false, false, true)}
                    ></div>

                    {/* Row 3 */}
                    <div></div>
                    <div></div>
                    <div
                        className={this.rc2(false, false, true, false)}
                    ></div>
                    <div className={styles.RuleCell}>3</div>
                    <div className={styles.RuleCell}>1</div>
                    <div className={styles.RuleCell}>1</div>
                    <div
                        className={this.rc2(false, false, true, false)}
                    ></div>
                    <div className={styles.RuleCell}>3</div>
                    <div className={styles.RuleCell}>1</div>
                    <div className={styles.RuleCell}>3</div>

                    {/* Row 4 */}
                    <div></div>
                    <div
                        className={this.rc2(false, false, false, true)}
                    ></div>
                    <div
                        className={this.rc2(false, false, true, true)}
                    ></div>
                    <div className={styles.RuleCell}>3</div>
                    <div className={styles.RuleCell}>1</div>
                    <div className={styles.RuleCell}>3</div>
                    <div
                        className={this.rc2(false, false, true, true)}
                    ></div>
                    <div className={styles.RuleCell}>3</div>
                    <div className={styles.RuleCell}>1</div>
                    <div className={styles.RuleCell}>1</div>

                    {/* Row 5 */}
                    <div
                        className={this.rc2(false, false, true, true)}
                    ></div>
                    <div className={styles.RuleCell}>3</div>
                    <div className={styles.RuleCell}>3</div>
                    <div className={this.gc(0)}
                        onClick={() => this.handleClick(0)}
                    ></div>
                    <div className={this.gc(1)}
                        onClick={() => this.handleClick(1)}
                    ></div>
                    <div className={this.gc(2)}
                        onClick={() => this.handleClick(2)}
                    ></div>
                    <div className={this.gc(3)}
                        onClick={() => this.handleClick(3)}
                    ></div>
                    <div className={this.gc(4)}
                        onClick={() => this.handleClick(4)}
                    ></div>
                    <div className={this.gc(5)}
                        onClick={() => this.handleClick(5)}
                    ></div>
                    <div className={this.gc(6)}
                        onClick={() => this.handleClick(6)}
                    ></div>

                    {/* Row 6 */}
                    <div className={this.rc(false, true)}>1</div>
                    <div className={styles.RuleCell}>1</div>
                    <div className={styles.RuleCell}>1</div>
                    <div className={this.gc(7)}
                        onClick={() => this.handleClick(7)}
                    ></div>
                    <div className={this.gc(8)}
                        onClick={() => this.handleClick(8)}
                    ></div>
                    <div className={this.gc(9)}
                        onClick={() => this.handleClick(9)}
                    ></div>
                    <div className={this.gc(10)}
                        onClick={() => this.handleClick(10)}
                    ></div>
                    <div className={this.gc(11)}
                        onClick={() => this.handleClick(11)}
                    ></div>
                    <div className={this.gc(12)}
                        onClick={() => this.handleClick(12)}
                    ></div>
                    <div className={this.gc(13)}
                        onClick={() => this.handleClick(13)}
                    ></div>

                    {/* Row 7 */}
                    <div
                        className={this.rc2(false, false, true, false)}
                    ></div>
                    <div className={styles.RuleCell}>3</div>
                    <div className={styles.RuleCell}>3</div>
                    <div className={this.gc(14)}
                        onClick={() => this.handleClick(14)}
                    ></div>
                    <div className={this.gc(15)}
                        onClick={() => this.handleClick(15)}
                    ></div>
                    <div className={this.gc(16)}
                        onClick={() => this.handleClick(16)}
                    ></div>
                    <div className={this.gc(17)}
                        onClick={() => this.handleClick(17)}
                    ></div>
                    <div className={this.gc(18)}
                        onClick={() => this.handleClick(18)}
                    ></div>
                    <div className={this.gc(19)}
                        onClick={() => this.handleClick(19)}
                    ></div>
                    <div className={this.gc(20)}
                        onClick={() => this.handleClick(20)}
                    ></div>

                    {/* Row 8 */}
                    <div></div>
                    <div
                        className={this.rc2(false, false, false, true)}
                    ></div>
                    <div
                        className={this.rc2(false, false, true, true)}
                    ></div>
                    <div className={this.gc(21)}
                        onClick={() => this.handleClick(21)}
                    ></div>
                    <div className={this.gc(22)}
                        onClick={() => this.handleClick(22)}
                    ></div>
                    <div className={this.gc(23)}
                        onClick={() => this.handleClick(23)}
                    ></div>
                    <div className={this.gc(24)}
                        onClick={() => this.handleClick(24)}
                    ></div>
                    <div className={this.gc(25)}
                        onClick={() => this.handleClick(25)}
                    ></div>
                    <div className={this.gc(26)}
                        onClick={() => this.handleClick(26)}
                    ></div>
                    <div className={this.gc(27)}
                        onClick={() => this.handleClick(27)}
                    ></div>

                    {/* Row 9 */}
                    <div
                        className={this.rc2(false, false, true, true)}
                    ></div>
                    <div className={styles.RuleCell}>3</div>
                    <div className={styles.RuleCell}>1</div>
                    <div className={this.gc(28)}
                        onClick={() => this.handleClick(28)}
                    ></div>
                    <div className={this.gc(29)}
                        onClick={() => this.handleClick(29)}
                    ></div>
                    <div className={this.gc(30)}
                        onClick={() => this.handleClick(30)}
                    ></div>
                    <div className={this.gc(31)}
                        onClick={() => this.handleClick(31)}
                    ></div>
                    <div className={this.gc(32)}
                        onClick={() => this.handleClick(32)}
                    ></div>
                    <div className={this.gc(33)}
                        onClick={() => this.handleClick(33)}
                    ></div>
                    <div className={this.gc(34)}
                        onClick={() => this.handleClick(34)}
                    ></div>

                    {/* Row 10 */}
                    <div className={this.rc(false, true)}>1</div>
                    <div className={styles.RuleCell}>1</div>
                    <div className={styles.RuleCell}>1</div>
                    <div className={this.gc(35)}
                        onClick={() => this.handleClick(35)}
                    ></div>
                    <div className={this.gc(36)}
                        onClick={() => this.handleClick(36)}
                    ></div>
                    <div className={this.gc(37)}
                        onClick={() => this.handleClick(37)}
                    ></div>
                    <div className={this.gc(38)}
                        onClick={() => this.handleClick(38)}
                    ></div>
                    <div className={this.gc(39)}
                        onClick={() => this.handleClick(39)}
                    ></div>
                    <div className={this.gc(40)}
                        onClick={() => this.handleClick(40)}
                    ></div>
                    <div className={this.gc(41)}
                        onClick={() => this.handleClick(41)}
                    ></div>

                    {/* Row 11 */}
                    <div
                        className={this.rc2(false, false, true, false)}
                    ></div>
                    <div className={styles.RuleCell}>3</div>
                    <div className={styles.RuleCell}>3</div>
                    <div className={this.gc(42)}
                        onClick={() => this.handleClick(42)}
                    ></div>
                    <div className={this.gc(43)}
                        onClick={() => this.handleClick(43)}
                    ></div>
                    <div className={this.gc(44)}
                        onClick={() => this.handleClick(44)}
                    ></div>
                    <div className={this.gc(45)}
                        onClick={() => this.handleClick(45)}
                    ></div>
                    <div className={this.gc(46)}
                        onClick={() => this.handleClick(46)}
                    ></div>
                    <div className={this.gc(47)}
                        onClick={() => this.handleClick(47)}
                    ></div>
                    <div className={this.gc(48)}
                        onClick={() => this.handleClick(48)}
                    ></div>
                </div>
            </div>
        );
    }
}

export default Nano;
