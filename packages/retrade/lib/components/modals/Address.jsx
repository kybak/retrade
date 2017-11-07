import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'


export default class Address extends React.Component {

    constructor(props) {
        super(props);

        // this.handleClick = this.handleClick.bind(this);
        // this.state = {showWhat: 'friends'}
    }


    render() {
        const {connected} = this.props;

        return (
            <div className="modal-view address-modal flex-column">
                <h3>Enter a new address</h3>

                <form className="address-form flex-column">

                        <input placeholder="Street"/>
                        <input placeholder="Zip Code"/>
                        <input placeholder="Country"/>
                        <input placeholder="City"/>

                    <button type="submit" className="button-large">FINALIZE ORDER</button>
                </form>

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
