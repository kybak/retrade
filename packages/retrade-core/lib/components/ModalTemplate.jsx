import React from 'react';
import styled from 'styled-components'
import {borderRadius, boxShadow} from '../stylesheets/style.utils.js';
import Header from './common/layouts/header/Header.jsx'
import BannerSmall from './common/layouts/header/BannerSmall.jsx'
import ComponentContainer from './common/layouts/body/ComponentContainer.jsx'
import Button from 'material-ui/Button';
import Tooltip from 'material-ui/Tooltip';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';

const ModalContainer = styled.div`
    min-width: 500px;
    margin: 40px;
    position: relative;
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


export default class ModalTemplate extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }


    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };


    render() {
        return (
            <ModalContainer className="flex-column">

                <Close onClick={this.props.close}>
                    <i className="fa fa-times" aria-hidden="true"></i>
                </Close>

                <div className="flex-row justify-space-between align-center full-width">
                    <h3>Modal Title</h3>


                </div>




            </ModalContainer>
        )
    }
}
