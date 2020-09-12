import React from 'react';
import styles from "./Pack.module.css";
import StarBanner from '../StarBanner';
import BackToMain from '../BackToMain';
import ResetBtn from '../ResetBtn';
import HelpBtn from '../HelpBtn';

class Block extends React.Component {
    getBlockType(main) {
        let mc = main ? styles.Main : "";
        if (this.props.type === "H2") {
            return `${styles.Block} ${styles.H} ${styles.H2} ${mc}`;
        } else if (this.props.type === "H3") {
            return `${styles.Block} ${styles.H} ${styles.H3} ${mc}`;
        } else if (this.props.type === "V2") {
            return `${styles.Block} ${styles.V} ${styles.V2} ${mc}`;
        } else if (this.props.type === "V3") {
            return `${styles.Block} ${styles.V} ${styles.V3} ${mc}`;
        }
    }
    render() {
        return (
            <div className={this.getBlockType(this.props.main)}
                style={{
                    top: `${this.props.top}px`,
                    left: `${this.props.left}px`
                }}
                onMouseDown={(e) => this.props.onMouseDown(e)}
                onMouseOut={(e) => this.props.onMouseOut(e)}
            ></div>
        );
    }
}

class Pack extends React.Component {
    constructor(props) {
        super(props);

        // Global tracking for Block positions
        // id -> top left corner
        this.state = {
            0: {left: 10, top: 10},
            1: {left: 65 + 2 * 10, top: 10},
            2: {left: 3 * 65 + 4 * 10, top: 10},
            3: {left: 3 * 65 + 4 * 10, top: 3 * 65 + 4 * 10},
            4: {left: 5 * 65 + 6 * 10, top: 4 * 65 + 5 * 10},
            5: {left: 2 * 65 + 3 * 10, top: 5 * 65 + 6 * 10},
            6: {left: 2 * 65 + 3 * 10, top: 3 * 65 + 4 * 10},
            7: {left: 65 + 2 * 10, top: 2 * 65 + 3 * 10}
        };
        this.selected = undefined; // id
        this.startPos = undefined; // {x:,y:}
        this.offset   = undefined; // {x:,y:}
        this.cellSize = 65;
    }
    reset() {
        this.setState({
            0: {left: 10, top: 10},
            1: {left: 65 + 2 * 10, top: 10},
            2: {left: 3 * 65 + 4 * 10, top: 10},
            3: {left: 3 * 65 + 4 * 10, top: 3 * 65 + 4 * 10},
            4: {left: 5 * 65 + 6 * 10, top: 4 * 65 + 5 * 10},
            5: {left: 2 * 65 + 3 * 10, top: 5 * 65 + 6 * 10},
            6: {left: 2 * 65 + 3 * 10, top: 3 * 65 + 4 * 10},
            7: {left: 65 + 2 * 10, top: 2 * 65 + 3 * 10}
        });
        this.selected = undefined; // id
        this.startPos = undefined; // {x:,y:}
        this.offset   = undefined; // {x:,y:}
        this.cellSize = 65;
    }
    getCollisionMask(id) {
        // Return 2D grid representing what cells are blocked
        let grid = [];
        for (let i=0; i < 6; i++) {
            grid.push([false,false,false,false,false,false]);
        }
        // Block id to lst of cells (relative)
        // ["V3", "H2", "V3", "H3", "V2", "H3", "V2", "H2"]
        let blockMap = {};
        blockMap[0] = [{r:1,c:0},{r:2,c:0}];
        blockMap[1] = [{r:0,c:1}];
        blockMap[2] = [{r:1,c:0},{r:2,c:0}];
        blockMap[3] = [{r:0,c:1},{r:0,c:2}];
        blockMap[4] = [{r:1,c:0}];
        blockMap[5] = [{r:0,c:1},{r:0,c:2}];
        blockMap[6] = [{r:1,c:0}];
        blockMap[7] = [{r:0,c:1}];

        // Loc {r:,c:} of top left of block
        let blockLoc = {};
        for (let key in this.state) {
            let val = this.state[key];
            blockLoc[key] = this.coordToCellLocation(val);
        }

        // From top left of each block, using blockMap
        // determine what cells in the grid are occupied
        for (let key in blockLoc) {
            if (key === id) {
                continue; // skip current block
            }
            let val = blockLoc[key];
            grid[val.r][val.c] = true;
            for (let off of blockMap[key]) {
                grid[off.r + val.r][off.c + val.c] = true;
            }
        }
        return grid;
    }
    coordToCellLocation(coord) {
        // Coord of block top left to row and col
        let rowNumber = this.roundToCell(coord.top);
        let colNumber = this.roundToCell(coord.left);
        let _r = Math.floor((rowNumber - 10) / 75);
        if (_r < 0) _r = 0;
        let _c = Math.floor((colNumber - 10) / 75);
        if (_c < 0) _c = 0;
        return {
            r: _r,
            c: _c
        };
    }
    roundToCell(top) {
        let row = undefined;
        if (top <= 5) { // edge case top
            row = 0;
        } else if (top > 455) { // edge case bottom
            row = 5;
        } else {
            let lst = this.getList();
            for (let i=1; i < lst.length; i++) {
                if (lst[i] >= top) {
                    let up   = top - lst[i - 1];
                    let down = lst[i] - top;
                    if (up < down) {
                        row = i - 1;
                    } else {
                        row = i;
                    }
                    break;
                }
            }
        }
        return 10 + (this.cellSize + 10) * row;
    }
    getList() {
        let lst = [];
        let cur = 5;
        for (let i=0; i < 7; i++) {
            lst.push(cur);
            cur += 75;
        }
        return lst;
    }
    mouseUp(e) {
        let ch = {};
        for (let key in this.state) {
            let val = this.state[key];
            ch[key] = {left: val.left, top: val.top};
        }
        if (this.selected !== undefined) {
            let sel = ch[this.selected];
            ch[this.selected] = {
                left: this.roundToCell(sel.left),
                top: this.roundToCell(sel.top)
            };
        }
        this.selected = undefined;
        this.startPos = undefined;
        this.offset   = undefined;

        this.setState(ch);
    }
    mouseDown(e, id) {
        // Mouse down on element with id
        this.selected = id;
        this.startPos = this.mousePosition(e);
        this.offset   = this.mouseOffset(e);
    }
    clamp(value, bounds) {
        let _min = bounds.min * (this.cellSize + 10);
        let _max = bounds.max * (this.cellSize + 10) + 2 * 10;
        if (value < _min) {
            value = _min;
        }
        if (value > _max) {
            value = _max;
        }
        return value;
    }
    mouseMove(e) {
        // TODO
        // Add check for if move is valid (not blocked)
        let t = e.target;
        if (this.selected !== undefined) {
            let grid = this.getCollisionMask(this.selected);
            let bounds = this.boundsFromMask(this.selected, grid);

            let pos = this.mousePosition(e);
            let ch = {};
            // Horizontal Block
            if (t.className.indexOf(styles.H) !== -1) {
                ch[this.selected] = {
                    left: this.clamp(
                        pos.left - this.offset.left, bounds),
                    top: this.startPos.top - this.offset.top
                }
            } else { // Vertical Block
                ch[this.selected] = {
                    left: this.startPos.left - this.offset.left,
                    top: this.clamp(
                        pos.top - this.offset.top, bounds)
                }
            }
            this.setState(ch, () => {
                if (this.solved()) {
                    this.props.solveEvent();
                }
            });
        }
    }
    mousePosition(e) {
        let t = e.target;
        // If mouse on Block element, get parent which is PuzzleContainer
        if (e.target.className.indexOf(styles.Block) !== -1) {
            t = e.target.parentElement;
        }
        let rect = t.getBoundingClientRect();
        // Left and top measure in px from top left of PuzzleContainer
        let left = e.clientX - rect.left;
        let top = e.clientY - rect.top;
        let borderSize = 10;
        return {
            left: left - borderSize,
            top: top - borderSize
        };
    }
    mouseOffset(e) {
        // e should have Block as target
        let t = e.target;
        let rect = t.getBoundingClientRect();
        // Left and top measure in px from top left of Block
        let left = e.clientX - rect.left;
        let top = e.clientY - rect.top;
        return {
            left: left,
            top: top
        };
    }
    boundsFromMask(id, grid) {
        // Give block id and grid
        // Calculate min and max allowed movement bounds
        // for the block

        // Direction that each block moves in
        let move = [
            {r: 1, c:0, size: 2}, // 0
            {r: 0, c:1, size: 1},
            {r: 1, c:0, size: 2},
            {r: 0, c:1, size: 2},
            {r: 1, c:0, size: 1},
            {r: 0, c:1, size: 2},
            {r: 1, c:0, size: 1},
            {r: 0, c:1, size: 1} // 7
        ];
        let dir = move[id];

        let _min = undefined;
        let _max = undefined;

        let coord = this.state[id];
        let loc = this.coordToCellLocation(coord);

        // Calculate min movement
        let cur = {r: loc.r, c: loc.c};
        while (cur.r - dir.r >= 0 && cur.c - dir.c >= 0) {
            // If cell is occupied
            if (grid[cur.r - dir.r][cur.c - dir.c]) {
                break;
            }
            cur = {
                r: cur.r - dir.r,
                c: cur.c - dir.c
            };
        }
        _min = (dir.r === 1) ? cur.r : cur.c;

        // Calculate max movement
        cur = {r: loc.r, c: loc.c};
        if (dir.r === 1) {
            cur.r += dir.size;
        } else {
            cur.c += dir.size;
        }
        while (cur.r + dir.r <= 5 && cur.c + dir.c <= 5) {
            // If cell is occupied
            if (grid[cur.r + dir.r][cur.c + dir.c]) {
                break;
            }
            cur = {
                r: cur.r + dir.r,
                c: cur.c + dir.c
            };
        }
        _max = (dir.r === 1) ? cur.r : cur.c;
        return {
            min: _min,
            max: _max - dir.size // top left hits within "size" of bound
        };
    }
    solved() {
        // Main block moves to col greater than three
        let mainBlockId = 7;
        let coord = this.state[mainBlockId];
        let loc = this.coordToCellLocation(coord);
        return loc.c >= 4;
    }
    render() {
        let cells = [];
        for (let i=0; i < 6*6; i++) {
            cells.push(
                <div key={i} className={styles.Cell}></div>
            );
        }
        let blocks = ["V3", "H2", "V3", "H3", "V2", "H3", "V2", "H2"];
        blocks = blocks.map((b, i) => {
            return (
                <Block key={i}
                    type={blocks[i]}
                    left={this.state[i].left}
                    top={this.state[i].top}
                    onMouseDown={(e) => this.mouseDown(e, i)}
                    onMouseOut={(e) => this.mouseUp(e)}
                    main={i === 7}
                />
            );
        });
        return (
            <div className={styles.Pack}
                onMouseUp={(e) => this.mouseUp(e)}
                onMouseMove={(e) => this.mouseMove(e)}
            >
                <StarBanner star={this.props.star}/>
                <BackToMain light={true} />
                <ResetBtn light={true} reset={() => this.reset()}/>
                <HelpBtn light={true} text="Can you get the light block to the gap on the right side?" />
                <div className={styles.PuzzleContainer}>
                    {cells}
                    <div className={styles.Exit}></div>
                    {blocks}
                </div>
            </div>
        );
    }
}

export default Pack;
