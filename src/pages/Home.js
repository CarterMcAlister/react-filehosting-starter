import React, { Component } from "react";
import { API } from "aws-amplify";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import "./Home.css";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      list: []
    };
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }

    try {
      const list = await this.list();
      console.log(list)
      this.setState({ list });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  list() {
    return API.get("list", "/list");
  }

  renderFileList(list) {
    return [{}].concat(list).map(
      (item, i) =>
        i !== 0
          ? <LinkContainer
              key={item.uploadId}
              to={`/uploads/${item.uploadId}`}
            >
              <ListGroupItem >
                {"Created: " + new Date(item.createdAt).toLocaleString()}
              </ListGroupItem>
            </LinkContainer>
          : <LinkContainer
              key="new"
              to="uploads/new"
            >
              <ListGroupItem>
                <h4>
                  <b>{"\uFF0B"}</b> Upload a file
                </h4>
              </ListGroupItem>
            </LinkContainer>
    );
  }

  renderLander() {
    return (
      <div className="lander">
        <h1>Filehosting Starter</h1>
        <p>A Starter for creating a file hosting site using React and Serverless Node.js</p>
        <div>
          <Link to="/login" className="btn btn-info btn-lg">
            Login
          </Link>
          <Link to="/signup" className="btn btn-success btn-lg">
            Signup
          </Link>
        </div>
      </div>
    );
  }

  renderlist() {
    return (
      <div className="list">
        <PageHeader>Your Uploads</PageHeader>
        <ListGroup>
          {!this.state.isLoading && this.renderFileList(this.state.list)}
        </ListGroup>
      </div>
    );
  }

  render() {
    return (
      <div className="Home">
        {this.props.isAuthenticated ? this.renderlist() : this.renderLander()}
      </div>
    );
  }
}
