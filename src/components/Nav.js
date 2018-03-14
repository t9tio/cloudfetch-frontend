import React from 'react';
import { Link } from 'react-router-dom';
import favicon from '../../public/favicon.ico';
import { observer } from 'mobx-react';
import userStore from '../stores/userStore';

// TODO: move the js to componenet did mont; disable burger active when click link
export default observer(() => (
    <nav className="navbar is-dark is-bold" role="navigation" aria-label="main navigation">
        <div className="container">
            <div className="navbar-brand">
                <Link to="/" className="navbar-item" >
                    <img src={favicon} width="28" height="28"/>
                </Link>

                <a className="button navbar-burger is-dark" data-target="navMenu">
                    <span></span>
                    <span></span>
                    <span></span>
                </a>
            </div>

            <div className="navbar-menu is-dark" id="navMenu">
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
                                <a className="navbar-link" style={{color: 'white'}}>
                                    <strong>{userStore.me.username}</strong>
                                </a>
                                <div className="navbar-dropdown">
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
                                    <a className="navbar-item" onClick={() => userStore.signout()} style={{color: 'white'}}>
                                        1. nav: use local state instead of js to toggle
                                        2. nav: click other place de-active nav
                                        3. project stargazer page
                                        4. more projects (1. info collector 2. site monit)
                                        5. update project UI
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
));

document.addEventListener('DOMContentLoaded', function () {

    // Get all "navbar-burger" elements
    var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
  
        // Add a click event on each of them
        $navbarBurgers.forEach(function ($el) {
            $el.addEventListener('click', function () {
  
                // Get the target from the "data-target" attribute
                var target = $el.dataset.target;
                var $target = document.getElementById(target);
  
                // https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
                // Toggle the class on both the "navbar-burger" and the "navbar-menu"
                $el.classList.toggle('is-active');
                $target.classList.toggle('is-active');
  
            });
        });
    }
  
});