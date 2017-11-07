import React from 'react';
//import ReactCSSTransitionGroup from 'react-addons-css-transition-group'


export default class Login extends React.Component {

    constructor(props) {
        super(props);

        // this.handleClick = this.handleClick.bind(this);
        // this.state = {showWhat: 'friends'}
    }

    /*   getLikes() {
     const {
     likes,
     loading
     } = this.props;

     return loading ? 'Loading' : likes
     }

     getFriends() {
     const {
     friends,
     loading
     } = this.props;

     return loading ? 'Loading' : friends
     }*/
    /*
     handleClick() {
     const showWhat = this.state.showWhat;
     showWhat == 'friends' ? this.setState({showWhat: 'likes'}) : this.setState({showWhat: 'friends'})
     }*/

    render() {
        // let showWhat = this.state.showWhat;
        const {connected} = this.props;
        /*getHeader = ()=> {
         return showWhat == 'likes' ? <h1>Likes: {this.getLikes()}</h1> : <h1>Friends: {this.getFriends()}</h1>
         }*/

        return (
            <div className="login flex-column container">
                <div className="slice1-filter"></div>
                <div className="flex-row slice1">
                    <h1>LOGIN</h1>
                    {/*<img src="/bulb_smooth.png" height="250"/>*/}
                </div>
                {/*<div className="slice2"></div>*/}
                <div className="flex-row bottom-bar">©2017 ReTrade</div>
                <div className="flex-column signup-container">
                    <img src="/login.svg" height="60"/>
                    <b>Login below to search for products.</b>

                    <form className="flex-column auth-form">
                        <div className="input-column flex-column">

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


                        <button className="button-large" type="submit">LOGIN</button>

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
