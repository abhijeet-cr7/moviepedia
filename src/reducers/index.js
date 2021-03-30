export default function movies (state = [], action) {
if(action.type === 'ADD_MOVIES'){
 console.log('yeh hai action', action.movies);
 return action.movies;
}
 return state;
}