import React from 'react';
import {withRouter} from 'react-router';
import {withCurrentUser, withEdit, registerComponent} from 'meteor/vulcan:core'
import {getFragment, apolloClient} from 'meteor/vulcan:lib';
import Users from 'meteor/vulcan:users'
import styled from 'styled-components'
import AlertContainer from 'react-alert'
import {borderRadius, boxShadow, transition} from '../../stylesheets/style.utils.js';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Switch from 'material-ui/Switch';
import Tooltip from 'material-ui/Tooltip';

const ProfileContainer = styled.div`
  background: white;
  width: 500px;
  min-height: 700px;
  padding: 30px;
  margin: 20px;
  ${boxShadow("1px", "1px", "10px", "0", "rgba(0, 0, 0, 0.36)")};
  ${borderRadius("5px")};
  ${transition("all", ".25s")};
`;

const Unverified = styled.span`
    color: orangered
`;


class Profile extends React.Component {

    constructor(props) {
        super(props);


        let user = props.currentUser;


        this.state = {
            checked: user.deliveryAddress === user.billingAddress,
            notEditing: true,
            sameAsBilling: false,
            passwordReset: false,
            user: {
                username: user.username,
                email: user.email,
                fullName: user.fullName,
                country: user.country,
                billingAddress: user.billingAddress,
                deliveryAddress: user.deliveryAddress
            }
        }
    }

    handleChange = name => event => {
        let user = {...this.state.user};
        user[name] = event.target.value;
        this.setState({user});
    };

    changeBilling = (e, checked) => {
        let user = {...this.state.user};
        this.setState({checked: !this.state.checked});
        checked ? user.deliveryAddress = user.billingAddress : user.deliveryAddress = "";
        this.setState({user});
    };

    editUser = () => {
        if (this.state.notEditing) {
            this.setState({notEditing: false})
        } else {
            this.props.editMutation({
                documentId: this.props.currentUser._id,
                set: this.state.user,
                unset: {}
            }).then((res) => console.log(res));
            this.setState({notEditing: true})
        }
    };

    changePassword = () => {
        let oldPassword = document.getElementById('old-pw').value,
            newPassword = document.getElementById('new-pw').value;
        // if (!oldPassword || !newPassword) throw new Error('Old and new password are required');

        this.setState({passwordReset: !this.state.passwordReset});

        Accounts.changePassword(oldPassword, newPassword, (err, res) => {
            if (err) {
                this.msg.error(err.reason, {
                    time: 30000,
                    type: 'error',
                });
            } else {
                this.msg.success("Password changed successfully", {
                    time: 30000,
                    type: 'success',
                });
            }

        });

    };

    componentDidMount(props) {
        if (this.state.billingAddress === this.state.deliveryAddress) this.setState({checked: true});
    }


    render() {
        return (
            <ProfileContainer className="flex-column">
                {/*<AlertContainer ref={a => this.msg = a}/>*/}


                <div className="flex-row justify-space-between align-center full-width">
                    <div className="flex-row">
                        <h3>Account Information</h3>
                    </div>

                    <div>
                        <Button onClick={() => this.editUser()}>

                            {this.state.notEditing ? (
                                <div><i className="fa fa-pencil space-right" aria-hidden="true"></i>Edit</div>
                            ) : (
                                <div><i className="fa fa-check space-right" aria-hidden="true"></i>OK</div>
                            )}
                        </Button>
                    </div>
                </div>

                <TextField
                    style={{width: "200px"}}
                    id="company-name"
                    label="Company Name"
                    value={this.state.user.username}
                    onChange={this.handleChange('username')}
                    margin="normal"
                    disabled={this.state.notEditing}
                />

                <TextField
                    style={{width: "200px"}}
                    id="full-name"
                    label="Full Name"
                    value={this.state.user.fullName}
                    onChange={this.handleChange('fullName')}
                    margin="normal"
                    disabled={this.state.notEditing}
                />

                <TextField
                    style={{width: "200px"}}
                    id="email"
                    label="Email Address"
                    value={this.state.user["email"]}
                    onChange={this.handleChange('email')}
                    margin="normal"
                    disabled={this.state.notEditing}
                />

                <TextField
                    style={{width: "200px"}}
                    id="country"
                    label="Country"
                    value={this.state.user.country}
                    onChange={this.handleChange('country')}
                    margin="normal"
                    disabled={this.state.notEditing}
                />

                <TextField
                    style={{width: "200px"}}
                    id="billing-address"
                    label="Billing Address"
                    value={this.state.user.billingAddress}
                    onChange={this.handleChange('billingAddress')}
                    margin="normal"
                    disabled={this.state.notEditing}
                />

                <div className="flex-row full-width align-end justify-space-between space-top">
                    <TextField
                        style={{width: "200px"}}
                        id="delivery-address"
                        label="Delivery Address"
                        value={this.state.user.deliveryAddress}
                        onChange={this.handleChange('deliveryAddress')}
                        margin="normal"
                        disabled={this.state.notEditing}
                    />

                    <div className="flex-row align-center">
                        <Switch checked={this.state.checked} onChange={this.changeBilling}
                                aria-label="SameAsBillingAddress" disabled={this.state.notEditing}
                        />
                        <span className="space-left">Same as billing</span>
                    </div>

                </div>

                <div className="flex-row justify-space-between full-width" style={{margin: "30px 0"}}>
                    <Unverified>
                        <i className="fa fa-exclamation-circle space-right" aria-hidden="true"></i>
                        Certifications Unverified
                    </Unverified>

                    <Button>Upload</Button>
                </div>

                {!this.state.passwordReset &&
                <Button raised onClick={() => this.setState({passwordReset: !this.state.passwordReset})}
                        style={{width: "200px", marginTop: "10px"}}>CHANGE PASSWORD</Button>}

                {this.state.passwordReset &&
                <div className="flex-column align-end full-width">
                    <div className="flex-row justify-space-between full-width">
                        <TextField
                            id="old-pw"
                            label="Old Password"
                            margin="normal"
                            type="password"
                        />

                        <TextField
                            id="new-pw"
                            label="New Password"
                            margin="normal"
                            type="password"
                        />
                    </div>

                    <Button raised onClick={this.changePassword}
                            style={{width: "200px", marginTop: "10px"}}>OK</Button>

                </div>
                }

            </ProfileContainer>
        )
    }
}


// const UserFragment = getFragment('UsersCurrent');
const mutationOptions = {
    collection: Users,
    fragmentName: 'UsersCurrent'
};


registerComponent('Profile', Profile, withRouter, [withEdit, mutationOptions]);

// export default withEdit(mutationOptions)(withCurrentUser(Profile))
