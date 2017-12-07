import React from 'react';
import styled from 'styled-components'
import {borderRadius, boxShadow} from '../../stylesheets/style.utils.js';
import BillingF from './BillingF'
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
        }
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
                    <BillingItem className="flex-row full-width justify-space-between">
                        <BillingItemDate>December 2017</BillingItemDate>
                        <BillingItemPrice>500 kr</BillingItemPrice>
                        <BillingItemView>View invoice</BillingItemView>
                    </BillingItem>


                    <BillingItem className="flex-row full-width justify-space-between">
                        <BillingItemDate>November 2017</BillingItemDate>
                        <BillingItemPrice>500 kr</BillingItemPrice>
                        <BillingItemView>View invoice</BillingItemView>
                    </BillingItem>


                </div>


                <Dialog onRequestClose={this.handleRequestClose} open={this.state.open}>
                    <BillingF close={()=> this.setState({open: false})}/>
                </Dialog>

            </OrdersContainer>
        )
    }
}
