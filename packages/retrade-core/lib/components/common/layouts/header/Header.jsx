import React from 'react';
import { Link } from 'react-router';
import styled from 'styled-components'
import Menu, { MenuItem } from 'material-ui/Menu';
import Button from 'material-ui/Button';


const Bar = styled.div`
    position: absolute;
    top: 0;
    left:0;
    z-index: 1;
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


export default class TopBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            anchorEl: null,
            open: false,
        };
    }

    openMenu = event => {
        this.setState({ open: true, anchorEl: event.currentTarget });
    };

    closeMenu = () => {
        this.setState({ open: false });
    };


    render() {
        return (
            <Bar className="flex-row justify-end align-center full-width">

                <Logo className="flex-row">
                    <img src="/lightbulb_white.png" height="35"/>
                    <b style={{fontFamily: 'Lulo Clean'}}><span style={{color: "#BADA55"}}>RE</span>TRADE</b>
                </Logo>
                <NavItem>
                    <Link to={`/cart`}>Cart</Link>
                </NavItem>
                <NavItem>
                    <Link to={`/`}>Search</Link>
                </NavItem>
                <NavItem>
                    <a href="">Add</a>
                </NavItem>
                <NavItem>
                    <a href="">Help</a>
                </NavItem>
                <NavItem>
                    <Link to={`/login`}>Login</Link>
                </NavItem>
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
                            <span className="space-right">Norautron</span>
                            <i className="fa fa-caret-down" aria-hidden="true"></i>
                        </Button>
                    </div>

                    <Menu
                        autoWidth="true"
                        id="simple-menu"
                        anchorEl={this.state.anchorEl}
                        open={this.state.open}
                        onRequestClose={this.closeMenu}
                    >
                        <MenuItemHeader><b>Norautron</b></MenuItemHeader>
                        <MenuItem onClick={this.closeMenu}>Orders</MenuItem>
                        <Link to={`/account`}><MenuItem onClick={this.closeMenu}>My account</MenuItem></Link>
                        <MenuItem onClick={this.closeMenu}>Logout</MenuItem>
                    </Menu>
                </NavItem>

            </Bar>
        )
    }
}



