import React from 'react';
import {withList, registerComponent} from 'meteor/vulcan:core'
import styled from 'styled-components'
import Orders from '../../modules/orders/collection.js'
import {borderRadius, boxShadow, transition} from '../../stylesheets/style.utils.js';
import Tooltip from 'material-ui/Tooltip';
import Button from 'material-ui/Button';
import {Link} from 'react-router';
import Inventory from '../../modules/inventory/collection.js'
import withInventoryTotal from '../../containers/withInventoryTotal'
import _ from 'underscore'


const OrderListContainer = styled.div`
  background: white;
  width: 500px;
  min-height: 320px;
  padding: 30px;
  margin: 20px;
  ${boxShadow("1px", "1px", "10px", "0", "rgba(0, 0, 0, 0.36)")};
  ${borderRadius("5px")};
`;

const OrderItems = styled.div`
    height: 200px;
    overflow: auto;
`;

const OrderItem = styled.div`
    border-bottom: thin solid lightgray;
    padding: 5px 0;
    
    &:last-child {
        border-bottom: none;
    }
`;

const OrderItemDate = styled.div`
    width: 48%;
    color: gray;
`;

const OrderItemPrice = styled.div`
    width: 15%;
    text-align: center;
    color: gray;
`;

const OrderItemView = styled.div`
    width: 25%;
    text-align: right;
    color: gray;
    cursor: pointer;
`;

let i = 0;

class OrderPreview extends React.Component {

    constructor(props) {
        super(props);
        console.log(props);

        this.state = {
            top: "",
            left: "",
            data: []
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({data: nextProps.results})
    }


    render() {
        const {data} = this.state;
        return (
            <OrderListContainer className="flex-column justify-space-between">
                <div className="flex-row justify-space-between align-center">
                    <h3>Orders</h3>

                    <Link to={`/orders`} style={{color: "black", textDecoration: "none"}}>
                        <Button>
                            <div className="flex-row">
                                <i className="fa fa-eye space-right" aria-hidden="true"></i>
                                View all
                            </div>
                        </Button>
                    </Link>

                </div>

                <OrderItems className="flex-column justify-center flex-grow">
                    {data.length > 0 && data.map(order=>
                        <OrderItem className="flex-row full-width justify-space-between align-center">
                            <OrderItemDate>{order.item.itemName}</OrderItemDate>
                            <OrderItemPrice>{new Date(order.createdAt).toLocaleDateString()}</OrderItemPrice>
                            <OrderItemView>{order.paid}</OrderItemView>
                        </OrderItem>
                    )}


                </OrderItems>

            </OrderListContainer>
        )
    }
}


const listOptions = {
    collection: Orders,
    queryName: 'ordersPreview',
    fragmentName: 'OrderFragment',
};

registerComponent("OrderPreview", OrderPreview, [withList, listOptions]);
