import React, {Component} from 'react';
import {connect} from "react-redux";
import validator from 'validator';
import styled, {css} from 'styled-components';
import bg from '../assets/images/bg/reg.jpg';
import {Title} from "../components/styled/titles";
import {FileInput, Input} from "../components/styled/inputs";
import {Button} from "../components/styled/buttons";
import {ReactComponent as Icon} from '../assets/images/icons/file.svg';
import {registrationRequest} from "../redux/actions/client";
import {getIsLoading} from "../redux/reducers/registration";
import Loader from "../components/common/Loader";

const connector = connect(
    state => ({
        isLoading: getIsLoading(state)
    }),
    {registrationRequest}
);

class Authorize extends Component {
    state = {
        role: 'giver',
        fullName: '',
        city: '',
        file: null,
        errors: {}
    };

    render() {
        const {isLoading} = this.props;
        const {role, fullName, city, file, errors} = this.state;
        return (
            <Wrapper>
                <Background/>

                <Plate>
                    <Title>Register</Title>

                    <Switcher>
                        <Role
                            onClick={() => this.setState({role: 'giver'})}
                            active={role === 'giver'}
                        >
                            Giver
                        </Role>

                        <Role
                            onClick={() => this.setState({role: 'getter'})}
                            active={role === 'getter'}
                        >
                            Getter
                        </Role>

                        <Role
                            onClick={() => this.setState({role: 'organization'})}
                            active={role === 'organization'}
                        >
                            Partner
                        </Role>
                    </Switcher>

                    <Form onSubmit={this.submitHandler}>
                        <Label>
                            <Input
                                placeholder='Full name'
                                value={fullName}
                                onChange={({target: {name, value}}) => this.changeHandler('fullName', value)}
                            />

                            <Error>{errors.fullName}</Error>
                        </Label>

                        <Label>
                            <Input
                                placeholder='City'
                                name='city'
                                value={city}
                                onChange={({target: {name, value}}) => this.changeHandler(name, value)}
                            />

                            <Error>{errors.city}</Error>
                        </Label>

                        {
                            role === 'organization' &&
                            <FileLabel>
                                <FileInput>
                                    {file ? file.name : 'Attach a document'}

                                    <Icon/>

                                    <input
                                        type='file'
                                        accept="application/pdf"
                                        name='file'
                                        onChange={({target: {name, files}}) => this.changeHandler(name, files[0])}
                                    />
                                </FileInput>

                                <Error>{errors.file}</Error>
                            </FileLabel>
                        }

                        <Button>Register</Button>
                    </Form>

                    {isLoading && <Loader/>}
                </Plate>
            </Wrapper>
        );
    }

    validation = () => {
        const {fullName, city, role, file} = this.state;
        const errors = {};

        if (validator.isEmpty(fullName)) errors.fullName = 'Required field';

        if (validator.isEmpty(city)) errors.city = 'Required field';

        if (role === 'organization' && file === null) errors.file = 'Required field';

        return errors
    };

    changeHandler = (name, value) => this.setState({[name]: value});

    submitHandler = event => {
        const {registrationRequest} = this.props;

        event.preventDefault();

        const {role, fullName, city} = this.state;
        const errors = this.validation();

        this.setState({errors});

        if (Object.keys(errors).length === 0) registrationRequest({
            role: `ROLE_${role.toUpperCase()}`,
            fullName,
            address: city
        });
    }
}

const Label = styled.label`
  position: relative;
  padding-top: 20px;
  ${Input} {
    width: 100%;
  }
  &:first-child {
    padding-top: 0;
  }
`;

const FileLabel = styled.div`
  position: relative;
  display: flex;
  margin-top: 20px;
  ${FileInput} {
    width: 100%;
  }
`;

const Error = styled.p`
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  color: red;
`;

const Switcher = styled.div`
   display: flex;
   justify-content: center;
   margin-top: 30px;
`;

const Role = styled.p`
    cursor: pointer;
    position: relative;
    font-weight: 500;
    line-height: normal;
    font-size: 14px;
    color: #4F4F4F;
    margin-left: 50px;
    ${({active}) => active && css`
      &:after {
        content: '';
        position: absolute;
        bottom: -10px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        width: 70px;
        height: 3px;
        background: #72A2D6;
        border-radius: 2px;
      }
    `}
    &:first-child {
      margin-left: 0;
    }
`;

const Wrapper = styled.div`
    position: relative;
    height: 100%;
`;

const Background = styled.div`
    height: 100%;
    background: url(${bg}) center center no-repeat;
    background-size: cover;
`;

const Plate = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 650px;
    border-radius: 10px;
    background: #FFFFFF;
    padding: 60px 82px 68px;
    opacity: 0.9;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  ${Button} {
    margin-top: 20px;
  }
`;

export default connector(Authorize);
