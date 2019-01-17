import React, { Component } from "react";
import userStore from '../../stores/userStore';
import { observer } from 'mobx-react';

// recent updates

@observer
class Home extends Component {
    async componentDidMount() {
        await userStore.getProjects('TOP');
    }

    render() {
        return (
            <div className="section">
                <div className="container">
                    <h2 className="subtitle">Recent updates</h2>
                </div>
            </div>
        );
    }
}

export default Home;
