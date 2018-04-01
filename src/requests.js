import { GraphQLClient } from 'graphql-request';
import { backendUrl } from './config';

let client = new GraphQLClient(backendUrl, {
    headers: {
        'x-access-token':  window.localStorage.getItem('authToken') || '',
    },
});

const signup = async (username, email, password) => {
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
    const query = `mutation ($email: String!, $password: String!) {
        signin(email: $email, password: $password){
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

const signout = () => {
    window.localStorage.removeItem('authToken');
};

const getMe = async () => {
    const query = `query {
        me {
            id
            username
            email
            createdAt
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

const getUser = async (userId) => {
    const query = `query ($id: Int!) {
        user(id: $id) {
            id
            username
            email
            createdAt
            projects{
                id
                name
                description
                star
                isStarred
                createdAt
                createdBy {
                    id
                    username
                }
            }
        }
    }`;

    const variables = {
        id: userId,
    };

    const data = await client.request(query, variables);
    return data.user;
};

const getProjects = async () => {
    const query = `query{
        projects(type: TOP, offset: 0, limit: 100){
            id
            name
            description
            star
            isStarred
            createdAt
            createdBy {
                id
                username
            }
        }
      }`;

    const data = await client.request(query);
    return data.projects;
};

const getProject = async (id) => {
    const query = `query ($id: Int!) {
        project(id: $id){
            id
            name
            description
            star
            isStarred
            createdAt
            createdBy {
                id
                username
            }
            crawlers {
                id
                name
                url
                cron
                status
                timezone 
                contentCount
                records {
                    id
                    name
                    xpath
                }
            }
        }
    }`;
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
    const query = `query ($userId: Int!) {
        userStarredProjects(userId: $userId) {
            id
            name
            description
            star
            isStarred
            createdAt
            createdBy {
                id
                username
            }
        }
    }`;

    const variables = {
        userId,
    };

    const data = await client.request(query, variables);
    console.log(data.userStarredProjects, 'aa$');
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

const getCrawledContents = async (crawlerId, offset, limit) => {
    const query = `query ($crawlerId: Int!, $offset: Int!, $limit: Int!) {
        crawledContents(crawlerId: $crawlerId, offset: $offset, limit: $limit){
            contents
            createdAt
        }
    }`;
    const variables = {
        crawlerId, offset, limit,
    };

    const data = await client.request(query, variables);
    return data.crawledContents;
};

// const addProject;
// const addCrawler;
// const addRecord;

export default {
    signup,
    signin,
    signout,
    getMe,
    getUser,
    getProjects,
    getProject,
    crawl,
    star,
    unstar,
    userStarredProjects,
    projectStargazers,
    getCrawledContents,
};
