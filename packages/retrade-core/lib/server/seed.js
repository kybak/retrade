/*

Seed the database with some dummy content.

*/


import Users from 'meteor/vulcan:users';
import {newMutation} from 'meteor/vulcan:core';


Meteor.startup(function () {
  /*  import {initAccounts, Resolvers} from 'meteor/nicolaslopezj:apollo-accounts';
    import { addGraphQLResolvers } from 'meteor/vulcan:core';


    initAccounts({
      loginWithFacebook: false,
      loginWithGoogle: false,
      loginWithLinkedIn: false,
      loginWithPassword: true
    });*/


  // console.log(Meteor.default_server.method_handlers.changePassword.toString());
  // addGraphQLResolvers(...Resolvers());

    const users = Users.find().fetch();
    // users.forEach(user=>Meteor.users.remove({_id: user._id}));
// console.log(users);
  if (Users.find().fetch().length === 0) {
    Accounts.createUser({
      username: 'Admin',
      email: 'k@nordicode.com',
      password: "1234",
    });

    const currentUser = Users.findOne();

    Meteor.users.update(currentUser._id, {$set: {isAdmin: true}})
  }

  // Meteor.users.remove({"emails.0.address": "tokylebaker@gmail.com"});
  // Meteor.users.remove({"emails.0.address": "k@nordicode.com"});
  /*if (Movies.find().fetch().length === 0) {
    seedData.forEach(document => {
      newMutation({
        action: 'movies.new',
        collection: Movies,
        document: document,
        currentUser: currentUser,
        validate: false
      });
    });
  }*/
});
