import React, { Component } from "react";
import FormData from "form-data";
import axios from "axios";
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
      author: {
        "ID": "AUTH_greatscott",
        "name": "Michael Scott",
        "avatar": "https://res.cloudinary.com/dowvu52wz/image/upload/v1629201062/avatars/p7cdvhbcu25faycpjkov.jpg"
      },
      content: "",
      _id: "",
      selectedFile: null
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

  setCover = event => {
    const file = event.target.files[0] 
    this.setState({ ...this.state, selectedFile: file })
  }

  clearForm = () => {
    this.setState({ 
      category: "Category 1",
      title: "",
      author: {
        "ID": "AUTH_greatscott",
        "name": "Michael Scott",
        "avatar": "https://res.cloudinary.com/dowvu52wz/image/upload/v1629201062/avatars/p7cdvhbcu25faycpjkov.jpg"
      },
      content: "",
      selectedFile: null
    })
  }

  sendPost = async(e) => {
    e.preventDefault()
    console.log("Trying to send a new blog post!")
    try {
      let response = await fetch(`${process.env.REACT_APP_BE_URL}/blogs`, {
        method: 'POST',
        body: JSON.stringify({category:this.state.category,title:this.state.title,author:this.state.author,content:this.state.content}),
        headers: {
          'content-type' : 'application/json'
        }
      })
      if (response.ok && this.state.selectedFile !== null) {
        await this.fetchPostID()
        await this.sendFile(this.state._id)
        this.props.history.push("")
      } else if (response.ok) {
        this.props.history.push("")
      } else {
        alert("Something went wrong")
      }
    } catch (error) {
      alert(error)
    }
  }

  fetchPostID = async () => {
    try {
      let response = await fetch(
        `${process.env.REACT_APP_BE_URL}/blogs`, {
          method: 'GET',
          headers: {
            'content-type' : 'application/json'
          }
      });
      const postsJson = await response.json();
      const newPost = postsJson.find(p => p.title === this.state.title && p.content === this.state.content)
      console.log(newPost._id)
      this.setState({ ...this.state, _id: newPost._id })
    } catch (error) {
      console.log("error")
    }
  };

  sendFile = async(id) => { 
    if (this.state.selectedFile !== null) {
      console.log("Trying to send a new file!")
      const data = new FormData()
      data.append("cover", this.state.selectedFile)
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_BE_URL}/blogs/${id}/uploadCover`,
        data: data
      })
    } else {
      console.log("no file selected!")
    }
  }

  render() {
    console.log(this.state)
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
            onChange={this.setCover}
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
