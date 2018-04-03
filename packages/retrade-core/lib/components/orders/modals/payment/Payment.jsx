import React from 'react';
import {registerComponent, withCurrentUser, withEdit} from 'meteor/vulcan:core'
import {render} from 'react-dom';
import {StripeProvider} from 'react-stripe-elements';
import Users from 'meteor/vulcan:users'
import {ModalContainer} from '../../../common/layouts/modal/ModalLayout.js'
import {ButtonPrimary} from '../../../common/presentational-components/buttons/ButtonPrimary.js'
import styled, {keyframes} from 'styled-components'
import {borderRadius, boxShadow, animationFillMode} from '../../../../stylesheets/style.utils.js'
import TextField from 'material-ui/TextField'
import StripeElements from './StripeElements'

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
  justify-content: space-between;
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

class PaymentModal extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            displayContents: false,
            address: "",
            country: "",
            stripe: null
        }

    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({displayContents: true})
        }, 300)

        if (window.Stripe) {
            this.setState({stripe: window.Stripe('pk_test_pIVJgEcWnHHaozH6AggWD0Yu')});
        } else {
            document.querySelector('#stripe-js').addEventListener('load', () => {
                // Create Stripe instance once Stripe.js loads
                this.setState({stripe: window.Stripe('pk_test_pIVJgEcWnHHaozH6AggWD0Yu')});
            });
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleSubmit(e) {
        e.preventDefault();

        this.props.close(true);
    }



    render() {
        return (
            <ModalContainer>
                <Modal>
                    <h1>Payment Details</h1>

                    <StripeProvider stripe={this.state.stripe} >
                        <StripeElements user={this.props.currentUser} editUser={(data)=> this.props.editMutation(data)} selected={this.props.selected} closeModal={this.props.closeModal}/>
                    </StripeProvider>
                </Modal>
            </ModalContainer>
        )
    }
}

const mutationOptions = {
    collection: Users,
    fragmentName: 'UsersCurrent'
};

registerComponent('PaymentModal', PaymentModal, withCurrentUser, [withEdit, mutationOptions]);
export default withCurrentUser(PaymentModal)
