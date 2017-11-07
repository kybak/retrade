import { addRoute } from 'meteor/vulcan:core';

import Search from '../components/layouts/search/Search.jsx';
import MainLayout from '../components/layouts/main-layout/MainLayout.jsx'
// import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { registerComponent } from 'meteor/vulcan:core';



registerComponent('MainLayout', MainLayout);


addRoute({ name: 'search', path: '/', component: Search, layoutName: "MainLayout"});

