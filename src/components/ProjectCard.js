import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import StarBtn from './StarBtn';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import timeago from 'timeago.js';
import userStore from '../stores/userStore';
import requests from '../requests';
import ContentsTbody from './ContentsTbody';

@observer
class ProjectCard extends Component {
    @observable project = this.props.project;
    /**
     * create table "crawledContents" (
     *     "projectId" int references "project" on delete cascade,
     *     "url" varchar,
     *     "selectors" varchar,
     *     "contentGroups" varchar, -- '[[0,1,2],[3,4,5],[6,7,8],[9,10,11],[12,13,14]]'
     *     "contents" varchar, -- '{contents:[{innerText, href}]}'
     *     "createdAt" timestamp default now()
     * );
     */
    @observable crawledContents = this.props.project.latestContent;
    @observable currentContentIndex = 0;

    async getLastContents() {
        if (this.currentContentIndex < this.project.contentCount - 1) {
            userStore.isLoading = true;
            const newContent = (await requests.getCrawledContents(this.project.id, this.currentContentIndex + 1, 1))[0];
            this.crawledContents = newContent;
            userStore.isLoading = false;
            this.currentContentIndex = this.currentContentIndex + 1;
        } else {
            alert('no more earler contents');
        }
    }

    async getNextContents() {
        if (this.currentContentIndex > 0) {
            userStore.isLoading = true;
            this.crawledContents = (await requests.getCrawledContents(this.project.id, this.currentContentIndex - 1, 1))[0];
            userStore.isLoading = false;
            this.currentContentIndex = this.currentContentIndex - 1;
        } else {
            alert('no more new contents');
        }
    }

    render() {
        if(!this.crawledContents.contents) return <div></div>;

        return <div className={`tile is-vertical is-parent is-${12/this.props.columnCount}`}>
            <div className="tile is-child card" style={{paddingBottom:'1.5rem'}} >
                <table className="table is-fullwidth is-narrow" style={{margin:'0'}}>
                    <thead style={{backgroundColor: this.project.color}}>
                        <tr>
                            <th>
                                <StarBtn project={this.project}/>
                                &nbsp;&nbsp;
                                <Link to={`/project/${this.project.id}`} style={{color: '#363636'}}>{this.project.name}</Link>

                                <a style={{float:"right", marginLeft:'10px'}} onClick={() => this.getNextContents()}>
                                    <i className="fas fa-chevron-right"/>
                                </a>

                                <a style={{float:"right"}} onClick={() => this.getLastContents()}>
                                    <span className="icon is-small"><i className="fas fa-chevron-left"/></span>
                                </a>
                            </th>
                        </tr>
                    </thead>
                    <ContentsTbody
                        contents={this.crawledContents.contents}
                        contentGroups={this.crawledContents.contentGroups}
                    />
                </table>

                <p className="help is-right" style={{position:'absolute',right:'3px',bottom:'0'}}>
                    Fetched from
                    &nbsp;
                    <a href={this.project.url}>
                        {/**TODO: reform long url */
                            this.project.url
                        }
                    </a>
                    &nbsp;
                    {timeago().format(this.crawledContents.createdAt)}
                </p>
            </div>
        </div>
    }
}

export default ProjectCard;
