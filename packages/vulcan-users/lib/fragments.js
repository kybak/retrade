import { registerFragment } from 'meteor/vulcan:lib';

// ------------------------------ Vote ------------------------------ //

// note: fragment used by default on the UsersProfile fragment
registerFragment(`
  fragment UsersCurrent on User {
    _id
    username
    fullName
    createdAt
    isAdmin
    displayName
    email
    emailHash
    slug
    groups
    services
    avatarUrl
    pageUrl
    billingAddress
    deliveryAddress
    country
    isSeller
    isBuyer
  }
`);
