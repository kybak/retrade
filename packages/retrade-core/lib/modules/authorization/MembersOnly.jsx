import React from 'react';
import {withRouter} from 'react-router';
import {registerComponent, withCurrentUser} from 'meteor/vulcan:core';


class MembersOnly extends React.Component {
    constructor(props) {
        super(props);

        if (!props.currentUser) {
            props.router.push('/login');
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

registerComponent('MembersOnly', MembersOnly, withCurrentUser, withRouter);