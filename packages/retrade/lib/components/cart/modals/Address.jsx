import React from 'react';
import { ModalContainer } from '../../layouts/modal/ModalLayout.js'
import ButtonPrimary from '../../buttons/ButtonPrimary.jsx'
import styled, { keyframes } from 'styled-components'
import { borderRadius, boxShadow, animationFillMode } from '../../../stylesheets/style.utils.js';


const popOut = keyframes `
    0% {
    opacity: 1;
    height:0;
    width:0;
  }

  25% {
    height: 450px;
    width: 370px;
  }

  50% {
    height:375px;
    width:295px;
  }

  75% {
    height:415px;
    width:335px;
  }

  100% {
    opacity: 1;
    height:400px;
    width:320px;
  }
`;

const Modal = styled.div`
  animation: ${popOut} 0.6s linear;
  animation-delay: .2s;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity:0;
  background: white;
  align-items: center;
  padding:20px;
  min-width: 350px;
  ${animationFillMode("forwards")};
  ${borderRadius("10px")};
  ${boxShadow("1px", "1px", "50px", "0", "rgba(0, 0, 0, 0.36)")};
`;

const AddressForm = styled.form`
    height:100%;
    width:100%;
    margin-top:20px;
`;

export default class AddressModal extends React.Component {

  constructor(props) {
    super(props);

    // this.handleClick = this.handleClick.bind(this);
    this.state = {
      displayContents: false
    }

  }

    componentDidMount() {
      setTimeout(()=> {
        this.setState({displayContents: true})
      }, 300)
    }

    getModalContent() {
      return (
        <div className="flex-column justify-center align-center">
          <h3>Enter a new address</h3>

          <AddressForm className="flex-column justify-space-between">

            <input placeholder="Street"/>
            <input placeholder="Zip Code"/>
            <input placeholder="Country"/>
            <input placeholder="City"/>

            <ButtonPrimary name="FINALIZE ORDER"/>
          </AddressForm>
        </div>
      )
    }


  render() {
    return (
      <ModalContainer>
          <Modal>
              {this.state.displayContents &&
                  this.getModalContent()
              }

          </Modal>
      </ModalContainer>
    )
  }
}
