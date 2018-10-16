import React from 'react';
import styled from 'styled-components';
import {MainWrapper} from "../styled/wrappers";
import qr from '../../assets/images/icons/qr.jpg';
import {getStatusColor} from "../../helpers";
import {connect} from "react-redux";
import {getRequestData} from "../../redux/reducers/requests";

const connector = connect(
    state => ({
        data: getRequestData(state)
    }),
    {}
);

const AllRequests = ({data}) => (
    <Section>
        <MainWrapper>
            {
                Boolean(Object.keys(data).length) && data.map(({id, requestType, description, status, amount}) =>
                    <Plate key={id} color={getStatusColor(status)}>
                        <Right>
                            <Title>Приют для животных Добрые руки</Title>

                            <Description>{description}</Description>
                        </Right>

                        <Left>
                            <Row>
                                <Name>Date:</Name>

                                <Value>16.10.2018</Value>
                            </Row>

                            <Row>
                                <Name>Amout:</Name>

                                <Value>{amount}</Value>
                            </Row>

                            <Row>
                                <Name>City:</Name>

                                <Value>Moscow</Value>
                            </Row>

                            <Row>
                                <Name>Category:</Name>

                                <Value>{requestType}</Value>
                            </Row>

                            <Row>
                                <Name>Status:</Name>

                                <Value style={{color: getStatusColor(status)}}>{status}</Value>
                            </Row>

                            <Row>
                                <Name>QR:</Name>

                                <Value>
                                    <img src={qr} alt='pic'/>
                                </Value>
                            </Row>
                        </Left>
                    </Plate>)
            }
        </MainWrapper>
    </Section>
);

const Row = styled.div`
  display: flex;
`;

const Name = styled.div`
    width: 150px;
    font-style: normal;
    font-weight: normal;
    line-height: normal;
    font-size: 14px;
    color: #828282;
`;

const Value = styled.div`
  min-width: 150px;
`;

const Section = styled.section`
  padding: 50px 0;
`;

const Plate = styled.div`
    position: relative;
    display: flex;
    background: #FFFFFF;
    box-shadow: 0 0 10px rgba(97, 138, 183, 0.25);
    border-radius: 5px;
    height: 260px;
    margin-top: 30px;
    &:first-child {
      margin-top: 0;
    }
    &:before {
      content: '';
      position: absolute;
      top: 35px;
      left: 0;
      display: block;
      height: 70px;
      width: 5px;
      background: ${({color}) => color};
      border-radius: 5px;
    }
`;

const Right = styled.div`
    padding: 35px 40px 0 60px;
    flex: 1 1 auto;
`;

const Title = styled.h2`
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    font-size: 24px;
    color: #72A2D6;
`;

const Description = styled.p`
    font-style: normal;
    font-weight: normal;
    line-height: 18px;
    font-size: 14px;
    color: #4F4F4F;
    padding-top: 16px;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #F6F6F6;
  padding: 36px 25px 31px 36px;
    flex: 0 1 auto;
`;

export default connector(AllRequests);
