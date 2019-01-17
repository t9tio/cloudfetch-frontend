import { observable, action, autorun } from 'mobx';
import requests from '../requests';

class User {
    // set/delete local storage example: https://github.com/modelo/BIM_frontend-api-wrapper/blob/develop/web/stores/AppState.ts

    // the current signedin user
    @observable me = {
        id: '',
        username: '',
        email: '',
        isIntroClosed: false,
        createdAt: '',
        unreadContents: [],
        projects: [],
        starredProjects: [],
        plan: '',
        nextBillDate: '',
    }
    // the user 'me' is viewing
    @observable user = {
        id: '',
        username: '',
        email: '',
        createdAt: '',
        projects: [],
    }

    @observable users = [];  // store project stargazers
    @observable projects = []; // store projects for "user project"/"explore page"/"user starred projects"
    @observable project = {
        id: '',
        name: '',
        description: '',
        color: '',
        star: '',
        isStarred: '',
        latestContent: {
            id:'',
            name:'',
            color:'',
            url:'',
            selectors:'',
            contents:'',
            contentGroups:'',
            createdAt:'',
        },
        url: '',
        contentGroups: [],
        createdAt: '',
        createdBy: {
            id: '',
            username: '',
        },
    };

    @observable isLoading = false;

    @action async signup(username, email, password) {
        try {
            this.me = await requests.signup(username, email, password);
            window.mixpanel.track("signup");
            // Identify a user with a unique ID instead of a Mixpanel randomly generated distinct_id.
            window.mixpanel.identify(this.me.email);
            window.mixpanel.people.set({
                "$email": this.me.email,    // only special properties need the $
                "$name": this.me.username,
                "$created": this.me.createdAt,
                "$last_login": new Date(),         // properties can be dates...
            });
        } catch (error) {
            if (error.message.includes('email taken')) alert('Sorry, the email is taken');
            if (error.message.includes('username taken')) alert('Sorry, the username is taken');
        }
    }
    
    @action async signin(email, password) {
        try {
            this.me = await requests.signin(email, password);
            window.mixpanel.track("signin");
            window.mixpanel.identify(this.me.email);
            window.mixpanel.people.set({
                "$email": this.me.email,    // only special properties need the $
                "$name": this.me.username,
                "$last_login": new Date(),         // properties can be dates...
            });
        } catch (error) {
            if (error.message.includes('user not fond')) alert('User not fond');
            if (error.message.includes('wrong password')) alert('Wrong password');
        }
    }

    @action async signout() {
        requests.signout();
        this.me = {
            id: '',
            username: '',
            email: '',
            createdAt: '',
        };
    }

    @action async getMe() {
        // FIXME: assign key by key?
        const user = await requests.getMe();
        if (user) {
            this.me = user;
        }
    }

    @action async getUser(userId) {
        // FIXME: assign key by key?
        const user = await requests.getUser(userId);
        this.user = user;
    }

    @action async getProjects(type) {
        const projects = await requests.getProjects(type);
        this.projects = projects;
    }

    @action async getProject(id) {
        const project = await requests.getProject(id);
        this.project = project;
    }

    @action async getUserStarredProjects(userId) {
        const projects = await requests.userStarredProjects(userId);
        this.projects = projects;
    }

    @action async getProjectStargazers(projectId) {
        const users = await requests.projectStargazers(projectId);
        this.users = users;
    }

    // FIXME
    @action clearProject() {
        this.project = {
            id: '',
            name: '',
            description: '',
            star: '',
            isStarred: '',
            createdAt: '',
            createdBy: {
                id: '',
                username: '',
            },
            crawlers: [{
                id: '',
                name: '',
                url: '',
                cron: '',
                status: '',
                timezone: '',
                contentCount: '',
                records: [],
            }]
        };
    }
}


const me = new User();

autorun(() => {
    console.dir(me, { depth: null, colors: true });
});

export default me;
