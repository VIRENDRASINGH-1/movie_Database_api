import React from "react";
import { connect } from "react-redux";

import VisibilityFilterInput from "../visibility-filter-input/visibility-filter-input";
import { MovieCard } from "../movie-card/movie-card";
import { Container, Row, Col } from "react-bootstrap";
import "./movies-list.scss";

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== "") {
    filteredMovies = movies.filter(m => m.Title.includes(visibilityFilter));
  }

  if (!movies) return <div className="main-view" />;

  return (
    <Container fluid>
      <div className="movies-list">
        <Row>
          <VisibilityFilterInput visibilityFilter={visibilityFilter} />
        </Row>
        <Row>
          {filteredMovies.map(m => (
            <Row key={m._id}>
              <Col key={m._id} className="card-margin box-shadow d-flex flex-stretch" style={{ width: "16rem" }}>
                <MovieCard key={m._id} value={m._id} movie={m} addFavourite={movieId => this.addFavourite(movieId)} />
              </Col>
            </Row>
          ))}
        </Row>
      </div>
    </Container>
  );
}

export default connect(mapStateToProps)(MoviesList);
