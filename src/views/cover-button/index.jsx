import React, { Component } from "react";
import FormData from "form-data";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import "./styles.css";

export default class CoverButton extends Component {
    constructor(props) {
      super(props);
      this.state = {
          selectedFile: null
      };
    }

    setCover = event => {
      const file = event.target.files[0] 
      this.setState({ selectedFile: file })
    }

    uploadCover = async(e, id) => { 
        e.preventDefault()
        const data = new FormData()
        console.log("Trying to send a new cover image --> ", this.state.selectedFile)
        data.append("cover", this.state.selectedFile)
        await axios({
          method: "post",
          url: `${process.env.REACT_APP_BE_URL}/blogs/${id}/uploadCover`,
          data: data
        })
        this.props.reloadPage(e)
    }

  render() {
    return (
        <Form onSubmit={e => this.uploadCover(e, this.props.post.id)}>
        {/* Implement Dummy Button for file upload so we can control appearance        */}
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
