import styled from 'styled-components';

export const Container = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding-top: 40px;

    @media (max-width: 700px) 
    {
    .tag
        {
            margin-left: 70px;
        }
        div {
        width: 300px;
    }
    }

    input {
        width: 400px;
        height: 34px;
        margin-top: 10px;
        font-size: 14px;
        border: 1px solid #009029; 
        border-radius: 4px;
        padding-left: 10px;
    }
    li {
        font-size: 14px;
    }
    select {
        border: 1px solid #009029; 
        border-radius: 4px;
    }
    textarea {
        border: 1px solid #009029;
    }
`