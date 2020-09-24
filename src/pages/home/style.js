import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    height: 500px;
    @media (max-width: 750px) 
    {
    .tag
        {
            margin-left: 50px;
            flex-direction: column;
        }
    }
`
export const Div = styled.div`
    display: flex;
    flex-direction: column;
`