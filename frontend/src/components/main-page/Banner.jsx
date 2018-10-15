import React from 'react';
import styled from 'styled-components';
import bg from '../../assets/images/bg/banner.jpg';
import {MainWrapper} from "../styled/wrappers";
import {Button} from "../styled/buttons";
import {BannerTitle, BannerSubtitle} from "../styled/titles";
import {Link} from "react-router-dom";

const Banner = () => (
    <StyledBanner>
        <MainWrapper>
            <BannerTitle>
                We believe pets are family. They deserve love and affection
            </BannerTitle>

            <BannerSubtitle>
                Pet portal is the structure and foundation that has been missing. It is the ultimate resource for news,
                reviews, registration, directories, listings, and all else necessary for pet and animal owners in one
                place.
            </BannerSubtitle>

            <BannerButton to='/auth'>
                Register
            </BannerButton>
        </MainWrapper>
    </StyledBanner>
);

const BannerButton = Button.withComponent(Link);

const StyledBanner = styled.div`
  padding: 128px 0;
  background: url(${bg}) center center no-repeat;
  background-size: cover;
  ${BannerSubtitle} {
    margin-top: 23px;
    max-width: 640px;
  }
  ${BannerButton} {
    margin-top: 42px;
    display: inline-block;
  }
  ${BannerTitle} {
    max-width: 680px;
  }
`;

export default Banner;
