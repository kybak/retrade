import React from 'react';
import {withRouter} from 'react-router';
import {registerComponent, withCurrentUser} from 'meteor/vulcan:core';


class CheckMembership extends React.Component {
  constructor(props) {
    super(props);
console.log("Check Membership Props: ", props);
    if (!props.currentUser) {
      props.router.push('/login');
    } else if(props.currentUser.isSeller) {
      props.router.push('/account/seller');
    } else {
        props.router.push('/account/buyer');
    }

    // console.log(props);
  }

  render() {
    if (this.props.currentUser) {
      return this.props.children
    } else {
      return null
    }
  }
}

registerComponent('CheckMembership', CheckMembership, withCurrentUser, withRouter);
