import React from 'react';
import styled from 'styled-components'
import Header from '../common/layouts/header/Header.jsx'
import BannerSmall from '../common/layouts/header/BannerSmall.jsx'
import Profile from './Profile.jsx'
import PartList from './PartList.jsx'
import Billing from './Billing.jsx'
import ComponentContainer from '../common/layouts/body/ComponentContainer.jsx'



const AccountContainer = styled.div`
    background: ${props => props.theme.secondaryBackground};
    width: 100%;
    flex-grow: 1;
    position: relative;
    overflow: auto;
`;


const Scroll = styled.div`
    position: absolute;
    top:10px;
    background: #F5F5F5;

`;


export default class Acccount extends React.Component {

    constructor(props) {
        super(props);

    }


    render() {
        return (
            <ComponentContainer>

                <Header/>

                <BannerSmall/>

                <AccountContainer className="flex-column justify-center align-center">
                    <Scroll className="flex-column align-center full-width full-height">
                        <div className="flex-row">
                            <div className="flex-column">
                                <Profile/>

                            </div>

                            <div className="flex-column">
                                <PartList/>

                                <Billing/>
                            </div>
                        </div>
                    </Scroll>



                </AccountContainer>

            </ComponentContainer>
        )
    }
}
