import React from 'react';
import { Link } from 'react-router-dom';
import StarBtn from './StarBtn';
import SubscribeBtn from './SubscribeBtn';

const ProjectCard = ({project, columnCount}) => {
    const createdBy = project.createdBy;
    return <div className={`tile is-vertical is-parent is-${12/columnCount}`}>
        <div className="tile is-child box">
            <p className="title" style={{fontSize:"1.2rem"}}>
                <Link to={`/project/${project.id}`}>{createdBy ? `${createdBy.username}/` : ''}{project.name}</Link>
            </p>
                
            <div className="content"> {project.description} </div>
            <StarBtn project={project} /> &nbsp;
            <SubscribeBtn project={project}/>
        </div>
    </div>
};

// columnCount should devide 12
const ProjectList = ({projects, columnCount}) => {
    const list = [];
    for (let i = 0; i < projects.length; i += columnCount) {
        const row = (
            <div className="tile is-ancestor" key={i}>
                {projects.slice(i, i + columnCount).map((project, i) => <ProjectCard project={project} columnCount={columnCount} key={i} />)}
            </div>
        );
        list.push(row);
    }
    
    return list;
};

export default ProjectList;