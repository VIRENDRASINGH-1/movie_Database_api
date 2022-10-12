import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import "./registration-view.scss";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";

export function RegistrationView(props) {
  const [username, createUsername] = useState(""); // Array destructuring - first item is current value, second is a function that lets us update it
  const [password, createPassword] = useState("");
  const [email, createEmail] = useState("");
  const [birthday, createBirthday] = useState("");

  const handleRegister = e => {
    e.preventDefault();

    axios
      .post("https://cors-anywhere.herokuapp.com/https://moviesDatabaseapi.herokuapp.com/users", {
        // Correct path?
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
      .then(response => {
        const data = response.data;
        alert("Success!");
        console.log(data);
        window.open("/client", "_self"); // the second argument '_self' is necessary so that the page will open in the current tab
      })
      .catch(e => {
        alert("Error!");
        console.log(e);
      });
  };

  return (
    <Container className="registration-container">
      <h3 className="text-center">My 1980s Movies API - Sign up!</h3>
      <br></br>
      <Form>
        <Form.Group controlId="formBasicUsername">
          <Form.Control type="text" placeholder="Enter Username" value={username} onChange={e => createUsername(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Control type="password" placeholder="Enter Password" value={password} onChange={e => createPassword(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Control type="text" placeholder="Email" value={email} onChange={e => createEmail(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicBirthday">
          <Form.Control type="text" placeholder="eg. 1981-07-13" value={birthday} onChange={e => createBirthday(e.target.value)} />
        </Form.Group>

        <Button className="button-register" variant="primary" type="submit" onClick={handleRegister}>
          Register
        </Button>
        <Link to={"/"}>
          <Button variant="link" type="submit">
            Already a member?
          </Button>
        </Link>
      </Form>
    </Container>
  );
}

// RegistrationView.propTypes = {
//   username: PropTypes.string.isRequired,
//   password: PropTypes.string.isRequired,
//   email: PropTypes.string.isRequired
// };
