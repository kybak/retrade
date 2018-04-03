import React from 'react';
import styled from 'styled-components'
import {withList, registerComponent} from 'meteor/vulcan:core'
import Orders from '../../modules/orders/collection.js'
import {borderRadius, boxShadow} from '../../stylesheets/style.utils.js';
import BillingF from './modals/BillingF'
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Switch from 'material-ui/Switch';
import Tooltip from 'material-ui/Tooltip';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import { Link } from 'react-router';


const OrdersContainer = styled.div`
  background: white;
  width: 500px;
  min-height: 200px;
  padding: 30px;
  margin: 20px;

  ${boxShadow("1px", "1px", "10px", "0", "rgba(0, 0, 0, 0.36)")};
  ${borderRadius("5px")};
`;

const BillingItem = styled.div`
    border-bottom: thin solid lightgray;
    padding: 5px;
    
    &:last-child {
        border-bottom: none;
    }
`;

const BillingItemDate = styled.div`
    width: 42%;
    color: gray;
`;

const BillingItemPrice = styled.div`
    width: 15%;
    text-align: center;
    color: gray;
`;

const BillingItemView = styled.div`
    width: 42%;
    text-align: right;
    color: gray;
    cursor: pointer;
`;

export default class Billing extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            data: []
        }
    }

    componentWillReceiveProps(nextProps) {
        nextProps = nextProps.results.filter(result=> {
            console.log(result);
            return result.invoiceSent === "INVOICE SENT"
        });
        this.setState({data: nextProps})
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleClickOpen = () => {
        this.setState({
            open: true,
        });
    };

    handleRequestClose = value => {
        this.setState({ open: false });
    };


    render() {
        const {data} = this.state;
        return (
            <OrdersContainer className="flex-column">

                <div className="flex-row justify-space-between align-center full-width">
                    <div className="flex-row">
                        <h3>Billing</h3>
                    </div>

                    <div>
                        <Button onClick={() => this.setState({open: true})}>
                            <div className="flex-row">
                                <i className="fa fa-eye space-right" aria-hidden="true"></i>
                                View all
                            </div>
                        </Button>
                    </div>

                </div>

                <div className="flex-column justify-center flex-grow">
                    {data.length > 0 && data.map(item=> {
                        return (
                            <BillingItem className="flex-row full-width justify-space-between">
                                <BillingItemDate>{new Date(item.invoiceDate).toLocaleDateString()}</BillingItemDate>
                                <BillingItemPrice>{item.totalPaid}</BillingItemPrice>
                                <BillingItemView>View invoice</BillingItemView>
                            </BillingItem>
                        )
                    })}

                </div>


                <Dialog onRequestClose={this.handleRequestClose} open={this.state.open}>
                    <BillingF close={()=> this.setState({open: false})}/>
                </Dialog>

            </OrdersContainer>
        )
    }
}

const listOptions = {
    collection: Orders,
    queryName: 'ordersPreview',
    fragmentName: 'OrderFragment',
};

registerComponent("Billing", Billing, [withList, listOptions]);

