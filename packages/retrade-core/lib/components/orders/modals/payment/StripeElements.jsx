import React from 'react';
import {Components} from 'meteor/vulcan:core'
import {Elements} from 'react-stripe-elements';

import InjectedCheckoutForm from './PaymentForm';

class StripeElements extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Elements>
                <InjectedCheckoutForm user={this.props.user} editUser={this.props.editUser} selected={this.props.selected} closeModal={this.props.closeModal} />
            </Elements>
        );
    }
}

export default StripeElements;