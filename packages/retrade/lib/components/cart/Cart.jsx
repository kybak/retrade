import React from 'react';
import styled from 'styled-components'
import TopBar from '../top-bar/TopBar.jsx'
import AddressModal from './modals/Address.jsx'
import {borderRadius, boxShadow, transition} from '../../stylesheets/style.utils.js';
import ButtonPrimary from "../buttons/ButtonPrimary";

const Banner = styled.div`
    width:100%;
    height: 180px;
    background: ${props => props.theme.primaryBackground};
    align-items: center;
    z-index: 0;
    padding-top: 40px;
    ${transition("all", ".5s")};
    
`;

const CartContainer = styled.div`
    margin-top:40px;
`;

const CartItemBox = styled.div`
      position: relative;
      margin-bottom:20px;
      height:37px;
      width:400px;
      background: #f5f3ed;
      justify-content:space-between;
      align-items: center;
      padding:20px;
      ${borderRadius('5px')};
      ${boxShadow('1px', '1px', '10px', '0', 'rgba(0, 0, 0, 0.36)')};
`;


export default class Cart extends React.Component {

    constructor(props) {
        super(props);

        // this.handleClick = this.handleClick.bind(this);

        this.state = {
            modalOpen: false
        }
    }


    handleClick(e) {
        e.preventDefault();
        console.log('hey');

        this.setState({modalOpen: true})
    }

    render() {

        return (
            <div className="cart flex-column container">

                <TopBar/>

                <Banner className="flex-column">
                    <h1>CART</h1>
                    <h1><span>RE</span>TRADE</h1>
                </Banner>


                <CartContainer className="flex-column">

                    <CartItemBox className="flex-row">
                        <div className="flex-column">
                            <b>DI SCHOTTKY MBRS340 FCS</b>
                            <input value="100"/>
                        </div>

                        <div className="flex-column price">
                            <span>100 NKr</span>
                        </div>

                        <div className="flex-column remove">
                            <i className="fa fa-trash" aria-hidden="true"></i>
                        </div>
                    </CartItemBox>

                    <CartItemBox className="flex-row">
                        <div className="flex-column">
                            <b>DI SCHOTTKY MBRS340 FCS</b>
                            <input value="100"/>
                        </div>

                        <div className="flex-column price">
                            <span>100 NKr</span>
                        </div>

                        <div className="flex-column remove">
                            <i className="fa fa-trash" aria-hidden="true"></i>
                        </div>
                    </CartItemBox>

                    <CartItemBox className="flex-row">
                        <div className="flex-column">
                            <b>DI SCHOTTKY MBRS340 FCS</b>
                            <input value="100"/>
                        </div>

                        <div className="flex-column price">
                            <span>100 NKr</span>
                        </div>

                        <div className="flex-column remove">
                            <i className="fa fa-trash" aria-hidden="true"></i>
                        </div>
                    </CartItemBox>

                </CartContainer>

                <div className="flex-row" style={{margin: "20px 0"}}>

                    <div className="flex-row check-card selected">USE CARD ENDING IN 7931</div>
                    <div className="flex-row check-card">ENTER NEW CARD</div>
                </div>


                <div className="flex-column total">
                    <b>Total</b>
                    <span>300 000 NKr</span>

                    <ButtonPrimary onClick={e=>this.handleClick(e)} name="CHECKOUT" />

                </div>


                <div className="flex-row bottom-bar">©2017 ReTrade</div>

                {this.state.modalOpen &&
                    <AddressModal/>
                }
            </div>
        )
    }
}

/*
 App.propTypes = {
 connected: React.PropTypes.bool,
 loading: React.PropTypes.bool,
 likes: React.PropTypes.number,
 friends: React.PropTypes.number
 };*/
