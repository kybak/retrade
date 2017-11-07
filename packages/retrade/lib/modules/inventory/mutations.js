/*

Define the three default mutations:

- new (e.g.: inventoryNew(document: inventoryInput) : Inventory )
- edit (e.g.: inventoryEdit(documentId: String, set: inventoryInput, unset: inventoryUnset) : Inventory )
- remove (e.g.: inventoryRemove(documentId: String) : Inventory )

Each mutation has:

- A name
- A check function that takes the current user and (optionally) the document affected
- The actual mutation

*/

import { newMutation, editMutation, removeMutation, Utils } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';

const mutations = {

  new: {

    name: 'inventoryNew',

    check(user) {
      if (!user) return false;
      return Users.canDo(user, 'main.new');
    },

    mutation(root, {document}, context) {

      Utils.performCheck(this.check, context.currentUser, document);

      return newMutation({
        collection: context.Inventory,
        document: document,
        currentUser: context.currentUser,
        validate: true,
        context,
      });
    },

  },

  edit: {

    name: 'inventoryEdit',

    check(user, document) {
      if (!user || !document) return false;
      return Users.owns(user, document) ? Users.canDo(user, 'main.edit.own') : Users.canDo(user, `inventory.edit.all`);
    },

    mutation(root, {documentId, set, unset}, context) {

      const document = context.Inventory.findOne(documentId);
      Utils.performCheck(this.check, context.currentUser, document);

      return editMutation({
        collection: context.Inventory,
        documentId: documentId,
        set: set,
        unset: unset,
        currentUser: context.currentUser,
        validate: true,
        context,
      });
    },

  },

  remove: {

    name: 'inventoryRemove',

    check(user, document) {
      if (!user || !document) return false;
      return Users.owns(user, document) ? Users.canDo(user, 'main.remove.own') : Users.canDo(user, `inventory.remove.all`);
    },

    mutation(root, {documentId}, context) {

      const document = context.Inventory.findOne(documentId);
      Utils.performCheck(this.check, context.currentUser, document);

      return removeMutation({
        collection: context.Inventory,
        documentId: documentId,
        currentUser: context.currentUser,
        validate: true,
        context,
      });
    },

  },

};

export default mutations;
