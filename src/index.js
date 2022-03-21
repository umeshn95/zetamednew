import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { positions, Provider as AlertProvider, } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { Provider } from 'react-redux'
import Store  from './Store'

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER
};

ReactDOM.render(
  <Provider store={Store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </Provider>,

  document.getElementById("root")
);