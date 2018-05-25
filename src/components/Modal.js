import React, {Component} from 'react';
import { observer } from 'mobx-react';
import { observable } from "mobx";
import requests from '../requests';
import uiStore from '../stores/uiStore';
import userStore from '../stores/userStore';
import isUrl from 'is-url';

/**
 * // TODO: extract to a function
 * Gets an XPath for an element which describes its hierarchical location.
 * https://stackoverflow.com/a/3454545/4674834
 */
var getElementXPath = function(element) {
    if (element && element.id)
        return '//*[@id="' + element.id + '"]';
    else
        return getElementTreeXPath(element);
};

var getElementTreeXPath = function(element)
{
    var paths = [];  // Use nodeName (instead of localName) 
    // so namespace prefix is included (if any).
    for (; element && element.nodeType == Node.ELEMENT_NODE; 
        element = element.parentNode)
    {
        var index = 0;
        var hasFollowingSiblings = false;
        for (let sibling = element.previousSibling; sibling; 
            sibling = sibling.previousSibling)
        {
            // Ignore document type declaration.
            if (sibling.nodeType == Node.DOCUMENT_TYPE_NODE)
                continue;

            if (sibling.nodeName == element.nodeName)
                ++index;
        }

        for (let sibling = element.nextSibling; 
            sibling && !hasFollowingSiblings;
            sibling = sibling.nextSibling)
        {
            if (sibling.nodeName == element.nodeName)
                hasFollowingSiblings = true;
        }

        var tagName = (element.prefix ? element.prefix + ":" : "") 
                          + element.localName;
        var pathIndex = (index || hasFollowingSiblings ? "[" 
                   + (index + 1) + "]" : "");
        paths.splice(0, 0, tagName + pathIndex);
    }

    return paths.length ? "/" + paths.join("/") : null;
};

@observer class Modal extends Component {
    @observable crawlerName = '';
    @observable cron = '';
    @observable timezone = '';
    @observable url = '';
    @observable fullHtml = '';
    @observable isFetchingHTML = false;
    @observable records = [/**
        {
            name: 'testName',
            target: '',
            xpath: 'dsaf',
        }
    */];

    async getFullHtml() {
        if(!isUrl(this.url)) {
            alert('Invalid url, please insert url start with http/https');
            throw new Error('invalid url');
        }
        this.isFetchingHTML = true;
        this.fullHtml = await requests.getFullHtml(this.url);
        this.isFetchingHTML = false;
        this.crawlerName = this.url.split('/')[2];
        
        // TODO: ADD A better answer here: https://stackoverflow.com/a/8322025
        const iframe = document.querySelector('#iframe');
        const iframeWindow = iframe.contentWindow;
        const iframeDocument = iframeWindow.document;
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

        // https://stackoverflow.com/a/19780264/4674834
        iframeWindow.onclick = e => {
            const target = e.target;

            if (target.clicked) {
                target.clicked = false;
                // remove from array
                this.records = this.records.filter(record => record.target !== target);
            } else {
                target.clicked = true;
                const xpath = getElementXPath(target);
                const cloneNode = target.cloneNode(true);
                cloneNode.style.backgroundColor = null;
                this.records.push({
                    xpath,
                    name: `content_${this.records.length + 1}`,
                    target: target,
                    content: cloneNode.outerHTML
                });
            }
            
            e.stopPropagation();
            e.preventDefault();
        }


        console.log(iframeWindow);
    }

    clearModalLocalState() {
        this.crawlerName = '';
        this.cron = '';
        this.timezone = '';
        this.url = '';
        this.fullHtml = '';
        this.isFetchingHTML = false;
        this.records = [];

        const iframe = document.querySelector('#iframe');
        const iframeWindow = iframe.contentWindow;
        const iframeDocument = iframeWindow.document; 
        iframeDocument.open();


    }
    
    render() {
        const isVisable = uiStore.isAddFetcherModalVisable;
        return (
            <div className={`modal ${isVisable ? 'is-active' : ''}`}>
                <div className="modal-background"></div>
                <button className="modal-close is-large" aria-label="close" onClick={()=>{
                    uiStore.isAddFetcherModalVisable = false
                    this.clearModalLocalState();
                }}></button>
                <section className="model-card container" style={{width:"99%", borderRadius:'5px', height: window.innerHeight * 0.8, overflowY:'scroll', backgroundColor:'#fff', padding:'1rem'}}>    

                    <h2 className="is-size-4 has-text-weight-semibold">Add new fetcher</h2>
                    <hr/>

                    <div className="field">
                        <label className="label">Step 1: Input website url and fetch </label>
                        <div className="field is-grouped">
                            <div className="control is-expanded">
                                <input id="url_to_fetch" className="input" type="text" placeholder="e.g. http://timqian.com" value={this.url} onChange={() => {
                                    this.url = document.querySelector('#url_to_fetch').value
                                }}/>
                            </div>
                            <div className="control">
                                <a className={`button is-info ${this.isFetchingHTML ? 'is-loading' : ''}`} onClick={() => this.getFullHtml()}>
                                    Fetch
                                </a>
                            </div>
                        </div>
                        <p className="help">It normally takes 5-10 seconds to load the html</p>
                    </div>
                    <br/>

                    <label className="label">Step 2: Choose the content you want</label>
                    <div id="iframeContainer" style={{borderStyle: 'solid', borderWidth:'2px', borderRadius:'2px'}}>
                        <iframe id='iframe' sandbox="allow-forms allow-scripts allow-same-origin allow-popups" style={{width:'100%', height:500}}></iframe>
                        <div style={{backgroundColor:'#eee', padding:5}}>
                            <h2 className="is-size-6 has-text-weight-semibold"> Selected contents: </h2>
                            {this.records.map((record, i) => {
                                // TODO: show an editable list
                                return (
                                    <div key={i} style={{margin:'.3rem'}}>
                                        <button className="button is-small is-danger" onClick={() => {
                                            this.records[i].target.clicked = false;
                                            this.records[i].target.style.backgroundColor = null;
                                            this.records.splice(i,1);
                                        }}>delete</button> &nbsp;
                                        <strong>name:</strong>&nbsp;
                                        <input id={`record_input_${i}`} className="input is-small" value={record.name} style={{width:"5rem"}} onChange={() => {
                                            record.name = document.querySelector(`#record_input_${i}`).value;
                                        }}/> &nbsp;
                                        <strong>content:</strong>&nbsp;
                                        <div style={{display:'inline'}} dangerouslySetInnerHTML={{ __html: record.content }}></div><br/>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <br/>

                    <div>
                        <label className="label">Step 3: Define fetcher properties</label>
                        {/**TODO: user choose cron and timezone and fetcher name*/}
                        <li>
                            <strong>Fetcher name:</strong>&nbsp;
                            <input id="crawler_name_input" className="input is-small" style={{display: 'inline-block', width: '10rem'}} type="text" value={this.crawlerName} onChange={() => {
                                this.crawlerName = document.querySelector('#crawler_name_input').value;
                            }}/>
                        </li>
                        <li>
                            <strong>Fetch interval:</strong>&nbsp;

                            <div className="select is-small" style={{width: '10rem'}}>
                                <select id="crawler_interval_select" onChange={() => {
                                    const x = document.querySelector('#crawler_interval_select');
                                    this.cron = x.options[x.selectedIndex].value;
                                }}>
                                    <option value="on demond">on-demand</option>
                                    <option value="1 hour">every hour</option>
                                    <option value="1 day">every day</option>
                                    <option value="1 week">every week</option>
                                    <option value="1 month">every month(30 days)</option>
                                </select>
                            </div>
                        </li> 
                    </div>
                    <hr/>
                    <button className="button is-success" onClick={async () => {
                        // TODO: create crawler and records and clear modal
                        const data = await requests.addCrawler(userStore.project.id, this.crawlerName, this.url, this.cron, this.timezone);
                        console.log(data);
                        const crawlerId = data.addCrawler.id;
                        console.log(crawlerId, 'crawlerId');

                        for (const record of this.records) {
                            await requests.addRecord(userStore.project.id, crawlerId, record.name, record.xpath);
                        }
                        this.clearModalLocalState();
                        uiStore.isAddFetcherModalVisable = false;
                        userStore.getProject(userStore.project.id);
                    }}>Create Fetcher</button> &nbsp;
                    <button className="button" onClick={() => {
                        uiStore.isAddFetcherModalVisable = false;
                        this.clearModalLocalState();
                    }}>Cancel</button>

                </section>
            </div>
        );
    }
}

export default Modal;
