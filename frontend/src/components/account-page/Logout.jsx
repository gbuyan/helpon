import React from 'react';
import {connect} from "react-redux";
import styled from 'styled-components';
import {logout} from "../../redux/actions/client";

const connector = connect(
    null,
    {logout}
);

const Logout = ({logout}) => (
    <Button onClick={() => logout()}>Logout</Button>
);

const Button = styled.button`
    cursor: pointer;
    font-weight: 500;
    line-height: normal;
    font-size: 14px;
    color: #4F4F4F;
    border: none;
    outline: none;
`;

export default connector(Logout);
