import React, {Fragment} from 'react';
import styled from 'styled-components';
import {MainWrapper} from "../styled/wrappers";
import Logo from "../common/Logo";

const Header = () => (
    <Fragment>
        <HeaderWrapper>
            <Logo/>

            <Nav>
                <HeaderLink href="/">Pet Care</HeaderLink>

                <HeaderLink href="/">Shop</HeaderLink>

                <HeaderLink href="/">Resources</HeaderLink>
            </Nav>
        </HeaderWrapper>
    </Fragment>
);

const HeaderWrapper = styled(MainWrapper)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: flex-end;
`;

const HeaderLink = styled.a`
    margin-left: 36px;
    font-weight: 500;
    line-height: normal;
    font-size: 14px;
    color: #4F4F4F;
    &:first-child {
      margin-left: 0;
    }
`;

export default Header;
