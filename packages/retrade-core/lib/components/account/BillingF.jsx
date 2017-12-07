import React from 'react';
import styled from 'styled-components'
import {borderRadius, boxShadow} from '../../stylesheets/style.utils.js';
import Header from '../common/layouts/header/Header.jsx'
import BannerSmall from '../common/layouts/header/BannerSmall.jsx'
import ComponentContainer from '../common/layouts/body/ComponentContainer.jsx'
import Button from 'material-ui/Button';
import Tooltip from 'material-ui/Tooltip';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';

const BillingContainer = styled.div`
    min-width: 500px;
    margin: 40px;
    position: relative;
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

const Close = styled.div`
    cursor: pointer;
    color: #949494;
    position: absolute;
    top: -30px;
    right: -25px;
    
    &:hover {
        color: black;
    }
`;

const currencies = [
    {
        value: '2017',
        label: '2017',
    },
];

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "November",
    "December",
];

export default class BillingF extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            year: "2017"
        }
    }


    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };


    render() {
        return (
            <BillingContainer className="flex-column">

                <Close onClick={this.props.close}>
                    <i className="fa fa-times" aria-hidden="true"></i>
                </Close>

                <div className="flex-row justify-space-between align-center full-width">
                    <h3>Billing History</h3>

                    <TextField
                        id="select-currency"
                        select
                        label="Year"
                        value={this.state.year}
                        onChange={this.handleChange('year')}
                        margin="normal"
                    >
                        {currencies.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>

                <div className="flex-column space-top">
                    {months.map((month, i) => (
                        <BillingItem key={i} className="flex-row full-width justify-space-between">
                            <BillingItemDate>{month} {this.state.year}</BillingItemDate>
                            <BillingItemPrice>500 kr</BillingItemPrice>
                            <BillingItemView>View invoice</BillingItemView>
                        </BillingItem>
                    ))}
                </div>


            </BillingContainer>
        )
    }
}
