import {
    Components,
    registerComponent,
    registerSetting,
    getSetting,
    Strings,
    runCallbacks,
} from 'meteor/vulcan:lib';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, intlShape } from 'meteor/vulcan:i18n';
import {withCurrentUser} from 'meteor/vulcan:core';

class App extends PureComponent {
    constructor(props) {
        super(props);


    }


    componentDidUpdate(prevProps) {
     /*   const { dispatch, redirectUrl } = this.props
        const isLoggingOut = prevProps.isLoggedIn && !this.props.isLoggedIn
        const isLoggingIn = !prevProps.isLoggedIn && this.props.isLoggedIn

        if (isLoggingIn) {
            dispatch(navigateTo(redirectUrl))
        } else if (isLoggingOut) {
            // do any kind of cleanup or post-logout redirection here
        }*/
    }

    render() {
        return this.props.children
    }
}

// registerComponent('App', App);

/*function mapStateToProps(state) {
    return {
        isLoggedIn: state.loggedIn,
        redirectUrl: state.redirectUrl
    }
}*/

// registerComponent("App", App, withCurrentUser);
// export default withCurrentUser(App)