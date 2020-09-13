import React from 'react';
import styles from "./Prompt.module.css";
import StarBanner from '../StarBanner';
import BackToMain from '../BackToMain';
import ResetBtn from '../ResetBtn';
import HelpBtn from '../HelpBtn';

class Dir {
    constructor(uid, parent, isFile) {
        this.uid = uid;
        this.parent = parent;
        this.isFile = isFile;
        this.fileContent = [];
        this.children = {};
    }
    addChildren(lst) {
        for (let child of lst) {
            this.children[child.uid] = child;
        }
    }
}

// Directories
let root = new Dir("root", undefined, false);
let woods = new Dir("woods", root, false);
let stream = new Dir("stream", root, false);
let cabin = new Dir("cabin", root, false);
root.addChildren([woods, stream, cabin]);

let forest_path = new Dir("path", woods, false);
let tree_stump = new Dir("stump", woods, false);
let old_oak = new Dir("oak", woods, false);
woods.addChildren([forest_path, tree_stump, old_oak]);

let table = new Dir("table", cabin, false);
let chest = new Dir("chest", cabin, false);
cabin.addChildren([table, chest]);

let elevator = new Dir("elevator", old_oak, false);
old_oak.addChildren([elevator]);
let wooden_door = new Dir("door", elevator, false);
elevator.addChildren([wooden_door]);

// Files
let path = new Dir("path.txt", forest_path, true);
forest_path.addChildren([path]);
let rings = new Dir("rings.txt", tree_stump, true);
tree_stump.addChildren([rings]);
let hallway = new Dir("hallway.txt", wooden_door, true);
wooden_door.addChildren([hallway]);
let fish = new Dir("fish.txt", stream, true);
stream.addChildren([fish]);
let letter = new Dir("letter.txt", table, true);
table.addChildren([letter]);
let gem = new Dir("gem.txt", chest, true);
chest.addChildren([gem]);
let welcome = new Dir("welcome.txt", root, true);
root.addChildren([welcome]);

path.fileContent = [
    "As you walk along the dirt path in the silent",
    "forest, you hear soft crunches as your feet",
    "press into the ground. Each step another",
    "meter travelled. The first tree you pass is",
    "two meters after the start of the path. The",
    "second tree, three meters after the first.",
    "Five meters to the third tree from the second.",
    "Arriving at the fourth tree, you've walked",
    "another eight meters. How far to the fifth",
    "and final tree?",
    "You've lost count!",
    "About twice the previous distance",
    "or a bit less?",
];

rings.fileContent = [
    "A gust of wind blows damp leaves and sawdust",
    "off the tree stump. You look down and count",
    "the concentric rings. Twenty-Five! Is that",
    "old for a tree? You're not sure.",
];

hallway.fileContent = [
    "You walk cautiously along the hallway.",
    "Wondering where this could lead.",
    "You see a tree painted in green on the wall;",
    "the paint has faded over the years.",
    "A black line stretches out for some distance",
    "on the floor making a winding path.",
    "A pattern of red gems is painted on the",
    "ceiling. You reach the end of the hallway,",
    "it's a dead end. As you turn to leave,",
    "a glint catches your eye. A small metal fish",
    "made of gold is embedded in the wall.",
];

fish.fileContent = [
    "You approach a pool of water next to the",
    "stream and are shocked to find it's home to",
    "a large number of fish. There's almost more",
    "fish than water. You watch the fish swim",
    "around for some time. You're pretty sure",
    "you've counted them all. The number of fish",
    "reminds you of Douglas Adams, and the",
    "meaning of life.",
];

letter.fileContent = [
    "An old dry envelope made of faded parchment",
    "is on the table. Stamped in the centre in wax",
    "is a red number three. You open the envelope",
    "and find.",
    "Two pieces of black charcoal.",
    "One small green potted sprout.",
    "Four gold coins.",
];

gem.fileContent = [
    "The chest contains a small pile of brightly",
    "coloured gems! The gems are coloured red,",
    "yellow, and blue. More than five are yellow.",
    "Exactly half as many are blue. More than one",
    "is red. Thirteen gems in total!",
];

welcome.fileContent = [
    "Find the patterns and numbers hidden in",
    "these woods. You'll need all of them",
    "to make it out with the star. Keep a look",
    "out for anything that catches your eye!",
];

let globalCommands = {
    help: (_this, a) => {
        return {
            lines: [
                "Commands",
                "  help           - List of all commands.",
                "  ls             - List current dir.",
                "  cd [directory] - Change dir. '..' for parent",
                "  cat [filename] - Show file contents.",
                "  clear          - Clear console.",
                "  solve [answer] - Submit answer."
            ]
        };
    },
    clear: (_this, a) => {
        // Do nothing, cmd handled in handleCommand
        return {lines: []};
    },
    ls: (_this, a) => {
        let s = _this.state;
        let lst = Array.from(Object.values(s.currentDir.children));
        let _lst = lst.map(dir => dir.uid);
        return {lines: _lst};
    },
    cd: (_this, dirName) => {
        let s = _this.state;
        let newDir = dirName;
        if (dirName === "..") {
            if (s.currentDir !== "root") {
                newDir = s.currentDir.parent;
            }
        } else if (dirName in s.currentDir.children) {
            newDir = s.currentDir.children[dirName];

        } else {
            return {
                dir: newDir,
                lines: [
                    "Invalid argument to 'cd'",
                    "Expected directory name"
                ]
            };
        }
        return {
            dir: newDir,
            lines: []
        };
    },
    cat: (_this, fileName) => {
        let s = _this.state;
        if (fileName in s.currentDir.children) {
            let file = s.currentDir.children[fileName];
            if (file.isFile) {
                return {
                    lines: file.fileContent
                };
            }
        } else {
            return {
                lines: ["Invalid argument to 'cat'"]
            };
        }
    },
    solve: (_this, correct, solution) => {
        if (solution === "2513442") {
            correct();
            return {lines: []};
        } else {
            return {lines: [`'${solution}' is not correct`]};
        }
    },
    unknown: (_this, a) => {
        return {
            lines: [
                "Command not found. Type 'help' for options."
            ]
        };
    }
};

class Prompt extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            textRows: [],
            currentDir: root,
            stack: [],
            index: 0
        };
        this.prompt = undefined; // See componentDidMount
    }
    reset() {
        this.setState({
            textRows: [],
            currentDir: root,
            stack: [],
            index: 0
        });
        this.prompt = undefined; // See componentDidMount
    }
    getContentClass() {
        let check = this.state.textRows.length > 15;
        let scrollClass = check ? styles.Scroll : "";
        return `${styles.Content} ${scrollClass}`;
    }
    componentDidMount() {
        // Runs when component appears for first time
        this.prompt = document.querySelector(`.${styles.InputArea}`);
        this.prompt.focus();
        this.scrollBottom();
        this.prompt.addEventListener("keyup", e => {
            if (this.state.stack.length > 0) {
                if (e.key === "ArrowUp") {
                    let index = this.state.index;
                    if (index > 0) {
                        this.setState({
                            index: index - 1
                        }, () => {
                            let i = this.state.index;
                            this.prompt.innerHTML = this.state.stack[i];
                        });
                    }
                } else if (e.key === "ArrowDown") {
                    let index = this.state.index;
                    if (index < this.state.stack.length) {
                        this.setState({
                            index: index + 1
                        }, () => {
                            let i = this.state.index;
                            if (i === this.state.stack.length) {
                                this.prompt.innerHTML = "";
                            } else {
                                this.prompt.innerHTML = this.state.stack[i];
                            }
                        });
                    }
                }
            }
        });
    }
    componentDidUpdate() {
        // Runs when component re-renders
        this.scrollBottom();
    }
    scrollBottom() {
        let content = document.querySelector(`.${styles.Content}`);
        content.scrollTo(0, content.scrollHeight);
    }
    handleCommand(cmd, arg) {
        let gc = globalCommands;
        let dir = this.state.currentDir;
        let lst = this.state.textRows;
        let lines = []; // Lines output from command
        let newDir = undefined; // If command changes directory

        // Get return values from command exec
        if (cmd === "solve") {
            let correct = () => {
                this.props.solveEvent();
            };
            let rtn = gc[cmd](this, correct, arg);
            lines = rtn.lines;
            newDir = "dir" in rtn ? rtn.dir : undefined;

        } else if (cmd in globalCommands) {
            let rtn = gc[cmd](this, arg);
            lines = rtn.lines;
            newDir = "dir" in rtn ? rtn.dir : undefined;

        } else {
            let rtn = gc["unknown"](this, arg);
            lines = rtn.lines;
            newDir = "dir" in rtn ? rtn.dir : undefined;
        }

        // Either clear or finish command execution
        if (cmd === "clear") {
            this.setState({
                textRows: []
            });

        } else {
            let _arg = arg !== undefined ? arg : "";
            lst.push(`${dir.uid} % ${cmd} ${_arg}`);
            for (let line of lines) {
                lst.push(" " + line);
            }

            // Modify state
            this.setState({
                textRows: lst,
                currentDir: newDir !== undefined ? newDir : dir
            });
        }
    }
    parseCmd(command) {
        let parse = command.split(" ");
        let cmd = parse[0];
        let arg = undefined;
        if (parse.length > 1) {
            arg = parse[1];
        }
        return {
            cmd: cmd,
            arg: arg
        };
    }
    stackPush(val) {
        let stack = this.state.stack.slice();
        stack.push(val);
        this.setState({
            stack: stack,
            index: stack.length
        });
    }
    handleKeyDown(e) {
        if (e.key === "Enter") {
            let val = this.prompt.innerHTML;
            this.stackPush(val);
            let cmd = this.parseCmd(val);
            this.handleCommand(cmd.cmd, cmd.arg);

            // Clear input
            this.prompt.innerHTML = "";

            // Don't send keypress to input div
            e.preventDefault();
            e.stopPropagation();
        }
    }
    render() {
        let _textRows = this.state.textRows.map((e, i) => {
            return (
                <div key={i} className={styles.TextRow}>{e}</div>
            );
        });
        return (
            <div className={styles.Prompt}>
                <StarBanner star={this.props.star}/>
                <BackToMain light={true} />
                <ResetBtn light={true} reset={() => this.reset()}/>
                <HelpBtn text="Find numbers, match them with colors, look for objects, and line up the counts. The answer has seven digits." />
                <div className={styles.PuzzleContainer}
                    onKeyDown={(e) => this.handleKeyDown(e)}
                >
                    <div className={this.getContentClass()}>
                        <div className={styles.TextContainer}>
                            { _textRows }
                        </div>
                        <div className={styles.CmdLine}>
                            <div className={styles.Cursor}>{this.state.currentDir.uid} %</div>
                            <div className={styles.InputArea}
                                contentEditable="true"
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Prompt;
