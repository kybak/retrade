import React, { Component } from 'react';
import { getFragment } from 'meteor/vulcan:lib';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const withCurrentUser = component => {

  return graphql(
    gql`
      query getCurrentUser {
        currentUser {
              _id
    username
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
        }
      }
    `, {
      alias: 'withCurrentUser',

      props(props) {
        const {data: {loading, currentUser}} = props;
        return {
          currentUserLoading: loading,
          currentUser,
        };
      },
    }
  )(component);
}

export default withCurrentUser;
