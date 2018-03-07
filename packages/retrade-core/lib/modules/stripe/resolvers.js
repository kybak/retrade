import {addGraphQLSchema, addGraphQLResolvers, addGraphQLMutation, Utils} from 'meteor/vulcan:core';
import {runCallbacks} from 'meteor/vulcan:lib'
import VulcanEmail from 'meteor/vulcan:email';
import generateInvoice from '../email/generateInvoice.js'
import Orders from '../orders/collection.js'
import Users from 'meteor/vulcan:users';


if (Meteor.isServer) {
  let items = [];
  const stripe = require("stripe")("sk_test_7UIOnGiyY5XkDxJIrUjKuz12");
  const paymentSchema = `
  type PaymentResponse {
    paid: Boolean
  }
  
  input Item {
    _id: String!,
    amt: String
    owner: String!
    seller: String!
  }


  input PaymentInput {
    token: String!
    user: String!,
    totalAmt: Int,
    totalQty: Int,
    currency: String,
    selected: Item
  }
`;

  addGraphQLSchema(paymentSchema);
  addGraphQLMutation('pay(input: PaymentInput): PaymentResponse');

  const paymentResolver = {
    Mutation: {
      pay(root, args) {
        const {token, selected, currency, user, totalQty, totalAmt, seller} = args.input;

        // Check if user owns document

        return new Promise((resolve, reject) => {
          stripe.charges.create({
            amount: selected.amt ? selected.amt : '100',
            currency: "usd",
            description: "Example charge",
            source: token,
          }, Meteor.bindEnvironment((err, res) => {
            // edit paid value on orders
            Orders.update({_id: selected._id}, {$set: {paid: true}}, (e, r) => {
              if (r) {
                items.push({...Orders.findOne({_id: selected._id}), amt: selected.amt});
                console.log('selected: ', items.length);
                // generate and send invoice
                if (items.length === totalQty) runCallbacks(`orders.edit.async`, {paid: true}, user, generateInvoice({
                  order: items,
                  total: totalAmt,
                  user: Users.findOne({_id: user})
                }));

                // TODO create transfer of money to seller's Stripe account
                if (res) resolve(res);
                if (err) reject(err)
              }
            });
          }));
        });


      }
    },
  };

  addGraphQLResolvers(paymentResolver);

}

