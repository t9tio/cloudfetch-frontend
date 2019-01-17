import { GraphQLClient } from 'graphql-request';
import axios from 'axios';
import { backendUrl, lambdaUrl } from '../config';
import fragments from './fragments';

let client = new GraphQLClient(backendUrl, {
    headers: {
        'x-access-token':  window.localStorage.getItem('authToken') || '',
    },
});

const signout = () => {
    window.localStorage.removeItem('authToken');
};

const signup = async (username, email, password) => {
    // remove token in case there is invald one
    signout();
    const query = `mutation ($username: String!, $email: String!, $password: String!) {
        signup(username: $username, email: $email, password: $password){
            token
            user {
                id
                username
                email
                createdAt
            }
        }
    }`;

    const variables = {
        username,
        email,
        password,
    };

    const data = await client.request(query, variables);
    const token = data.signup.token;
    window.localStorage.setItem('authToken', token);
    client = new GraphQLClient(backendUrl, {
        headers: {
            'x-access-token':  token,
        },
    });

    return data.signup.user;
};

const signin = async (email, password) => {
    // remove token in case there is invald one
    signout();
    const query = `mutation ($email: String!, $password: String!) {
        signin(email: $email, password: $password) {
            token
            user {
                id
                username
                email
                createdAt
            }
        }
    }`;
    const variables = {
        email,
        password,
    };

    const data = await client.request(query, variables);
    const token = data.signin.token;
    window.localStorage.setItem('authToken', token);
    client = new GraphQLClient(backendUrl, {
        headers: {
            'x-access-token':  token,
        },
    });
    return data.signin.user;
};

const getMe = async () => {
    const query = `query {
        me {
            id
            username
            email
            isIntroClosed
            createdAt
            plan
            nextBillDate
            projects {
                id
            }
            starredProjects {
                id
            }
            unreadContents {
                id
                projectId
                projectName
                color
                url
                contents
                contentGroups
                createdAt
            }
        }
    }`;

    let data;
    try {
        data = await client.request(query);
    } catch (error) {
        if (error.response.status === 403) {
            window.localStorage.removeItem('authToken');
        }
    }
    return data.me;
};

const updateMe = async ({username, email, isIntroClosed}) => {
    const query = `
        mutation ($username: String, $email: String, $isIntroClosed: Boolean) {
            updateMe(username: $username, email: $email, isIntroClosed: $isIntroClosed)
        }
    `;
    const variables = {
        username, email, isIntroClosed,
    }
    await client.request(query, variables);
    return 'ok';
}

const getUser = async (userId) => {
    const query = `
        query ($id: Int!) {
            user(id: $id) {
                id
                username
                email
                createdAt
                projects{
                    ...projectInfo
                }
            }
        }
        ${fragments.projectInfo}
    `;

    const variables = {
        id: userId,
    };

    const data = await client.request(query, variables);
    return data.user;
};

const getProjects = async (type) => {
    const offset = 0;
    const limit = 30;
    const query = `
        query ($type: ProjectQueryType!, $offset: Int!, $limit: Int!){
            projects(type: $type, offset: $offset, limit: $limit){
                ...projectInfo
            }
        }
        ${fragments.projectInfo}
    `;
    const variables = {
        type, offset, limit,
    }
    const data = await client.request(query, variables);
    return data.projects;
};

const getProject = async (id) => {
    const query = `
        query ($id: Int!) {
            project(id: $id){
                ...projectInfo
            }
        }
        ${fragments.projectInfo} 
    `;
    const variables = {
        id,
    };

    const data = await client.request(query, variables);
    return data.project;
};

const crawl = async (crawlerId) => {
    const query = `mutation ($crawlerId: Int!) {
        execute(crawlerId: $crawlerId)
    }`;
    const variables = {
        crawlerId,
    };

    const data = await client.request(query, variables);
    return data.execute;
}

const star = async (projectId) => {
    const query = `mutation ($projectId: Int!) {
        star(projectId: $projectId)
    }`;
    const variables = {
        projectId,
    };

    await client.request(query, variables);
}

const unstar = async (projectId) => {
    const query = `mutation ($projectId: Int!) {
        unstar(projectId: $projectId)
    }`;
    const variables = {
        projectId,
    };

    await client.request(query, variables);
}

const userStarredProjects = async (userId) => {
    const query = `
        query ($userId: Int!) {
            userStarredProjects(userId: $userId) {
                ...projectInfo
            }
        }
        ${fragments.projectInfo} 
    `;

    const variables = {
        userId,
    };

    const data = await client.request(query, variables);
    return data.userStarredProjects;
};

const projectStargazers = async (projectId) => {
    const query = `query ($projectId: Int!) {
        projectStargazers(projectId: $projectId){
            id
            username
            email
            createdAt
        }
    }`;
    const variables = {
        projectId,
    };

    const data = await client.request(query, variables);
    return data.projectStargazers;
};

const getCrawledContents = async (projectId, offset, limit) => {
    const query = `query ($projectId: Int!, $offset: Int!, $limit: Int!) {
        crawledContents(projectId: $projectId, offset: $offset, limit: $limit){
            url
            selectors
            contents
            contentGroups
            createdAt
        }
    }`;
    const variables = {
        projectId, offset, limit,
    };

    const data = await client.request(query, variables);
    return data.crawledContents;
};

const removeUnreadContents = async (id) => {
    await client.request(`mutation removeUnreadContents($id: Int!) {
        removeUnreadContents(id: $id)
    }`, {
        id,
    });
}

const getFullHtml = async (url) => {
    const {data} = await axios.get(lambdaUrl + '/fullHtml', {
        params: {
            url,
        },
    })
    return data.html;
};

const addProject = async ({
    name, description, url, selectors, contentGroups, fetchInterval, nextRunAt,
}) => {
    const data = await client.request(`mutation addProject($name: String!, $description: String, $url: String!, $selectors: String!, $contentGroups: String, $fetchInterval: Int, $nextRunAt: String){
        addProject(name: $name, description: $description, url: $url, selectors: $selectors, contentGroups: $contentGroups, fetchInterval: $fetchInterval, nextRunAt: $nextRunAt){
            id
        }
    }`, {
        name, description, url, selectors, contentGroups, fetchInterval, nextRunAt
    });

    return data;
};


export default {
    signup,
    signin,
    signout,
    getMe,
    updateMe,
    getUser,
    getProjects,
    getProject,
    crawl,
    star,
    unstar,
    userStarredProjects,
    projectStargazers,
    getCrawledContents,
    removeUnreadContents,
    getFullHtml,
    addProject,
};
