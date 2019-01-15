import React from "react";
import { observer } from 'mobx-react';
import HomeNewCommer from './HomeNewCommer';

// recent updates

function Home() {
    let HomeEl;
    // if (userStore.me.email) {
    //     HomeEl = <HomeSignedIn location={this.props.location}/>
    // } else {
    HomeEl = <HomeNewCommer location={this.props.location}/>
    // }
    return <div style={{minHeight:'70vh'}}>
        {HomeEl}
    </div>
}

export default observer(Home);
