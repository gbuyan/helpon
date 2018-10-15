import React, {Fragment} from 'react';
import Header from "../components/account-page/Header";
import Banner from "../components/account-page/Banner";
import NewRequest from "../components/account-page/NewRequest";

const Account = () => (
    <Fragment>
        <Header/>

        <Banner/>

        <NewRequest/>
    </Fragment>
);

export default Account;
