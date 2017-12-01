import React from 'react';
import styled from 'styled-components'
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


export default class Profile extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            notEditing: true,
            sameAsBilling: false,
            passwordReset: false,
            name: "Norautron",
            fullName: "Ole Martin Boe",
            email: "fakeemail@domain.com",
            country: "Norway",
            billingAddress: "2392 Fake St.",
            deliveryAddress: "2392 Fake St.",
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };


    render() {
        return (
            <ProfileContainer className="flex-column">

                <div className="flex-row justify-space-between align-center full-width">
                    <div className="flex-row">
                        <h3>Account Information</h3>
                    </div>

                    <div>
                        <Button onClick={() => this.setState({notEditing: !this.state.notEditing})}>

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
                    id="name"
                    label="Company Name"
                    value={this.state.name}
                    onChange={this.handleChange('name')}
                    margin="normal"
                    disabled={this.state.notEditing}
                />

                <TextField
                    style={{width: "200px"}}
                    id="name"
                    label="Full Name"
                    value={this.state.fullName}
                    onChange={this.handleChange('name')}
                    margin="normal"
                    disabled={this.state.notEditing}
                />

                <TextField
                    style={{width: "200px"}}
                    id="name"
                    label="Email Address"
                    value={this.state.email}
                    onChange={this.handleChange('name')}
                    margin="normal"
                    disabled={this.state.notEditing}
                />

                <TextField
                    style={{width: "200px"}}
                    id="name"
                    label="Country"
                    value={this.state.country}
                    onChange={this.handleChange('name')}
                    margin="normal"
                    disabled={this.state.notEditing}
                />

                <TextField
                    style={{width: "200px"}}
                    id="name"
                    label="Billing Address"
                    value={this.state.billingAddress}
                    onChange={this.handleChange('name')}
                    margin="normal"
                    disabled={this.state.notEditing}
                />

                <div className="flex-row full-width align-end justify-space-between space-top">
                    <TextField
                        style={{width: "200px"}}
                        id="name"
                        label="Delivery Address"
                        value={this.state.deliveryAddress}
                        onChange={this.handleChange('name')}
                        margin="normal"
                        disabled={this.state.notEditing}
                    />

                    <div className="flex-row align-center">
                        <Switch checked={this.state.sameAsBilling} onChange={this.handleChange("name")}
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

                {!this.state.passwordReset && <Button raised onClick={()=> this.setState({passwordReset: !this.state.passwordReset})} style={{width: "200px", marginTop: "10px"}}>RESET PASSWORD</Button>}

                {this.state.passwordReset &&
                <div className="flex-column align-end full-width">
                    <div className="flex-row justify-space-between full-width">
                        <TextField
                            id="old-pw"
                            label="Old Password"
                            onChange={this.handleChange('oldPassword')}
                            margin="normal"
                            type="password"
                        />

                        <TextField
                            id="new-pw"
                            label="New Password"
                            onChange={this.handleChange('oldPassword')}
                            margin="normal"
                            type="password"
                        />
                    </div>

                    <Button raised onClick={()=> this.setState({passwordReset: !this.state.passwordReset})} style={{width: "200px", marginTop: "10px"}}>OK</Button>

                </div>
                }

            </ProfileContainer>
        )
    }
}
