import React from 'react';
//import ReactCSSTransitionGroup from 'react-addons-css-transition-group'


export default class Signup extends React.Component {

    constructor(props) {
        super(props);

        // this.handleClick = this.handleClick.bind(this);
        // this.state = {showWhat: 'friends'}
    }



    render() {
        const {connected} = this.props;

        return (
            <div className="signup flex-column container">
                <div className="flex-row slice1">
                    <h1>SIGN UP</h1>
                    <img src="/bulb_smooth.png" height="250"/>
                </div>
                {/*<div className="slice2"></div>*/}
                <div className="flex-row bottom-bar">©2017 ReTrade</div>
                <div className="flex-column signup-container">
                    <img src="/link.svg" height="60"/>
                    <b>Ten seconds. Millions of products.</b>

                    <form className="flex-column auth-form">
                        <div className="input-column flex-column">
                            <div className="input-row flex-row">
                                <div className="flex-row  icon-container">
                                    <i className="fa fa-user" aria-hidden="true"></i>
                                </div>
                                <input placeholder="Name"/>
                            </div>

                            <div className="input-row flex-row">
                                <div className="flex-row  icon-container">
                                    <i className="fa fa-envelope" aria-hidden="true"></i>
                                </div>
                                <input placeholder="Email"/>
                            </div>

                            <div className="input-row flex-row">
                                <div className="flex-row  icon-container">
                                    <i className="fa fa-lock" aria-hidden="true"></i>
                                </div>
                                <input placeholder="Password"/>
                            </div>
                        </div>


                        <button className="button-large" type="submit">SUBMIT</button>

                    </form>
                </div>
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
