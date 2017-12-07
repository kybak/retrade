import styled from 'styled-components'

const Banner = styled.div`
    width:100%;
    height: 75px;
    background: ${props => props.theme.primaryBackground};
    align-items: center;
    z-index: 0;
    padding-top: 15px;
`;

export default Banner