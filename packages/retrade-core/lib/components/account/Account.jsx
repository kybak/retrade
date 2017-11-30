import React from 'react';
import styled from 'styled-components'
import Header from '../common/layouts/header/Header.jsx'
import Profile from '../account/Profile.jsx'
import PartList from '../account/PartList.jsx'


const AccountContainer = styled.div`
    background: #F5F5F5;
    width: 100%;
    flex-grow: 1;
`;

const Banner = styled.div`
    width:100%;
    height: 75px;
    background: ${props => props.theme.primaryBackground};
    align-items: center;
    z-index: 0;
    padding-top: 15px;
`;


export default class Acccount extends React.Component {

    constructor(props) {
        super(props);

    }


    render() {
        return (
            <div className="flex-column align-center justify-center flex-grow">

                <Header/>

                <Banner/>

                <AccountContainer className="flex-column justify-center align-center">
                    <div className="flex-row">

                        <Profile/>

                        <PartList/>

                    </div>

                </AccountContainer>

            </div>
        )
    }
}
