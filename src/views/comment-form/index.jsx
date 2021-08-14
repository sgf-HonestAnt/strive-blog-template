import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import "./styles.css";
import { BLOG_ENDPOINT } from "../../endpoints";

export default class CommentForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        name: "",
        text: ""        
      };
    }

    handleChange = e => {
        let id = e.target.id
        this.setState({ ...this.state, [id]: e.target.value })
    }

    sendComment = async(e, id) => {
        e.preventDefault()
        console.log("Trying to send a new comment --> ", this.state)
        try {
            let response = await fetch(`${BLOG_ENDPOINT}/${id}/comments`, { // trouble catching this postID
              method: 'POST',
              body: JSON.stringify(this.state),
              headers: {
                'content-type' : 'application/json'
            }
            })
            if (response.ok) {
              console.log(response, this.state)
              console.log("NEW COMMENT POSTED")
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
        <>
        <div className="mt-5"><strong>Tell us what you think!</strong></div>

        <Form onSubmit={e => this.sendComment(e, this.props.post.id)}>
            <div className="comment-form-container">
            <Form.Group controlId="name" className="my-3 mx-1">
                <Form.Control 
                size="lg" 
                placeholder="Your name" 
                value={this.state.name}
                onChange={this.handleChange}
                />
            </Form.Group>
            <Form.Group controlId="text" className="my-3 mx-1">
                <Form.Control 
                size="lg" 
                placeholder="Your comment" 
                value={this.state.text}
                onChange={this.handleChange}
                />
            </Form.Group>
            <Button
            type="submit"
            size="sm"
            variant="dark"
            className="my-3"
            style={{ marginLeft: "0.5em" }}
            >
            Submit
            </Button>
            </div>
        </Form>
        </>
    );
  }
}
