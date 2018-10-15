import styled from "styled-components";

export const Input = styled.input`
    border: 1px solid #BDBDBD;
    box-sizing: border-box;
    border-radius: 30px;
    padding: 15px 30px;
    font-style: normal;
    font-weight: normal;
    line-height: normal;
    font-size: 14px;
    color: #828282;
    outline: none;
    &:focus {
      border-color: #72A2D6;
    }
`;

export const FileInput = styled.label`
    cursor: pointer;
    position: relative;
    border: 1px solid #BDBDBD;
    box-sizing: border-box;
    border-radius: 30px;
    padding: 15px 30px;
    font-style: normal;
    font-weight: normal;
    line-height: normal;
    font-size: 14px;
    color: #828282;
    outline: none;
    & > input[type="file"] {
      display: none;
    }
    &:hover {
      border-color: #72A2D6;
    }
    & > svg {
      position: absolute;
      top: 50%;
      right: 30px;
      transform: translateY(-50%);
    }
`;