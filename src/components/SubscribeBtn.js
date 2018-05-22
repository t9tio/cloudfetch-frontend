// starble if user is signed in, other wise link to signin page
// stargizer page link

import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { observable } from "mobx";
import userStore from '../stores/userStore';
import requests from '../requests';

@observer
class StarBtn extends Component {
    @observable starToggled = false;

    async toggleStar(project) {
        if (!this.starToggled) {
            if (project.isSubscribed) {
                await requests.unsubscribe(project.id);
            } else {
                await requests.subscribe(project.id);
            }
        } else {
            if (project.isSubscribed) {
                await requests.subscribe(project.id);
            } else {
                await requests.unsubscribe(project.id);
            }
        }
        this.starToggled = !this.starToggled;
    }

    render() {
        const { project } = this.props;
        let starCount = project.subscribeCount;
        let isStarred = project.isSubscribed;
        if (this.starToggled) {
            isStarred = !isStarred;
            if (project.isSubscribed) {
                starCount--;
            } else {
                starCount++;
            }
        }
        return (
            <div className="tags has-addons" style={{display:"inline"}}>
                <a onClick={() => this.toggleStar(project)}>
                    <strong className="tag button" disabled={userStore.me.username ? false : true}>
                        <i className="fas fa-eye"></i>
                        &nbsp;
                        {isStarred ? 'Unsubscribe' : 'Subscribe'}
                    </strong>
                </a>
                <a className="tag button is-dark">
                    <strong>
                        {starCount}
                    </strong>            
                </a>
            </div>
        );
    }
}

export default StarBtn;
