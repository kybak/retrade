import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const withInventoryTotal = (component) => {
  return graphql(gql`
    query inventoryTotal($credentials: String) {
      inventoryTotal(credentials: $credentials) {
          total
       }
    }
    
` )(component);
};

export default withInventoryTotal;
