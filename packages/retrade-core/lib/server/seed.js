/*

Seed the database with some dummy content.

*/


import Users from 'meteor/vulcan:users';
import { newMutation } from 'meteor/vulcan:core';





Meteor.startup(function () {
  if (Users.find().fetch().length === 0) {
    Accounts.createUser({
      username: 'DemoUser',
      email: 'dummyuser@telescopeapp.org',
      profile: {
        isDummy: true
      }
    });
  }
  const currentUser = Users.findOne();
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
