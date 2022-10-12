import React from "react";
import "./genre-view.scss";
import Media from "react-bootstrap/Media";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export class GenreView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { genre, movies } = this.props;

    console.log(this.props);

    if (!genre) return null;

    return (
      <div className="genre-view">
        <Media className="d-flex flex-column flex-md-row align-items-center ml-xs-5">
          <Media.Body>
            <h4> Genre : {genre.Name}</h4>
            <p> Description : {genre.Description}</p>

            <Link to={`/`}>
              <Button className="back-from-genre" variant="primary">
                Back to movie list
              </Button>
            </Link>
            <div className="d-flex row mt-3 ml-1">
              {movies.map(movie => {
                if (movie.Genre.Name === genre.Name) {
                  return (
                    <div key={movie._id} className="genre-view-card-container">
                      <Container>
                        <Row>
                          <div>
                            <Card className="genre-view-card box-shadow" style={{ width: "16rem" }}>
                              <Card.Img variant="top" src={movie.ImagePath} />
                              <Link to={`/movies/${movie._id}`}>
                                <Card.Header className="genre-card-title-link text-center font-weight-bold">{movie.Title}</Card.Header>
                              </Link>
                              <Card.Body className="card-body d-flex flex-column">
                                <Card.Text>{movie.Description}</Card.Text>
                              </Card.Body>
                            </Card>
                          </div>
                        </Row>
                      </Container>
                    </div>
                  );
                }
              })}
            </div>
          </Media.Body>
        </Media>
      </div>
    );
  }
}
