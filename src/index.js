import 'react-app-polyfill/ie11'; // For IE 11 support
import 'react-app-polyfill/stable';
import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

import "@coreui/coreui/scss/coreui.scss";
import "@coreui/coreui/dist/js/coreui.bundle.min.js"
import "@coreui/icons/js/svgxuse.min.js"


import { icons } from './assets/icons'

React.icons = icons


ReactDOM.render(
    <App />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
