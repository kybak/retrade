import React, { PropTypes, Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const withCreateUser = component => {
  return graphql(gql`
    mutation createUser($input: createUserInput) {
      createUser(input: $input) {
        _id
      }
    }
`, { name: "createUser" })(component);
};

export default withCreateUser;
