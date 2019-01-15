import React from 'react';
import { observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';
import userStore from '../stores/userStore';
import validateEmail from '../utils/validateEmail';

export default observer(() => {

    async function onClick() {
        const username = document.querySelector('#usernameInput').value;
        const email = document.querySelector('#emailInput').value;
        const password = document.querySelector('#passwordInput').value;
        const isEmailValidate = validateEmail(email);
        if (isEmailValidate) {
            await userStore.signup(username, email, password);
        } else {
            alert('Looks the email you input is not a valid email address')
        }
    }

    const Element =
        <section className="section">
            <div className="container">
                <div className="columns">
                    <div className="column is-one-third is-offset-one-third">

                        <div className="field">
                            <label className="label">Username</label>
                            <div className="control">
                                <input id="usernameInput" className="input" type="text" placeholder="Username" />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Email address</label>
                            <div className="control">
                                <input id="emailInput" className="input" type="text" placeholder="Email" />
                            </div>
                        </div>
                        <div className="field">
                            <p className="control">
                                <label className="label">Password</label>
                                <input id="passwordInput" className="input" type="password" placeholder="Password" />
                            </p>
                        </div>
                        <div className="field">
                            <p className="control">
                                <button className="button is-success" onClick={onClick}>Sign up</button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>;

    if (userStore.me.username) {
        return (
            <Redirect to="/explore" />
        );
    } else {
        return Element;
    }
});
