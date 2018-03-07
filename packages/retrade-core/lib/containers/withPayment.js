import React, { PropTypes, Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const withPayment = component => {
  return graphql(gql`
    mutation pay($input: PaymentInput) {
      pay(input: $input) {
        paid
      }
    }
`, { name: "pay" })(component);
};

export default withPayment;
