import React, { Component } from "react";
import "./service.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Form, Button, Col } from "react-bootstrap";
import { saveTriggerDetails } from '../../actions/ruleCreation'

class Trigger extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      comparatorValue: "",
      type: "",
      triggervalue:"",
      RangeValue:"",
      comparator: [
        "Equal to",
        "Different from",
        "Less than",
        "Greater than",
        "In Range",
      ],
      show: false,
      showValue: false,
      showInRangeValue: false,
    };
  }

  componentDidMount(){
    if(Object.keys(this.props.ruleCreation.creation).length > 0){
      const triggerType = this.props.ruleCreation.trigger.triggerType;
      const comparatorType = this.props.ruleCreation.trigger.comparatorType;
      const value = this.props.ruleCreation.trigger.value;
      const RangeValue = this.props.ruleCreation.trigger.RangeValue;
      this.setState({value:triggerType,comparatorValue:comparatorType,triggervalue:value,RangeValue:RangeValue})
    }
  }

  handleChange(event) {
    let value = event.target.value;
    if (value === "PNR number" || value === "Remarks") {
      let comparatorOption = ["Equal to", "Different from"];
      this.setState({
        show: true,
        showValue: false,
        showInRangeValue: false,
        comparator: comparatorOption,
        value: value,
        comparatorValue: "",
      });
    } else {
      let comparatorOption = [
        "Equal to",
        "Different from",
        "Less than",
        "Greater than",
        "In Range",
      ];
      this.setState({
        show: true,
        showValue: false,
        showInRangeValue: false,
        comparator: comparatorOption,
        value: value,
        comparatorValue: "",
      });
    }
  }

  handleValueChange(event) {
    let value = event.target.value;
    if (value === "In Range") {
      if (
        this.state.value === "Departure Date" ||
        this.state.value === "Arrival Date"
      ) {
        this.setState({
          showValue: true,
          showInRangeValue: true,
          comparatorValue: value,
          type: "date",
        });
      }
      if (this.state.value === "Number of segments") {
        this.setState({
          showValue: true,
          showInRangeValue: true,
          comparatorValue: value,
          type: "number",
        });
      }
    } else {
      if (
        this.state.value === "Departure Date" ||
        this.state.value === "Arrival Date"
      ) {
        this.setState({
          showValue: true,
          showInRangeValue: false,
          comparatorValue: value,
          type: "date",
        });
      } else if (this.state.value === "Number of segments") {
        this.setState({
          showValue: true,
          showInRangeValue: false,
          comparatorValue: value,
          type: "number",
        });
      } else {
        this.setState({
          showValue: true,
          showInRangeValue: false,
          comparatorValue: value,
          type: "text",
        });
      }
    }
  }

  ruleTriggerHandler = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const form = {};
    for (let [key, value] of formData.entries()) {
      form[key] = value;
    }
    console.log("trigger Data", form);
    if (form.triggerType !== "") {
      this.props.saveTriggerDetails(form);
      this.props.history.push("/rule/action");
    }
  };

  render() {
    return (
      <section className="banner-area relative ser-banner">
        <div className="overlay overlay-bg"></div>
        <div className="container">
          <div className="row ser-fullscreen align-items-center justify-content-between">
            <div className="ser-container">
              <div className="ser-col col-lg-12 col-md-12 banner-left">
                <h1 className="text-white">Rule Trigger</h1>
              </div>
              <div className="ser-col col-lg-12 col-md-12 banner-left">
                <div class="tripStatusContainer upcoming">
                  <div class="tripStatusWrap" id="tripStatusWrap">
                    <ul class="txtFild">
                      <form
                        className="ruleForm"
                        onSubmit={this.ruleTriggerHandler}
                      >
                        <Form>
                          <Form.Label className="triggerLabel">
                            Rule Trigger Type :{" "}
                          </Form.Label>
                          <Form.Group>
                            <Form.Row>
                              <Col>
                                <Form.Control
                                  as="select"
                                  name="triggerType"
                                  value={this.state.value}
                                  onChange={this.handleChange.bind(this)}                                  
                                >
                                  <option>select the rule trigger type</option>
                                  <option value="PNR number">PNR number</option>
                                  <option value="Number of Segments">Number of Segments</option>
                                  <option value="Departure Date">Departure Date</option>
                                  <option value="Arrival Date">Arrival Date</option>
                                  <option value="Remarks">Remarks</option>
                                </Form.Control>
                              </Col>
                            </Form.Row>
                          </Form.Group>
                          {this.state.show ? (
                            <Form.Group>
                              <Form.Label className="triggerLabel">
                                Comparator :{" "}
                              </Form.Label>
                              <Form.Row>
                                <Col>
                                  <Form.Control
                                    as="select"
                                    name="comparatorType"
                                    value={this.state.comparatorValue}
                                    onChange={this.handleValueChange.bind(this)}                                    
                                  >
                                    <option>
                                      select the Comparator Method
                                    </option>
                                    {this.state.comparator.map(
                                      (comparatorOption) => (
                                        <option value={comparatorOption}>{comparatorOption}</option>
                                      )
                                    )}
                                  </Form.Control>
                                </Col>
                              </Form.Row>
                            </Form.Group>
                          ) : (
                            ""
                          )}
                          {this.state.showValue ? (
                            <Form.Group>
                              <Form.Label className="triggerLabel">
                                Value of Trigger :{" "}
                              </Form.Label>
                              <Form.Row>
                                <Col>
                                  <Form.Control
                                    name="value"
                                    value={this.state.triggervalue}
                                    type={this.state.type}
                                    placeholder={this.state.value}
                                    required
                                  />
                                </Col>
                              </Form.Row>
                            </Form.Group>
                          ) : (
                            ""
                          )}
                          {this.state.showInRangeValue ? (
                            <Form.Group>
                              <Form.Row>
                                <Col>
                                  <Form.Control
                                    name="RangeValue"
                                    type={this.state.type}
                                    value={this.state.RangeValue}
                                    placeholder={this.state.value}
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
                              <Col>
                                <Button variant="primary" type="submit">
                                  Trigger
                                </Button>
                              </Col>
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

Trigger.propTypes = {
  saveTriggerDetails: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
  ruleCreation: PropTypes.object.isRequired,

}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
  ruleCreation: state.ruleCreation,
});

export default connect(mapStateToProps, {saveTriggerDetails})(Trigger);
