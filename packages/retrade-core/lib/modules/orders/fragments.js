/*

Register the GraphQL fragment used to query for data

*/

import { registerFragment } from 'meteor/vulcan:core';

registerFragment(`
  fragment OrderFragment on Order {
    _id
    createdAt
    buyer
    seller
    item
    confirmed
    paid
    invoiceSent
    deliveryAddress
    invoiceDate
    totalPaid
  }
`);
