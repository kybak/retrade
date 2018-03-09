import Users from 'meteor/vulcan:users';

const membersActions = [
  'main.new',
  'main.edit.all',
  'main.remove.own',
];

Users.groups.members.can(membersActions);

const adminActions = [
  'main.edit.all',
  'main.remove.all'
];

Users.groups.admins.can(adminActions);
