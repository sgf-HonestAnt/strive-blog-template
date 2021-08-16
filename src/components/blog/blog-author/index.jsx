import React, { Component } from "react";
import { Row, Col, Image } from "react-bootstrap";
import "./styles.css";
export default class BlogAuthor extends Component {
  state = {
    verified: true // when signed in as author or admin, verified = true.
  }
  render() {
    const { name, avatar } = this.props;
    return (
      <Row>
        <Col xs={2}>
          <Image className="blog-author" src={avatar} roundedCircle />
        </Col>
        <Col>
          <div>by</div>
          <h6>{name}</h6>
          {/* Implement function to change author avatar if signed in as that author*/}
        </Col>
      </Row>
    );
  }
}
