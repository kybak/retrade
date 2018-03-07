import React from 'react';
import {registerComponent} from 'meteor/vulcan:core';
import styled from 'styled-components'
import {withRouter} from 'react-router';
import ComponentContainer from '../common/layouts/body/ComponentContainer.jsx'
import {ButtonPrimary} from '../common/presentational-components/buttons/ButtonPrimary'

const MessageContainer = styled.div`
    width: 542px;
    text-align: justify
`;

const Message = styled.p`
    font-size: 28px;
`;

const EyeMessage = styled.p`
    font-size: 28px;
`;

const Icon = styled.div`
    font-size: 100px;
    color: #c0c0c0;
`;

class OrderReceived extends React.Component {

    constructor(props) {
        super(props);

    }


    render() {
        return (
            <ComponentContainer className="align-center justify-center">
                <h1>Your order has been received!</h1>
                <MessageContainer className="flex-column justify-center align-center">
                    <Message>This supplier has been notified. When the supplier confirms the order, we will send you an
                        invoice for your payment. Payment instructions will follow.</Message><br/>
                    <Icon className="fa fa-eye" aria-hidden="true"></Icon>
                    <EyeMessage>Keep an eye out for an email from us!</EyeMessage>

                    <ButtonPrimary onClick={()=>this.props.router.push('/orders')}>VIEW ORDERS</ButtonPrimary>
                </MessageContainer>
            </ComponentContainer>
        )
    }
}

registerComponent('OrderReceived', OrderReceived, withRouter);
export default OrderReceived
