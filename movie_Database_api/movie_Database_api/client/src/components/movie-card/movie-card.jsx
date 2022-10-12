import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";
import "./movie-card.scss";

import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: false
    };
  }

  // componentDidMount() {
  //   let alreadyAdded;
  //   if (this.props.favourites) {
  //     alreadyAdded = this.props.movies.filter(m => favourites.includes(m._id));
  //   }
  //   this.setState({
  //     disabled: true
  //   });
  // }

  addFavourite() {
    const movieId = this.props.value;
    console.log(movieId);

    const url = `http://moviesDatabaseapi.herokuapp.com/users/`;
    const user = localStorage.getItem("user");
    const plusMovie = `${url}${user}/Movies/${movieId}`;
    axios
      .post(
        plusMovie,
        { Username: user },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
      )
      .then(response => {
        console.log(response);
        // localStorage.setItem("favourites", JSON.stringify(response.concat(movieId)));
      })
      .catch(event => {
        console.log("Cannot add movie to list");
      });
    if (this.state.disabled) {
      return;
    }
    this.setState({ disabled: true });
  }

  render() {
    const { movie, favourites } = this.props;

    return (
      <Card className="card-container box-shadow d-flex flex-stretch" style={{ width: "16rem" }}>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Header className="card-header text-center font-weight-bold">{movie.Title}</Card.Header>
        <Card.Body className="card-body d-flex flex-column">
          <Card.Text>{movie.Description} </Card.Text>
          <Card.Footer className="card-footer">
            <Link to={`/movies/${movie._id}`}>
              <Button size="sm" className="button-open float-left" variant="link">
                Open
              </Button>
            </Link>
            <Button
              size="sm"
              className="button-favourites float-right"
              variant="link"
              onClick={() => this.addFavourite()}
              disabled={this.state.disabled}
            >
              {this.state.disabled ? "Added!" : "Favourite"}
            </Button>
          </Card.Footer>
        </Card.Body>
      </Card>
    );
  }
}
