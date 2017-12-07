import { addGraphQLSchema } from 'meteor/vulcan:core';

/*
const userSchema = `
  input UsersInput {
    username: String
  }
`;

addGraphQLSchema(userSchema);*/

/*

/!*



*!/
const userSchema = `

# Type returned when the user logs in
type LoginMethodResponse {
  # Id of the user logged in user
  id: String!
  # Token of the connection
  token: String!
  # Expiration date for the token
  tokenExpires: Float!
  # The logged in user
  user: User
}

type SuccessResponse {
# True if it succeeded
  success: Boolean
}

# A hashed password
input HashedPassword {
  # The hashed password
  digest: String!
  # Algorithm used to hash the password
  algorithm: String!
}

`;



addGraphQLSchema(userSchema);
// #input CreateUserProfileInput {
// # ${options.CreateUserProfileInput}
// #}
*/
