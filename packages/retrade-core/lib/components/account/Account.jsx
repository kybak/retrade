import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import styled from 'styled-components'
import Header from '../common/layouts/header/Header.jsx'
import BannerSmall from '../common/layouts/header/BannerSmall.jsx'
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


class Account extends React.Component {

    constructor(props) {
        super(props);
        /*if(!props.currentUser) {
            props.router.push('/login');
        }*/
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
                                <Components.Profile />

                            </div>

                            <div className="flex-column">
                                <Components.PartList user={this.props.currentUser} terms={{limit: 1}} />

                                <Billing/>
                            </div>
                        </div>
                    </Scroll>



                </AccountContainer>

            </ComponentContainer>
        )
    }
}

registerComponent('Account', Account, withCurrentUser);
export default withCurrentUser(Account)