import React, { Component } from 'react';
import userStore from '../stores/userStore';
import { observer } from 'mobx-react';
import UnreadList from './UnreadList';

@observer
class Unread extends Component {
    async componentDidMount() {
        await userStore.getMe();
        // TODO: if getMe failed, redirect to 
        if (!userStore.me.email) {
            this.props.history.push('/signin');
            return;
        }
    }

    render() {
        const unreadContents = userStore.me.unreadContents;

        return (
            <div className="section">
                <div className="container">
                    <UnreadList unreadContents={unreadContents} columnCount={2}/>
                </div>
            </div>
        );
    }
}

export default Unread;
