import React from 'react';
import styled from 'styled-components'
import ComponentContainer from '../../common/layouts/body/ComponentContainer.jsx'
import Header from '../../common/layouts/header/Header.jsx'
import {ButtonPrimary} from '../../common/presentational-components/buttons/ButtonPrimary.js'
import {withDocument, withEdit} from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users'
import {getFragment} from 'meteor/vulcan:lib';
import AlertContainer from 'react-alert'
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Tooltip from 'material-ui/Tooltip';

const ModalContainer = styled.div`
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


class EditUser extends React.Component {

    constructor(props) {
        super(props);


        this.state = {
            profile: {
                fullName: ""
            }
        }
    }


    handleChange = name => event => {
        let user = {...this.state};
        if (name === "username" || name === "email") {
            user[name] = event.target.value;
        } else {
            user.profile[name] = event.target.value;
        }
        this.setState({user});
    };

    componentDidUpdate(nextProps) {
        if (nextProps.document && !this.state.username) {
            const user = !nextProps.document.profile ? {
                ...nextProps.document,
                profile: {fullName: ""}
            } : nextProps.document;
            this.setState(user);
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const user = this.state;
        const set = {
            username: user.username,
            email: user.email,
            profile: {
                fullName: user.profile.fullName,
                country: user.profile.country,
                billingAddress: user.profile.billingAddress,
                deliveryAddress: user.profile.deliveryAddress
            },
        };

        this.props.editMutation({
            documentId: user._id,
            set: set,
            unset: {}
        }).then((res) => {
            if (res) {
                this.msg.success('Update successful!', {
                    time: 30000,
                    type: 'success',
                });

                window.location = "/admin"
            } else {
                this.msg.error('Update failed!', {
                    time: 30000,
                    type: 'error',
                });
            }
        });
    };


    render() {
        const {username} = this.state;

        return (
            <ModalContainer className="flex-column">
                <AlertContainer ref={a => this.msg = a}/>


                <Close onClick={this.props.close}>
                    <i className="fa fa-times" aria-hidden="true"></i>
                </Close>

                <div className="flex-column justify-space-between align-center full-width">
                    <div className="flex-row full-width">
                        <h3>Edit User</h3>
                    </div>

                    <form onSubmit={this.handleSubmit} style={{marginTop: "20px"}}>
                        <div className="flex-column align-center">
                            <TextField
                                style={{width: "300px"}}
                                id="company-name"
                                label="Company Name"
                                value={this.state.username}
                                onChange={this.handleChange('username')}
                                margin="normal"
                            />

                            <TextField
                                style={{width: "300px"}}
                                id="full-name"
                                label="Full Name"
                                value={this.state.profile.fullName}
                                onChange={this.handleChange('fullName')}
                                margin="normal"
                            />

                            <TextField
                                style={{width: "300px"}}
                                id="email"
                                label="Email Address"
                                value={this.state.email}
                                onChange={this.handleChange('email')}
                                margin="normal"
                            />

                            <TextField
                                style={{width: "300px"}}
                                id="country"
                                label="Country"
                                value={this.state.profile.country}
                                onChange={this.handleChange('country')}
                                margin="normal"
                            />

                            <TextField
                                style={{width: "300px"}}
                                id="billing-address"
                                label="Billing Address"
                                value={this.state.profile.billingAddress}
                                onChange={this.handleChange('billingAddress')}
                                margin="normal"
                            />

                            <TextField
                                style={{width: "300px"}}
                                id="delivery-address"
                                label="Delivery Address"
                                value={this.state.profile.deliveryAddress}
                                onChange={this.handleChange('deliveryAddress')}
                                margin="normal"
                            />

                            <ButtonPrimary type="submit" style={{marginTop: "20px"}}>UPDATE</ButtonPrimary>
                        </div>


                    </form>

                </div>


            </ModalContainer>
        )
    }
}

const UserFragment = getFragment('UsersCurrent');
const listOptions = {
    collection: Users,
    queryName: 'singleUserQuery',
    fragment: UserFragment,
};

const mutationOptions = {
    collection: Users,
    fragment: UserFragment
};

const withUser = withDocument(listOptions)(EditUser);

export default withEdit(mutationOptions)(withUser)