import styled from 'styled-components';

export const Container = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Input = styled.input`
    width: 100%;
    padding: 1rem 1.2rem;
    border: 1px solid #dadce0;
    border-radius: 4px;
    outline-color: transparent;

    &:focus {
        border: 2px solid #1ca34d;
    }

    &:not(:placeholder-shown) + span,
    &:focus + span {
        transform: translatex(10px) translateY(-25px);
        color: #1ca34d;
        font-size: 0.75rem;
        font-weight: 600;
        padding: 0 6px;
        background-color: #fff;
    }

    &:not(:focus) + span {
        color: #808080;
    }
`;

export const Label = styled.span`
    position: absolute;
    left: 0;
    padding-left: 1rem;
    font-size: 1rem;
    color: #7f8fa6;
    pointer-events: none;
    transition: 0.6s;
`;
