import React from "react";
import axios from "axios";
import { Container, Col, Row, Button, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./main-view.scss";

import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

// #0
import { setMovies } from "../../actions/actions";
import { setUser } from "../../actions/actions";

import MoviesList from "../movies-list/movies-list";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { GenreView } from "../genre-view/genre-view";
import { DirectorView } from "../director-view/director-view";
import { ProfileView } from "../profile-view/profile-view";
import { UpdateView } from "../update-view/update-view";

class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      // movies: [],
      // user: null
      // userData: null,
      // register: false,
      // favourites: []
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
        userData: localStorage.getItem("userData")
      });

      this.getMovies(accessToken);
    }

    // ensures that the favourites array persists

    // if (this.state.favourites.length == 0) {
    //   let persistentFaves = localStorage.getItem("favourites");
    //   let faveArray = JSON.parse(persistentFaves);
    //   this.setState({
    //     favourites: faveArray
    //   });
    // }
  }

  getMovies(token) {
    axios
      .get("https://moviesDatabaseapi.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        // #1 Gets the movie info
        this.props.setMovies(response.data);
        // localStorage.setItem("movies", JSON.stringify(response.data));
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  getProfileInfo(token) {
    const username = localStorage.getItem("user");
    // #1.1 Gets the profile/user info
    axios
      .get(`https://moviesDatabaseapi.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        this.props.setUser(response.data);
        // this.setState({
        //   Username: response.data.Username,
        //   Email: response.data.Email,
        //   Birthdate: response.data.Birthday ? response.data.Birthday.substr(0, 10) : " ",
        //   FavouriteMovies: response.data.FavouriteMovies
        // });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  onLoggedIn(authData) {
    //Updates state when user has logged in
    this.setState({
      user: authData.user.Username
      // userData: authData.user.userData,
      // favourites: authData.user.FavouriteMovies,
      // userId: authData.user._id
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    localStorage.setItem("favourites", JSON.stringify(authData.user.FavouriteMovies));
    localStorage.setItem("userId", authData.user._id);
    localStorage.setItem("userData", JSON.stringify(authData.user));

    this.getMovies(authData.token);
    this.getProfileInfo(authData.token);
  }

  handleLogout() {
    localStorage.clear();

    this.setState({
      // movies: [],
      user: null
      // userData: null,
      // register: false,
      // favouriteMovies: []
    });
    window.open("/client", "_self");
  }

  render() {
    // #2
    let { movies, currentUser } = this.props;
    let { user } = this.state;

    console.log(this.props);

    // const { movies, user, favourites } = this.state;

    if (!movies && !currentUser) return <div className="main-view" />;

    if (!user) {
      return (
        <Router basename="/client">
          <div className="main-view">
            <Container>
              <Row className="justify-content-center">
                <Col>
                  <Route exact path="/" render={() => <LoginView onLoggedIn={user => this.onLoggedIn(user)} />} />
                </Col>
              </Row>

              <Row className="justify-content-center">
                <Col>
                  <Route path="/register" render={() => <RegistrationView />} />
                </Col>
              </Row>
            </Container>
          </div>
        </Router>
      );
    } else {
      return (
        <Router basename="/client">
          <Navbar sticky="top" bg="light" expand="lg" className="main-navbar mb-3 shadow-sm p-3 mb-5">
            <Link to={"/"}>
              <Navbar.Brand className="navbar-brand">My 1980s Movie API</Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
              <Link to={`/users/${user}`}>
                <Button
                  variant="primary ml-1"
                  size="sm"
                  className="profile-button"
                  onClick={() => {
                    return <ProfileView />;
                  }}
                >
                  Profile
                </Button>
              </Link>
              <Button variant="primary ml-1" size="sm" className="logout-button" onClick={() => this.handleLogout()}>
                Log out
              </Button>
            </Navbar.Collapse>
          </Navbar>
          <div className="main-view">
            <Container>
              <Row>
                <Route exact path="/" render={() => <MoviesList movies={movies} />} />
                <Route
                  path="/movies/:movieId"
                  render={({ match }) => <MovieView movie={movies.find(m => m._id === match.params.movieId)} />}
                />
                <Route
                  exact
                  path="/directors/:name"
                  render={({ match }) => {
                    if (!movies) return <div className="main-view" />;
                    return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} movies={movies} />;
                  }}
                />
                <Route
                  exact
                  path="/genres/:name"
                  render={({ match }) => {
                    if (!movies) return <div className="main-view" />;
                    return <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} movies={movies} />;
                  }}
                />
                <Route
                  exact
                  path="/users/:username"
                  render={() => {
                    if (!setUser) return <div className="main-view" />;
                    return <ProfileView movies={movies} user={user} currentUser={currentUser} />;
                  }}
                />
                <Route exact path="/users/:username/update" render={() => <UpdateView user={user} id={localStorage.getItem("userId")} />} />
              </Row>
            </Container>
          </div>
        </Router>
      );
    }
  }
}
// #3
let mapStateToProps = state => {
  return { movies: state.movies, currentUser: state.currentUser };
};
// #4
export default connect(mapStateToProps, { setMovies, setUser })(MainView);
