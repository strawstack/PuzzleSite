import React from 'react';
import styles from "./Fifteen.module.css";
import StarBanner from '../StarBanner';
import BackToMain from '../BackToMain';
import ResetBtn from '../ResetBtn';
import HelpBtn from '../HelpBtn';

class Fifteen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cell: {
                0: {r: 2, c: 0},
                1: {r: 2, c: 3},
                2: {r: 0, c: 1},
                3: {r: 0, c: 2},

                4: {r: 0, c: 0},
                5: {r: 3, c: 0},
                6: {r: 1, c: 3},
                7: {r: 1, c: 2},

                8: {r: 3, c: 3},
                9: {r: 3, c: 2},
                10: {r: 0, c: 3},
                11: {r: 2, c: 2},

                12: {r: 2, c: 1},
                13: {r: 3, c: 1},
                14: {r: 1, c: 1}
            },
            gap: {r: 1, c: 0}
        };
        this.cellSize = 120;
        this.gridGap = 16;
        this.block = false;
    }
    reset() {
        this.setState({
            cell: {
                0: {r: 2, c: 0},
                1: {r: 2, c: 3},
                2: {r: 0, c: 1},
                3: {r: 0, c: 2},

                4: {r: 0, c: 0},
                5: {r: 3, c: 0},
                6: {r: 1, c: 3},
                7: {r: 1, c: 2},

                8: {r: 3, c: 3},
                9: {r: 3, c: 2},
                10: {r: 0, c: 3},
                11: {r: 2, c: 2},

                12: {r: 2, c: 1},
                13: {r: 3, c: 1},
                14: {r: 1, c: 1}
            },
            gap: {r: 1, c: 0}
        });
        this.cellSize = 120;
        this.gridGap = 16;
        this.block = false;
    }
    handleClick(id) {
        // When a cell is clicked
        let coord = this.state.cell[id];
        let delta = this.delta(coord, this.state.gap);
        let isAdj = this.one(delta);
        if (isAdj && !this.block) {
            // Move clicked cell
            let ch = {};
            for (let key in this.state.cell) {
                ch[key] = this.state.cell[key];
            }
            ch[id] = {
                r: coord.r + delta.r,
                c: coord.c + delta.c
            };
            this.block = true; // Block multiple inputs
            this.setState({
                cell: ch,
                gap: {
                    r: this.state.gap.r - delta.r,
                    c: this.state.gap.c - delta.c
                }
            }, () => {
                this.block = false;
                if (this.solve()) {
                    this.props.solveEvent();
                }
            });
        }
    }
    one(delta) {
        // Check if delta represents
        // axis aligned adj cells
        let value = Math.abs(delta.r) + Math.abs(delta.c);
        return value === 1;
    }
    delta(coord, gap) {
        // Vector from cell to gap
        return {
            r: gap.r - coord.r,
            c: gap.c - coord.c
        };
    }
    coordToOffset(coord) {
        // coord{r:,c:} to offset{top:,left:}
        return {
            top: coord.r * (this.cellSize + this.gridGap),
            left: coord.c * (this.cellSize + this.gridGap)
        };
    }
    coordToId(coord) {
        return coord.r * 4 + coord.c;
    }
    solve() {
        for (let key in this.state.cell) {
            let coord = this.state.cell[key];
            let id = this.coordToId(coord);
            if (key !== id) {
                return false;
            }
        }
        return true;
    }
    inLocation(i) {
        let coord = this.state.cell[i];
        let number = this.coordToNumber(coord);
        let showClass = (i === number) ? styles.Show : "";
        return (
            <div className={`${styles.Dot} ${showClass}`}></div>
        );
    }
    coordToNumber(coord) {
        return coord.r * 4 + coord.c;
    }
    render() {

        let box = [];
        for (let i=0; i < 16; i++) {
            box.push(
                <div key={i} className={styles.Box}></div>
            );
        }

        let cells = [
            "-e^iπ",
            "2",
            "ooo",
            "16/4",
            "5",
            "3!",
            "0b111",
            "2^3",
            "IX",
            "10",
            "11",
            "12",
            "13",
            "14",
            "0xF"
        ];
        cells = cells.map((text, i) => {
            let os = this.coordToOffset(this.state.cell[i]);
            return (
                <div key={i} className={styles.Cell}
                    onClick={() => this.handleClick(i)}
                    style={{
                        top: `${os.top}px`,
                        left: `${os.left}px`
                    }}
                >
                {text}
                {this.inLocation(i)}
                </div>
            );
        });

        return (
            <div className={styles.Fifteen}>
                <StarBanner star={this.props.star}/>
                <BackToMain light={true} />
                <ResetBtn light={true} reset={() => this.reset()}/>
                <HelpBtn light={true} text="One to fifteen. Left to right. Top to bottom." />
                <div className={styles.PuzzleContainer}>
                    {box}
                    {cells}
                </div>
            </div>
        );
    }
}

export default Fifteen;
