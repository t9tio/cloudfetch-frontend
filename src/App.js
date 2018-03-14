import './custimizeBulma.scss';
import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';
import { observer } from 'mobx-react';
import userStore from './stores/userStore';

import Home from './components/Home';
import Nav from './components/Nav';
import Explore from './components/Explore';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Project from './components/Project';
import Member from './components/Member';
import AddMonitor from './components/AddMonitor';

@observer
class App extends Component {
    async componentDidMount() {
        if(window.localStorage.getItem("authToken")) {
            await userStore.getMe();
        }
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <Nav/>
                    <Route exact path="/" component={Home}/>
                    <Route path="/signup" component={Signup}/>
                    <Route path="/signin" component={Signin}/>
                    <Route path="/member/:id" component={Member}/>
                    <Route path="/explore" component={Explore}/>
                    <Route path="/project/:id" component={Project}/>
                    <Route path="/addMonitor" component={AddMonitor}/>
                </div>
            </Router>
        );
    }
}

export default App;
