import { combineReducers } from 'redux';
import {ADD_MOVIES, 
        ADD_SEARCH_RESULT, 
        ADD_TO_FAVOURITE, 
        REMOVE_FROM_FAVOURITE, 
        SET_SHOW_FAVOURITE,
        ADD_MOVIE_TO_LIST}   from '../actions';

const initialMoviesState = {
    list : [],
    favourites : [],
    showFavourites : false
}

export function movies (state = initialMoviesState, action) {
// if(action.type === ADD_MOVIES){
//  return {
//    ...state,
//    list : action.movies
//  }
// }
//  return state;
// }
switch (action.type) {
    case ADD_MOVIES :
    return {
        ...state,
        list : action.movies
    }
    
    case ADD_TO_FAVOURITE:
    return {
        ...state,
        favourites : [action.movie, ...state.favourites] 
    }

    case REMOVE_FROM_FAVOURITE:
    const filteredArray = state.favourites.filter(
        movie => movie.Title !== action.movie.Title
    );    
    return {
       ...state,
       favourites : filteredArray
    };

    case SET_SHOW_FAVOURITE:
     return {
         ...state,
         showFavourites : action.val
     }
    case ADD_MOVIE_TO_LIST:
    return {
         ...state,
        list: [action.movie, ...state.list]
    };
    default :
    return state;
}
}

const initialSearchState = {
    result : {},
    showSearchResults : false
};

export function search (state = initialSearchState, action)
{
    switch (action.type) {
    case ADD_SEARCH_RESULT:
    return {
        ...state,
        result : action.movie,
        showSearchResults: true
    }
    case ADD_MOVIE_TO_LIST:
    return {
         ...state,
        showSearchResults: false
        };
    default:
    return state;
    }
}

// const initialRootState = {
//     movies : initialMoviesState,
//     search : initialSearchState
// }

// export default function rootReducer (state=initialRootState, action) {
//    return {
//        movies: movies(state.movies, action),
//        search : search(state.search,action)
//    }
// }
// niche jo hai redux khudse ek combineReducers ka method provide karta hai jo rootReducer ka hi kaam krega



export default combineReducers({
    movies : movies,
    search : search
})