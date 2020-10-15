import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore , applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';
import {  Router } from 'react-router-dom';
import reducers from './reducers';
import App from './component/App';
const store = createStore(reducers , applyMiddleware(thunk,logger));
const history = createBrowserHistory({ basename: `${process.env.REACT_APP_BASE_URL}`});
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <Router history={history}>   
            <App />
        </Router>
    </Provider>,
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();