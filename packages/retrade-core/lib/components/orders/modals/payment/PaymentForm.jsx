// CheckoutForm.js
import React from 'react';
import {registerComponent} from 'meteor/vulcan:core';
import {injectStripe} from 'react-stripe-elements';
import withPayment from '../../../../containers/withPayment'
import CardSection from './CardSection';

class PaymentForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (ev) => {
        ev.preventDefault();
        const {selected, user} = this.props;
        // Within the context of `Elements`, this call to createToken knows which Element to
        // tokenize, since there's only one in this group.

        createTokenandCharge(this.props, selected, user).then(paid => {
            if (paid.findIndex(p => p !== "true") !== -1) {
                this.props.closeModal(true);
            } else {
                this.props.closeModal(false);
            }
        });
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit} style={{width: "100%"}}>
                {/*<AddressSection />*/}
                <CardSection/>
                <button type="submit">Confirm order</button>
            </form>
        );
    }
}

// registerComponent('PaymentForm', injectStripe(PaymentForm), withPayment);
export default withPayment(injectStripe(PaymentForm));


//////////////////////////////////////////////////
//              Payment Functions               //
//////////////////////////////////////////////////

function createToken(context, item, user) {

    return context.stripe.createToken({name: user}).then(({token}) => token)
}

function createCharge(context, token, item, user, seller, qty, amt) {
    return context.pay({
        variables: {
            input: {
                token: token,
                user: user,
                selected: item,
                totalQty: qty,
                totalAmt: amt,
            }
        }
    }).then(res => res)
}

async function createTokenandCharge(context, selected, user) {
    let token, paid = [], amt = 0;
    for (item of selected) {
        //for staging
        if (!item.amt) item.amt = 100;
        /////////////

        amt += parseInt(item.amt);
        token = await createToken(context, item, user._id);
        console.log("item: ", item);
        const result = await createCharge(context, token.id, item, user._id, item.seller, selected.length, amt);
        paid.push(result.data.pay.paid);
    }

    return paid;
}