import React from 'react';
import styles from './Settings.module.css';
import BackToMain from './BackToMain';

class Settings extends React.Component {
    handleClick() {
        let rtn = window.confirm("Reset all star progress?");
        if (rtn) {
            this.props.onReset();
        }
    }
    render() {
        return (
            <div className={styles.Settings}>
                <BackToMain light={true} />
                <h1 className={styles.Title}>Settings</h1>
                <div className={styles.MenuContainer}>
                    <div className={styles.MenuItem}>

                        <p className={styles.Text}>
                            {"Reset all star progress?"}
                        </p>
                        <div className={styles.Button}
                            onClick={() => this.handleClick()}
                        >
                            {"Reset"}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Settings;
