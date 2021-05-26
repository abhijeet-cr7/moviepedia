import React, { createContext } from 'react';
import {Provider} from 'react-redux';
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

// middleware code
const logger = ({dispatch, getState}) => (next) => (action) => {
// logger code
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
  
// thunk is a middleware which lets you call action creator that returns function instead of the action object
const store = createStore(combineReducers, applyMiddleware(logger,thunk));
console.log('store', store);

// export const StoreContext = createContext();

// console.log('StoreContext', StoreContext);

// class Provider extends React.Component {
//  render() {
//    const {store} = this.props; 
//    return (
// <StoreContext.Provider value={store}>
//   {/* yaha upar value mein jo pass ho raha hai whai milega sab descendent sab ko */}
//   {/* jab bhi value change hoga tab tab consumer sb rerender hoga */}
// {this.props.children}
// {/* yaha par sirf app hi children hai niche mein */}
// </StoreContext.Provider>
// );
// }
// }

// // const connectedAppComponent = connect(callback)(App);
// export function connect (callback) {
// return function (Component){
// class ConnectedComponent extends React.Component{
//   constructor(props)
//   {
//   super(props);
//   this.unsubscribe = this.props.store.subscribe(() => {
//     this.forceUpdate()
//     // this.props.store.subscribe() returns me a function which can be used to unsubscribe to prevent memory leaks.
//   });
//   }

// componentWillUnmount () {
//  this.unsubscribe();
// }

//   render () {
        
//         const {store} = this.props;
//         const state = store.getState();
//         const dataToBePassedAsProps = callback(state);
//         // callback returns an object that contains key value pairs
//         return (
//         <Component {...dataToBePassedAsProps}  dispatch={store.dispatch} />
//         )
//           // ye dataToBePassedAsProps k jagah properties jaega movie aur search spread operator k help se
//       }
//       }
  
//   class ConnectedComponentWrapper extends React.Component {
//     render(){
//     return (
//          <StoreContext.Consumer>
//          {(store) => {
//          return <ConnectedComponent store={store} />}
//          }
//         </StoreContext.Consumer>
//          );
//        }
//       }
//   return ConnectedComponentWrapper;
//    };
// }
// console.log('BEFORE STATE', store.getState());

// store.dispatch({
//   type: 'ADD_MOVIES',
//   movies : [{ name: 'Superman'}]
// })
// // using dispatch you can send action to the store
// console.log('AFTER STATE', store.getState());

// upar jitna bhi code commented hai uska package jo hai react redux provide kr de raha hai

ReactDOM.render(
    <Provider store={store}>
    <App />
    </Provider>
    ,
  document.getElementById('root')
);

