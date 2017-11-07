import React from 'react';
//import ReactCSSTransitionGroup from 'react-addons-css-transition-group'


export default class Add extends React.Component {

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
            <div className="search flex-column container">

                <div className="flex-row menu">
                    <img src="/lightbulb_white.png" height="35"/>
                    <b>Add</b>
                    <b>Help</b>
                    <span>|</span>
                    <div className="flex-row">
                        <span>Norautron</span>
                        <i className="fa fa-caret-down" aria-hidden="true"></i>
                    </div>
                </div>

                <div className="flex-column slice1">
                    <h1>SEARCH</h1>
                    <h1><span>RE</span>TRADE</h1>
                    {/*<img src="/bulb_smooth.png" height="200"/>*/}
                </div>
                {/*<div className="slice2"></div>*/}
                <div className="flex-column search-container">

                    <form className="flex-column search-form">
                        <div className="input-row flex-row">
                            <div className="flex-row icon-container">
                                <i className="fa fa-search" aria-hidden="true"></i>
                            </div>
                            <input placeholder="Search by component (eg. HOLDER SZ-2591 29MM)"/>
                            <button className="flex-column button-go">GO</button>
                        </div>
                    </form>

                </div>


                <div className="flex-column search-results">

                    <div className="flex-row result-box">
                        <div className="flex-column">
                            <b>DI SCHOTTKY MBRS340   FCS</b>
                            <span>500 000 pieces</span>
                        </div>

                        <div className="flex-column price">
                            <span>100 NKr</span>
                        </div>

                        <div className="flex-column add">
                            <b>+</b>
                        </div>
                    </div>

                    <div className="flex-row result-box">
                        <div className="flex-column">
                            <b>DI SCHOTTKY MBRS340   FCS</b>
                            <span>500 000 pieces</span>
                        </div>

                        <div className="flex-column price">
                            <span>100 NKr</span>
                        </div>

                        <div className="flex-column add">
                            <b>+</b>
                        </div>
                    </div>

                    <div className="flex-row result-box">
                        <div className="flex-column">
                            <b>DI SCHOTTKY MBRS340   FCS</b>
                            <span>500 000 pieces</span>
                        </div>

                        <div className="flex-column price">
                            <span>100 NKr</span>
                        </div>

                        <div className="flex-column add">
                            <b>+</b>
                        </div>
                    </div>

                </div>

                <div className="flex-row bottom-bar">©2017 ReTrade</div>
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
