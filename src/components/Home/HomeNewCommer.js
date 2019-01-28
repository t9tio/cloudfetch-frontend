import React, { Component } from "react";
import userStore from '../../stores/userStore';
import requests from '../../requests';
import { observer } from 'mobx-react';
import Explore from '../Explore';
import uiStore from '../../stores/uiStore';
import Drift from 'react-driftjs';

@observer
class Home extends Component {
    async componentDidMount() {
        await userStore.getProjects('TOP');
    }

    componentWillUnmount() {
        if(window.drift && window.drift.unload) window.drift.unload();
    }

    activeSignupModal(heading, redirect) {
        uiStore.isSignupModalActive = true;
        uiStore.signupModalHeading = heading;
        uiStore.signupModalRedirect = redirect;
    }

    async closeIntro() {
        if (userStore.me.email) {
            await requests.updateMe({isIntroClosed: true});
            userStore.me.isIntroClosed = true;
        } else {
            this.activeSignupModal('Sign up to close intro', '/')
        }
    }

    render() {
        const intro = <section className="hero is-medium has-bg-img">
            <div className="hero-body" style={{position:'relative'}}>
                {
                    userStore.me.email ?
                        <a className="delete is-large" style={{position:'absolute', top: '1rem', right: '1rem'}} onClick={() => this.closeIntro()}/>
                        :
                        ''
                }
                <div className="container has-text-centered">
                    <h1 className="title" style={{color:'white'}}>CloudFetch: Your information center</h1>
                    <h2 className="subtitle" style={{color:'white'}}>
                        Never miss interesting updates on your favourite websites
                    </h2>
                    <hr/>
                    <h2 className="container subtitle is-size-4" style={{color:'white'}}>
                            Here are some interesting fetchers to watch. Click the &quot;<i className="far fa-sm fa-star"/>&quot; button to watch and start receiving updates of the fetcher.
                    </h2>
                </div>
            </div>
            <div className="hero-foot">
                <div className="container">
                    <div className="content has-text-centered">
                        <svg width="35" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#ffffff" d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"></path>
                        </svg>
                    </div>
                </div>
            </div>
        </section>

        return (
            <div>
                {userStore.me.isIntroClosed ? '' : intro}
                <section className="section">
                    <div className="container">
                        <Explore location={this.props.location}/>
                    </div>
                </section>
                {
                    userStore.me.email ?
                        <Drift 
                            appId="yf9b4pm42evh"
                            userId={userStore.me.email}
                            attributes={{
                                name: userStore.me.username,
                                email: userStore.me.email,
                                bio: `id: ${userStore.me.id} plan: ${userStore.me.plan}; nextBillDate: ${userStore.me.nextBillDate}`,
                            }}
                        />
                        :
                        ''
                }
            </div>
        );
    }
}

export default Home;
