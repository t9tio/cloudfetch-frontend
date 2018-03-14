import React, { Component } from 'react';
import userStore from '../stores/userStore';
import { observer } from 'mobx-react';
import ProjectList from './ProjectList';

@observer
class Explore extends Component {
    async componentDidMount() {
        await userStore.getProjects();
    }

    render() {
        return (
            <section className="section">
                <div className="container">
                    <ProjectList projects={userStore.projects} columnCount={3}/>
                </div>
            </section>
        );
    }
}

export default Explore;