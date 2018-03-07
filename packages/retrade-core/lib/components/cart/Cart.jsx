import React from 'react';
import styled from 'styled-components'
import {withNew, withList, withCurrentUser, registerComponent} from "meteor/vulcan:core";
import {withRouter} from 'react-router';
import Orders from '../../modules/orders/collection.js'
import AlertContainer from 'react-alert'
import Header from '../common/layouts/header/Header.jsx'
import AddressModal from './modals/Address.jsx'
import {borderRadius, boxShadow, transition, boxSizing, fontSmoothing} from '../../stylesheets/style.utils.js';
import {ButtonPrimary} from "../common/presentational-components/buttons/ButtonPrimary";
import {Quantity} from '../common/presentational-components/inputs/Quantity.js'
import {Price} from '../common/presentational-components/Price.js';
import withCart from '../../containers/withCart';

const Banner = styled.div`
    width:100%;
    height: 70px;
    background: ${props => props.theme.primaryBackground};
    align-items: center;
    z-index: 0;
    padding-top: 15px;
    ${transition("all", ".5s")};    
`;


const CartContainer = styled.div`
    margin-top:40px;
`;

const CartItemBox = styled.div`
      position: relative;
      margin-bottom:20px;
      height:90px;
      width:460px;
      background: #f5f3ed;
      justify-content:space-between;
      align-items: center;
      padding:20px;
      ${borderRadius('5px')};
      ${boxShadow('1px', '1px', '10px', '0', 'rgba(0, 0, 0, 0.36)')};
`;

const Total = styled.div`
    font-size: 30px;
`;


class Cart extends React.Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);

        this.state = {
            modalOpen: false
        }
    }

    alertOptions = {
        offset: 14,
        position: 'bottom left',
        theme: 'dark',
        time: 30000,
        transition: 'scale'
    };

    showAlert = () => {
        /*this.msg.info('This page is under construction!', {
            time: 30000,
            type: 'info',
        })*/
    };


    handleClick(e) {
        e.preventDefault();

        this.setState({modalOpen: true})
    }

    componentDidMount() {
        this.showAlert()
    }

    remove(id) {
        this.props.removeCart(id);
    }

    getCartItems() {
        return (
            this.props.ui.cart.map(component => {
                return (
                    <CartItemBox key={component._id} className="flex-row">
                        <div className="flex-column">
                            <b>{component.itemName}</b>
                            <Quantity value={component.qty}/>
                        </div>

                        <Price className="flex-column">
                            <span>100 NKr</span>
                        </Price>

                        <div className="flex-column remove">
                            <i style={{cursor: "pointer"}} className="fa fa-trash" aria-hidden="true"
                               onClick={() => this.remove(component._id)}></i>
                        </div>
                    </CartItemBox>
                )
            })
        )
    }

    closeModal(ready) {
        if (ready) {
            //send email to buyer, sender, and admin
            //add order to orders collection
            this.props.ui.cart.forEach((item, ind)=> {
                const document = {
                    buyer: this.props.currentUser._id,
                    seller: item.owner,
                    item: item,
                    deliveryAddress: this.props.currentUser.deliveryAddress
                };

                this.props.newMutation({
                    document: document
                }).then(res => {
                    //if all are added redirect to confirmation page
                    if (ind + 1 === this.props.ui.cart.length) this.props.router.push('/order-received');
                }).catch(err => console.log(err));
            });



        }

        this.setState({modalOpen: false});
    }

    render() {
        const {cart} = this.props.ui;

        let cartItems = null;
        if (cart.length > 0) {
            cartItems = this.getCartItems()
        } else {
            cartItems = <h1>CART IS EMPTY</h1>
        }

        return (
            <div className="flex-column align-center">
                {/*<AlertContainer ref={a => this.msg = a} {...this.alertOptions} />*/}

                <Header/>

                <Banner className="flex-column">
                    <h1 style={{color: 'white'}}>CART</h1>
                </Banner>


                <CartContainer className="flex-column">

                    {cartItems}

                </CartContainer>

                {cart.length > 0 &&
                <Total className="flex-column align-center justify-center">
                    <b>Total</b>
                    <span>300 000 NKr</span>

                    <ButtonPrimary onClick={this.handleClick}>CHECKOUT</ButtonPrimary>

                </Total>}

                {/*   <div className="flex-row" style={{margin: "20px 0"}}>

                    <div className="flex-row check-card selected">USE CARD ENDING IN 7931</div>
                    <div className="flex-row check-card">ENTER NEW CARD</div>
                </div>
*/}


                {this.state.modalOpen &&
                <AddressModal user={this.props.currentUser} close={(finalized) => this.closeModal(finalized)}/>
                }
            </div>
        )
    }
}

const mutationOptions = {
    collection: Orders,
    fragmentName: "OrderFragment"
};

const LoadedCart = withCart(Cart);

registerComponent('Cart', withCurrentUser(LoadedCart), withRouter, [withNew, mutationOptions]);


/*
 App.propTypes = {
 connected: React.PropTypes.bool,
 loading: React.PropTypes.bool,
 likes: React.PropTypes.number,
 friends: React.PropTypes.number
 };*/
