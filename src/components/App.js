import React from "react";
import { data as moviesList } from "../data";
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import { addMovies, setShowFavourite } from "../actions";
import { connect } from "react-redux";

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(addMovies(moviesList));
    //   const { store } = this.props;
    //   store.subscribe(() => {
    //     console.log('UPDATED');
    //     this.forceUpdate();
    //   });
    // // make api call
    // // dispatch action
    // store.dispatch(addMovies(data));
    // //  store.dispatch ({
    //   //    type : 'ADD_MOVIES',
    //   //    movies : data
    //   //  });
  }

  isMovieFavourite = (movie) => {
    // const { movies } = this.props.store.getState();
    const { movies } = this.props;
    const index = movies.favourites.indexOf(movie);
    if (index !== -1) {
      // found the movie
      return true;
    }
    return false;
  };

  onChangeTab = (val) => {
    this.props.dispatch(setShowFavourite(val));
  };
  render() {
    // const {movies, search}  = this.props.store.getState();
    const { movies, search } = this.props;
    const { list, favourites, showFavourites } = movies;
    // {list : [], favourites : []} ye pehle ka hai
    // ab jo state hai wo rootreducer dalne k baad kuch aisa dikhega
    // {movies : {}, search : {}}
    // console.log('RENDER', this.props.getState());
    const displayMovies = showFavourites ? favourites : list;

    return (
      <div className="App">
        <Navbar search={search} />
        <div className="main">
          <div className="tabs">
            <div
              className={`tab ${showFavourites ? "" : "active-tabs"}`}
              onClick={() => this.onChangeTab(false)}
            >
              Movies
            </div>
            <div
              className={`tab ${showFavourites ? "active-tabs" : ""}`}
              onClick={() => this.onChangeTab(true)}
            >
              Favourites
            </div>
          </div>
          <div className="list">
            {displayMovies.map((movie, index) => (
              <MovieCard
                movie={movie}
                key={`movies-${index}`}
                dispatch={this.props.dispatch}
                isFavourite={this.isMovieFavourite(movie)}
              />
            ))}
          </div>
          {displayMovies.length === 0 ? (
            <div className="no-movies">No movies to display!</div>
          ) : null}
        </div>
      </div>
    );
  }
}

//  class AppWrapper extends React.Component {
//    render(){
//    return (
//    <StoreContext.Consumer>
//     {(store) => <App store={store } />}
//    </StoreContext.Consumer>
//    );
//    }
//  }

function mapStateToProps(state) {
  return {
    movies: state.movies,
    search: state.movies,
  };
  //  ye callback function ye bata raha haii ki itna data jo hai wo "app" mei pass krdo store se as props
}

// export default AppWrapper;
// storecontext.consumer sirf movie render ke andar chalega aur upar app k around ek wrapper lagae hai jiske karan pass hoga context api
const connectedAppComponent = connect(mapStateToProps)(App);
// upar connect(callback)(App) ye karega ki ek component lautaega jisko hm store kar rhe connected app component mein
export default connectedAppComponent;
// upar jo component connect hai wahi rerender hoga pura nahi hoga
