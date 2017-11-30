import React from 'react';
import styled from 'styled-components'
import { borderRadius, boxShadow } from '../../stylesheets/style.utils.js';
import TextField from 'material-ui/TextField';

const ProfileContainer = styled.div`
  background: white;
  width: 500px;
  height: 500px;
  padding: 20px;
  ${boxShadow("1px", "1px", "10px", "0", "rgba(0, 0, 0, 0.36)")};
  ${borderRadius("5px")};
`;

const Edit = styled.span`
  margin-left: 10px;
`;

export default class Profile extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
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

        <div className="flex-row justify-end full-width"><i className="fa fa-pencil" aria-hidden="true"></i> <Edit>Edit</Edit></div>

        <TextField
            style={{width: "200px"}}
            id="name"
            label="Company Name"
            value={this.state.name}
            onChange={this.handleChange('name')}
            margin="normal"
        />

        <TextField
            style={{width: "200px"}}
            id="name"
            label="Full Name"
            value={this.state.fullName}
            onChange={this.handleChange('name')}
            margin="normal"
        />

        <TextField
            style={{width: "200px"}}
            id="name"
            label="Email Address"
            value={this.state.email}
            onChange={this.handleChange('name')}
            margin="normal"
        />

        <TextField
            style={{width: "200px"}}
            id="name"
            label="Country"
            value={this.state.country}
            onChange={this.handleChange('name')}
            margin="normal"
        />

        <TextField
            style={{width: "200px"}}
            id="name"
            label="Billing Address"
            value={this.state.billingAddress}
            onChange={this.handleChange('name')}
            margin="normal"
        />

        <TextField
            style={{width: "200px"}}
            id="name"
            label="Delivery Address"
            value={this.state.deliveryAddress}
            onChange={this.handleChange('name')}
            margin="normal"
        />

        <span>RESET PASSWORD</span>

      </ProfileContainer>
    )
  }
}
