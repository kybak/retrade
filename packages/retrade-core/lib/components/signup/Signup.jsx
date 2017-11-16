import React from 'react';
import styled from 'styled-components'
import {boxShadow, borderRadius, transition} from '../../stylesheets/style.utils.js';
import Header from '../common/layouts/header/Header.jsx'
import Footer from '../common/layouts/footer/Footer.js'
import {ButtonPrimary} from '../common/presentational-components/buttons/ButtonPrimary.js'
import withCreateUser from '../../containers/withCreateUser.js'
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
      height: 46px;
      ${borderRadius("5px")}
      border-bottom-right-radius: 0;
      border-top-right-radius: 0;
      border-right: thin solid lightgray;
`;

const Input = styled.input`
    padding-left: 50px
`;


class Signup extends React.Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);


        this.state = {
            email: '',
            username: '',
            password: ''
        }

    }


    resetForm() {
        document.getElementById("auth-form").reset();
    }


    async handleSubmit(ev) {
        ev.preventDefault();


        try {
            const response = await this.props.createUser({variables: {input: this.state}});
            this.msg.success('Registration successful. ID is: ' + response.data.createUser._id, {
                time: 30000,
                type: 'success',
            });

            this.resetForm()

        } catch (error) {
            this.msg.error('Registration unsuccessful. ' + error, {
                time: 30000,
                type: 'error',
            });
        }

    }


    render() {

        return (
            <div className="flex-column">
                <AlertContainer ref={a => this.msg = a} />

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
                                    <i className="fa fa-envelope" aria-hidden="true"></i>
                                </IconContainer>
                                <Input placeholder="Name" onChange={ev=>this.setState({username: ev.target.value})}/>
                            </div>

                            <div className="relative flex-row align-center justify-center">
                                <IconContainer className="flex-row">
                                    <i className="fa fa-envelope" aria-hidden="true"></i>
                                </IconContainer>
                                <Input type="email" placeholder="Email" onChange={ev=>this.setState({email: ev.target.value})}/>
                            </div>

                            <div className="relative flex-row align-center justify-center">
                                <IconContainer className="flex-row">
                                    <i className="fa fa-lock" aria-hidden="true"></i>
                                </IconContainer>
                                <Input type="password" placeholder="Password" onChange={ev=>this.setState({password: ev.target.value})} />
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

export default withCreateUser(Signup)

/*
 App.propTypes = {
 connected: React.PropTypes.bool,
 loading: React.PropTypes.bool,
 likes: React.PropTypes.number,
 friends: React.PropTypes.number
 };*/
