import styled from 'styled-components';

interface ButtonProps {
    variant?: 'outline' | 'default';
}

export const StyledButton = styled.button<ButtonProps>`
    border: 2px solid #4caf50;
    background-color: ${(props) =>
        props.variant === 'outline' ? '#FFF' : '#4caf50'};
    color: ${(props) => (props.variant === 'outline' ? '#4caf50' : '#FFF')};
    padding: 10px 24px;
    text-align: center;
    text-decoration: solid;
    display: inline-block;
    font-size: 16px;
    cursor: pointer;
    transition: 0.5s all ease-out;

    &:hover {
        background-color: ${(props) =>
            props.variant === 'outline' ? '#4caf50' : '#FFF'};
        color: ${(props) => (props.variant === 'outline' ? '#FFF' : '#4caf50')};
    }
`;

export const FancyButton = styled(StyledButton)`
    background-image: linear-gradient(to right, #f6d365 0%, #da085 100%);
`;

export const SubmitButton = styled(StyledButton).attrs(() => ({
    type: 'submit',
}))`
    box-shadow: 0 9px #999;

    &:active {
        background-color: ${(props) =>
            props.variant === 'outline' ? '#FFF' : '#4caf50'};
        box-shadow: 0 5px #666;
        transform: translateY(4px);
    }
`;
