import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import favicon from '../../public/favicon.ico';
import { observer } from 'mobx-react';
import userStore from '../stores/userStore';
import { observable } from 'mobx';

@observer
class Nav extends Component {
    @observable burgerIsActive = false;

    toggleBurger() {
        this.burgerIsActive = !this.burgerIsActive;
    }

    inactiveBurger() {
        this.burgerIsActive = false;
    }

    render() {
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
                            <Link to="/explore" className="navbar-item" style={{color: 'white'}}>
                                <strong>Explore</strong>
                            </Link>
                        </div>
                        {
                            userStore.me.username
                                ?
                                <div className="navbar-end">
                                    <Link to="/addMonitor" className="navbar-item" style={{color: 'white'}}>
                                        <strong>+</strong>
                                    </Link>
                                    <div className="navbar-item has-dropdown is-hoverable">
                                        <Link to={`/member/${userStore.me.id}`}  className="navbar-link" style={{color: 'white'}}>
                                            <strong>{userStore.me.username}</strong>
                                        </Link>
                                        <div className="navbar-dropdown is-right">
                                            <Link to={`/member/${userStore.me.id}`} className="navbar-item" style={{color: 'white'}}>
                                                Your profile
                                            </Link>

                                            <Link className="navbar-item" style={{color: 'white'}} 
                                                to={{
                                                    pathname: `/member/${userStore.me.id}`,
                                                    search: '?tab=stars',
                                                }}>
                                                Your stars
                                            </Link>
                                            <hr className="navbar-divider"/>
                                            <a className="navbar-item" onClick={() => userStore.signout()} style={{color: 'white'}}>
                                                Sign out
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div className="navbar-end">
                                    <Link to="/signup" className="navbar-item" style={{color: 'white'}}>
                                        Sign up
                                    </Link>

                                    <Link to="/signin" className="navbar-item" style={{color: 'white'}}>
                                        Sign in
                                    </Link>
                                </div>
                        }
                    </div>
                </div>
            </nav>
        )
    }
}

export default Nav;
