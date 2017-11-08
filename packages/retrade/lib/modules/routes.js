import { addRoute } from 'meteor/vulcan:core';

import Search from '../components/search/Search.jsx';
import Cart from '../components/cart/Cart.jsx';
import MainLayout from '../components/layouts/main-layout/MainLayout.jsx'
import { registerComponent } from 'meteor/vulcan:core';



registerComponent('MainLayout', MainLayout);


addRoute({ name: 'search', path: '/', component: Search, layoutName: "MainLayout"});
addRoute({ name: 'cart', path: '/cart', component: Cart, layoutName: "MainLayout"});

