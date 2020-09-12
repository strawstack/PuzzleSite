import React from 'react';
import styles from "./Chess.module.css";
import StarBanner from '../StarBanner';
import BackToMain from '../BackToMain';
import ResetBtn from '../ResetBtn';
import HelpBtn from '../HelpBtn';

const posList = {
    0: {
        "WR1": {r: 2, c:0}, // White
        "WR2": {r: 3, c:1},
        "WP": {r: 4, c:4},
        "WK": {r: 5, c:6},
        "WB": {r: 7, c:6},
        "BP1": {r: 2, c:1}, // Black
        "BP2": {r: 3, c:4},
        "BH": {r: 6, c:0},
        "BK": {r: 7, c:0}
    },
    1: {
        "WR1": {r: 2, c:0}, // White
        "WR2": {r: 5, c:1},
        "WP": {r: 4, c:4},
        "WK": {r: 5, c:6},
        "WB": {r: 7, c:6},
        "BP1": {r: 3, c:1}, // Black
        "BP2": {r: 3, c:4},
        "BH": {r: 6, c:0},
        "BK": {r: 7, c:0}
    },
    2: {
        "WR1": {r: 0, c:0}, // White
        "WR2": {r: 5, c:1},
        "WP": {r: 4, c:4},
        "WK": {r: 5, c:6},
        "WB": {r: 7, c:6},
        "BP1": {r: 4, c:1}, // Black
        "BP2": {r: 3, c:4},
        "BH": {r: 6, c:0},
        "BK": {r: 7, c:0}
    },
    3: {
        "WR1": {r: 0, c:0}, // White
        "WR2": {r: 5, c:1},
        "WP": {r: 4, c:4},
        "WK": {r: 5, c:6},
        "WB": {r: 1, c:0},
        "BP1": {r: 4, c:1}, // Black
        "BP2": {r: 3, c:4},
        "BH": {r: 7, c:2},
        "BK": {r: 7, c:0}
    },
    4: {
        "WR1": {r: 0, c:0}, // White
        "WR2": {r: 5, c:1},
        "WP": {r: 4, c:4},
        "WK": {r: 5, c:6},
        "WB": {r: 4, c:3},
        "BP1": {r: 4, c:1}, // Black
        "BP2": {r: 3, c:4},
        "BH": {r: 7, c:2},
        "BK": {r: 7, c:0}
    }
};

const clickList = [
    {name: "WR2", coord: {r:5, c:1}},
    {name: "WR1", coord: {r:0, c:0}},
    {name: "WB", coord: {r:1, c:0}},
    {name: "WB", coord: {r:4, c:3}}
];

class Chess extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            position: 0,
            selected: undefined
        };
    }
    reset() {
        this.setState({
            position: 0,
            selected: undefined
        });
    }
    getClass(i) {
        let row = Math.floor(i/8);
        let col = i % 8;
        let blue = "";
        if ((row % 2) === 0) {
            blue = (col % 2) === 1 ? styles.Black : "";
        } else {
            blue = (col % 2) === 0 ? styles.Black : "";
        }
        return `${styles.Cell} ${blue}`;
    }
    getPieceClass(name) {
        if (name[0] === "W") {
            return `${styles.Piece} ${styles.White}`;
        } else { // B
            return `${styles.Piece} ${styles.Black}`;
        }
    }
    pieceClick(name) {
        let current = this.state.selected;
        let newPiece = undefined;
        if (current !== name) {
            newPiece = name;
        }

        this.setState({
            selected: newPiece
        });
    }
    isSelectedClass(name) {
        let selected = this.state.selected;
        let selClass = (selected === name) ? styles.Selected : "";
        return `${styles.Circle} ${selClass}`;
    }
    makerIfPieceSelected() {
        if (this.state.selected !== undefined) {
            return (
                <div className={styles.Marker}></div>
            );
        }
    }
    coordToCellId(coord) {
        return coord.r * 8 + coord.c;
    }
    cellClick(i) {
        // Will cause state change if correct cell is clicked
        let sel = this.state.selected;
        let pos = this.state.position;
        if (sel !== undefined) {
            let name = clickList[pos].name;
            let id = this.coordToCellId(clickList[pos].coord);
            // If correct piece is selected
            // and correct cell is clicked
            if (sel === name && id === i) {
                this.setState({
                    position: pos + 1,
                    selected: undefined
                }, () => {
                    this.solve();
                });
            } else {
                // Incorrect move
                this.setState({
                    position: 0,
                    selected: undefined
                });
            }
        }
    }
    solve() {
        let pos = this.state.position;
        if (pos === 4) {
            this.props.solveEvent();
        }
    }
    pieceSelectable(name) {
        if (name[0] === "W") {
            return (
                <div className={this.isSelectedClass(name)}
                    onClick={() => this.pieceClick(name)}
                ></div>
            );
        }
    }
    render() {
        const cellSize = 60;

        let cells = [];
        for (let i=0; i < 8*8; i++) {
            cells.push(
                <div key={i} className={this.getClass(i)}
                    onClick={() => this.cellClick(i)}
                >
                    {this.makerIfPieceSelected()}
                </div>
            );
        }

        let pieces = Object.keys(posList[0]);
        pieces = pieces.map((name, i) => {
            let posIndex = this.state.position;
            let coord = posList[posIndex][name];
            return (
                <div key={i}
                    className={this.getPieceClass(name)}
                    style={{
                        top: `${coord.r * cellSize}px`,
                        left: `${coord.c * cellSize}px`
                    }}
                >
                    <div className={styles.Text}>
                        {name[1]}
                    </div>
                    {this.pieceSelectable(name)}
                </div>
            );
        });

        return (
            <div className={styles.Chess}>
                <StarBanner star={this.props.star}/>
                <BackToMain light={true} />
                <ResetBtn light={true} reset={() => this.reset()}/>
                <HelpBtn light={true} text="A difficult chess problem made all the more challenging by a non-standard use of color" />
                <div className={styles.PuzzleContainer}>
                    {cells}
                    {pieces}
                </div>
                <div className={styles.TextArea}>
                    Mate in Four. White to Move.
                </div>
            </div>
        );
    }
}

export default Chess;
