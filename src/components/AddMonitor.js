import React, {Component} from 'react';
import { observer } from 'mobx-react';
import requests from '../requests';
import { withRouter } from "react-router-dom";
import userStore from "../stores/userStore";

@observer class AddMonitor extends Component{

    async createProject() {
        const name = document.querySelector('#projectName').value;
        const description = document.querySelector('#projectDescription').value;
        userStore.isLoading = true;
        const data = await requests.addProject(name, description);
        userStore.isLoading = false;
        const { id } = data.addProject;
        // Ref: https://stackoverflow.com/a/34735738/4674834
        this.props.history.push(`project/${id}`);
    }

    render() {
        return (
            <div>
                <section className="section container"> 
                    <div className="container" style={{width:'80%'}}>
                        <h2 className="is-size-4 has-text-weight-semibold">Create a new project</h2>
                        <p className="is-size-6">A project can contain one or more fetchers</p>
                        <hr/>

                        <div className="field">
                            <label className="label">Project name</label>
                            <div className="control">
                                <input id="projectName" style={{width:'13rem'}} className="input" type="text"/>
                            </div>
                            <p className="help">Great repository names are short and memorable.</p>
                        </div>

                        <div className="field">
                            <label className="label">Description <small style={{color:"#888"}}>(optional)</small></label>
                            <div className="control">
                                <input id="projectDescription" className="input" type="text" />
                            </div>
                        </div>
                        <hr/>
                        <button className="button is-success" onClick={() => this.createProject()}>Create project</button>&nbsp;
                    </div>
                </section>
            </div>
        );
    }
}

export default withRouter(AddMonitor);
