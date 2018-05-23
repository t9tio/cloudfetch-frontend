import React, {Component} from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { observable } from "mobx";
import userStore from '../stores/userStore';
import uiStore from '../stores/uiStore';
import requests from '../requests';
import StarBtn from './StarBtn';
import SubscribeBtn from './SubscribeBtn';
import timeago from 'timeago.js';
import Modal from './Modal';

// import queryStr from 'query-str';
// import setQuery from 'set-query-string';

// stargzers example: https://github.com/modelo/MODELO_backend/stargazers
const Record = ({ record, recordContent}) => {
    return (
        <tr>
            <td>{record.name}</td>
            <th>
                {recordContent ? <div dangerouslySetInnerHTML={{ __html: recordContent.content }} /> : <span style={{color:'#989b9e'}}>content</span>}
            </th>
        </tr>
    );
}

@observer class Crawler extends Component{
    @observable contentArr = [];
    @observable isCrawling = false;
    @observable currentContentIndex = 0;
    @observable createdAt = '';
    @observable crawlerStatus = false;

    async componentDidMount() {
        const crawler = this.props.crawler;
        this.crawlerStatus = crawler.status;
        console.log('mount crawler');
        console.log(crawler.id, 'crawlerid');
        const { contents, createdAt } = (await requests.getCrawledContents(crawler.id, this.currentContentIndex, 1))[0];
        this.contentArr = JSON.parse(contents);
        this.createdAt = createdAt;
    }

    async getCrawledContentsByIndex(contentIndex) {
        if (contentIndex >= 0 && contentIndex < this.props.crawler.contentCount) {
            const crawler = this.props.crawler;
            // TODO: decorator? whenever user do a request, "isLoading" the site
            userStore.isLoading = true;
            const { contents, createdAt } = (await requests.getCrawledContents(crawler.id, contentIndex, 1))[0];
            userStore.isLoading = false;
            this.contentArr = JSON.parse(contents);
            this.createdAt = createdAt;
            this.currentContentIndex = contentIndex;
        }
    }

    async crawl(crawlerId) {
        this.contentArr = [];
        this.isCrawling = true;
        userStore.isLoading = true;
        this.contentArr = JSON.parse(await requests.crawl(crawlerId));
        this.isCrawling = false;
        userStore.isLoading = false;
        this.createdAt = new Date();
    }

    async changeCrawlerStatus (crawlerId) {
        if(this.crawlerStatus) {
            await requests.pauseCrawl(userStore.project.id, crawlerId);
            this.crawlerStatus = false;
            console.log(this.crawlerStatus);
        } else {
            await requests.startCrawl(userStore.project.id, crawlerId);
            this.crawlerStatus = true;
            console.log(this.crawlerStatus);
        }
    }

    render() {
        const crawler = this.props.crawler;
        console.log(this.props);
        console.log('di', crawler.id);
        const createdAtStr = new Date(this.createdAt).toLocaleDateString() + ' ' + new Date(this.createdAt).toLocaleTimeString('en', { hour12: false });
        return (
            <div>
                <div className="card" >
                    <div className="card-header" style={{backgroundColor:"#f7f7f7"}}>
                        <div className="card-header-title">
                            <small>
                                {/*TODO: times ago*/}
                                Fetched from &nbsp; <a href={crawler.url}> <strong>{crawler.name}</strong></a> &nbsp; {timeago().format(this.createdAt)} 
                            </small>
                        </div>
                        <div className="">
                            <div className="dropdown is-hoverable is-right" style={{marginTop:5, marginRight:3}}>
                                <div className="dropdown-trigger">
                                    <button className="button is-light " aria-haspopup="true" aria-controls={`dropdown-menu_${crawler.id}`}>
                                        <span style={{color: this.crawlerStatus ? '#23d160': '#b5b5b5'}}>&#9679;</span>&nbsp;<span>Fetcher Info</span>
                                        <span className="icon is-small">
                                            <i className="fas fa-angle-down" aria-hidden="true"></i>
                                        </span>
                                    </button>
                                </div>
                                <div className="dropdown-menu" id={`dropdown-menu_${crawler.id}`} role="menu">
                                    <div className="dropdown-content"style={{width: "14rem", background:"#f2f2f2"}}>
                                        <div className="dropdown-item">Crawl Interval: {crawler.cron}</div>
                                        <div className="dropdown-item">Crawl Status: &nbsp; 
                                        <div className="field" style={{display: 'inline-block'}}>
                                            <input id={`switchExample_${crawler.id}`} type="checkbox" name="switchExample" className="switch is-rounded is-success" 
                                                checked={
                                                    this.crawlerStatus ? 'checked' : ''
                                                }
                                                onClick={() => {
                                                    this.changeCrawlerStatus(crawler.id);
                                                }}
                                            />
                                            <label htmlFor={`switchExample_${crawler.id}`}></label>
                                        </div>
                                        </div>

                                        {/*<div className="dropdown-item">Timezone: {crawler.timezone}</div>*/}
                                        <div className="dropdown-item">Content Count: {crawler.contentCount}</div> 
                                        {
                                            !(userStore.me.id === userStore.project.createdBy.id) ? '' : (
                                                <div className="dropdown-item">
                                                    <button className="button is-small is-danger" onClick={
                                                        async () => {
                                                            await requests.removeCrawler(userStore.project.id, crawler.id);
                                                            await userStore.getProject(userStore.project.id);
                                                        }
                                                    }>Remove fetcher</button>
                                                </div> 
                                            ) 
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-content">
                        <div className="content" style={{position: "relative"}}>
                            <a style={{position:"absolute", top:6, right:0}}>

                                <span className= {`crawlBtn button is-small ${this.isCrawling ? 'is-loading' : ''}`}
                                    onClick={()=>{
                                        console.log(crawler.id);
                                        this.crawl(crawler.id);
                                    }}>
                                    Fetch now
                                </span>
            
                            </a>

                            <table className="table is-fullwidth is-hoverable" style={{}}>
                                <thead >
                                    <tr style={{}}>
                                        <td>Name</td>
                                        <td>Content</td>
                                    </tr> 
                                </thead>
                                <tbody>
                                    {
                                        crawler.records
                                            .map((record, i) => <Record record={record} recordContent={this.contentArr[i]} key={i}/>)
                                    }
                                </tbody>
                            </table>
                            <div style={{textAlign:"right"}}>
                                {/*TODO: times ago*/}

                                <small>
                                Fetched at &nbsp;<strong>{createdAtStr}</strong>
                                </small>
                            </div>
                        </div>
                    </div>
                    <footer className="card-footer" style={{backgroundColor:"#fcfcfc"}}>
                        <a className="card-footer-item" onClick={() => this.getCrawledContentsByIndex(this.currentContentIndex + 1)}>
                            <strong>{crawler.contentCount - this.currentContentIndex - 1} Older </strong>
                        </a>
                        <a className="card-footer-item" onClick={() => this.getCrawledContentsByIndex(this.currentContentIndex - 1)}>
                            <strong>{this.currentContentIndex} Newer</strong>
                        </a>
                    </footer> 

                </div>
                <br/>
                <br/>
            </div>
        );
    }
}

// TODO: better UI for different use case; project stargazer page;
@observer class Project extends Component {
    @observable isModalVisable = false;

    async componentDidMount() {
        await userStore.getProject(this.props.match.params.id);
    }

    componentWillUnmount() {
        userStore.clearProject();
    }

    async crawlAll() {
        document.querySelectorAll('.crawlBtn').forEach(element => {
            element.click();
        });
    }

    render() {
        const project = userStore.project;
        return (
            <div style={{}}>
                <div className="container" >
                    <br/>
                    <nav className="level">
                        <div className="level-left">
                            <div className="level-item">
                                <p className="subtitle is-5">
                                    <Link to={`/member/${project.createdBy.id}`}>{project.createdBy.username}</Link>
                                    <span style={{margin: '.2rem'}}>/</span>
                                    <strong><a href="">{project.name}</a></strong>
                                </p>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                                <div className="level-item">
                                    <StarBtn project={project} />
                                </div>
                                <div className="level-item">
                                    <SubscribeBtn project={project}/>
                                </div>
                            </div>
                        </div>

                        <div className="level-right">
                            <strong className="level-item"><a 
                                className="button"
                                onClick={() => this.crawlAll()}>
                                Fetch all now
                            </a></strong>
                        </div>
                    </nav>
                    <div>{project.description}</div><br/>


                </div>
                <div className="container">
                    {
                        project.crawlers
                            .map((crawler, i) => {
                                console.log(crawler.id, 'project', i);
                                if (crawler.id) return <Crawler crawler={crawler} key={i}/>;
                            })
                    }

                    {
                        !(userStore.me.id === userStore.project.createdBy.id) ? '' : (
                            <a className="button" onClick={() => {uiStore.isAddFetcherModalVisable = true}}> Add Fetcher </a>
                        ) 
                    }
                    
                </div>
                <Modal/>
            </div>
        );
    }
}

export default Project;
