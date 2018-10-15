import React from 'react';
import styled, {keyframes, css} from 'styled-components';
import loader from '../../assets/images/icons/loading.svg'

const Loader = ({children, size}) => (
    <StyledLoader>
        <LoaderImg
            size={size}
            src={loader}
            alt="loader"
        />

        {children}
    </StyledLoader>
);

Loader.defaultProps = {
    size: 'md'
};

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const StyledLoader = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(4px);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LoaderImg = styled.img`
    ${({size}) => size === 'md' && css`width: 60px`};
    ${({size}) => size === 'sm' && css`width: 30px`};
    height: auto;
    animation: ${rotate} 1s infinite linear;
`;

export default Loader;
