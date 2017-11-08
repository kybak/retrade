import React from 'react';
import { Link } from 'react-router';
import styled from 'styled-components'

const Bar = styled.div`
    background: transparent;
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
    left: 20px
`;


export default class TopBar extends React.Component {

    constructor(props) {
        super(props);

    }


    render() {
        return (
            <Bar className="flex-row justify-end full-width">

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
                    <span>|</span>
                </NavItem>
                <NavItem>
                    <div className="flex-row align-center">
                        <a href="" className="space-right">Norautron</a>
                        <i className="fa fa-caret-down" aria-hidden="true"></i>
                    </div>
                </NavItem>

            </Bar>
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


