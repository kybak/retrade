import React from 'react';
import styled from 'styled-components'
import {borderRadius} from '../../../stylesheets/style.utils.js';
import {boxShadow} from '../../../stylesheets/style.utils.js';
import {transform} from '../../../stylesheets/style.utils.js';

const Go = styled.button`
  width: 50px;
  min-width: 50px;
  height: 50px;
  min-height: 50px;
  background: #a9c64d;
  cursor: pointer;
  margin-left: 10px;

  ${borderRadius('50%')}
  ${boxShadow('1px', '1px', '10px', '0', 'rgba(0, 0, 0, 0.4)')}

  &:hover {
    background: #a6c24c;
  }
`;

const IconContainer = styled.div`
      position: absolute;
      left: 1px;
      top: -14px;
      height: 46px;
      color: gray;
      background: #ebf7ff;
      width: 42px;
      ${borderRadius('5px')}
      border-bottom-right-radius: 0;
      border-top-right-radius: 0;
      border-right: thin solid lightgray;
      z-index:1;
      ${transform('translateY', '50%')}
`;

const Input = styled.input`
    flex-grow:1;
    height: 50px;
    padding-left: 50px;
    margin: 0;
    height: 100%
    padding: 10px 12px 10px 50px;
    margin: 6px 0 6px;
    font-size: 18px;
    border: 1px solid #bbb;
    border-top-color: #999;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.18);
    -moz-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.18);
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.18);
    -webkit-font-smoothing: antialiased;
`;

const ParentContainer = styled.div`
    position: relative;
    width: 600px;
    margin-bottom:10px
`;


export default class SearchForm extends React.Component {

    constructor(props) {
        super(props);

    }

    componentWillReceiveProps(n) {
        console.log(n);
    }

    render() {

        return (

            <form className="flex-column">
                <ParentContainer className="flex-row justify-space-between align-center">

                    <IconContainer className="flex-row align-center justify-center">
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </IconContainer>

                    <Input placeholder="Search by component (eg. HOLDER SZ-2591 29MM)"/>

                    <Go className="flex-column align-center justify-center"
                        type="submit"
                        onClick={(e)=> this.props.submit(e)}>GO</Go>

                </ParentContainer>
            </form>

        )
    }
}
