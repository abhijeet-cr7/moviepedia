import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import { createStore , applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

// keep package imports at the top and file imports below that
import './index.css';
import App from './components/App';
import combineReducers from './reducers';

// logger is the curried form of function logger(obj, next, action)
// const logger = function ({dispatch, getState})
// // takes object as argument and this is not the store object
// {
// return function (next) {
//   return function (action) {
//     // middleware code
//     console.log('ACTION_TYPE = ', action.type);
//     next(action);
//   }
// }
// }

const logger = ({dispatch, getState}) => (next) => (action) => {
// logger code
console.log(dispatch,getState);
if(typeof action !== 'function'){
  console.log('ACTION_TYPE =', action.type);
}
next(action);
}


// const thunk = ({dispatch, getState}) => (next) => (action) => {
//   // logger code
//   if(typeof action === 'function'){
//     action(dispatch);
//     return;
//   }
//   next(action);
//   }
  

const store = createStore(combineReducers, applyMiddleware(logger,thunk));
console.log('store', store);

export const StoreContext = createContext();
console.log('StoreContext', StoreContext);

class Provider extends React.Component {
 render() {
   const {store} = this.props; 
   return (
<StoreContext.Provider value={store}>
{this.props.children}
</StoreContext.Provider>
);
}
}

// console.log('BEFORE STATE', store.getState());

// store.dispatch({
//   type: 'ADD_MOVIES',
//   movies : [{ name: 'Superman'}]
// })
// // using dispatch you can send action to the store
// console.log('AFTER STATE', store.getState());

ReactDOM.render(
    <Provider store={store}>
    <App store={store} />
    </Provider>
    ,
  document.getElementById('root')
);

