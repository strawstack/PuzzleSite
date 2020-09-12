import React from 'react';
import styles from "./Maze.module.css";
import StarBanner from '../StarBanner';
import BackToMain from '../BackToMain';
import ResetBtn from '../ResetBtn';
import HelpBtn from '../HelpBtn';

class Maze extends React.Component {
    constructor(props) {
        super(props);

        this.doors = {
            0: [false, true, true, false], // Up, Right, Down, Left
            1: [false, false, true, true],
            2: [false, true, true, false],
            3: [false, false, true, true],
            4: [false, true, true, false],
            5: [false, false, false, true],

            6: [true, false, false, false],
            7: [true, false, true, false],
            8: [true, false, true, false],
            9: [true, false, false, false],
            10: [true, true, true, false],
            11: [false, false, true, true],

            12: [false, true, true, false],
            13: [true, true, false, true],
            14: [true, true, true, true],
            15: [false, false, true, true],
            16: [true, true, true, false],
            17: [true, false, false, true],

            18: [true, true, false, false],
            19: [false, false, true, true],
            20: [true, false, false, false],
            21: [true, false, true, false],
            22: [true, true, false, false],
            23: [false, false, true, true],

            24: [false, true, true, false],
            25: [true, false, true, true], // Start
            26: [false, true, true, false],
            27: [true, true, true, true],
            28: [false, false, true, true],
            29: [true, false, true, false],

            30: [true, false, false, false],
            31: [true, false, false, false],
            32: [true, false, false, false],
            33: [true, false, false, false],
            34: [true, true, false, false],
            35: [true, false, false, true]
        };

        this.state = {
            player: {r: 8, c: 2}, // Walls are counted as row/col
            prev: undefined
        };
    }
    reset() {
        this.setState({
            player: {r: 8, c: 2}, // Walls are counted as row/col
            prev: undefined
        });
    }
    clickableCell(coord) {
        let pos = {
            r: this.state.player.r,
            c: this.state.player.c
        };
        let number = this.coordToNumber(pos);
        let d = this.doors[number];
        let adj = [{r:1,c:0},{r:0,c:-1},{r:-1,c:0},{r:0,c:1}];
        let dir = {r: (pos.r - coord.r)/2, c: (pos.c - coord.c)/2};
        let allow = false;
        for (let i=0; i<4; i++) {
            if (adj[i].r === dir.r && adj[i].c === dir.c) {
                if (d[i]) {
                    allow = true;
                    break;
                }
            }
        }
        if (allow) {
            return true;
        } else {
            return false;
        }
    }
    handleClick(coord) {
        let pos = this.state.player;
        let number = this.coordToNumber(pos);
        let d = this.doors[number];
        let adj = [{r:1,c:0},{r:0,c:-1},{r:-1,c:0},{r:0,c:1}];
        let dir = {r: (pos.r - coord.r)/2, c: (pos.c - coord.c)/2};
        let allow = false;
        for (let i=0; i<4; i++) {
            if (adj[i].r === dir.r && adj[i].c === dir.c) {
                if (d[i]) {
                    allow = true;
                    break;
                }
            }
        }
        if (allow) {
            this.setState({
                player: {r: coord.r, c: coord.c},
                prev: this.state.player
            }, () => {
                // Check for solution
                let pos = this.state.player;
                let number = this.coordToNumber(pos);
                if (number === 5) {
                    this.props.solveEvent();
                }
            });
        }
    }
    coordToNumber(coord) {
        return coord.r/2 * 6 + coord.c/2;
    }
    wallClass(coord, vWall) {
        // Assign OpenWall class if wall should be open
        let wallClass = (vWall) ? styles.VWall : styles.HWall;
        let pos = this.state.player;
        let number = this.coordToNumber(pos);
        let d = this.doors[number];
        let adj = [
            {r: 1, c: 0},{r: 0, c: -1},
            {r: -1, c: 0}, {r: 0, c: 1}
        ];
        let openClass = "";
        // Is this wall adj to the player coord
        // and should it be open?
        let adjToPlayer = false;
        for (let i=0; i < 4; i++) {
            let c = {r: coord.r + adj[i].r, c: coord.c + adj[i].c};
            if (pos.r === c.r && pos.c === c.c) {
                if (d[i]) {
                    openClass = styles.OpenWall;
                }
                adjToPlayer = true;
            }
        }
        if (!adjToPlayer && Math.random() > 0.7) {
            openClass = styles.OpenWall;
        }
        return `${wallClass} ${openClass}`;
    }
    render() {
        let cells = [];
        for (let r=0; r < 11; r++) {
            for (let c=0; c < 11; c++) {
                let col = (c % 2) === 0;
                let row = (r % 2) === 0;
                let k = r * 11 + c;
                if (row && col) {
                    if (this.clickableCell({r: r, c: c})) {
                        cells.push(
                            <div key={k}
                                className={`${styles.Cell} ${styles.Select}`}
                                onClick={() => this.handleClick({r: r, c: c})}
                            ></div>
                        );
                    } else {
                        cells.push(
                            <div key={k}
                                className={styles.Cell}
                            ></div>
                        );
                    }
                } else if (row && !col) {
                    cells.push(
                        <div key={k}
                            className={
                                this.wallClass({r: r, c: c}, true)
                            }
                        ></div>
                    );
                } else if (!row && col) {
                    cells.push(
                        <div key={k}
                            className={
                                this.wallClass({r: r, c: c}, false)
                            }
                        ></div>
                    );
                } else if (!row && !col) {
                    cells.push(
                        <div key={k} className={styles.Space}></div>
                    );
                }
            }
        }
        let p = this.state.player;
        return (
            <div className={styles.Maze}>
                <StarBanner star={this.props.star}/>
                <BackToMain />
                <ResetBtn reset={() => this.reset()}/>
                <HelpBtn text="It looks like that circle could fit in the center of that ring" />
                <div className={styles.PuzzleContainer}>
                    {cells}
                    <div className={styles.Goal}>
                        <div className={styles.GoalInner}></div>
                    </div>
                    <div className={styles.Player}
                        style={{
                            top: `${15 + p.r/2 * 100}px`,
                            left: `${15 + p.c/2 * 100}px`
                        }}
                    ></div>
                </div>
            </div>
        );
    }
}

export default Maze;
