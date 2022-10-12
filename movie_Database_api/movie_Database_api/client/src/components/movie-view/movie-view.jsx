import React from "react";
import "./movie-view.scss";
import Media from "react-bootstrap/Media";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export class MovieView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie } = this.props;

    console.log(movie);

    if (!movie) return null;

    return (
      <div className="movie-view">
        <Media className="d-flex flex-column flex-md-row align-items-center ml-xs-5">
          <img width={220} height={326} className="movie-poster" src={movie.ImagePath} alt="movie-poster" />
          <Media.Body>
            <h2 className="title-header">{movie.Title}</h2>
            <Link to={`/directors/${movie.Director.Name}`}>
              <h5 className="director-link mt-3">Director: {movie.Director.Name}</h5>
            </Link>
            <Link to={`/genres/${movie.Genre.Name}`}>
              <h5 className="genre-link mb-3">Genre: {movie.Genre.Name}</h5>
            </Link>
            <p className="text-justify">{movie.Description}</p>
          </Media.Body>
        </Media>
        <Link to={`/`}>
          <Button variant="link" size="sm" className="back-button">
            Back
          </Button>
        </Link>
      </div>
    );
  }
}
