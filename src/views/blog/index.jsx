import React, { Component } from "react";
import { Container, Image } from "react-bootstrap";
import { withRouter } from "react-router";
import BlogAuthor from "../../components/blog/blog-author";
import CoverButton from "../cover-button";
import CommentForm from "../comment-form";
// import posts from "../../data/posts.json";
import "./styles.css";
class Blog extends Component {
  state = {
    verified: true, // when signed in as author or admin, verified = true.
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
        `${process.env.REACT_APP_BE_URL}/${id}`, {
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
        `${process.env.REACT_APP_BE_URL}/${id}/comments`, {
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
  reloadPage = e => {
    this.setState({ ...this.state, loading: true })
    e.preventDefault()
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.loading !== this.state.loading) {
      this.fetchSinglePost(this.props.match.params);
    }
  }

  render() {
    const { loading, blog } = this.state;
    if (loading) {
      return <div>loading</div>;
    } else {
      return (
        <div className="blog-details-root">
          <Container>
            <div className="blog-details-cover-container">
            { this.state.verified && 
            <CoverButton cover={this.state.blog.cover} post={this.props.match.params} reloadPage={this.reloadPage.bind(this)} />
            }
            <Image className="blog-details-cover" src={blog.cover} fluid />
            </div>
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

            <div className="mt-5">{this.state.comments === [] ? <></> : this.state.comments.map(c => <div key={c._id} className="blog-details-comments-container"><span className="blog-details-comment-author">{c.name}:</span><span className="blog-details-single-comment"><i className="fas fa-quote-left"></i>{c.text}</span></div>)}</div>

            <CommentForm post={this.props.match.params} reloadPage={this.reloadPage.bind(this)} />

          </Container>
        </div>
      );
    }
  }
}

export default withRouter(Blog);
