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
            <div className="container">
                <br/>
                <h1 className="title">Unread messages</h1>
                <UnreadList unreadContents={unreadContents} columnCount={2}/>
            </div>
        );
    }
}

export default Unread;
