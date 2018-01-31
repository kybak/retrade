/*

Register the GraphQL fragment used to query for data

*/

import { registerFragment } from 'meteor/vulcan:core';

registerFragment(`
  fragment InventoryItemFragment on Inventory {
    _id
    createdAt
    owner
    itemNumber
    itemName
    accountCode
    customerRelation
    externalItemNumber
    mfm
    info
    multiple
  }
`);
