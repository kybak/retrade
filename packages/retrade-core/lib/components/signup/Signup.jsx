import React from 'react';
import {withCurrentUser, registerComponent} from 'meteor/vulcan:core'
import styled from 'styled-components'
import {boxShadow, borderRadius, transition} from '../../stylesheets/style.utils.js'
import Header from '../common/layouts/header/Header.jsx'
import Footer from '../common/layouts/footer/Footer.js'
import {ButtonPrimary} from '../common/presentational-components/buttons/ButtonPrimary.js'
import withCreateUser from '../../containers/withCreateUser.js'
import AlertContainer from 'react-alert'
import {TextInput} from '../common/presentational-components/inputs/TextInput.js'


const Banner = styled.div`
  background-image: url('/packages/retrade_core/lib/static/Electronics.png');
  height: 250px;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  justify-content: center;
  overflow: hidden;
  //align-items: center;

  ${transition("all", ".5s")}

  img {
    position: absolute;
    right: 30%;
    z-index: -1;
  }

  h1 {
    margin-top: 50px;
    color: white;
    font-family: Lulo Clean;
  }
`;

const Filter = styled.div`
  background: rgba(0, 0, 0, 0.75);
  height: 250px;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -2;
`;

const SignupContainer = styled.div`
  height: 500px;
  width: 400px;
  padding: 22px;
  background: white;
  position: absolute;
  left: 50%;
  top:50%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  ${boxShadow("1px", "1px", "10px", "0", "rgba(0, 0, 0, 0.38)")}

  img {
    margin-top: 20px;
  }

  b {
    text-align: center;
    margin-top: 20px;
  }
`;

const AuthForm = styled.form`
  justify-content: space-between;
  flex-grow: 1;
  margin-top: 50px;

  input {
    width: 325px;
  }

  .input-row {
    width: 80%;

    .icon-container {
      height: 39px;
    }
  }
`;

const IconContainer = styled.div`
      position: absolute;
      color: gray;
      align-items: center;
      justify-content: center;
      left: 1px;
      top: 50%;
      -webkit-transform: translateY(-50%);
      -moz-transform: translateY(-50%);
      -ms-transform: translateY(-50%);
      -o-transform: translateY(-50%);
      transform: translateY(-50%);
      background: #ebf7ff;
      width: 42px;
      height: 40px;
      ${borderRadius("5px")}
      border-bottom-right-radius: 0;
      border-top-right-radius: 0;
      border-right: thin solid lightgray;
`;

const Input = styled.input`
    padding-left: 50px
`;

const AlreadyRegisteredLink = styled.span`
    text-decoration: underline;
    cursor: pointer;
    color: #0295aa;
`;


class Signup extends React.Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.reset = this.reset.bind(this);


        this.state = {
            email: '',
            username: '',
            password: ''
        }

    }


    reset() {
        this.setState({email: '', password: '', username: ''});
        document.getElementById("auth-form").reset();
    }


    async handleSubmit(ev) {
        ev.preventDefault();

        Accounts.createUser(this.state, (err) => {
            if (err) {
                console.log(err);
            } else {
                Meteor.loginWithPassword(this.state.email, this.state.password, (err) => {
                    if (!err) {
                        window.location = '/account'
                    } else {
                    }
                });
            }
        });

    }


    render() {

        return (
            <div className="flex-column">
                {/*<AlertContainer ref={a => this.msg = a} />*/}

                <Header/>
                <Filter/>
                <Banner className="flex-row">
                    <h1>Signup</h1>
                </Banner>

                <SignupContainer className="flex-column">
                    <img src="/packages/retrade_core/lib/static/link.svg" height="60"/>
                    <b>10 seconds. Millions of products.</b>

                    <AuthForm id="auth-form" onSubmit={this.handleSubmit} className="flex-column">
                        <div className="flex-column align-center justify-center full-width">

                            <div className="relative flex-row align-center justify-center">
                                <IconContainer className="flex-row">
                                    <i className="fa fa-user" aria-hidden="true"></i>
                                </IconContainer>
                                <TextInput auth placeholder="Company Name" required="true"
                                           onChange={ev => this.setState({username: ev.target.value})}/>
                            </div>

                            <div className="relative flex-row align-center justify-center">
                                <IconContainer className="flex-row">
                                    <i className="fa fa-envelope" aria-hidden="true"></i>
                                </IconContainer>
                                <TextInput auth type="email" placeholder="Email" required="true"
                                           onChange={ev => this.setState({email: ev.target.value})}/>
                            </div>

                            <div className="relative flex-row align-center justify-center">
                                <IconContainer className="flex-row">
                                    <i className="fa fa-lock" aria-hidden="true"></i>
                                </IconContainer>
                                <TextInput auth type="password" placeholder="Password" required="true"
                                           onChange={ev => this.setState({password: ev.target.value})}/>
                            </div>

                            <div style={{width: "325px"}} className="flex-row justify-end">
                                <AlreadyRegisteredLink onClick={() => window.location = '/login'}>Already
                                    registered?</AlreadyRegisteredLink>
                            </div>
                        </div>


                        <ButtonPrimary type="submit">SIGN UP</ButtonPrimary>

                    </AuthForm>
                </SignupContainer>

                <Footer/>
            </div>
        )
    }
}

// registerComponent('Signup', Signup, withCurrentUser);
export default Signup

/*
 App.propTypes = {
 connected: React.PropTypes.bool,
 loading: React.PropTypes.bool,
 likes: React.PropTypes.number,
 friends: React.PropTypes.number
 };*/
