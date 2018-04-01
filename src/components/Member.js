import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import userStore from '../stores/userStore';
import { observer } from 'mobx-react';
// import { observable } from "mobx";
import ProjectList from './ProjectList';
import gravatarUrl from 'gravatar-url';

@observer
class Explore extends Component {
    // @observable activeTab = null;

    async componentDidMount() {
        await userStore.getUser(this.props.match.params.id);
        const paramsString = this.props.location.search;
        const params = new URLSearchParams(paramsString); 
        const activeTab = params.get('tab');
        if (activeTab === 'stars') {
            await userStore.getUserStarredProjects(this.props.match.params.id);
        }
    }

    render() {
        const createDateDetail = new Date(userStore.user.createdAt);
        const createDate = `${createDateDetail.getFullYear()}/${createDateDetail.getMonth()}/${createDateDetail.getDate()}`;
        
        // https://stackoverflow.com/questions/29852998/getting-query-parameters-from-react-router-hash-fragment
        const paramsString = this.props.location.search;
        const params = new URLSearchParams(paramsString); 
        const activeTab = params.get('tab');

        return (
            <section className="container">
                <br/>
                <div className="columns">
                    <div className="column is-one-quarter">
                        <img src={userStore.user.email ? gravatarUrl(userStore.user.email, {size: 400, default: 'retro'}) : ''} style={{maxWidth:"200px"}}/><br/>
                        <span className="title">{userStore.user.username}</span><br/>
                        Joined at {createDate}<br/>
                        <a href={`mailto:${userStore.user.email}`}>{userStore.user.email}</a><br/>
                    </div>

                    <div className="column is-three-quarters">
                        <div className="tabs is-boxed">
                            <ul>
                                {/**link to url with search: https://reacttraining.com/react-router/web/api/Link/to-object */}
                                <li className={!activeTab ? 'is-active' : ''}>
                                    <Link to={{ search: '' }} onClick={() => userStore.getUser(userStore.user.id)}>
                                        Projects
                                    </Link>
                                </li>
                                <li className={activeTab === 'stars' ? 'is-active' : ''}>
                                    <Link to={{ search: '?tab=stars' }} onClick={() => userStore.getUserStarredProjects(userStore.user.id)}>
                                        Stars
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {
                            !activeTab ? <ProjectList projects={userStore.user.projects} columnCount={2}/> : <span/>
                        }
                        
                        {
                            activeTab === 'stars' ? <ProjectList projects={userStore.projects} columnCount={2}/> : <span/>
                        }
                    </div>
                </div>

            </section>
        );
    }
}

export default Explore;