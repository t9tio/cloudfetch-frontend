import React, {Component} from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { observable } from "mobx";
import userStore from '../stores/userStore';
import requests from '../requests';
import StarBtn from './StarBtn';

// stargzers example: https://github.com/modelo/MODELO_backend/stargazers
const Record = ({ record, recordContent}) => {
    return (
        <tr>
            <th >{record.name}</th>
            <td>{recordContent ? <div dangerouslySetInnerHTML={{ __html: recordContent.content }} /> : <span style={{color:'#989b9e'}}>content</span>}</td>
            <td>{recordContent ? recordContent.createdAt : <span style={{color:'#989b9e'}}>fetched at</span>}</td>
        </tr>
    );
}

@observer class Crawler extends Component{
    @observable contentArr = [];
    @observable isCrawling = false;

    async crawl(crawlerId) {
        this.isCrawling = true;
        this.contentArr = await requests.crawl(crawlerId);
        this.isCrawling = false;
    }

    render() {
        const crawler = this.props.crawler;
        return (
            <div className="box" style={{padding:".8rem", marginBottom:"1.1rem"}}>
                <div className="content">
                    <a href={crawler.url}> <strong>{crawler.name}</strong></a>
                    <a 
                        className={`crawlBtn button is-success is-small ${this.isCrawling ? 'is-loading' : ''}`}
                        style={{float: "right"}} 
                        onClick={() => this.crawl(crawler.id)}>
                            Crawl
                    </a> 
                    <table className="table is-bordered" style={{margin:".3rem"}}>
                        <tbody>
                            {
                                crawler.records
                                    .map((record, i) => <Record record={record} recordContent={this.contentArr[i]} key={i}/>)
                            }
                        </tbody>
                    </table>
                    <span>&nbsp;</span> {/**create a line*/}
                    <div style={{float: "right"}}>
                        <a className="button is-small is-danger is-outlined">Delete</a>
                        &nbsp;
                        <a className="button is-small is-primary is-outlined">Edit</a>
                    </div>
                </div>
            </div>
        );
    }
}

@observer class Project extends Component {

    async componentDidMount() {
        await userStore.getProject(this.props.match.params.id);
        console.log(userStore.project.crawlers.length)
    }

    async crawlAll() {
        document.querySelectorAll('.crawlBtn').forEach(element => {
            element.click();
        });
    }

    render() {
        const project = userStore.project;
        return (
            <div className="container">
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
                        </div>
                    </div>

                    <div className="level-right">
                        <strong className="level-item"><a 
                            className="button is-success"
                            onClick={() => this.crawlAll()}>
                                Crawl all
                        </a></strong>
                    </div>
                </nav>
                {
                    project.crawlers
                        .map((crawler, i) => <Crawler crawler={crawler} key={i}/>)
                }
            </div>
        );
    }
}

export default Project;