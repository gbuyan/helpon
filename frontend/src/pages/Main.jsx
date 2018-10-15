import React, {Fragment} from 'react';
import Header from "../components/main-page/Header";
import Banner from "../components/main-page/Banner";
import Requests from "../components/main-page/Requests";
import Mails from "../components/main-page/Mails";
import Footer from "../components/main-page/Footer";

const Main = () => (
    <Fragment>
        <Header/>

        <Banner/>

        <Requests/>

        <Mails/>

        <Footer/>
    </Fragment>
);

export default Main;
