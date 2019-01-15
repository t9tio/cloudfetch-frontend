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
import CreateFetcher from './components/CreateFetcher';
import IsLoading from './components/IsLoading';
import Footer from './components/Footer';
import SignupModal from './components/SignupModal';
import WatchList from './components/WatchList';
import Unread from './components/Unread';
import Pricing from './components/Pricing';
import Thankyou from './components/Thankyou';

@observer
class App extends Component {
    async componentDidMount() {
        if (window.localStorage.getItem("authToken")) {
            // TODO: setInterval to geMe repeatly to get unRead contents?
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
                    <Route path="/unread" component={Unread}/>
                    <Route path="/myWatchList" component={WatchList}/>
                    <Route path="/member/:id" component={Member}/>
                    <Route path="/explore" component={Explore}/>
                    <Route path="/project/:id" component={Project}/>
                    <Route path="/createFetcher" component={CreateFetcher}/>
                    <Route path="/Pricing" component={Pricing}/>
                    <Route path="/thankyou" component={Thankyou}/>
                    <Footer/>
                    <IsLoading isLoading={userStore.isLoading}/>
                    <SignupModal/>
                </div>
            </Router>
        );
    }
}

export default App;
