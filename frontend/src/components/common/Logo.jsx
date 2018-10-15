import React from 'react';
import {Link} from "react-router-dom";
import {ReactComponent as Icon} from '../../assets/images/icons/logo.svg';
import styled from "styled-components";

function Logo() {
    return (
        <Link to='/'>
            <MainLogo/>
        </Link>
    );
}

const MainLogo = styled(Icon)`
  fill: #4f4f4f;
`;

export default Logo;
