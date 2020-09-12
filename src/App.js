import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import MainMenu from './components/MainMenu';
import Nano from './components/puzzle/Nano';
import Flip from './components/puzzle/Flip';
import Pack from './components/puzzle/Pack';
import Prompt from './components/puzzle/Prompt';
import Search from './components/puzzle/Search';
import Maze from './components/puzzle/Maze';
import Ken from './components/puzzle/Ken';
import Color from './components/puzzle/Color';
import Fifteen from './components/puzzle/Fifteen';
import Chess from './components/puzzle/Chess';
import Secret from './components/puzzle/Secret';

import About from './components/About';
import Settings from './components/Settings';

class App extends React.Component {
    constructor(props) {
        super(props);
        let puzzles = ["nano", "flip", "pack", "prompt", "search", "maze", "ken", "color", "fifteen", "chess", "secret"];
        let starLookup = {};
        for (let name of puzzles) {
            starLookup[name] = false;
        }
        this.state = {
            stars: starLookup
        };
    }
    componentDidMount() {
        this.setCookieStars();
    }
    solveEvent(name) {
        let copy = {};
        for (let key in this.state.stars) {
            copy[key] = this.state.stars[key];
        }
        copy[name] = true;
        this.setState({
            stars: copy
        }, () => {
            this.saveCookieStars();
        });
    }
    setCookieStars() {
        let cookieStars = this.getCookieStars();
        let copy = {};
        if (cookieStars) {
            for (let key in this.state.stars) {
                if (key in cookieStars) {
                    copy[key] = cookieStars[key];
                } else {
                    copy[key] = this.state.stars[key];
                }
            }
            this.setState({
                stars: copy
            });
        }
    }
    getCookieStars() {
        // Get JSON stars from cookies
        let base64 = window.localStorage.getItem('data');
        if (base64) {
            return JSON.parse(atob(base64));
        }
        return false;
    }
    saveCookieStars() {
        // Save stars to cookies
        let stars = this.state.stars;
        let str = JSON.stringify(stars);
        let base64 = btoa(str);
        window.localStorage.setItem('data', base64);
    }
    onReset() {
        let puzzles = ["nano", "flip", "pack", "prompt", "search", "maze", "ken", "color", "fifteen", "chess", "secret"];
        let starLookup = {};
        for (let name of puzzles) {
            starLookup[name] = false;
        }
        this.setState({
            stars: starLookup
        });
        window.localStorage.removeItem('data');
    }
    render() {
        return (
            <Router>
                <div className="App">
                <Switch>
                    <Route path="/nano">
                        <Nano
                            star={this.state.stars.nano}
                            solveEvent={() => this.solveEvent('nano')}
                        />
                    </Route>
                    <Route path="/flip">
                        <Flip
                            star={this.state.stars.flip}
                            solveEvent={() => this.solveEvent('flip')}
                        />
                    </Route>
                    <Route path="/pack">
                        <Pack
                            star={this.state.stars.pack}
                            solveEvent={() => this.solveEvent('pack')}
                        />
                    </Route>
                    <Route path="/prompt">
                        <Prompt
                            star={this.state.stars.prompt}
                            solveEvent={() => this.solveEvent('prompt')}
                        />
                    </Route>
                    <Route path="/search">
                        <Search
                            star={this.state.stars.search}
                            solveEvent={() => this.solveEvent('search')}
                        />
                    </Route>
                    <Route path="/maze">
                        <Maze
                            star={this.state.stars.maze}
                            solveEvent={() => this.solveEvent('maze')}
                        />
                    </Route>
                    <Route path="/ken">
                        <Ken
                            star={this.state.stars.ken}
                            solveEvent={() => this.solveEvent('ken')}
                        />
                    </Route>
                    <Route path="/color">
                        <Color
                            star={this.state.stars.color}
                            solveEvent={() => this.solveEvent('color')}
                        />
                    </Route>
                    <Route path="/fifteen">
                        <Fifteen
                            star={this.state.stars.fifteen}
                            solveEvent={() => this.solveEvent('fifteen')}
                        />
                    </Route>
                    <Route path="/chess">
                        <Chess
                            star={this.state.stars.chess}
                            solveEvent={() => this.solveEvent('chess')}
                        />
                    </Route>
                    <Route path="/secret">
                        <Secret
                            star={this.state.stars.secret}
                            solveEvent={() => this.solveEvent('secret')}
                        />
                    </Route>

                    <Route path="/about">
                        <About />
                    </Route>
                    <Route path="/settings">
                        <Settings
                            onReset={() => this.onReset()}
                        />
                    </Route>
                    <Route path="/unknown">
                        <MainMenu
                            stars={this.state.stars}
                            unknown={true}
                        />
                    </Route>
                    <Route path="/">
                        <MainMenu
                            stars={this.state.stars}
                        />
                    </Route>
                </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
