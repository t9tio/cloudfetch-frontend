// a modal preview created fetcher and do futher editing on the fetcher
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { observable } from "mobx";
import uiStore from '../../stores/uiStore';
import migrate2DArr from '../../utils/migrate2DArr';
import requests from '../../requests';
import {withRouter} from "react-router-dom";

@observer class FetcherPreview extends Component{
    @observable fetcherName = ''; // TODO
    @observable contentGroups = this.props.records.map((_, i)=>[i]); // []
    @observable fetchInterval = 60 * 60 * 24; // in seconds; default: daily
    @observable isLoading = false;

    async closeModal() {
        uiStore.isFetcherPreviewActive = false;
    }

    async updateContentGroups(ii, opration) {
        this.contentGroups = migrate2DArr({
            arr: this.contentGroups,
            ii,
            opration,
        })
    }

    async updateFetchName(value) {
        this.fetcherName = value;
    }

    async updateFetchInterval(value) {
        this.fetchInterval = value
    }

    async createFetcher() {
        this.isLoading = true;
        try {
            if (this.fetcherName) {
                const data = await requests.addProject({
                    name: this.fetcherName,
                    url: this.props.url,
                    selectors: this.props.records.map(record => record.selector).join(','),
                    contentGroups: JSON.stringify(this.contentGroups),
                    fetchInterval: this.fetchInterval,
                    nextRunAt: this.fetchInterval ? new Date(new Date().getTime() + this.fetchInterval * 1000).toISOString() : null,
                });
                const { id } = data.addProject;
                // redirect page, ref: https://stackoverflow.com/a/34735738/4674834
                this.props.history.push(`project/${id}`);
            } else {
                alert('Fetcher name is required');
            }

        } catch (error) {
            // todo
            if (error.message.includes('Can not')) alert('You can not create more fetchers, See pricing page for more info.')
        }

        this.isLoading = false;
    }

    render() {
        const { records } = this.props;

        const Selectors = <div>
            <div className="field">
                <label className="label">Define fetch interval</label>
                <div className="control">
                    <div className="select is-danger">
                        <select id="crawler_interval_select" onChange={() => {
                            const x = document.querySelector('#crawler_interval_select');
                            const interval = x.options[x.selectedIndex].value;

                            switch (interval) {
                            case 'hourly':
                                this.fetchInterval = 60 * 60 * 12;
                                break;
                            case 'daily':
                                this.fetchInterval = 60 * 60 * 24;
                                break;
                            case 'weekly':
                                this.fetchInterval = 60 * 60 * 24 * 7;
                                break;
                            case 'monthly':
                                this.fetchInterval = 60 * 60 * 24 * 30;
                                break;
                            case 'on demond':
                                this.fetchInterval = null;
                                break;
                            default:
                                break;
                            }
                        }}>
                            <option value="daily">every day</option>
                            <option value="weekly">every week</option>
                            <option value="monthly">every month(30 days)</option>
                            <option value="hourly">every 12 hour</option>
                            <option value="on demond">on-demand</option>
                        </select>
                    </div>
                </div>
                <p className="help">How often do you want the fetcher to auto refetch</p>

            </div>
        </div>;

        const ContentTable = <div className="card">
            <table className="table is-fullwidth">
                <thead>
                    <tr>
                        <td>
                            <input className="input is-danger" type="text" placeholder="Fetcher name" value={this.fetcherName} onChange={e => this.updateFetchName(e.target.value)}>
                            </input>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.contentGroups.map((group, i) => {
                            return <tr key={i}><td>
                                {
                                    group.map(index => {
                                        const content = records[index];
                                        if (content) {
                                            if (content.href) {
                                                return <span >
                                                    <a href={content.href}>{content.innerText}</a>
                                                    <a className="icon is-small has-text-success" onClick={() => this.updateContentGroups(index, 'up')}>
                                                        <i className="fas fa-chevron-circle-left"></i>
                                                    </a>
                                                    <a className="icon is-small has-text-success" onClick={() => this.updateContentGroups(index, 'down')}>
                                                        <i className="fas fa-chevron-circle-right"></i>
                                                    </a>
                                                </span>
                                            } else {
                                                return <span >
                                                    {content.innerText} 
                                                    <a className="icon is-small has-text-success" onClick={() => this.updateContentGroups(index, 'up')}><i className="fas fa-chevron-circle-left"></i></a>
                                                    <a className="icon is-small has-text-success" onClick={() => this.updateContentGroups(index, 'down')}><i className="fas fa-chevron-circle-right"></i></a>
                                                </span>
                                            }
                                        }
                                    }).reduce((pre, cur) => {
                                        if (pre.length > 0) {
                                            pre.push(<span>&nbsp;|&nbsp;</span>);
                                        }
                                        pre.push(cur);
                                        return pre;
                                    }, [])
                                }
                            </td></tr>
                        })
                    }
                </tbody>
            </table>
        </div>;

        return <div className={`modal ${uiStore.isFetcherPreviewActive ? 'is-active' : ''}`}>
            <div className="modal-background"></div>
            <button className="modal-close is-large" onClick={this.closeModal}></button>
            <div className="modal-content" >
                <div className="card">
                    <div className="card-content">
                        <h1 className="label"> Arrange Contents</h1>
                        {ContentTable}    
                        {Selectors}
                        &nbsp;
                        <div className="field">
                            <div className="control">
                                <button className={`button is-success ${this.isLoading ? 'is-loading' : ''}`} onClick={() => this.createFetcher()}>
                                    Create
                                </button>
                                &nbsp;
                                <button className="button" onClick={this.closeModal}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }
}

export default withRouter(FetcherPreview);

