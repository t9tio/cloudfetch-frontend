import React, {Component} from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import userStore from '../stores/userStore';
import ProjectCard from './ProjectCard';

// TODO: better UI for different use case; project stargazer page;
@observer
class Project extends Component {

    async componentDidMount() {
        await userStore.getProject(this.props.match.params.id);
    }

    render() {
        const {project} = userStore;
        return (
            <div className="section">
                <div className="container">
                    <p className="subtitle is-5">
                        <Link to={`/member/${project.createdBy.id}`}>{project.createdBy.username}</Link>
                        <span style={{margin: '.2rem'}}>/</span>
                        <strong><a href="">{project.name}</a></strong>
                    </p>
                    <p>{project.description}</p>
                    <br/>
                    <ProjectCard project={project} columnCount={1} key={project.id}/>
                </div>
            </div>
        );
    }
}

export default Project;
