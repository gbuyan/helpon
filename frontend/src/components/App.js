import React, {Component, Fragment} from 'react';
import {Route} from "react-router-dom";
import Account from "../pages/Account";
import Authorize from "../pages/Authorize";
import Main from "../pages/Main";

class App extends Component {
    render() {
        return (
            <Fragment>
                <Route path="/account" component={Account}/>

                <Route path="/auth" component={Authorize}/>

                <Route exact path="/" component={Main}/>
            </Fragment>
        );
    }
}

export default App;
