/*

Three resolvers are defined:

- list (e.g.: inventoryList(terms: JSON, offset: Int, limit: Int) )
- single (e.g.: inventorySingle(_id: String) )
- listTotal (e.g.: inventoryTotal )

*/

// basic list, single, and total query resolvers
const resolvers = {

  list: {

    name: 'inventoryList',

    resolver(root, {terms = {}}, context, info) {
      let {selector, options} = context.Inventory.getParameters(terms, {}, context.currentUser);
      return context.Inventory.find(selector, options).fetch();
    },

  },

  single: {

    name: 'inventorySingle',

    resolver(root, {documentId}, context) {
      const document = context.Inventory.findOne({_id: documentId});
      return context.Users.restrictViewableFields(context.currentUser, context.Inventory, document);
    },

  },

  total: {

    name: 'inventoryTotal',

    resolver(root, {terms = {}}, context) {
      const {selector, options} = context.Inventory.getParameters(terms, {}, context.currentUser);
      return context.Inventory.find(selector, options).count();
    },

  }
};

export default resolvers;
