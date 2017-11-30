import React from 'react';
import styled from 'styled-components'
import {borderRadius, boxShadow} from '../../stylesheets/style.utils.js';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Switch from 'material-ui/Switch';
import Tooltip from 'material-ui/Tooltip';

const ProfileContainer = styled.div`
  background: white;
  width: 500px;
  height: 500px;
  padding: 30px;
   margin: 20px;
  ${boxShadow("1px", "1px", "10px", "0", "rgba(0, 0, 0, 0.36)")};
  ${borderRadius("5px")};
`;


export default class Profile extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            notEditing: true,
            sameAsBilling: false,
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

                <Tooltip id="tooltip-icon" title="This will send you an email" placement="right">
                    <Button raised style={{width: "200px", marginTop: "10px"}}>RESET PASSWORD</Button>
                </Tooltip>

            </ProfileContainer>
        )
    }
}
