import React from 'react'
import theme from './theme.js'
import styled, {ThemeProvider} from 'styled-components'
// import Modal from './Modal.jsx'
// import '../../../stylesheets/global.css'

const Main = styled.div`
   width: 100vw;
   height: 100vh;
   overflow: auto;
`;

const MainLayout = props => {
    return (
        <Main>
            <ThemeProvider theme={theme}>
                {props.children}
            </ThemeProvider>
            {/*<Modal></Modal>*/}
        </Main>

    );
};

export default MainLayout

