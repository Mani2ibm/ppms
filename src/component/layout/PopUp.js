import React, { Component } from "react";
import "./popup.css";
import { Modal, Button } from 'react-bootstrap'

class PopUp extends Component {
  handleClick = () => {
    this.props.toggle();
  };

  render() {
    const rulestatus = this.props.rulestatus
    console.log("popup", rulestatus);
    return (
      <>
      <Modal show={true} onHide={this.handleClick} centered>
    <Modal.Body>Sucessfully {rulestatus} rule!</Modal.Body>
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
