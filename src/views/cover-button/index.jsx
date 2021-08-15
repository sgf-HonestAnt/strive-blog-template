import React, { Component } from "react";
import FormData from "form-data";
import { Form, Button } from "react-bootstrap";
import "./styles.css";
import { BLOG_ENDPOINT } from "../../endpoints";

export default class CoverButton extends Component {
    constructor(props) {
      super(props);
      this.state = {
          file: null
      };
    }

    setCover = async e => {
        console.log(e.target.value) // returns fake path
        console.log(e.target.files[0]) // returns File name, type, size, etc
        const formData = new FormData()
        formData.append('cover', e.target.value)
        console.log(formData)
        this.setState({ ...this.state, file: formData }) // cover: "C:...", file: "FormData"
    }

    uploadCover = async(e, id) => { 
        e.preventDefault()
        console.log("Trying to send a new cover image --> ", this.state)
        try {
            console.log(this.state.file)
            let response = await fetch(`${BLOG_ENDPOINT}/${id}/uploadCover`, {
              method: 'POST',
              body: this.state // Cannot read property originalname of undefined ==> req.file is undefined
            })
            if (response.ok) {
              console.log(response, this.state)
              console.log("NEW COVER POSTED")
              this.props.submitNewCover(e)
            } else {
              alert("Something went wrong")
            }
          } catch (error) {
            alert(error)
          }
    }

  render() {
      console.log(this.state)
    return (
        <Form onSubmit={e => this.uploadCover(e, this.props.post.id)}>
        <Button className="blog-details-change-img-button" type="submit">
          {this.props.cover===undefined?<>Upload Image</>:<>Edit Image</>}
        </Button> 
        <Form.Group controlId="cover" className="my-3 mx-1 blog-details-img-form">
        <Form.Control
        // className="invisible-form-control" // visibility hidden
        type="file"
        size="lg" 
        placeholder="" 
        value={this.state.cover}
        onChange={this.setCover}
        />
        </Form.Group>
        </Form>
    );
  }
}
