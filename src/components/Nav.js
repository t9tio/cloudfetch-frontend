import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import favicon from '../../public/favicon.ico';
import { observer } from 'mobx-react';
import userStore from '../stores/userStore';
import { observable } from 'mobx';
import gravatarUrl from 'gravatar-url';
import uiStore from '../stores/uiStore';
import {withRouter} from "react-router-dom";

@observer
class Nav extends Component {
    @observable burgerIsActive = false;

    componentDidMount() {
        console.log(this.props.location.pathname);
    }

    toggleBurger() {
        this.burgerIsActive = !this.burgerIsActive;
    }

    inactiveBurger() {
        this.burgerIsActive = false;
    }

    activeSignupModal(redirect) {
        uiStore.isSignupModalActive = true;
        uiStore.signupModalHeading = 'Sign up to watch/create fetchers';
        uiStore.signupModalRedirect = redirect;
    }

    navToWatchList() {
        if(userStore.me.email) {
            this.props.history.push('/myWatchList')
        } else {
            this.activeSignupModal('/');
        }
    }

    navToUnread() {
        if(userStore.me.email) {
            this.props.history.push('/unread')
        } else {
            this.activeSignupModal('/');
        }
    }

    signout() {
        userStore.signout();
        this.props.history.push('/');
    }

    render() {
        const badgeClass = 'badge is-badge-small is-badge-success';

        return (
            <nav className="navbar is-dark is-bold" role="navigation" aria-label="main navigation">
                <div className="container">
                    <div className="navbar-brand">
                        <Link to="/" className="navbar-item" >
                            <img src={favicon} width="28" height="28"/>
                        </Link>

                        <a
                            className={`button navbar-burger is-dark ${this.burgerIsActive ? 'is-active' : ''}`} 
                            onClick={() => this.toggleBurger()}
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </a>
                    </div>

                    <div 
                        className={`navbar-menu is-dark ${this.burgerIsActive ? 'is-active' : ''}`} 
                        onClick={() => {this.inactiveBurger()}}    
                    >
                        <div className="navbar-start">
                            <a className={`navbar-item ${this.props.location.pathname === '/unread' ? 'is-active' : ''}`} style={{color: 'white'}} onClick={() => this.navToUnread()}>
                                <span className={userStore.me.unreadContents && userStore.me.unreadContents.length > 0 ? badgeClass : ''} data-badge=""><strong>Unread</strong></span>
                            </a>
                            <a className={`navbar-item ${this.props.location.pathname === '/myWatchList' ? 'is-active' : ''}`} style={{color: 'white'}} onClick={() => this.navToWatchList()}>
                                <strong>My watch list</strong>
                            </a>
                            <Link to="/pricing" className={`navbar-item ${this.props.location.pathname === '/pricing' ? 'is-active' : ''}`} style={{color: 'white'}}>
                                <strong>Pricing</strong>
                            </Link>
                        </div>

                        {
                            userStore.me.email
                                ?
                                <div className="navbar-end">
                                    <Link to="/createFetcher" className="navbar-item" style={{color: 'white'}}>
                                        <strong>Create fetcher</strong>
                                    </Link>
                                    <div className="navbar-item has-dropdown is-hoverable">
                                        <Link to={`/member/${userStore.me.id}?tab=stars`}  className="navbar-link" style={{color: 'white'}}>
                                            <img src={gravatarUrl(userStore.me.email, {size: 50, default: 'retro'})} style={{borderRadius: '100px'}}/>
                                        </Link>
                                        <div className="navbar-dropdown is-right">
                                            <Link to={`/member/${userStore.me.id}?tab=stars`} className="navbar-item" style={{color: 'white'}} onClick={() => userStore.getUser(userStore.me.id)}>
                                                Your profile
                                            </Link>
                                            <hr className="navbar-divider"/>
                                            <a className="navbar-item" onClick={() => this.signout()} style={{color: 'white'}}>
                                                Sign out
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div className="navbar-end">
                                    <a className={`navbar-item ${this.props.location.pathname === '/createFetcher' ? 'is-active' : ''}`} style={{color: 'white'}} onClick={() => this.activeSignupModal('/createFetcher')}>
                                        <strong>Create fetcher</strong>
                                    </a>
                                    <Link to="/signup" className="navbar-item" style={{color: 'white'}}>
                                        <strong>Sign up</strong>
                                    </Link>

                                    <Link to="/signin" className="navbar-item" style={{color: 'white'}}>
                                        <strong>Sign in</strong>
                                    </Link>
                                </div>
                        }
                    </div>
                </div>
            </nav>
        )
    }
}

export default withRouter(Nav);
