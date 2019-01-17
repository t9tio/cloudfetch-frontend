import React, {Component} from 'react';
import { observer } from 'mobx-react';
import { observable } from "mobx";
import { withRouter } from "react-router-dom";
import isUrl from 'is-url';
import finder from '@medv/finder';
import requests from '../../requests';
import FetcherPreview from './FetcherPreview';
import uiStore from '../../stores/uiStore';
import userStore from '../../stores/userStore';

@observer class AddMonitor extends Component{
    @observable url = ''; // https://news.ycombinator.com/
    @observable fullHtml = '';
    @observable isFetchingHTML = false;
    @observable records = [/**
        {
            target: '',
            selecotor: 'dsaf',
            innerText: '',
            href: '',
        }
    */];

    // TODO!!!!!!!!
    async toggleModal() {
        if (!userStore.me.plan || userStore.me.plan === 'free') {
            const isRedirecting = confirm('Free user is not allowed to create fetcher, see the pricing page for more info.');
            if (isRedirecting) this.props.history.push('/pricing');
            return;
        }
        uiStore.isFetcherPreviewActive = true;
    }

    componentDidMount() {
        if(!userStore.me.email) {
            this.props.history.push('/');
        }
    }

    async getFullHtml() {
        if(!isUrl(this.url)) {
            alert('Invalid url, please insert url start with http/https');
            throw new Error('invalid url');
        }
        // TODO: ADD A better answer here: https://stackoverflow.com/a/8322025
        const iframe = document.querySelector('#iframe');
        const iframeWindow = iframe.contentWindow;
        const iframeDocument = iframeWindow.document;
        iframeDocument.open();

        this.isFetchingHTML = true;
        this.fullHtml = await requests.getFullHtml(this.url);
        this.isFetchingHTML = false;

        // control relative path: https://stackoverflow.com/a/19378662/4674834
        iframeDocument.write(`<base href="${this.url}" target="_blank">`);
        iframeDocument.write(this.fullHtml);

        // compare current target with last target to decide background color
        let lastTarget = null;
        let currentTarget = null;
        iframeWindow.onmouseover = e => {
            currentTarget = e.target;
            if (currentTarget !== lastTarget && !currentTarget.clicked) {

                // TODO: add transparency
                currentTarget.style.backgroundColor = '#219cef45';
                if (lastTarget && !lastTarget.clicked) lastTarget.style.backgroundColor = null;
            }
            lastTarget = currentTarget;
        };

        iframeWindow.onmouseout = () => {
            if (lastTarget && !lastTarget.clicked) lastTarget.style.backgroundColor = null;
        }

        // disable all click events: https://stackoverflow.com/a/19780264/4674834
        iframeWindow.onclick = e => {

            const target = e.target;

            e.stopPropagation();
            e.preventDefault();

            if (target.clicked) {
                target.clicked = false;
                // remove from array
                this.records = this.records.filter(record => record.target !== target);
            } else {
                target.clicked = true;
                const selector = finder(target, {
                    root: iframeDocument,
                    idName: () => false,
                    className: () => false,
                    tagName: () => false,
                });
                const cloneNode = target.cloneNode(true);
                cloneNode.style.backgroundColor = null;
                this.records.push({
                    selector,
                    target,
                    innerText: cloneNode.innerText,
                    href: cloneNode.href,
                });
            }

        }

    }

    render() {
        return (
            <div className="section">
                <div className="container">
                    <FetcherPreview url={this.url} records={this.records} key={this.records.length}/>

                    <h1 className="is-size-4 has-text-weight-semibold">Create a new fetcher</h1>
                    <p className="is-size-6">Fetch any web page and select what interests you</p>
                    <br/>

                    <div>
                        <label className="label">Step 1: Input website url and fetch </label>
                        <div className="field has-addons">
                            <div className="control has-icons-left is-expanded">
                                <input id="url_to_fetch" className="input is-dark" type="text" placeholder="URL e.g. https://news.ycombinator.com" value={this.url} onChange={() => {
                                    this.url = document.querySelector('#url_to_fetch').value
                                }} onKeyDown={(e)=>{
                                    if (e.keyCode === 13) {
                                        this.getFullHtml();
                                    }
                                }}/>
                                <span className="icon is-left">
                                    <i className="fas fa-link"></i>
                                </span>
                            </div>
                            <div className="control">
                                <a className={`button is-dark is-outlined ${this.isFetchingHTML ? 'is-loading' : ''}`} onClick={() => this.getFullHtml()}>
                                Fetch
                                </a>
                            </div>
                        </div>

                        {/**https://coderwall.com/p/hkgamw/creating-full-width-100-container-inside-fixed-width-container : wilder: , width: '96vw', marginLeft: '-48vw', left: '50%', position: 'relative'*/}
                        <label className="label">Step 2: Choose the content you want by clicking them</label>
                        <div id="iframeContainer" style={{borderStyle: 'solid', borderColor:'hsl(0, 0%, 21%)', borderWidth:'5px', borderRadius:'5px'}}>
                            <iframe id='iframe' sandbox="allow-forms allow-scripts allow-same-origin allow-popups" style={{width:'100%', height:500}}></iframe>

                            <div style={{backgroundColor:'#eee', padding:5}}>
                                <h2 className="is-size-6 has-text-weight-semibold"> Selected contents: </h2>
                                {this.records.map((record, i) => {
                                    return (
                                        <div key={i} style={{margin:'.3rem'}}>
                                            <a className="delete" onClick={() => {
                                                this.records[i].target.clicked = false;
                                                this.records[i].target.style.backgroundColor = null;
                                                this.records.splice(i,1);
                                            }}>delete</a> &nbsp;

                                            {
                                                record.href ?
                                                    <a href={record.href}>{record.innerText}</a>
                                                    :
                                                    <span>{record.innerText}</span>
                                            }
                                            <br/>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        <br/>
                

                        <div className="control is-expanded">
                            <button className="button is-success is-large is-pulled-right" onClick={() => this.toggleModal()}>Create fetcher</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(AddMonitor);
