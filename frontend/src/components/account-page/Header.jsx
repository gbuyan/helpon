import React, {Fragment} from 'react';
import styled from "styled-components";
import {MainWrapper} from "../styled/wrappers";
import Logo from "../common/Logo";
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
