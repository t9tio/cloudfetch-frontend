import React, { Component } from 'react';
import userStore from '../stores/userStore';
import { observer } from 'mobx-react';
import ProjectList from './ProjectList';
import { Link } from 'react-router-dom';

@observer
class Explore extends Component {
    async componentDidMount() {
        const paramsString = this.props.location.search;
        const params = new URLSearchParams(paramsString);
        const activeTab = params.get('tab');
        if (activeTab === 'new') {
            await userStore.getProjects('NEW');
        } else {
            await userStore.getProjects('TOP');
        }
    }

    render() {
        // https://stackoverflow.com/questions/29852998/getting-query-parameters-from-react-router-hash-fragment
        const paramsString = this.props.location.search;
        const params = new URLSearchParams(paramsString); 
        const activeTab = params.get('tab');
        return (
            <div className="container">
                <div className="tabs is-boxed">
                    <ul>
                        {/**link to url with search: https://reacttraining.com/react-router/web/api/Link/to-object */}
                        <li className={!activeTab ? 'is-active' : ''}>
                            <Link to={{ search: '' }} onClick={() => userStore.getProjects('TOP')}>
                                Hot
                            </Link>
                        </li>
                        <li className={activeTab === 'new' ? 'is-active' : ''}>
                            <Link to={{ search: '?tab=new' }} onClick={() => userStore.getProjects('NEW')}>
                                New
                            </Link>
                        </li>
                        {/**
                            <li className={activeTab === 'tech' ? 'is-active' : ''}>
                                <Link to={{ search: '?' }} onClick={() => userStore.getProjects('TOP')}>
                                    Tech
                                </Link>
                            </li>
                            <li className={activeTab === 'startup' ? 'is-active' : ''}>
                                <Link to={{ search: '' }} onClick={() => userStore.getProjects('TOP')}>
                                    Startup
                                </Link>
                            </li>
                            <li className={activeTab === 'product' ? 'is-active' : ''}>
                                <Link to={{ search: '' }} onClick={() => userStore.getProjects('TOP')}>
                                    Product
                                </Link>
                            </li>
                        */}
                    </ul>
                </div>
                <ProjectList projects={userStore.projects} columnCount={2}/>
            </div>
        );
    }
}

export default Explore;