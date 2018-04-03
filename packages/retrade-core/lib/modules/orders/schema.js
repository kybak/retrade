/*

A SimpleSchema-compatible JSON schema


*/

import Inventory from '../inventory/schema'
import Orders from './collection'

const ownsOrIsAdmin = (user, document) => {
  return Orders.owns(user, document) || Orders.isAdmin(user);
};

const isSeller = (user, seller) => {
  return user === seller
};



const schema = {


  _id: {
    type: String,
    optional: true,
    viewableBy: ['admin'],
  },
  createdAt: {
    type: Date,
    optional: true,
    viewableBy: ['guests'],
    onInsert: (document, currentUser) => {
      return new Date();
    }
  },
  invoiceDate: {
    type: Date,
    optional: true,
    viewableBy: ['members'],
  },
  totalPaid: {
    type: String,
    optional: true,
    viewableBy: ['members'],
  },
  buyer: {
    label: 'Buyer',
    type: String,
    optional: false,
    viewableBy: ['members'],
    insertableBy: ['members'],
    searchable: true,
    resolveAs: {
      fieldName: 'buyer',
      type: "String",
      resolver: (order, args, context) => {
        const buyer = context.Users.findOne({ _id: order.buyer });
        return buyer ? buyer.username : "NA";
      },
      addOriginalField: true
    }
  },
  seller: {
    label: 'Seller',
    type: String,
    optional: false,
    viewableBy: ['members'],
    insertableBy: ['members'],
    editableBy: ['admin'],
    searchable: true,
    resolveAs: {
      fieldName: 'seller',
      type: "String",
      resolver: (order, args, context) => {
        const seller = context.Users.findOne({ _id: order.seller });
        return seller ? seller.username : "NA";
      },
      addOriginalField: true
    }
  },
  item: {
    label: 'Item',
    type: Object,
    optional: false,
    viewableBy: ['members'],
    insertableBy: ['members'],
    editableBy: ['admin'],
    blackbox: true,
    searchable: true
  },
  confirmed: {
    label: 'Confirmed',
    type: Boolean,
    optional: true,
    viewableBy: ['members'],
    insertableBy: ['admin'],
    editableBy: (user, doc)=> isSeller(user._id, doc.seller),
    onInsert: (document, currentUser) => {
      return false;
    },
    resolveAs: {
      fieldName: 'confirmed',
      type: "String",
      resolver: (order, args, context) => {
        return !order.confirmed ? "AWAITING CONFIRMATION" : "CONFIRMED BY SELLER";
      },
    }
  },
  paid: {
    label: 'Paid',
    type: Boolean,
    optional: true,
    viewableBy: ['members'],
    insertableBy: ['admin'],
    editableBy: ['admin'],
    onInsert: (document, currentUser) => {
      return false;
    },
    resolveAs: {
      fieldName: 'paid',
      type: "String",
      resolver: (order, args, context) => {
        return !order.paid ? "NOT PAID" : "PAID";
      },
    }
  },
  invoiceSent: {
    label: 'Invoice Sent',
    type: Boolean,
    optional: true,
    viewableBy: ['members'],
    insertableBy: ['admin'],
    editableBy: ['admin'],
    onInsert: (document, currentUser) => {
      return false;
    },
    resolveAs: {
      fieldName: 'invoiceSent',
      type: "String",
      resolver: (order, args, context) => {
        if (!order.confirmed) return 'AWAITING CONFIRMATION';
        if (order.confirmed && !order.paid) return 'AWAITING PAYMENT';
        if (order.paid) return 'INVOICE SENT';
      },
    }
  },
  deliveryAddress: {
    label: 'Delivery Address',
    type: String,
    optional: true,
    viewableBy: ['members'],
    insertableBy: ['members'],
    editableBy: (user, doc)=> ownsOrIsAdmin(user._id, doc._id),
  }


};

export default schema;
