import React, { Component } from 'react';
import userStore from '../stores/userStore';
import { observer } from 'mobx-react';
import ProjectList from './ProjectList';

@observer
class WatchList extends Component {

    async componentDidMount() {
        await userStore.getMe();
        // TODO: if getMe failed, redirect to 
        if (!userStore.me.email) {
            this.props.history.push('/signin');
            return;
        }
        await userStore.getUserStarredProjects(userStore.me.id);
    }

    render() {
        return (
            <div className="section">
                <div className="container">
                    <ProjectList projects={userStore.projects} columnCount={2}/>
                </div>
            </div>
        );
    }
}

export default WatchList;
