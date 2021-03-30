// {
//  type : 'ADD_MOVIES',
//  movies : [m1,m2,m3]
// }

export const ADD_MOVIES = 'ADD_MOVIES';

export function addMovies (movies) {
    return {
        type : ADD_MOVIES,
        movies : movies
    }
}