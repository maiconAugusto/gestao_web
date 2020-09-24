import styled from 'styled-components';

export const Container = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    padding-top: 40px;
    input {
        width: 300px;
        height: 34px;
        margin-top: 10px;
        font-size: 14px;
        border: 1px solid #009029; 
        border-radius: 4px;
    }
    select {
        width: 300px;
        height: 34px;
        margin-top: 10px;
        font-size: 14px;
        border: 1px solid #009029; 
        border-radius: 4px;
    }
    textarea {
        border: 1px solid #009029; 
        border-radius: 4px;
        resize: none
    }
    @media (max-width: 1200px) 
    {
    .tag
        {
            margin-left: 100px;
        }
    }
    @media (max-width: 800px) 
    {
    .none
        {
            display: none
        }
        textarea {
        width: 300px;
    }
    }
`