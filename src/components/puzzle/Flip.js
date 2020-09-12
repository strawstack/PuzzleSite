import React from 'react';
import styles from "./Flip.module.css";
import StarBanner from '../StarBanner';
import BackToMain from '../BackToMain';
import ResetBtn from '../ResetBtn';
import HelpBtn from '../HelpBtn';

class Flip extends React.Component {
    constructor(props) {
        super(props);
        let highlight = {};
        for (let i=0; i < 9; i++) {
            highlight[i] = false;
        }
        this.state = highlight;
    }
    reset() {
        let highlight = {};
        for (let i=0; i < 9; i++) {
            highlight[i] = false;
        }
        this.setState(highlight);
    }
    getCellClass(id) {
        let highlight = this.state[id] ? styles.Highlight : "";
        return `${styles.Cell} ${highlight}`;
    }
    bounds(coord) {
        return coord.r >= 0 && coord.r < 3 && coord.c >= 0 && coord.c < 3;
    }
    idToCoord(id) {
        return {
            r: Math.floor(id / 3),
            c: id % 3
        }
    }
    coordToId(coord) {
        return coord.r * 3 + coord.c;
    }
    handleClick(id) {
        let ch = {}; // Collect state changes
        ch[id] = !this.state[id]; // Clicked cell
        let coord = this.idToCoord(id);
        let up = {r: coord.r - 1, c: coord.c};
        let right = {r: coord.r, c: coord.c + 1};
        let down = {r: coord.r + 1, c: coord.c};
        let left = {r: coord.r, c: coord.c - 1};
        let adj = [up, right, down, left];
        let adjFilter = adj.filter(coord => this.bounds(coord));
        for (let coord of adjFilter) {
            let id = this.coordToId(coord);
            ch[id] = !this.state[id];
        }
        this.setState(ch, () => {
            if (this.solved()) {
                this.props.solveEvent();
            }
        });
    }
    solved() {
        let count = 0;
        for (let key in this.state) {
            let val = this.state[key];
            if (val) {
                count += 1;
            }
        }
        return count === 9;
    }
    render() {

        let cells = [];
        for (let i=0; i < 9; i++) {
            cells.push(
                <div key={i} className={this.getCellClass(i)}
                    onClick={() => this.handleClick(i)}
                ></div>
            );
        }

        return (
            <div className={styles.Flip}>
                <StarBanner star={this.props.star}/>
                <BackToMain light={true} />
                <ResetBtn light={true} reset={() => this.reset()}/>
                <HelpBtn light={true} text="Wouldn't it be nice if all the tiles were the same color?" />
                <div className={styles.PuzzleContainer}>
                    { cells }
                </div>
            </div>
        );
    }
}

export default Flip;
