import React from 'react';
import {withCurrentUser} from 'meteor/vulcan:core'
import {Link} from 'react-router';
import styled from 'styled-components'
import Menu, {MenuItem} from 'material-ui/Menu';
import Button from 'material-ui/Button';
import withCart from '../../../../containers/withCart';


const Bar = styled.div`
    position: absolute;
    top: 0;
    left:0;
    z-index: 1300;
    color: white;
   
`;

const NavItem = styled.div`
    margin: 20px;
`;

const Logo = NavItem.extend`
    position: absolute;
    left: 20px;
    top: 10px
`;

const MenuItemHeader = styled.li`
    width: 250px;
    border-bottom: thin solid lightgray;
    padding: 15px;
`;



class TopBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            open: false,
        };
    }

    openMenu = event => {
        this.setState({open: true, anchorEl: event.currentTarget});
    };

    closeMenu = () => {
        this.setState({open: false});
    };

    logout = () => {
        this.closeMenu();
        Meteor.logout();
        window.location = 'https://rt-electronics.com'
    };


    render() {
        const {currentUser} = this.props, {cart} = this.props.ui;
        return (
            <Bar className="flex-row justify-end align-center full-width">

                <Logo className="flex-row">
                    <img src="/lightbulb_white.png" height="35"/>
                    <b style={{fontFamily: 'Lulo Clean'}}><span style={{color: "#BADA55"}}>RE</span>TRADE</b>
                </Logo>
                <NavItem>
                    <div className="flex-row align-center">
                        <b className="space-right">{cart.length}</b>
                        <Link to={`/cart`}>Cart</Link>
                    </div>
                </NavItem>
                <NavItem>
                    <Link to={`/search`}>Search</Link>
                </NavItem>
                <NavItem>
                    <a href="">Help</a>
                </NavItem>
                <NavItem>
                    <Link to={`/login`}>Login</Link>
                </NavItem>
                {currentUser && (
                    <div className="flex-row justify-end align-center">
                        <NavItem>
                            <span>|</span>
                        </NavItem>
                        <NavItem>
                            <div className="flex-row align-center" onClick={this.openMenu}>
                                <Button
                                    style={{color: "white"}}
                                    aria-owns={this.state.open ? 'simple-menu' : null}
                                    aria-haspopup="true"
                                    onClick={this.openMenu}
                                >
                                    <span className="space-right">{currentUser.username}</span>
                                    <i className="fa fa-caret-down" aria-hidden="true"></i>
                                </Button>
                            </div>

                            <Menu
                                id="simple-menu"
                                anchorEl={this.state.anchorEl}
                                open={this.state.open}
                                onRequestClose={this.closeMenu}
                            >
                                <MenuItemHeader><b>{currentUser.username}</b></MenuItemHeader>
                                <Link to={`/orders`}><MenuItem onClick={this.closeMenu}>Orders</MenuItem></Link>
                                <Link to={`/account`}><MenuItem onClick={this.closeMenu}>My account</MenuItem></Link>
                                <MenuItem onClick={this.logout}>Logout</MenuItem>
                            </Menu>
                        </NavItem>
                    </div>
                )}


            </Bar>
        )
    }
}

export default withCart(withCurrentUser(TopBar));


