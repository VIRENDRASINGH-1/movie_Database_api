import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";

import "./update-view.scss";

export function UpdateView(props) {
  const { user, userId } = props;
  // console.log(props);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const userURL = `https://moviesDatabaseapi.herokuapp.com/users/${user}`;
  const requestBody = {
    Username: username,
    Password: password,
    Email: email,
    Birthday: birthday
  };

  // Update user info

  const handleUpdate = e => {
    e.preventDefault();
    console.log(requestBody);
    axios
      .put(userURL, requestBody, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })

      .then(res => {
        // Assign the result to the state
        const data = res.data;

        localStorage.setItem("user", data.Username);
        localStorage.setItem("password", data.Password);
        localStorage.setItem("email", data.Email);
        localStorage.setItem("birthday", data.Birthday);
        alert("Updated!");
        localStorage.setItem("user", data.Username);
        console.log(data);
        window.open(`/users/${localStorage.getItem("user")}`);
      })
      .catch(e => {
        alert("Error!");
        console.log(e);
      });
  };

  // Delete user

  const handleDelete = e => {
    axios
      .delete(`https://moviesDatabaseapi.herokuapp.com/users/${localStorage.getItem("user")}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      .then(res => {
        alert("Do you really want to delete your account?");
      })
      .then(res => {
        alert("Account was successfully deleted");
      })
      .then(res => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.open("/", "_self");
      })
      .catch(e => {
        alert(e);
        console.log(e);
      });
  };

  return (
    <div className="update-view justify-content-center">
      <Row className="justify-content-center">
        <Col>
          <Container className="container update-container border border-light rounded py-3 px-3">
            <Form>
              <Form.Group controlId="formBasicUsername">
                <Form.Control type="text" placeholder="New Username" value={username} onChange={e => setUsername(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Control type="password" placeholder="New Password" value={password} onChange={e => setPassword(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Control type="text" placeholder="New Email" value={email} onChange={e => setEmail(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="formBasicBirthday">
                <Form.Control type="text" placeholder="New birthday" value={birthday} onChange={e => setBirthday(e.target.value)} />
              </Form.Group>
              <Row className="btn-row">
                <Button className="update-btn mr-3 float-left" variant="primary" type="submit" onClick={handleUpdate}>
                  Update
                </Button>
                <Link to={`/`}>
                  <Button className="back-to-profile float-right justify-content-end" variant="primary">
                    Back
                  </Button>
                </Link>
              </Row>
            </Form>
          </Container>
          <Container className="mt-4">
            <Row className="d-flex align-items-center justify-content-center">
              <Button variant="link" type="submit" className="unregister-btn" onClick={handleDelete}>
                Delete account
              </Button>
            </Row>
          </Container>
        </Col>
      </Row>
    </div>
  );
}
