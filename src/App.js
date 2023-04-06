import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Row, Col } from "react-bootstrap";
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);
  async function searchUsers() {
    const response = await axios.get(
      `https://api.github.com/search/users?q=${username}`
    );
    setUsers(response.data.items);
  }

  return (
    <div className="container">
      <br></br>
      <h1 className="text-center">GitHub Profile Search</h1>
      <Row className="justify-content-center">
        <Col xs={12} md={3}>
          <Form.Control
            type="text"
            placeholder="Enter GitHub Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </Col>
        <Col xs="auto">
          <Button variant="primary" onClick={searchUsers}>
            Search
          </Button>
        </Col>
      </Row>
      <br></br>
      <Row>
        {users.map((user) => (
          <Col key={user.id} md={4}>
            <div className="card mb-4">
              <img
                src={user.avatar_url}
                alt={user.login}
                className="card-img-top"
              />
              <div className="card-body user-info">
                <h2 className="card-title">
                  <a href={user.html_url} target="_blank" rel="noreferrer">
                    {user.login}
                  </a>
                </h2>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default App;
