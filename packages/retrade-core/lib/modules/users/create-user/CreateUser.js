import { addGraphQLSchema, addGraphQLResolvers, addGraphQLMutation, Utils } from 'meteor/vulcan:core';


const createUserSchema = `  
  type createUserResponse {
    _id: String
  }
  
  
  input Profile {
    location: String
  }

  input createUserInput {
    name: String
    username: String
    email: String!
    password: String!
    profile: Profile
  }
`;

addGraphQLSchema(createUserSchema);
addGraphQLMutation('createUser(input: createUserInput): createUserResponse');

const createUserResolver = {
  Mutation: {
    async createUser(root, args) {
      const response = await Accounts.createUser(args.input);
      return {_id: response}
    }
  },
};

addGraphQLResolvers(createUserResolver);
