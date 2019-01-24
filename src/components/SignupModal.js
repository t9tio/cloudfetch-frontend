import React, { Component } from 'react';
import { observer } from 'mobx-react';
import userStore from '../stores/userStore';
import uiStore from '../stores/uiStore';
import validateEmail from '../utils/validateEmail';
import {withRouter} from "react-router-dom";

@observer
class Modal extends Component {

    async signup() {
        // TODO: use state!
        const email = document.querySelector('#emailInput').value;
        const password = document.querySelector('#passwordInput').value;
        const isEmailValidate = validateEmail(email);
        if (isEmailValidate) {
            await userStore.signup({email, password});
            this.closeModal();
            this.props.history.push(uiStore.signupModalRedirect);
        } else {
            alert('Looks the email you input is not a valid email address')
        }
    }

    async signin() {
        this.closeModal();
        this.props.history.push('signin');
    }

    async closeModal() {
        uiStore.isSignupModalActive = false;
    }

    render() {
        const Element =
            <div className={`modal ${uiStore.isSignupModalActive ? 'is-active' : ''}`}>
                <div className="modal-background"></div>
                <div className="modal-card" style={{maxWidth:'22rem'}}>
                    <header className="modal-card-head">
                        <p className="modal-card-title">{uiStore.signupModalHeading}</p>
                        <button className="delete" aria-label="close" onClick={this.closeModal}></button>
                    </header>
                    <section className="modal-card-body">
                        <div>
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
                        </div>
                    </section>
                    <footer className="modal-card-foot">
                        <button className="button is-success" onClick={() => this.signup()}>Sign up</button>
                        <button className="button" onClick={this.closeModal}>Cancel</button>
                        <p className="help">Already have an account? <a onClick={() => this.signin()}>sign in</a></p>
                    </footer>
                </div>
            </div>;


        return Element;
    }
}

export default withRouter(Modal);
