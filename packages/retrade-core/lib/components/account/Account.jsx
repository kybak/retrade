import React from 'react';
import styled from 'styled-components'
import Header from '../common/layouts/header/Header.jsx'
import Profile from './Profile.jsx'
import PartList from './PartList.jsx'
import Billing from './Billing.jsx'


const AccountContainer = styled.div`
    background: #F5F5F5;
    width: 100%;
    flex-grow: 1;
    position: relative;
`;

const Banner = styled.div`
    width:100%;
    height: 75px;
    background: ${props => props.theme.primaryBackground};
    align-items: center;
    z-index: 0;
    padding-top: 15px;
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
            <div className="flex-column align-center justify-center flex-grow">

                <Header/>

                <Banner/>

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

            </div>
        )
    }
}
