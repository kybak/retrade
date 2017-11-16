import { addRoute } from 'meteor/vulcan:core';
import MainLayout from '../components/common/layouts/main-layout/MainLayout.jsx'
import { registerComponent } from 'meteor/vulcan:core';
import Search from '../components/search/Search.jsx';
import Cart from '../components/cart/Cart.jsx';
import Login from '../components/login/Login.jsx';
import Signup from '../components/signup/Signup.jsx';



registerComponent('MainLayout', MainLayout);


addRoute({ name: 'search', path: '/', component: Search, layoutName: "MainLayout"});
addRoute({ name: 'cart', path: '/cart', component: Cart, layoutName: "MainLayout"});
addRoute({ name: 'login', path: '/login', component: Login, layoutName: "MainLayout"});
addRoute({ name: 'signup', path: '/signup', component: Signup, layoutName: "MainLayout"});

