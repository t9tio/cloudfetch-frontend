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
            if (project.isStarred) {
                await requests.unstar(project.id);
            } else {
                await requests.star(project.id);
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
        return (
            <div className="tags has-addons">
                <a onClick={() => this.toggleStar(project)}>
                    <strong className="tag button" disabled={userStore.me.username ? false : true}>
                        <i className="fas fa-star"/>
                        &nbsp;
                        {isStarred ? 'Unstar' : 'Star'}
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
