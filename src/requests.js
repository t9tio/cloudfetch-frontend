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
                subscribeCount
                isSubscribed
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

const getProjects = async (type) => {
    const offset = 0;
    const limit = 30;
    const query = `query ($type: ProjectQueryType!, $offset: Int!, $limit: Int!){
        projects(type: $type, offset: $offset, limit: $limit){
            id
            name
            description
            star
            isStarred
            subscribeCount
            isSubscribed
            createdAt
            createdBy {
                id
                username
            }
        }
    }`;
    const variables = {
        type, offset, limit,
    }
    const data = await client.request(query, variables);
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
            subscribeCount
            isSubscribed
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
            subscribeCount
            isSubscribed
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

const subscribe = async (projectId) => {
    const query = `mutation ($projectId: Int!) {
        subscribe(projectId: $projectId)
    }`;
    const variables = {
        projectId,
    };

    await client.request(query, variables);
}

const unsubscribe = async (projectId) => {
    const query = `mutation ($projectId: Int!) {
        unsubscribe(projectId: $projectId)
    }`;
    const variables = {
        projectId,
    };

    await client.request(query, variables);
};

// TODO
const userSubscribedProjects = async (userId) => {
    const query = `query ($userId: Int!) {
        userSubscribedProjects(userId: $userId) {
            id
            name
            description
            star
            isStarred
            subscribeCount
            isSubscribed
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
    console.log(data.userSubscribedProjects, 'data');
    return data.userSubscribedProjects;
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

const getFullHtml = async (url) => {
    const data = await client.request(`query ($url: String!) {
        fullHtml(url: $url)
    }`, {
        url,
    });

    return data.fullHtml;
};

const addProject = async (name, description) => {
    const data = await client.request(`mutation ($name: String!, $description: String!) {
        addProject(name: $name, description: $description) {
            id
        }
    }`, {
        name, description,
    });

    return data;
};

const addCrawler = async (projectId, name, url, cron, timezone) => {
    const data = await client.request(`mutation ($projectId: Int!, $name: String!, $url: String!, $cron: String!, $timezone: String!) {
        addCrawler(projectId: $projectId, name: $name, url: $url, cron: $cron, timezone: $timezone) {
            id
        }
    }`, {
        projectId, name, url, cron, timezone,
    });
    return data;
};

const addRecord = async (projectId, crawlerId, name, xpath) => {
    await client.request(`mutation ($projectId: Int!, $crawlerId: Int!, $name: String!, $xpath: String!) {
        addRecord(projectId: $projectId, crawlerId: $crawlerId, name: $name, xpath: $xpath) {
            id
        }
    }`, {
        projectId, crawlerId, name, xpath,
    })
};

const startCrawl = async (projectId, crawlerId) => {
    await client.request(`mutation ($projectId: Int! ,$crawlerId: Int!) {
        startCrawl(projectId: $projectId, crawlerId: $crawlerId)
    }`, {
        projectId, crawlerId,
    });
};

const pauseCrawl = async (projectId, crawlerId) => {
    await client.request(`mutation ($projectId: Int! ,$crawlerId: Int!) {
        pauseCrawl(projectId: $projectId, crawlerId: $crawlerId)
    }`, {
        projectId, crawlerId,
    });
};

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
    userSubscribedProjects,
    projectStargazers,
    subscribe,
    unsubscribe,
    getCrawledContents,
    getFullHtml,
    addProject,
    addCrawler,
    addRecord,
    startCrawl,
    pauseCrawl,
};
