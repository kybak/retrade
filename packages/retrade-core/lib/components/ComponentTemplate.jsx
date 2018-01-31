import React from 'react';
import { registerComponent } from 'meteor/vulcan:core';
import styled from 'styled-components'
// import ComponentContainer from '../common/layouts/body/ComponentContainer.jsx'


class ComponentTemplate extends React.Component {

    constructor(props) {
        super(props);

    }


    render() {
        return (
            <ComponentContainer>


            </ComponentContainer>
        )
    }
}

registerComponent('ComponentTemplate', ComponentTemplate);
