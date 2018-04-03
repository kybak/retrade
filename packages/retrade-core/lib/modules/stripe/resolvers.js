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
    itemName: String!,
    amt: String
  }


  input PaymentInput {
    token: String!
    buyer: String!
    seller: String!
    totalAmt: Int!,
    totalQty: Int,
    currency: String,
    items: [Item]
  }
`;

  addGraphQLSchema(paymentSchema);
  addGraphQLMutation('pay(input: PaymentInput): PaymentResponse');

  const paymentResolver = {
    Mutation: {
      pay(root, args) {
        const {token, items, currency, buyer, seller, totalQty, totalAmt} = args.input;

        console.log("ARGS: ", args.input);
        // TODO: Check if user owns document


        return new Promise((resolve, reject) => {

          stripe.charges.create({
            amount: totalAmt,
            currency: "usd",
            source: token,
          }, Meteor.bindEnvironment((err, res) => {
            console.log("CHARGE ERROR: ", err);
            console.log("CHARGE SUCCESS: ", res);
            // edit paid value on orders
            for (item of items) {
              Orders.update({_id: item._id}, {$set: {paid: true, totalPaid: (parseFloat(totalAmt / 100).toFixed(2)).toString()}}, (e, r) => {

              });

              `generate and send invoice
              callback located at server/orders/callbacks
              `;

              if (items.length === totalQty) runCallbacks(`orders.edit.async`, {paid: true}, buyer, generateInvoice({
                order: items,
                total: totalAmt,
                user: Users.findOne({_id: buyer})
              }));

              resolve(res);

              // TODO create transfer of money to seller's Stripe account

            }

          }));
        });


      }
    },
  };

  addGraphQLResolvers(paymentResolver);

}

