import React from 'react';
import styles from "./Color.module.css";
import StarBanner from '../StarBanner';
import BackToMain from '../BackToMain';
import ResetBtn from '../ResetBtn';
import HelpBtn from '../HelpBtn';

class Color extends React.Component {
    constructor(props) {
        super(props);

        let cell = [];
        for (let i=0; i < 9 * 9; i++) {
            cell[i] = 0;
        }

        this.prefil = {
            3: 5,
            4: 4,
            5: 9,
            8: 8,

            9: 6,
            10: 8,
            11: 9,
            14: 2,
            15: 3,

            20: 7,
            21: 8,
            23: 3,
            25: 9,

            27: 9,
            28: 3,
            29: 1,
            31: 5,
            33: 8,
            34: 2,

            36: 8,
            39: 9,
            46: 4,
            49: 3,
            50: 8,
            51: 7,
            52: 1,
            53: 9,

            55: 9,
            57: 7,
            58: 8,
            60: 2,

            65: 8,
            66: 6,
            67: 9,
            71: 5,

            72: 1,
            76: 2,
            77: 4,
            78: 9,
            79: 8
        };

        for (let key in this.prefil) {
            let val = this.prefil[key];
            cell[key] = val;
        }

        this.state = {
            cell: cell, // color of each cell
            currentColor: 1
        };

        // Map index to hex color
        this.color = [
            "#F0EFEB", // Clear
            "#CB997E", // 1
            "#FFCEB1",
            "#FFB072",
            "#A58DA3", // DDBEA9 change to purple
            "#A5A58D",
            "#818181",
            "#A9D7DD",
            "#333", // A58DA3 // 8
            "#333"  // A4A4B7 // 9
        ];
    }
    reset() {
        let cell = [];
        for (let i=0; i < 9 * 9; i++) {
            cell[i] = 0;
        }
        this.setState({
            cell: cell, // color of each cell
            currentColor: 1
        });
    }
    handleClick(id) {
        let ch = {}; // Copy cell state
        for (let key in this.state.cell) {
            ch[key] = this.state.cell[key];
        }
        ch[id] = this.state.currentColor;
        this.setState({
            cell: ch
        }, () => {
            this.solve();
        });

    }
    getColor(id) {
        let index = this.state.cell[id];
        let c = this.color[index];
        return c;
    }
    selectChoice(id) {
        if (id < 8) {
            this.setState({
                currentColor: id
            });
        }
    }
    solve() {
        let rows = []; // 9 lookup dicts {number -> bool}
        let cols = [];
        let cells = [];
        let valid = true;
        for (let i=0; i < 9; i++) {
            rows.push({});
            cols.push({});
            cells.push({});
        }
        for (let i=0; i < 9*9; i++) {
            let r = Math.floor(i/9);
            let c = i % 9;
            let cell = 3 * Math.floor(r/3) + Math.floor(c/3);
            let val = this.state.cell[i];
            if (val === 0) {
                valid = false;
                break;
            }
            if ((val in rows[r]) || (val in cols[c]) || (val in cells[cell])) {
                valid = false;
                break;
            }
            rows[r][val] = true;
            cols[c][val] = true;
            cells[cell][val] = true;
        }
        if (valid) {
            this.props.solveEvent();
        }
    }
    render() {
        let cells = [];
        for (let i=0; i < 9 * 9; i++) {
            if (i in this.prefil) {
                cells.push(
                    <div key={i} className={`${styles.Cell} ${styles.Fixed}`}>
                        <div className={styles.Circle}
                            style={{
                                background: this.color[this.prefil[i]]
                            }}
                        ></div>
                    </div>
                );
            } else {
                cells.push(
                    <div key={i} className={styles.Cell}
                        onClick={() => this.handleClick(i)}
                    >
                        <div className={styles.Circle}
                            style={{
                                background: this.getColor(i)
                            }}
                        ></div>
                    </div>
                );
            }
        }
        let choices = [];
        for (let i=0; i < this.color.length; i++) {
            let highClass = (this.state.currentColor === i) ? styles.High : "";

            let availableClass = (i < 8) ? styles.Available : "";
            let classNames = `${styles.Choice} ${availableClass}`;

            choices.push(
                <div key={i} className={styles.ChoiceBox}
                    onClick={() => this.selectChoice(i)}
                >
                    <div className={`${classNames} ${highClass}`}
                        style={{
                            background: this.color[i]
                        }}
                    ></div>
                </div>
            );
        }
        return (
            <div className={styles.Color}>
                <StarBanner star={this.props.star}/>
                <BackToMain />
                <ResetBtn reset={() => this.reset()}/>
                <HelpBtn text="Maybe play Sudoku for a bit and come back..." />
                <div className={styles.PuzzleContainer}>
                    {cells}
                    <div className={styles.ColorBar}>
                        {choices}
                    </div>
                </div>
            </div>
        );
    }
}

export default Color;
