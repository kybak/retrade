import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import styled from 'styled-components'
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import Header from '../common/layouts/header/Header.jsx'
import SellerOrBuyer from './modals/SellerOrBuyer.jsx'
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


class AccountBuyer extends React.Component {

    constructor(props) {
        super(props);
        /*if(!props.currentUser) {
            props.router.push('/login');
        }*/
        let modalOpen = false;
        if (!props.currentUser.isBuyer && !props.currentUser.isSeller) modalOpen = true;

        this.state = {
            modalOpen: modalOpen
        }
    }

    handleRequestClose = value => {
        this.setState({ modalOpen: false });
    };


    render() {
        return (
            <ComponentContainer>

                <Header/>

                <BannerSmall/>

                <AccountContainer className="flex-column justify-center align-center">
                    <Scroll className="flex-column align-center full-width full-height">
                        <div className="flex-row">
                            <div className="flex-column">
                                <Components.Profile currentUser={this.props.currentUser}/>

                            </div>

                            <div className="flex-column">
                                {/*<Components.PartList user={this.props.currentUser} terms={{limit: 1}} />*/}

                                <Billing/>
                            </div>
                        </div>
                    </Scroll>



                </AccountContainer>

                <Dialog open={this.state.modalOpen}>
                    <Components.SellerOrBuyer user={this.props.currentUser} close={()=> this.setState({modalOpen: false})} />
                </Dialog>

            </ComponentContainer>
        )
    }
}

registerComponent('AccountBuyer', AccountBuyer, withCurrentUser);
export default withCurrentUser(AccountBuyer)