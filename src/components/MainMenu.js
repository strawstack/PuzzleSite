import React from 'react';
import PuzzleIcon from './PuzzleIcon';
import MenuIcon from './MenuIcon';
import styles from './MainMenu.module.css';
/*
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"; */

class MainMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    getSecretPuzzle() {
        // Secret puzzle shows if url is /unknown
        // or star is attained
        // Secret shows in code, but is only visible
        // when star is attained
        if (this.props.unknown || this.props.stars.secret) {
            return (
                <PuzzleIcon
                    name="secret"
                    star={this.props.stars.secret}
                    hide={!this.props.stars.secret}
                />
            );
        }
    }
    getDescription() {
        // Text
        let normal = "A handful of puzzles humbly presented for your entertainment.";
        let goodLuck = "Good Luck!";
        let unknown = "A 'secret' puzzle appears; you may have to visit the source to find it.";
        let greatWork = "Great work so far only one star left"
        let hint = "but it's whereabouts are... unknown.";
        let complete = "Awesome job! You solved every puzzle!";

        // Stats
        let starCount = this.countStars();
        const totalStars = 11;

        let allComplete = starCount === totalStars;
        let oneLeft = totalStars - starCount === 1;
        let secretMissing = this.props.stars["secret"] === false;
        let slashUnknown = this.props.unknown;

        if (allComplete) {
            return complete;

        } else if (oneLeft && secretMissing) {
            if (slashUnknown) {
                return `${greatWork}. ${unknown}`;
            } else {
                return `${greatWork}, ${hint}`;
            }

        } else {
            if (slashUnknown) {
                return `${normal} ${unknown}`;
            } else {
                return `${normal} ${goodLuck}`;
            }
        }
    }
    countStars() {
        let count = 0;
        for (let key in this.props.stars) {
            let val = this.props.stars[key];
            if (val) {
                count += 1;
            }
        }
        return count;
    }
    render() {
        let props = this.props;
        return (
            <div className={styles.MainMenu}>
                <div className={styles.LeftSide}>
                    <div className={styles.GridContainer}>
                        <PuzzleIcon name="nano" star={props.stars.nano} />
                        <PuzzleIcon name="flip" star={props.stars.flip} />
                        <PuzzleIcon name="pack" star={props.stars.pack} />
                        <PuzzleIcon name="prompt" star={props.stars.prompt} />

                        <PuzzleIcon name="search" star={props.stars.search} />
                        <PuzzleIcon name="maze" star={props.stars.maze} />
                        <PuzzleIcon name="ken" star={props.stars.ken} />
                        <div></div>

                        <PuzzleIcon name="color" star={props.stars.color} />
                        <PuzzleIcon name="fifteen" star={props.stars.fifteen} />
                        <div></div>
                        <div></div>

                        <PuzzleIcon name="chess" star={props.stars.chess} />
                        <div></div>
                        <div></div>
                        {this.getSecretPuzzle()}
                    </div>
                </div>
                <div className={styles.RightSide}>
                    <div className={styles.DescriptionContainer}>
                        <div className={styles.SiteDescription}>
                            {this.getDescription()}
                        </div>
                        <div className={styles.SmallWidth}>
                            Some puzzles may be difficult to play if screen width is less than 600px. Site works best on desktop.
                        </div>
                    </div>
                    <div className={styles.NavMenuContainer}>
                        <div className={styles.NavMenu}>
                            <MenuIcon name="unknown" className={styles.yellow} />
                            <MenuIcon name="settings" className={styles.orange} />
                            <MenuIcon name="about" className={styles.blue} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MainMenu;
