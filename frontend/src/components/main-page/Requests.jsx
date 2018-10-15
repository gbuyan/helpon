import React from 'react';
import styled from 'styled-components';
import {MainWrapper} from "../styled/wrappers";
import {Subtitle, Title} from "../styled/titles";
import arrow from '../../assets/images/icons/arrow.svg';
import bg1 from '../../assets/images/requests/pexels-photo.jpg'
import bg2 from '../../assets/images/requests/pexels-photo-279360.jpg'
import bg3 from '../../assets/images/requests/Rectangle.jpg'

const Requests = () => (
    <RequestSection>
        <MainWrapper>
            <Title>LAST REQUESTS</Title>

            <Subtitle>
                Pooch Hotel offers the best dog daycare with a pool*, complete with a variety of services and modern
                facilities. Each day's agenda includes
            </Subtitle>

            <List>
                <Plate>
                    <PlateTop bg={bg1}>
                        <PlateTitle>
                            Dogs
                            <Arrow src={arrow}/>
                        </PlateTitle>
                    </PlateTop>

                    <PlateBottom>
                        <BottomTitle>The most popular breeds of dogs</BottomTitle>

                        <Text>Not all dog breeds can boast of its popularity. Some give birth only true vowed..</Text>
                    </PlateBottom>
                </Plate>

                <Plate>
                    <PlateTop bg={bg2}>
                        <PlateTitle>
                            Cats
                            <Arrow src={arrow}/>
                        </PlateTitle>

                    </PlateTop>

                    <PlateBottom>
                        <BottomTitle>The most popular breeds of dogs</BottomTitle>

                        <Text>Not all dog breeds can boast of its popularity. Some give birth only true vowed..</Text>
                    </PlateBottom>
                </Plate>

                <Plate>
                    <PlateTop bg={bg3}>
                        <PlateTitle>
                            Other
                            <Arrow src={arrow}/>
                        </PlateTitle>
                    </PlateTop>

                    <PlateBottom>
                        <BottomTitle>The most popular breeds of dogs</BottomTitle>

                        <Text>Not all dog breeds can boast of its popularity. Some give birth only true vowed..</Text>
                    </PlateBottom>
                </Plate>
            </List>
        </MainWrapper>
    </RequestSection>
);

const BottomTitle = styled.h5`
    font-weight: 600;
    line-height: normal;
    font-size: 16px;
    color: #4F4F4F;
`;

const PlateTitle = styled.h4`
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    font-size: 24px;
    color: #FFFFFF;
`;

const Text = styled.p`
    font-weight: 500;
    line-height: normal;
    font-size: 14px;
    color: #828282;
    padding-top: 8px;
`;

const PlateTop = styled.div`
  background: url(${({bg}) => bg}) center center no-repeat;
  background-size: cover;
  padding: 128px 19px 19px;
`;

const Arrow = styled.img`
  margin-left: 15px;
`;

const PlateBottom = styled.div`
  padding: 28px 19px 24px;
`;

const List = styled.ul`
  display: flex;
  padding-top: 50px;
`;

const Plate = styled.li`
  flex: 1;
  margin-left: 24px;
  background: #FFFFFF;
  box-shadow: 0 0 10px rgba(97, 138, 183, 0.5);
  border-radius: 5px;
  &:first-child {
    margin-left: 0;
  }
`;

const RequestSection = styled.section`
  padding: 55px 0 63px;
  ${Subtitle} {
    padding-top: 23px;
    max-width: 550px;
    margin: 0 auto;
  }
`;

export default Requests;
