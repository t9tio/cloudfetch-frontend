import React from 'react';
import ProjectCard from './projectCard';


// columnCount should devide 12
const ProjectList = ({projects, columnCount}) => {
    // filter project with no content away
    projects = projects.filter(project => project.latestContent);

    // TODO: 瀑布布局? or 对其 card?
    const list = [];
    for (let i = 0; i < projects.length; i += columnCount) {
        const row = (
            <div className="tile is-ancestor" key={i}>
                {
                    projects.slice(i, i + columnCount)
                        .map((project) => 
                            <ProjectCard project={project} columnCount={columnCount} key={project.id}/>
                        )
                }
            </div>
        );
        list.push(row);
    }

    return list;
};

export default ProjectList;
