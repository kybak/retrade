import React from 'react';
import { addRoute } from 'meteor/vulcan:core';
import { getComponent } from 'meteor/vulcan:lib';
import MainLayout from '../components/common/layouts/main-layout/MainLayout.jsx'
import { registerComponent } from 'meteor/vulcan:core';
// import Search from '../components/search/Search.jsx';
import Cart from '../components/cart/Cart.jsx';
import Signup from '../components/signup/Signup.jsx';
import PartListFull from '../components/account/PartListFull.jsx';
import Billing from '../components/account/modals/BillingF.jsx';
import Admin from '../components/admin/Admin.jsx';
import Account from '../components/account/Account.jsx';
// import MembersOnly from './authentication/MembersOnly.jsx'

// import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';





registerComponent('MainLayout', MainLayout);


addRoute({ name: 'app', path: '/', componentName: "App" });
addRoute({ name: 'search', path: '/search', componentName: "Search", layoutName: "MainLayout" });
addRoute({ name: 'cart', path: '/cart', componentName: "Cart", layoutName: "MainLayout"});
addRoute({ name: 'login', path: '/login', componentName: 'Login', layoutName: "MainLayout"});
addRoute({ name: 'signup', path: '/signup', component: Signup, layoutName: "MainLayout"});
addRoute({ name: 'billing', path: '/billing', component: Billing, layoutName: "MainLayout"});
addRoute({ name: 'admin', path: '/admin', component: Admin, layoutName: "MainLayout"});

`
Below you will find nested routes for group authentication
`;

///////////////////////////////////////////////////
//                  Members                      //
///////////////////////////////////////////////////

addRoute({ name: 'MembersOnly', componentName: 'MembersOnly' });
addRoute({
  name: 'account',
  path: '/account',
  component: Account,
  layoutName: "MainLayout"
}, 'MembersOnly');

addRoute({
  name: 'part-list',
  path: '/part-list',
  component: PartListFull,
  layoutName: "MainLayout"
}, 'MembersOnly');



/*
Meteor.startup( () => {
  render(
    <Router history={ browserHistory }>
      <Route path="/" component={ Index } />
    </Router>,
    document.getElementById( 'react-root' )
  );
});*/


