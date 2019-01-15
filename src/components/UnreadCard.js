import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import timeago from 'timeago.js';
import userStore from '../stores/userStore';
import requests from '../requests';
import ContentsTbody from './ContentsTbody';


// columnCount should devide 12
@observer
class UnreadCard extends Component {

    async removeUnreadContents(id) {
        await requests.removeUnreadContents(id);
        await userStore.getMe();
    }

    render() {
        const {unreadContent, columnCount} = this.props;

        return <div className={`tile is-vertical is-parent is-${12/columnCount}`}>
            <div className="tile is-child card" style={{paddingBottom:'1.5rem'}}>
                <table className="table is-fullwidth is-narrow" style={{margin:'0',border:'0'}}>
                    <thead style={{backgroundColor:`${unreadContent.color}`}}>
                        <tr>
                            <th>
                                <Link to={`/project/${unreadContent.projectId}`} style={{color: '#363636'}}>{unreadContent.projectName}</Link>
    
                                <a
                                    style={{float:"right"}}
                                    onClick={()=>this.removeUnreadContents(unreadContent.id)}
                                >
                                    <i className="fas fa-check"/>
                                </a>
                            </th>
                        </tr>
                    </thead>
                    <ContentsTbody
                        contents={unreadContent.contents}
                        contentGroups={unreadContent.contentGroups}
                    />
                </table>
    
                <p className="help is-right" style={{position:'absolute',right:'3px',bottom:'0'}}>
                        Fetched from
                        &nbsp;
                    <a href={unreadContent.url}>
                        {/**TODO: reform long url */
                            unreadContent.url
                        }
                    </a>
                        &nbsp;
                    {timeago().format(unreadContent.createdAt)}
                </p>
            </div>
        </div>
    }
}

export default UnreadCard;
