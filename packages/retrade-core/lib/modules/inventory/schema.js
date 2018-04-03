/*

A SimpleSchema-compatible JSON schema


*/


const schema = {

  // default properties

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
  itemNumber: {
    label: 'Item Number',
    type: String,
    optional: false,
    viewableBy: ['members'],
    insertableBy: ['members'],
    editableBy: ['members'],
    searchable: true
  },
  itemName: {
    label: 'Item Name',
    type: String,
    optional: false,
    viewableBy: ['members'],
    insertableBy: ['members'],
    editableBy: ['members'],
    searchable: true
  },
  accountCode: {
    label: 'Account Code',
    type: String,
    optional: false,
    viewableBy: ['members'],
    insertableBy: ['members'],
    editableBy: ['members'],
    searchable: true
  },
  customerRelation: {
    label: 'Customer Relation',
    type: String,
    optional: true,
    viewableBy: ['members'],
    insertableBy: ['members'],
    editableBy: ['members'],
    searchable: true
  },
  externalItemNumber: {
    label: 'External Item Number',
    type: String,
    optional: true,
    viewableBy: ['members'],
    insertableBy: ['members'],
    editableBy: ['members'],
    searchable: true
  },
  mfm: {
    label: 'MFM',
    type: String,
    optional: true,
    viewableBy: ['members'],
    insertableBy: ['members'],
    editableBy: ['members'],
    searchable: true
  },
  info: {
    label: 'Info',
    type: String,
    optional: true,
    viewableBy: ['members'],
    insertableBy: ['members'],
    editableBy: ['members'],
  },
  multiple: {
    label: 'Multiple',
    type: String,
    optional: true,
    viewableBy: ['members'],
    insertableBy: ['members'],
    editableBy: ['members'],
  },
  owner: {
    type: String,
    optional: false,
    viewableBy: ['admin'],
    insertableBy: ['members'],
    editableBy: ['admin'],
    searchable: true
  },
  price: {
    type: String,
    optional: true,
    viewableBy: ['members'],
    insertableBy: ['members'],
    editableBy: ['members'],
    searchable: true
  },


};

export default schema;
