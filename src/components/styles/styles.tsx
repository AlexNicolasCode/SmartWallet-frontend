import styled from 'styled-components'

export const H1 = styled.h1`
    font-weight: 400;
    text-align: center;
`;

export const DefaultMensage = styled.li`
    padding: 1rem;
    margin: 1rem;
    color: #020202;
    list-style: none;
`;

export const UserMensage = styled.span` 
    padding: 1rem;
    float: right;
    background-color: #020202;
    color: #f2f2f2;

    transform: translate(0%, -50%)
`;

export const Chat = styled.ul`
    height: 400px;
    overflow: auto;

    padding: 1rem;
    background: #f2f2f2;

    margin: 20rem;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
`;

export const Sender = styled.div`
    text-align: center;
    background: #f2f2f2;

    margin: 20rem;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
`;

export const Input = styled.input`
    padding: 0.5rem;
    padding-left: 1rem;
    background: #f2f2f2

    border: none;
    outline: none;
    
    color: #020202;

    &:active {
        border: none;
    }
`;

export const ButtonSend = styled.button`
    padding: 0.5rem;
    border: none;
    background: #020202;
    color: #f2f2f2;
`;

export const OptionsBtn = styled.button`
    display: inline-block;
    margin: 0.5rem;
    padding: 0.5rem;
    background: none;
    border: 0.15rem solid #020202;

    font-weight: 700;
    color: #020202;

    &:hover {
        background: #020202;
        color: #f2f2f2;
    }
`;