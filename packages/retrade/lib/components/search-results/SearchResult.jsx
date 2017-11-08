import React from 'react';
import styled from 'styled-components'
import { Quantity } from '../presentational-components/inputs/Quantity.js'
import { Price} from '../presentational-components/Price.js'
import { borderRadius, boxShadow, transition, boxSizing, fontSmoothing } from '../../stylesheets/style.utils.js';


const FlipContainer = styled.div`
  position: relative;
  perspective: 1000px;
  min-width: 400px;
  min-height: 100px;
  margin-bottom: 20px;
`;

const Flipper = styled.div.attrs({
    $transform: props => props.flipped
})`
  transition: 0.6s;
  transform-style: preserve-3d;
  position: relative;
  transform: ${props => props.$transform}
`;

const ResultBox = styled.div`
  margin-bottom:20px;
  height:95px;
  width:400px;
  background: #f5f3ed;
  justify-content:space-between;
  align-items: center;
  padding:20px;
  backface-visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
  ${boxShadow("1px", "1px", "10px", "0", "rgba(0, 0, 0, 0.36)")};
  ${borderRadius("5px")}
`;

const Front = ResultBox.extend`
  z-index: 2;
  transform: rotateY(0deg);
`;

const Back = ResultBox.extend`
  transform: rotateY(180deg);
`;



const AddRemove = styled.div`
  position: absolute;
  top:-10px;
  height:25px;
  width:25px;
  justify-content:center;
  align-items: center;
  font-size:17px;
  color: white;
  cursor: pointer;
  ${boxShadow("1px", "1px", "10px", "0", "rgba(0, 0, 0, 0.39)")};
  ${borderRadius("50%")}
`;

const Add = AddRemove.extend`
  background: orangered;
  right:-10px;
  &:hover {
    background: #e23e00;
  }
`;

const Remove = AddRemove.extend`
  background: ${props => props.theme.buttonSecondary};
  left:-10px;
  &:hover {
    background: ${props => props.theme.primaryBackground};
  }
`;

const Added = styled.div.attrs({
    $height: props => props.added
})`
  width:100%;
  height: ${props => props.$height};
  position: absolute;
  top:0;
  left: 0;
  background: ${props => props.theme.buttonPrimary};
  color: white;
  align-items: center;
  justify-content:center;
  overflow: hidden;
  ${borderRadius("5px")}
  ${transition("all", ".25s")}
`;


const AddButton = styled.button`
  padding:10px;
  min-width: 100px;
  background: ${props => props.theme.buttonSecondary};;
  ${borderRadius("5px")}

  &:hover {
    background: ${props => props.theme.buttonSecondaryHighlight};
  }
`;




export default class SearchResult extends React.Component {

    constructor(props) {
        super(props);

        this.flip = this.flip.bind(this);
        this.add = this.add.bind(this);
        this.state = {
            flipped: "rotateY(0deg)",
            added: "0px"
        }
    }

    flip(e) {
        this.setState({flipped: "rotateY(180deg)"})
    }

    add(e) {
        this.setState({added: "95px"})
    }


    render() {
        return (
            <FlipContainer>
                <Flipper flipped={this.state.flipped}>

                    <Front className="flex-row">
                        <div className="flex-column">
                            <b>DI SCHOTTKY MBRS340 FCS</b>
                            <span>500 000 pieces</span>
                        </div>

                        <Price className="flex-column">
                            <span>100 NKr</span>
                        </Price>

                        <Add className="flex-column" onClick={this.flip}>
                            <b>+</b>
                        </Add>
                    </Front>

                    <Back className="flex-row">
                        <Added className="flex-column" added={this.state.added}>
                            <h3 style={{margin:0}}>ADDED</h3>
                            <span>DI SCHOTTKY MBRS340 FCS</span>
                        </Added>

                        <div className="flex-column">
                            <b>Enter a quantity</b>
                            <Quantity />
                        </div>

                        <Price className="flex-column">
                            <AddButton onClick={this.add}>Add</AddButton>
                        </Price>

                        <Remove className="flex-column" onClick={this.flip}>
                            <b>-</b>
                        </Remove>
                    </Back>

                </Flipper>
            </FlipContainer>
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
