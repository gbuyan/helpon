import React, {Fragment} from 'react';
import Header from "../components/account-page/Header";
import Banner from "../components/account-page/Banner";
import Donate from "../components/account-page/Donate";
import Request from "../components/account-page/Request";
import Info from "../components/account-page/Info";
import NavBar from "../components/account-page/NavBar";
import {Redirect, Route, Switch} from "react-router-dom";

const Account = () => (
    <Fragment>
        <Header/>

        <Banner/>

        <NavBar/>

        <Switch>
            <Route path='/account/donate' component={Donate}/>

            <Route path='/account/info' component={Info}/>

            <Route path='/account/request' component={Request}/>

            <Redirect from='/account' to='/account/request'/>
        </Switch>
    </Fragment>
);

export default Account;
