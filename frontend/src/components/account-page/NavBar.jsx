import React from 'react';
import styled from 'styled-components';
import {MainWrapper} from "../styled/wrappers";
import {NavLink} from "react-router-dom";

const NavBar = () => (
    <Section>
        <Wrapper>
            <Link to='/account/donate'>Donate</Link>

            <Link to='/account/info'>Info</Link>

            <Link to='/account/request'>Requests</Link>
        </Wrapper>
    </Section>
);

const Wrapper = styled(MainWrapper)`
  display: flex;
  justify-content: center;
`;

const Section = styled.div`
  border-bottom: 1px solid #E0E0E0;
`;

const Link = styled(NavLink)`
    position: relative;
    display: flex;
    padding: 27px 0 14px;
    font-weight: 500;
    line-height: normal;
    font-size: 14px;
    color: #4F4F4F;
    margin-left: 90px;
    &:first-child {
      margin-left: 0;
    }
    &.active {
      &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 50%);
        background: #72A2D6;
        border-radius: 2px;
        width: 100px;
        height: 4px;
      }
    }
`;

export default NavBar;
