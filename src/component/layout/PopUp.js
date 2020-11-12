import React, { Component } from "react";
import "./popup.css";
import { Modal, Button } from 'react-bootstrap'

class PopUp extends Component {
  handleClick = () => {
    this.props.toggle();
  };

  render() {
    const rulename = this.props.rulename
    console.log("popup", rulename);
    return (
      <>
      <Modal show={true} onHide={this.handleClick} centered>
    <Modal.Body>Sucessfully created {this.rulename} rule!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClick}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    );
  }
}

export default PopUp;
