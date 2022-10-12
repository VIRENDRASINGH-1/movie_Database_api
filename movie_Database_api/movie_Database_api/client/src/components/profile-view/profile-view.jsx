import React from "react";
import axios from "axios";
import { setMovies } from "../../actions/actions";
import { setUser } from "../../actions/actions";
import { connect } from "react-redux";
import "./profile-view.scss";
import { Link } from "react-router-dom";
import { Spinner, Button, Media, Card } from "react-bootstrap";

export class ProfileView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    //authentication
    const accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }

  getUser(token) {
    const username = localStorage.getItem("user");

    axios
      .get(`https://moviesDatabaseapi.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` }
      })

      .then(res => {
        this.setState({
          Username: res.data.Username,
          Password: res.data.Password,
          Email: res.data.Email,
          Birthday: res.data.Birthday ? res.data.Birthday.substr(0, 10) : " ",
          FavouriteMovies: res.data.FavouriteMovies
        });
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  deleteFavourite(movieId) {
    const user = localStorage.getItem("user");

    axios
      .delete(`http://moviesDatabaseapi.herokuapp.com/users/${user}/Movies/${movieId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      .then(res => {
        this.setState({
          FavouriteMovies: res.data.FavouriteMovies
        });
      })
      .catch(event => {
        console.log("Cannot delete movie from list");
      });
    this.setState;
  }

  render() {
    const { movies, currentUser, user } = this.props;
    console.log("Profile-view state: ", currentUser);

    let favouritesList;
    if (this.state.FavouriteMovies) {
      favouritesList = movies.filter(m => this.state.FavouriteMovies.includes(m._id));
    }

    console.log("Profile-view favList: ", favouritesList);

    if (!favouritesList)
      return (
        <Spinner animation="border" variant="info" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      );

    return (
      <div className="profile-view">
        <Media className="d-flex flex-column flex-md-row align-items-center ml-xs-5">
          <Media.Body>
            <h2>{this.state.Username}'s Profile</h2>
            <Link to={`/`}>
              <Button className="back-to-main float-right" variant="primary">
                Back
              </Button>
            </Link>
            <Link to={"/users/:username/update"}>
              <Button className="link-to-update float-right" variant="primary">
                Update Profile
              </Button>
            </Link>
            <h4>Username: {this.state.Username}</h4>
            <h4>Email: {this.state.Email}</h4>
            <h4>Birthday: {this.state.Birthday}</h4>
            <h4>Favourite Movies:</h4>
            <div className="d-flex row mt-3 ml-1 stretch">
              {favouritesList == 0 && <h2> No favourites yet!</h2>}
              {favouritesList &&
                favouritesList.map(movie => {
                  return (
                    <div key={movie._id}>
                      <Card className="profile-view-card box-shadow d-flex flex-stretch" style={{ width: "16rem" }}>
                        <Card.Img variant="top" src={movie.ImagePath} />
                        <Link to={`/movies/${movie._id}`}>
                          <Card.Header className="favourite-card-title-link text-center font-weight-bold">{movie.Title}</Card.Header>
                        </Link>
                        <Card.Body>
                          <Card.Text>{movie.Description}</Card.Text>
                        </Card.Body>
                        <Card.Footer>
                          <Button
                            size="sm"
                            className="button-delete-favourite"
                            variant="link"
                            onClick={() => this.deleteFavourite(movie._id)}
                          >
                            Delete
                          </Button>
                        </Card.Footer>
                      </Card>
                    </div>
                  );
                })}
            </div>
          </Media.Body>
        </Media>
      </div>
    );
  }
}

let mapStateToProps = state => {
  return { movies: state.movies, userInfo: state.userInfo };
};

export default connect()(ProfileView);
