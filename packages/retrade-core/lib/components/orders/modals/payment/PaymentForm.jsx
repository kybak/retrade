// CheckoutForm.js
import React from 'react';
import {registerComponent} from 'meteor/vulcan:core';
import {injectStripe} from 'react-stripe-elements';
import withPayment from '../../../../containers/withPayment'
import CardSection from './CardSection';
import {ButtonPrimary} from "../../../common/presentational-components/buttons/ButtonPrimary";
import {NotificationContainer, NotificationManager} from 'react-notifications';


class PaymentForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            disabled: false
        }
    }

    handleSubmit = (ev) => {
        ev.preventDefault();
        const {selected, user} = this.props;

        this.setState({disabled: true});

        createTokenandCharge(this.props, selected, user).then(paid => {
            if (paid.findIndex(p => p !== "true") !== -1) {
                this.props.closeModal(true);
            } else {
                console.log('PAID:', paid);
                this.setState({disabled: false});
                this.props.closeModal(false);
            }
        });
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit} style={{width: "100%"}}>
                {/*<AddressSection />*/}
                <CardSection/> <br/><br/><br/>
                <ButtonPrimary type="submit" disabled={this.state.disabled} style={{width: "100%"}}>Confirm order</ButtonPrimary>


            </form>
        );
    }
}

// registerComponent('PaymentForm', injectStripe(PaymentForm), withPayment);
export default withPayment(injectStripe(PaymentForm));


//////////////////////////////////////////////////
//              Payment Functions               //
//////////////////////////////////////////////////

function createToken(context, user) {
    return context.stripe.createToken({name: user}).then(({token}) => token)
}

function createCharge(context, token, items, buyer, seller, qty, amt) {
    `calls "pay" mutation located at moduls/stripe/resolvers
     this creates a stripe charge, edits paid value on order document, and generates the invoice   
    `;

    return context.pay({
        variables: {
            input: {
                token: token,
                buyer: buyer,
                seller: seller,
                items: items,
                totalQty: qty,
                totalAmt: amt,
            }
        }
    }).then(res => res)
}

async function createTokenandCharge(context, selected, user) {
    let token, paid = [], invoices = [];
    for (item of selected) {

        //for staging TODO: remove this
        if (!item.amt) item.amt = 100;
        if (!item.qty) item.qty = 1;
        /////////////

        const notPaid = item.paid.indexOf('NOT') > -1;
        const notConfirmed = item.confirmed.indexOf('AWAITING') > -1;

        if (notPaid && !notConfirmed) { //TODO: add error message for unconfirmed charges, "There were some chargest that did not go through. This is because the seller has not confirmed the order."

            const itemMapped = {_id: item._id, itemName: item.itemName, amt: item.amt};
            if (!invoices.find(i => i.seller === item.seller)) {
                invoices.push({
                    buyer: user._id,
                    seller: item.seller,
                    total: parseInt(item.amt) * parseInt(item.qty),
                    items: [itemMapped]
                });
            } else {
                const ind = invoices.findIndex(i => i.seller === item.seller);
                invoices[ind].total += (parseInt(item.amt) * parseInt(item.qty));
                invoices[ind].items.push(itemMapped);
            }
        }
    }

    for (inv of invoices) {
        token = await createToken(context, user._id);
        const result = await createCharge(context, token.id, inv.items, user._id, inv.seller, inv.items.length, inv.total);
        paid.push(result.data.pay.paid);
    }


    return paid;
}