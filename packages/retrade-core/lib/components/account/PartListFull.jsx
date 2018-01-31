import React from 'react';
import { registerComponent, Components, withCurrentUser } from 'meteor/vulcan:core';
import styled from 'styled-components'
import ComponentContainer from '../common/layouts/body/ComponentContainer.jsx'


class PartListFull extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            query: props.currentUser._id
        }
    }


    render() {
        return (
            <Components.PartListTable
                terms={{query: this.state.query, limit: 3000}}
            />
        )
    }
}

registerComponent('PartListFull', PartListFull, withCurrentUser);
export default withCurrentUser(PartListFull)
