import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import {BrowserRouter as Router} from "react-router-dom"
import reducer from './context/reducer';

import {StateProvider} from "./context/StateProvider"
import {initialState} from "./context/Initialstate"

ReactDOM.render(
  <Router>
    <StateProvider initialstate={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </Router>,
  document.getElementById('root')
);

