import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import FastCardStore from './store.js';

const appState = new FastCardStore()


ReactDOM.render(
  <App appState={appState}/>,
  document.getElementById('root')
);
