import React from "react";
import "./director-view.scss";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Media from "react-bootstrap/Media";
import PropTypes from "prop-types";

export class DirectorView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { director, movies } = this.props;
    console.log(director);
    console.log(movies);

    if (!director) return null;

    return (
      <Container fluid>
        <div className="director-view text-justify">
          <Media className="d-flex flex-column flex-md-row align-items-center ml-xs-5">
            <Media.Body>
              <h4>{director.Name}</h4>
              <h6>
                {director.Born} - {director.Died}
              </h6>
              <p>
                {director.Biography} Movies by {director.Name} include :{" "}
              </p>
              <Link to={`/`}>
                <Button variant="link" size="sm" className="back-from-director">
                  Back to movie list
                </Button>
              </Link>
              <div className="d-flex row mt-3 ml-1 stretch">
                {movies.map(movie => {
                  if (movie.Director.Name === director.Name) {
                    return (
                      <div key={movie._id}>
                        <Card className="director-view-card box-shadow" style={{ width: "16rem" }}>
                          <Card.Img variant="top" src={movie.ImagePath} />
                          <Link to={`/movies/${movie._id}`}>
                            <Card.Header className="director-card-title-link text-center font-weight-bold">{movie.Title}</Card.Header>
                          </Link>
                          <Card.Body>
                            <Card.Text>{movie.Description}</Card.Text>
                          </Card.Body>
                        </Card>
                      </div>
                    );
                  }
                })}
              </div>
            </Media.Body>
          </Media>
        </div>
      </Container>
    );
  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string,
    Biography: PropTypes.string,
    Born: PropTypes.string
  }).isRequired
};
