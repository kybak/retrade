import React from 'react';
import styled from 'styled-components'
import {boxShadow, borderRadius, transition} from '../../stylesheets/style.utils.js';
import Header from '../common/layouts/header/Header.jsx'
import Footer from '../common/layouts/footer/Footer.js'
import {ButtonPrimary} from '../common/presentational-components/buttons/ButtonPrimary.js'
import AlertContainer from 'react-alert'


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

const SignupContainer = styled.div.attrs({
    $top: props => props.top,
    $display: props => props.display
})`
    top: ${props => props.$top};
    display: ${props => props.$display};    
    height: 500px;
    width: 400px;
    padding: 22px;
    background: white;
    position: absolute;
    left: 50%;
    flex-direction: column;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    ${boxShadow("1px", "1px", "10px", "0", "rgba(0, 0, 0, 0.38)")}
    ${transition("all", ".5s")};
    
    
    img {
      margin-top: 20px;
    }
    
    b {
      text-align: center;
      margin-top: 20px;
    }
  `;


const ForgotPasswordContainer = SignupContainer.extend`
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
      height: 46px;
      ${borderRadius("5px")}
      border-bottom-right-radius: 0;
      border-top-right-radius: 0;
      border-right: thin solid lightgray;
`;

const Input = styled.input`
    padding-left: 50px
`;

const ForgotPasswordLink = styled.span`
    text-decoration: underline;
    cursor: pointer;
    color: #0295aa;
`;


export default class Login extends React.Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.forgotPassword = this.forgotPassword.bind(this);
        this.backToLogin = this.backToLogin.bind(this);
        this.reset = this.reset.bind(this);

        this.state = {
            email: '',
            password: '',
            topL: '50%',
            topF: '50%',
            hideLogin: "flex",
            hideForgot: "none",
        }
    }

    forgotPassword() {
        document.getElementsByTagName('body')[0].style.overflow = "hidden";
        this.setState({topF: "50%"});
        this.setState({topL: "150%"});

        setTimeout(()=> {
            this.setState({hideLogin: "none"});
            this.setState({hideForgot: "flex"});

            document.getElementsByTagName('body')[0].style.overflow = "auto";
        }, 500)
    }

    backToLogin() {
        document.getElementsByTagName('body')[0].style.overflow = "hidden";
        this.setState({topL: "50%"});
        this.setState({topF: "150%"});

        setTimeout(()=> {
            this.setState({hideLogin: "flex"});
            this.setState({hideForgot: "none"});

            document.getElementsByTagName('body')[0].style.overflow = "auto";
        }, 500)
    }

    reset() {
        this.setState({email: '', password: ''});
        document.getElementById("auth-form").reset();
    }

    handleSubmit(ev) {
        ev.preventDefault();

        Meteor.loginWithPassword(this.state.email, this.state.password, (err, res)=> {
            if (!err) {
                this.msg.success('Login successful. ID is: ' + Meteor.userId(), {
                    time: 30000,
                    type: 'success',
                });

                this.reset();
            } else {
                this.msg.error(err.message, {
                    time: 30000,
                    type: 'error',
                });
            }
        });
    }

    /*componentDidMount() {
        this.setState({top: "50%"})
    }*/

    render() {

        return (
            <div className="flex-column">
                <AlertContainer ref={a => this.msg = a} />

                <Header/>
                <Filter/>
                <Banner className="flex-row">
                    <h1>LOGIN</h1>
                </Banner>

                <SignupContainer top={this.state.topL} display={this.state.hideLogin}>
                    <img src="/packages/retrade_core/lib/static/login.svg" height="60"/>
                    <b>Login below to search for products.</b>

                    <AuthForm id="auth-form" onSubmit={this.handleSubmit} className="flex-column">
                        <div className="flex-column align-center justify-center full-width">

                            <div className="relative flex-row align-center justify-center">
                                <IconContainer className="flex-row">
                                    <i className="fa fa-envelope" aria-hidden="true"></i>
                                </IconContainer>
                                <Input type="email" placeholder="Email" required="true" onChange={e=>this.setState({email: e.target.value})} />
                            </div>

                            <div className="relative flex-row align-center justify-center">
                                <IconContainer className="flex-row">
                                    <i className="fa fa-lock" aria-hidden="true"></i>
                                </IconContainer>
                                <Input type="password" placeholder="Password" required="true" onChange={e=>this.setState({password: e.target.value})}/>
                            </div>

                            <div style={{width: "325px"}} className="flex-row justify-end">
                                <ForgotPasswordLink onClick={this.forgotPassword}>Forgot password?</ForgotPasswordLink>
                            </div>
                        </div>


                        <ButtonPrimary type="submit">LOGIN</ButtonPrimary>

                    </AuthForm>
                </SignupContainer>

                <ForgotPasswordContainer top={this.state.topF} display={this.state.hideForgot}>
                    <img src="/packages/retrade_core/lib/static/login.svg" height="60"/>
                    <b>Enter your email to reset your password.</b>

                    <AuthForm id="forgot-form" className="flex-column">
                        <div className="flex-column align-center justify-center full-width">

                            <div className="relative flex-row align-center justify-center">
                                <IconContainer className="flex-row">
                                    <i className="fa fa-envelope" aria-hidden="true"></i>
                                </IconContainer>
                                <Input type="email" placeholder="Email" required="true" onChange={e=>this.setState({email: e.target.value})} />
                            </div>


                            <div style={{width: "325px"}} className="flex-row justify-end">
                                <ForgotPasswordLink onClick={this.backToLogin}>Back to login</ForgotPasswordLink>
                            </div>
                        </div>


                        <ButtonPrimary type="submit">RESET</ButtonPrimary>

                    </AuthForm>
                </ForgotPasswordContainer>

                <Footer/>
            </div>
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
