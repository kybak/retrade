/*

Three resolvers are defined:

- list (e.g.: inventoryList(terms: JSON, offset: Int, limit: Int) )
- single (e.g.: inventorySingle(_id: String) )
- listTotal (e.g.: inventoryTotal )

*/

// basic list, single, and total query resolvers
const resolvers = {

  list: {

    name: 'orderList',

    resolver(root, {terms = {}}, context, info) {

      let {selector, options} = context.Orders.getParameters(terms, {}, context.currentUser);
      const results = context.Orders.find(selector, options).fetch();
      return context.Orders.find(selector, options).fetch();
    },

  },

  single: {

    name: 'orderSingle',

    resolver(root, {documentId}, context) {
      const document = context.Orders.findOne({_id: documentId});
      return context.Users.restrictViewableFields(context.currentUser, context.Orders, document);
    },

  },

  total: {

    name: 'orderTotal',

    resolver(root, {terms = {}}, context) {
      const {selector, options} = context.Orders.getParameters(terms, {}, context.currentUser);
      return context.Orders.find(selector, options).count();
    },

  }
};

export default resolvers;
