import React from 'react';
import { addRoute } from 'meteor/vulcan:core';
import { getComponent } from 'meteor/vulcan:lib';
import MainLayout from '../components/common/layouts/main-layout/MainLayout.jsx'
import { registerComponent } from 'meteor/vulcan:core';
import Cart from '../components/cart/Cart.jsx';
import PartListFull from '../components/account/PartListFull.jsx';
import Billing from '../components/account/modals/BillingF.jsx';
import Admin from '../components/admin/Admin.jsx';
import AccountSeller from '../components/account/AccountSeller.jsx';
import AccountBuyer from '../components/account/AccountBuyer.jsx';
import OrderReceived from '../components/cart/OrderReceived.jsx'
import Orders from '../components/orders/Orders.jsx'
import Signup from '../components/signup/Signup.jsx'




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

addRoute({ name: 'MembersOnly', componentName: 'MembersOnly', path: '/members', });

addRoute({
  name: 'part-list',
  path: '/part-list',
  component: PartListFull,
  layoutName: "MainLayout"
}, 'MembersOnly');

addRoute({
  name: 'order-received',
  path: '/order-received',
  component: OrderReceived,
  layoutName: "MainLayout"
}, 'MembersOnly');

addRoute({
  name: 'orders',
  path: '/orders',
  component: Orders,
  layoutName: "MainLayout"
}, 'MembersOnly');


///////////////////////////////////////////////////
//               Account Hook                    //
///////////////////////////////////////////////////


addRoute({ name: 'CheckMembership', componentName: 'CheckMembership', path:'/account' });

addRoute({
  name: 'account',
  path: '/account',
  component: AccountBuyer,
  layoutName: "MainLayout"
}, 'CheckMembership');

addRoute({
  name: 'account-seller',
  path: '/account/seller',
  component: AccountSeller,
  layoutName: "MainLayout"
}, 'CheckMembership');

addRoute({
  name: 'account-buyer',
  path: '/account/buyer',
  component: AccountBuyer,
  layoutName: "MainLayout"
}, 'CheckMembership');


/*
Meteor.startup( () => {
  render(
    <Router history={ browserHistory }>
      <Route path="/" component={ Index } />
    </Router>,
    document.getElementById( 'react-root' )
  );
});*/


