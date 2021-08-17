import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import BlogItem from "../blog-item";
export default class BlogList extends Component { 
  state = {
    posts: [],
    loading: true,
  };
  componentDidMount() {
    this.fetchBlogPosts();
  }
  fetchBlogPosts = async () => {
    try {
      let response = await fetch(
        `${process.env.REACT_APP_BE_URL}/blogs`, {
          method: 'GET',
          headers: {
            'content-type' : 'application/json'
          }
      });
      let postsJson = await response.json();
      this.setState({ posts: postsJson, loading: false })
    } catch (error) {
      console.log("error")
    }
  };
  componentDidUpdate(prevProps, prevState) {
  }

  render() {
    return (
      this.state.loading === false ? (
        <Row>
          {this.state.posts.map((post) => (
            <Col md={4} key={post._id} style={{ marginBottom: 50 }}>
              <BlogItem {...post} />
            </Col>
          ))}
        </Row>
       ) : (<Row></Row>)
    );
  }
}