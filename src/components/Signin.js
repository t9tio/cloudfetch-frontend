import React from "react";
import { observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';
import userStore from '../stores/userStore';

export default observer(() => {
    async function onClick() {
        const email = document.querySelector('#emailInput').value;
        const password = document.querySelector('#passwordInput').value;
        await userStore.signin(email, password);
    }

    const Element =
        <section className="section">
            <div className="container">
                <div className="columns">
                    <div className="column is-one-third is-offset-one-third">

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
                                <button className="button is-success" onClick={onClick} >Sign in</button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>;

    if (userStore.me.username) {
        return (
            <Redirect to="/" />
        );
    } else {
        return Element;
    }
});
