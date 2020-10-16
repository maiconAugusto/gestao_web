import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    padding-top: 20px;
    
    .list {
        border: 1px solid #dfdfdf; 
        margin-top: 2px;
    }
    .fx :hover {
        background-color: #F6F6F6;
    }
`
export const Button = styled.button`
    width: 400px;
    height: 40px;
    margin: 10px 16px 0px 16px;
    border: 1px solid #db3d44; 
    border-radius: 2px;
    background-color: #db3d44;
    color: white;
`