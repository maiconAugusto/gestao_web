import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    padding-top: 40px;
    height: 500px;
`
export const ContainerForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 300px;
    width: 400px;
    border-radius: 4px;

    input {
        height: 35px;
        margin: 8px 16px 0px 16px;
        border: 1px solid #db3d44; 
        border-radius: 2px;
        padding-left: 10px;
        font-size: 14px;
    }

    button {
        height: 40px;
        margin: 10px 16px 0px 16px;
        border: 1px solid #db3d44; 
        border-radius: 2px;
        background-color: #db3d44;
        color: white;
        
        
    }
    button:hover {
        background-color: #CA3B41;
    }
`