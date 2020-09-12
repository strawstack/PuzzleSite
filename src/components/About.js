import React from 'react';
import styles from './About.module.css';
import BackToMain from './BackToMain';
import imagePath from "./hex.jpeg";

class About extends React.Component {
    render() {
        return (
            <div className={styles.About}>
                <BackToMain />
                <h1 className={styles.Title}>About</h1>
                <div className={styles.TextContainer}>
                    <div className={styles.Text}>
                        <p>This site was made by</p>
                        <p>
                            <a
                                className={styles.Link}
                                href="https://richard.dev"
                                target="_blank"
                                rel="noopener noreferrer"
                                >
                                Richard
                            </a> and <a
                                className={styles.Link}
                                href="https://dianayu.org"
                                target="_blank"
                                rel="noopener noreferrer"
                                >
                                Diana
                            </a>
                        </p>
                        <p>with ReactJS and Figma</p>
                        <p>Seattle, 2020</p>
                    </div>
                </div>
                <div className={styles.ImageContainer}>
                    <img
                        src={imagePath}
                        alt={"Richard and Diana"}
                    />
                </div>
            </div>
        );
    }
}

export default About;
