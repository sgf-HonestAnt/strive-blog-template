import React, { Component } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Container, Form, Button } from "react-bootstrap";
import "./styles.css";

export default class NewBlogPost extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      category: "Category 1",
      title: "",
      cover: "",
      author: {
        "name": "Lisbeth Salander",
        "avatar": `${process.env.REACT_APP_BE_URL}/img/avatars/AUTH_BlogPostTestAuthor.jpg`
      },
      content: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({ ...this.state, content: value });
  } // for Quill

  handleClick = e => {
    let id = e.target.id
    this.setState({ ...this.state, [id]: e.target.value })
  }

  clearForm = () => {
    this.setState({ 
      title: "",
      category: "Category 1",
      content: "",
      cover: ""
    })
  }

  sendPost = async(e) => {
    e.preventDefault()
    console.log("Trying to send a new blog post!")
    try {
      let response = await fetch(`${process.env.REACT_APP_BE_URL}`, {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'content-type' : 'application/json'
      }
      })
      // if (response.ok && this.state.cover !== "") {
      //   let newCover = this.state.cover
      //   await fetch(`${BLOG_ENDPOINT}/${ID}/uploadCover`, { // NEED TO MAKE ID EXIST HERE
      //     method: 'POST',
      //     body: JSON.stringify(newCover), // ??????????????????
      //     headers: {
      //       'content-type' : 'multipart/form-data'
      //   }
      //   })
      //   console.log(this.state)
      //   alert("NEW BLOG WITH COVER IMG POSTED")
      // } else 
      if (response.ok) {
        console.log(response, this.state)
      } else {
        alert("Something went wrong")
      }
    } catch (error) {
      alert(error)
    }
  }

  render() {
    // console.log(this.state)
    return (
      <Container className="new-blog-container">
        <Form className="mt-5" onSubmit={e => this.sendPost(e)} onReset={e => this.clearForm(e)}>
          <Form.Group controlId="title" className="mt-3">
            <Form.Label>Title</Form.Label>
            <Form.Control 
            size="lg" 
            placeholder="Title" 
            value={this.state.title}
            onChange={this.handleClick}
            />
          </Form.Group>
          <Form.Group controlId="category" className="mt-3">
            <Form.Label>Category</Form.Label>
            <Form.Control 
            size="lg" 
            as="select"
            value={this.state.category} 
            onChange={this.handleClick}>
              <option>Category1</option>
              <option>Category2</option>
              <option>Category3</option>
              <option>Category4</option>
              <option>Category5</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="content" className="mt-3">
            <Form.Label>Blog Content</Form.Label>
            <ReactQuill
              value={this.state.content}
              onChange={this.handleChange}
              className="new-blog-content"
            />
          </Form.Group>
          <Form.Group controlId="cover" className="mt-3">
            <Form.Control
            size="lg" 
            type="file"
            className="form-control-file"
            value={this.state.cover}
            onChange={this.handleClick}
            />
          </Form.Group>
          <Form.Group className="d-flex mt-3 justify-content-end">
            <Button type="reset" size="lg" variant="outline-dark">
              Reset
            </Button>
            <Button
              type="submit"
              size="lg"
              variant="dark"
              style={{ marginLeft: "1em" }}
            >
              Submit
            </Button>
          </Form.Group>
        </Form>
      </Container>
    );
  }
}
