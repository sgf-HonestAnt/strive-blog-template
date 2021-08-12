import React, { Component } from "react";
import { Container, Image } from "react-bootstrap";
import { withRouter } from "react-router";
import BlogAuthor from "../../components/blog/blog-author";
import { BLOG_ENDPOINT } from "../../endpoints";
// import posts from "../../data/posts.json";
import "./styles.css";
class Blog extends Component {
  state = {
    blog: {},
    comments: [],
    loading: true,
  };
  componentDidMount() {
    this.fetchSinglePost(this.props.match.params);
  }
  fetchSinglePost = async ({ id }) => {
    try {
      let response = await fetch(
        `${BLOG_ENDPOINT}/${id}`, {
          method: 'GET',
          headers: {
            'content-type' : 'application/json'
          }
      });
      let data = await response.json();
      if (data) {
        this.setState({ blog: data, loading: false })
        this.fetchComments(this.props.match.params);
      } else {
        this.props.history.push("/404");
      }
    } catch (error) {
      console.log("error")
    }
  };
  fetchComments = async ({ id }) => {
    try {
      let response = await fetch(
        `${BLOG_ENDPOINT}/${id}/comments`, {
          method: 'GET',
          headers: {
            'content-type' : 'application/json'
          }
      });
      let data = await response.json();
      if (data) {
        this.setState({ ...this.state, comments: data })
      }
    } catch (error) {
      console.log("error")
    }
  };
  componentDidUpdate(prevProps, prevState) {
  }

  render() {
    const { loading, blog } = this.state;
    if (loading) {
      return <div>loading</div>;
    } else {
      return (
        <div className="blog-details-root">
          <Container>
            <Image className="blog-details-cover" src={blog.cover} fluid />
            <h1 className="blog-details-title">{blog.title}</h1>

            <div className="blog-details-container">
              <div className="blog-details-author">
                <BlogAuthor {...blog.author} />
              </div>
              <div className="blog-details-info">
                <div>{blog.createdAt}</div>
                <div>{`${blog.readTime.value} ${blog.readTime.unit} read`}</div>
              </div>
            </div>

            <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
            <div>{this.state.comments === [] ? <></> : this.state.comments.map(c => <div><span>{c.name}</span>: {c.text}</div>)}</div>
            {/* this needs work */}
          </Container>
        </div>
      );
    }
  }
}

export default withRouter(Blog);
