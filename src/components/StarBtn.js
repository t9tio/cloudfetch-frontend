// starble if user is signed in, other wise link to signin page
// stargizer page link

import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { observable } from "mobx";
import userStore from '../stores/userStore';
import requests from '../requests';
import uiStore from '../stores/uiStore';

@observer
class StarBtn extends Component {
    @observable starToggled = false;

    async toggleStar(project) {
        if (!userStore.me.username) {
            uiStore.isSignupModalActive = true;
            uiStore.signupModalHeading = 'Sign up to watch fetchers';
            uiStore.signupModalRedirect = '/';
            return 0;
        }

        if (!this.starToggled) {
            if (project.isStarred) {
                await requests.unstar(project.id);
            } else {
                // TODO: limit user from star project
                console.log('hi')
                // alert user: reach the max number of subscribe;
                // alert msg can lead user to pricing page
                try {
                    await requests.star(project.id);
                } catch (error) {
                    if(error.message.includes('Can not')) alert('You can not watch more fetchers, See pricing page for more info.');
                    return;
                }
                
            }
        } else {
            if (project.isStarred) {
                await requests.star(project.id);
            } else {
                await requests.unstar(project.id);
            }
        }
        this.starToggled = !this.starToggled;
    }

    render() {
        const { project } = this.props;
        let starCount = project.star;
        let isStarred = project.isStarred;

        if (this.starToggled) {
            isStarred = !isStarred;
            if (project.isStarred) {
                starCount--;
            } else {
                starCount++;
            }
        }

        const icon = isStarred ? <i className="fas fa-lg fa-star"/> : <i className="far fa-lg fa-star"/>
        return (
            <a className="tag star-btn-icon" style={{backgroundColor:'transparent',padding:0}} onClick={() => this.toggleStar(project)}>
                <span className="icon">{icon}</span>
                &nbsp;
                {starCount}
            </a>
        );
    }
}

export default StarBtn;
