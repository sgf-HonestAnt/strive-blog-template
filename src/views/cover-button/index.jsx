import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import "./styles.css";
import { BLOG_ENDPOINT } from "../../endpoints";

export default class CoverButton extends Component {
    constructor(props) {
      super(props);
      this.state = {
          cover: ""
      };
    }

    setCover = e => {
        this.setState({ cover: e.target.value })
    }

    uploadCover = async(e, id) => { 
        //500 
        // THIS IS NOT YET WORKING, CHECK OTHER REPOS
        // Multipart Boundary Not Found
        e.preventDefault()
        let formData = new FormData()
        formData.append('cover', this.state.cover)
        console.log("Trying to send a new cover image --> ", this.state)
        try {
            let response = await fetch(`${BLOG_ENDPOINT}/${id}/uploadCover`, {
              method: 'POST',
              body: formData
            })
            if (response.ok) {
              console.log(response, this.state)
              console.log("NEW COVER POSTED")
              this.props.submitNewComment(e)
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
