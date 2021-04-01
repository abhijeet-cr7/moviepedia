import React from 'react';
import ReactDOM from 'react-dom';
import { createStore , applyMiddleware} from 'redux';
// keep package imports at the top and file imports below that
import './index.css';
import App from './components/App';
import movies from './reducers';

const logger = function ({dispatch, getState})
{
return function (next) {
  return function (action) {
    // middleware code
    console.log('ACTION_TYPE = ', action.type);
    next(action);
  }
}


}

const store = createStore(movies, applyMiddleware(logger));
console.log('store', store);
// console.log('BEFORE STATE', store.getState());

// store.dispatch({
//   type: 'ADD_MOVIES',
//   movies : [{ name: 'Superman'}]
// })
// // using dispatch you can send action to the store
// console.log('AFTER STATE', store.getState());

ReactDOM.render(
  
    <App store = {store} />
  ,
  document.getElementById('root')
);

