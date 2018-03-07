import React from 'react';
import { registerComponent, Components, withCurrentUser } from 'meteor/vulcan:core';
import styled from 'styled-components'
import Header from '../common/layouts/header/Header.jsx'
import BannerSmall from '../common/layouts/header/BannerSmall.jsx'
import ComponentContainer from '../common/layouts/body/ComponentContainer.jsx'


class Orders extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
           query: props.currentUser._id
        }

    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps);
    }


    render() {
        return (
            <ComponentContainer>
                <Header/>

                <BannerSmall/>

                <Components.OrdersTable
                    terms={{query: this.state.query, limit: 3000}}
                />

            </ComponentContainer>
        )
    }
}

registerComponent('Orders', Orders, withCurrentUser);
export default withCurrentUser(Orders);
