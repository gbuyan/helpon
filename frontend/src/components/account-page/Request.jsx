import React, {Component, Fragment} from 'react';
import {requestsRequest} from "../../redux/actions/getter";
import styled from 'styled-components';
import {connect} from "react-redux";
import {getRequestLoading} from "../../redux/reducers/requests";
import NewRequest from "./NewRequest";
import AllRequests from "./AllRequests";
import Loader from "../common/Loader";

const connector = connect(
    state => ({
        isLoading: getRequestLoading(state)
    }),
    {requestsRequest}
);

class Request extends Component {
    componentDidMount() {
        this.props.requestsRequest();
    }

    render() {
        const {isLoading} = this.props;

        return (
            <Section>
                {
                    isLoading ?
                        <Loader/>
                        :
                        <Fragment>
                            <NewRequest/>

                            <AllRequests/>
                        </Fragment>
                }
            </Section>
        )
    }
}

const Section = styled.section`
  position: relative;  
  padding-top: 50px;
`;

export default connector(Request);
