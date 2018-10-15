import React from 'react';
import styled from 'styled-components';
import {MainWrapper} from "../styled/wrappers";
import {Button} from "../styled/buttons";

const Donate = () => (
    <Section>
        <MainWrapper>
            <Plate>
                <Title>Приют для животных Добрые руки</Title>

                <Info>
                    <Row>
                        <Name>Date:</Name>

                        <Value>20.01.1992</Value>
                    </Row>


                    <Row>
                        <Name>Category:</Name>

                        <Value>MEDC</Value>
                    </Row>


                    <Row>
                        <Name>Сollected:</Name>

                        <Value>12552/244444</Value>
                    </Row>
                </Info>

                <Description>
                    Приют для животных Добрые руки нуждается в финансовой помощи для закупки кормов, Сена в вольеры,
                    ремонт здания для гладкошерстных хвостиков(в том числе отопление). Так же у нас не хватает денег для
                    оплаты зарплаты сотрудникам приюта.. помогите пожалуйста... вот номер счета. Каждая копеечка нам
                    важна! Мы не просим жертвовать тысячи.. 10,20,50 рублей..
                </Description>

                <Button>Donate</Button>
            </Plate>
        </MainWrapper>
    </Section>
);

const Title = styled.div`
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    font-size: 24px;
    color: #72A2D6;
`;

const Row = styled.div`
  display: flex;
  margin-left: 100px;
  &:first-child {
    margin-left: 0;
  }
`;

const Name = styled.div`
    font-weight: normal;
    line-height: normal;
    font-size: 14px;
    color: #828282;
`;

const Value = styled.div`
    margin-left: 16px;
    font-weight: 500;
    line-height: normal;
    font-size: 14px;
    color: #828282;
`;

const Info = styled.div`
  display: flex;
  padding-top: 23px;
`;

const Description = styled.div`
    padding-top: 38px;
    font-style: normal;
    font-weight: normal;
    line-height: 18px;
    font-size: 14px;
    color: #4F4F4F;
`;

const Section = styled.section`
  padding: 33px 0 83px;
  ${Button} {
    border-radius: 5px;
    margin-top: 26px;
    min-width: 200px;
  }
`;

const Plate = styled.div`
    background: #FFFFFF;
    box-shadow: 0 0 10px rgba(97, 138, 183, 0.25);
    border-radius: 5px;
    padding: 25px 29px 29px 82px;
`;

export default Donate;
