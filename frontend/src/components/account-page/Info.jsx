import React from 'react';
import styled from 'styled-components';
import {MainWrapper} from "../styled/wrappers";
import map from '../../assets/images/bg/map.jpg';

const Info = () => (
    <Section>
        <MainWrapper>
            <Row>
                <Name>Company name</Name>

                <Value>PerformanceLab</Value>
            </Row>

            <Row>
                <Name>Date of Creation</Name>

                <Value>20.01.2018</Value>
            </Row>

            <Row>
                <Name>City</Name>

                <Value>Moscow</Value>
            </Row>

            <Row>
                <Name>Adress</Name>

                <Value>
                    Moscow, st. People's Militia, 9
                    <br/>
                    Moscow, st. Old Arbat d.27
                </Value>
            </Row>

            <Map src={map}/>
        </MainWrapper>
    </Section>
);

const Map = styled.img`
  width: 100%;
  margin-top: 55px;
`;

const Section = styled.section`
  padding: 55px 0 50px;
`;

const Row = styled.div`
  display: flex;
  padding-top: 30px;
  &:first-child {
    padding-top: 0;
  }
`;

const Name = styled.div`
    font-style: normal;
    font-weight: normal;
    line-height: normal;
    font-size: 16px;
    color: #828282;
    width: 200px;
`;

const Value = styled.div`
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    font-size: 18px;
    color: #4F4F4F;
`;

export default Info;
