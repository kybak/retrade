import React from 'react';
import ReactDOM from 'react-dom'
//import ReactCSSTransitionGroup from 'react-addons-css-transition-group'


export default class Modal extends React.Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        const $this = $(ReactDOM.findDOMNode(this));
        if ($this) Session.set('modalLayoutReady', true)
    };

    componentWillUnmount() {
        Session.set('modalLayoutReady', false)
    }


    render() {
        const {connected} = this.props;


        return (
            <div id="modal">


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
