import React, { useState } from "react";
import { Button, Container, Navbar, Form, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";
import "./login-view.scss";

export function LoginView(props) {
  const [username, setUsername] = useState(""); // Array destructuring - first item is current value, second is a function that lets us update it
  const [password, setPassword] = useState("");

  const handleLogin = e => {
    e.preventDefault(); //
    axios
      .post("https://moviesDatabaseapi.herokuapp.com/login", null, {
        params: {
          Username: username,
          Password: password
        }
      })
      .then(response => {
        const data = response.data;
        console.log();
        props.onLoggedIn(data);
        console.log(data);
      })
      .catch(e => {
        console.log("No such user!");
      });
  };

  return (
    <div className="login-view">
      <Row className="justify-content-center">
        <Col>
          <Container className="login-container">
            <h3 className="text-center">My 1980s Movies API - Login</h3>
            <Form>
              <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
              </Form.Group>
              <Button className="button-login" variant="primary" type="submit" onClick={handleLogin}>
                Login
              </Button>
              <Link to={"/register"}>
                <Button variant="link" type="submit">
                  Sign up!
                </Button>
              </Link>
            </Form>
          </Container>
        </Col>
      </Row>
    </div>
  );
}

// LoginView.propTypes = {
//   username: PropTypes.string.isRequired,
//   password: PropTypes.string.isRequired
// };
