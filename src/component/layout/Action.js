import React, { Component } from "react";
import "./service.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Form, Button, Col } from "react-bootstrap";
import { saveActionDetails } from '../../actions/ruleCreation'
import PopUp from './PopUp'

class Action extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      remarkValue: "",
      showQueue: false,
      showRemarks: false,
      showRemarksText: false,
      showEmail: false,
      popup: false
    };
  }

  componentDidMount(){
    if(Object.keys(this.props.ruleCreation.creation).length > 0){
      const actionType = this.props.ruleCreation.action.actionType;
      const remarkType = this.props.ruleCreation.action.remarkType;
      const remarkDetail = this.props.ruleCreation.action.remarkDetail;
      this.setState({value:actionType,ruledesc:remarkType,remarkValue:remarkDetail})
    }
  }

  handleChange(event) {
    let value = event.target.value;
    if (value === "Move to Queue") {
      this.setState({
        showQueue: true,
        showRemarks: false,
        showRemarksText: false,
        showEmail: false,
        value: value,
        remarkValue: ""
      });
    } else if (value === "Add Remarks") {
      this.setState({
        showQueue: false,
        showRemarks: true,
        showRemarksText: false,
        showEmail: false,
        value: value,
        remarkValue: ""
      });
    } else if (value === "Send Email") {
      this.setState({
        showQueue: false,
        showRemarks: false,
        showRemarksText: false,
        showEmail: true,
        value: value,
      });
    }
  }

  handleRemarkChange(event) {
    let value = event.target.value;
    if (value !== "") {
      this.setState({
        ruleDetails: [],
        showQueue: false,
        showRemarks: true,
        showRemarksText: true,
        remarkValue: value,
      });
    }
  }

  ruleActionHandler = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const form = {};
    for (let [key, value] of formData.entries()) {
      form[key] = value;
    }
    console.log("action Data", form);
    if (form.triggerType !== "") {
      var rule = {};
      rule[ "user" ] = this.props.auth.user.username;
      rule[ "creation"] = this.props.ruleCreation.creation;
      rule[ "trigger"] = this.props.ruleCreation.trigger;
      rule[ "action" ] = form;
      this.props.saveActionDetails(rule);
      this.setState({popup: true });
  }};

  togglePop = () => {
    this.setState({
        popup: !this.state.popup
    });
    this.props.history.push("/rule/list");
};

  render() {
    return (
      <section className="banner-area relative ser-banner">
        <div className="overlay overlay-bg"></div>
        <div className="container">
          <div className="row ser-fullscreen align-items-center justify-content-between">
            <div className="ser-container">
              <div className="ser-col col-lg-12 col-md-12 banner-left">
                <h1 className="text-white">Rule Action</h1>
              </div>
              <div className="ser-col col-lg-12 col-md-12 banner-left">
                <div class="tripStatusContainer upcoming">
                  <div class="tripStatusWrap" id="tripStatusWrap">
                    <ul class="txtFild">
                      <form
                        className="ruleForm"
                        onSubmit={this.ruleActionHandler}
                      >
                        <Form>
                          <Form.Label className="triggerLabel">
                            Action Name :{" "}
                          </Form.Label>
                          <Form.Group>
                            <Form.Row>
                              <Col>
                                <Form.Control
                                  as="select"
                                  name="actionType"
                                  value={this.state.value}
                                  onChange={this.handleChange.bind(this)}
                                >
                                  <option>select the action</option>
                                  <option>Move to Queue</option>
                                  <option>Add Remarks</option>
                                  <option>Send Email</option>
                                </Form.Control>
                              </Col>
                            </Form.Row>
                          </Form.Group>
                          {this.state.showQueue ? (
                            <Form.Group>
                              <Form.Label className="triggerLabel">
                                Target Queue Number :{" "}
                              </Form.Label>
                              <Form.Row>
                                <Col>
                                  <Form.Control
                                    name="targetQueue"
                                    type="number"
                                    required
                                  />
                                </Col>
                              </Form.Row>
                            </Form.Group>
                          ) : (
                            ""
                          )}
                          {this.state.showRemarks ? (
                            <Form.Group>
                              <Form.Label className="triggerLabel">
                                Remark Type :{" "}
                              </Form.Label>
                              <Form.Row>
                                <Col>
                                  <Form.Control
                                    as="select"
                                    name="remarkType"
                                    value={this.state.remarkValue}
                                    onChange={this.handleRemarkChange.bind(
                                      this
                                    )}
                                  >
                                    <option>select the remark type</option>
                                    <option>notepad</option>
                                    <option>osi</option>
                                  </Form.Control>
                                </Col>
                              </Form.Row>
                            </Form.Group>
                          ) : (
                            ""
                          )}
                          {this.state.showRemarksText ? (
                            <Form.Group>
                              <Form.Label className="triggerLabel">
                                Remarks Details :{" "}
                              </Form.Label>
                              <Form.Row>
                                <Col>
                                  <Form.Control
                                    name="remarkDetail"
                                    type="text"
                                    required
                                  />
                                </Col>
                              </Form.Row>
                            </Form.Group>
                          ) : (
                            ""
                          )}
                          {this.state.showEmail ? (
                            <Form.Group>
                              <Form.Label className="triggerLabel">
                                Send Email To :{" "}
                              </Form.Label>
                              <Form.Row>
                                <Col>
                                  <Form.Control
                                    name="email"
                                    type="email"
                                    required
                                  />
                                </Col>
                              </Form.Row>
                              <Form.Label className="triggerLabel">
                                Subject :{" "}
                              </Form.Label>
                              <Form.Row>
                                <Col>
                                  <Form.Control
                                    name="subject"
                                    type="text"
                                    required
                                  />
                                </Col>
                              </Form.Row>
                              <Form.Label className="triggerLabel">
                                Body :{" "}
                              </Form.Label>
                              <Form.Row>
                                <Col>
                                  <Form.Control
                                    as="textarea"
                                    rows="3"
                                    name="body"
                                    required
                                  />
                                </Col>
                              </Form.Row>
                            </Form.Group>
                          ) : (
                            ""
                          )}
                          <Form.Group>
                            <Form.Row>
                              <Button variant="primary" type="submit">
                                Submit
                              </Button>
                              {this.state.popup ? <PopUp toggle={this.togglePop} rulestatus="created" /> : null}
                            </Form.Row>
                          </Form.Group>
                        </Form>
                      </form>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Action.propTypes = {
  saveActionDetails: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
  ruleCreation : PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
  ruleCreation : state.ruleCreation,
});

export default connect(mapStateToProps, {saveActionDetails})(Action);
