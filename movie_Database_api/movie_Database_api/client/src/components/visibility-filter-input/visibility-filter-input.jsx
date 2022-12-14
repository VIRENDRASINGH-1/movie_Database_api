import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Form from "react-bootstrap/Form";

import { setFilter } from "../../actions/actions";
import "./visibility-filter-input.scss";

function VisibilityFilterInput(props) {
  return (
    <div className="visibility-filter-input">
      <Form.Group controlId="formBasicFilterInput" className="mb-4">
        <Form.Control onChange={e => props.setFilter(e.target.value)} value={props.visibilityFilter} placeholder="Search" />
      </Form.Group>
    </div>
  );
}

export default connect(null, { setFilter })(VisibilityFilterInput);
