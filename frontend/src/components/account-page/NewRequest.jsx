import React, {Component} from 'react';
import styled from 'styled-components';
import {Title} from "../styled/titles";
import {MainWrapper} from "../styled/wrappers";
import {ReactComponent as Icon} from '../../assets/images/icons/file.svg';
import {Button} from "../styled/buttons";

class NewRequest extends Component {
    state = {
        category: 'FOOD',
        amount: 0.00,
        file: null
    };

    render() {
        const {amount, file} = this.state;
        return (
            <Section>
                <MainWrapper>
                    <Title>NEW REQUEST</Title>

                    <Form onSubmit={this.submitHandler}>
                        <Top>
                            <Label>
                                <InputTitle>Choose category</InputTitle>

                                <Select onChange={({target: {value}}) => this.changeHandler('category', value)}>
                                    <option value="FOOD">Food</option>
                                    <option value="MEDS">Medicine</option>
                                    <option value="CLOTHING">Clothing</option>
                                    <option value="HOUSE_HOLD">House hold items</option>
                                    <option value="OTHER">Other</option>
                                </Select>
                            </Label>

                            <Label>
                                <InputTitle>Required amount</InputTitle>

                                <Input
                                    type='number'
                                    value={amount}
                                    onChange={({target: {value}}) => this.changeHandler('amount', value)}
                                />
                            </Label>
                        </Top>

                        <Label>
                            <InputTitle>Justification of the request</InputTitle>

                            <TextArea
                                placeholder='Describe your situation'
                            />
                        </Label>

                        <InputFile>
                            {file ? file.name : 'Attach a document'}

                            <Icon/>

                            <input type="file" onChange={({target: {file}}) => this.changeHandler('file', file[0])}/>
                        </InputFile>

                        <Button>Send</Button>
                    </Form>
                </MainWrapper>
            </Section>
        )
    }

    changeHandler = (name, value) => this.setState({[name]: value});

    submitHandler = event => {
        event.preventDefault();
    }
}

const InputFile = styled.label`
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-top: 20px;
    font-style: normal;
    font-weight: normal;
    line-height: normal;
    font-size: 16px;
    color: #4F4F4F;
    &:hover {
      color: #72A2D6;
    }
    & > input[type="file"] {
      display: none;
    }
    & > svg {
      margin-left: 15px;
    }
`;

const Section = styled.section`
  padding-top: 50px;
`;

const Select = styled.select`
    cursor: pointer;
    width: 100%;
    box-shadow: 0 0 6px rgba(97, 138, 183, 0.5);
    border-radius: 5px;
    border: none;
    background:#fff;
    outline: none;
    height: 47px;
`;

const Form = styled.form`
  padding: 50px 0 0;
  ${Button} {
    border-radius: 5px;
    min-width: 200px;
    margin-top: 28px;
    width: 100%;
  }
`;

const Top = styled.div`
  display: flex;
`;

const Label = styled.label`
    flex: 1;
    margin-left: 22px;
    &:first-child {
      margin-left: 0;
    }
`;

const InputTitle = styled.h3`
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    font-size: 16px;
    color: #4F4F4F;
    padding-bottom: 20px;
`;

const Input = styled.input`
    background: #FFFFFF;
    box-shadow: 0 0 6px rgba(97, 138, 183, 0.5);
    border-radius: 5px;
    border: none;
    outline: none;
    padding: 15px 17px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    font-size: 14px;
    color: #83869C;
    width: 100%;
`;

const TextArea = styled.textarea`
    width: 100%;
    height: 100px;
    border: none;
    outline: none;
    box-shadow: 0 0 6px rgba(97, 138, 183, 0.5);
    border-radius: 5px;
    padding: 15px 17px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    font-size: 14px;
    color: #83869C;
    resize: none;
`;

export default NewRequest;
