import React from 'react';
import styled from 'styled-components';
import {borderRadius} from '../../stylesheets/style.utils.js';


const Button = styled.button`
    padding: 19px;
    min-width: 320px;
    background: #4abc96;
    
    ${borderRadius(('5px'))};
    
    &:hover {
      background: #44ac89;
    }
`;


export default class ButtonPrimary extends React.Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);

    }

    handleClick(e) {
        this.props.onClick(e)
    }

    render() {
        return (
            <Button onClick={this.handleClick}>{this.props.name}</Button>
        )
    }
}


