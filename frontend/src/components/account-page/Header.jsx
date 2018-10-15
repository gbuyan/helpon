import React, {Fragment} from 'react';
import styled from "styled-components";
import {MainWrapper} from "../styled/wrappers";
import {ReactComponent as Logo} from '../../assets/images/icons/logo.svg';
import Logout from "./Logout";

const Header = () => (
    <Fragment>
        <Wrapper>
            <Logo/>

            <Logout/>
        </Wrapper>
    </Fragment>
);

const Wrapper = styled(MainWrapper)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
`;

export default Header;
