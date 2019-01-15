import React, { Component } from "react";
import userStore from '../../stores/userStore';
import { observer } from 'mobx-react';
import Explore from '../Explore';
import uiStore from '../../stores/uiStore';

@observer
class Home extends Component {
    async componentDidMount() {
        await userStore.getProjects('TOP');
    }

    activeSignupModal() {
        uiStore.isSignupModalActive = true;
        uiStore.signupModalHeading = 'Sign up to create fetcher';
        uiStore.signupModalRedirect = '/createFetcher';
    }

    render() {
        return (
            <div>
                <section className="hero is-medium is-dark is-bold">
                    <div className="hero-body">
                        <div className="container has-text-centered">
                            <h1 className="title">Your information center</h1>
                            <h2 className="subtitle">
                                Never miss interesting updates on your favourite websites
                            </h2>
                        </div>
                    </div>
                </section>

                <section className="section">
                    <div className="container">
                        <h2 className="subtitle is-size-4">
                            Here are some interesting fetchers to watch. Click the &quot;<i className="far fa-sm fa-star"/>&quot; button to start receiving updates
                        </h2>
                        <Explore location={this.props.location}/>
                    </div>
                </section>
            </div>
        );
    }
}

export default Home;
