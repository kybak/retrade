import React from 'react';
import {withRouter} from 'react-router';
import {withCurrentUser, withEdit, registerComponent} from 'meteor/vulcan:core'
import Users from 'meteor/vulcan:users'
import styled from 'styled-components'
import {ButtonPrimary} from "../../common/presentational-components/buttons/ButtonPrimary";
import Checkbox from 'material-ui/Checkbox'


const SellerOrBuyerContainer = styled.div`
    min-width: 500px;
    margin: 40px;
    position: relative;
`;

const Close = styled.div`
    cursor: pointer;
    color: #949494;
    position: absolute;
    top: -30px;
    right: -25px;
    
    &:hover {
        color: black;
    }
`;

const Error = styled.span`
    color: orangered;
    margin-top: 7px;
`;


class SellerOrBuyer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isBuyer: false,
            isSeller: false,
            error: false
        }
    }


    handleChange = prop => {
        this.setState({[prop]: !this.state[prop]});
    };

    editUser = () => {
        if (this.state.isSeller && this.state.isBuyer) this.setState({error: true});
        if (!this.state.isSeller && !this.state.isBuyer) this.setState({error: true});

        const set = this.state.isSeller ? "isSeller" : "isBuyer";

        this.props.editMutation({
            documentId: this.props.user._id,
            set: {[set]: true},
            unset: {}
        }).then((res) =>  window.location = '/account');

    };


    render() {
        return (
            <SellerOrBuyerContainer className="flex-column">

                <Close onClick={this.props.close}>
                    <i className="fa fa-times" aria-hidden="true"></i>
                </Close>

                <h2>Are you a seller or buyer?</h2>

                <div className="flex-row align-center justify-space-between">
                    <div className="flex-column" style={{width: "50%"}}>
                        <div className="flex-row align-center">
                            <Checkbox
                                checked={this.state.isBuyer}
                                onChange={() => this.handleChange('isBuyer')}
                            />
                            <span className="space-left">Buyer</span>
                        </div>

                        <div className="flex-row align-center">
                            <Checkbox
                                checked={this.state.isSeller}
                                onChange={() => this.handleChange('isSeller')}
                            />
                            <span className="space-left">Seller</span>
                        </div>
                    </div>

                    <div className="flex-column justify-center">
                        <ButtonPrimary style={{minWidth: "200px"}} onClick={this.editUser}>GO ></ButtonPrimary>

                        {this.state.error &&
                        <Error>Please select only one option</Error>
                        }
                    </div>
                </div>


            </SellerOrBuyerContainer>
        )
    }
}

const mutationOptions = {
    collection: Users,
    fragmentName: 'UsersCurrent'
};

registerComponent('SellerOrBuyer', SellerOrBuyer, withRouter, [withEdit, mutationOptions]);