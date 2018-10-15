import React from 'react';
import styled from 'styled-components';
import banner from '../../assets/images/bg/account.jpg';

const Banner = () => (
    <StyledBanner>
        Personal Area
    </StyledBanner>
);

const StyledBanner = styled.div`
    background: url(${banner}) center center no-repeat;
    background-size: cover;
    text-align: center;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    font-size: 30px;
    text-transform: uppercase;
    color: #FFFFFF;
    padding: 100px 0;
`;

export default Banner;
