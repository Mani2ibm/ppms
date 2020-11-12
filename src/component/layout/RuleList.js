import React, { Component } from "react";
import "./service.css";
import "./RuleList.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Form, Col, Button } from "react-bootstrap";
import axios from "axios";
import { getRuleDetails } from "../../actions/ruleDetailsActions";
import PopUp from "./PopUp";

class RuleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      ruleDetails: [],
      ruleDetail: {},
      ruleList: [],
      noData: true,
      popup: false,
    };
  }

  handleChange(event) {
    let value = event.target.value;
    const data = this.state.ruleDetails;
    console.log("data++", data);
    const ruleDetail = data.filter((rule) => rule.creation.rulename === value);
    this.setState({ value: value, ruleDetail: ruleDetail[0] });
    console.log("logs...", ruleDetail);
  }

  componentDidMount() {
    const url =
      "http://localhost:3001/rule?user=" + this.props.auth.user.username;
    axios.get(url).then((res) => {
      console.log(res.data);
      const data = res.data;
      if (data.length > 0) {
        const ruleList = [];
        data.map((data) => {
          ruleList.push(data.creation.rulename);
        });
        this.setState({ ruleDetails: data, ruleList: ruleList, noData: false });
      } else {
        this.setState({ noData: true });
      }
    });
  }

  ruleListHandler = (event) => {
    event.preventDefault();
    if (Object.keys(this.state.ruleDetail).length > 0) {
      console.log("detele Data", this.state.ruleDetail.id);
      const url = `http://localhost:3001/rule/${this.state.ruleDetail.id}`;
      axios.delete(url).then((res) => {
        console.log("delete rule", res);
        if (res.status === 200) {
          this.setState({ popup: true });
          this.setState({ ruleDetail: {}, ruleList: [] });
        }
      });
    }
  };

  togglePop = () => {
    this.setState({
      popup: !this.state.popup,
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
                <h1 className="text-white">List of Rules</h1>
              </div>
              <div className="ser-col col-lg-12 col-md-12 banner-left">
                <div class="tripStatusContainer upcoming">
                  <div class="tripStatusWrap" id="tripStatusWrap">
                    <ul class="txtFild">
                      {this.state.noData ? (
                        <form className="noDataForm">
                          <h3>There is no rule avaiable for the user</h3>
                        </form>
                      ) : (
                        <form
                          className="ruleForm"
                          onSubmit={this.ruleListHandler}
                        >
                          <Form>
                            <Form.Label className="triggerLabel">
                              Rule Name :{" "}
                            </Form.Label>
                            <Form.Group>
                              <Form.Row>
                                <Col>
                                  <Form.Control
                                    as="select"
                                    name="rulename"
                                    value={this.state.value}
                                    onChange={this.handleChange.bind(this)}
                                  >
                                    <option>select the ruleName</option>
                                    {this.state.ruleList.map((rulename) => (
                                      <option>{rulename}</option>
                                    ))}
                                  </Form.Control>
                                </Col>
                              </Form.Row>
                            </Form.Group>
                            <Form.Label className="triggerLabel">
                              Pseudo city code's :{" "}
                            </Form.Label>
                            <Form.Group>
                              <Form.Row>
                                <Col>
                                  <Form.Control
                                    as="select"
                                    name="citycode"
                                    value={this.state.value}
                                    onChange={this.handleChange}
                                  >
                                    {Object.keys(this.state.ruleDetail).length >
                                    0 ? (
                                      <option>
                                        {
                                          this.state.ruleDetail.creation
                                            .citycode
                                        }
                                      </option>
                                    ) : (
                                      <option>no pcc(s) is avaiable</option>
                                    )}
                                  </Form.Control>
                                </Col>
                              </Form.Row>
                            </Form.Group>
                            <Form.Label className="triggerLabel">
                              Trigger Type :{" "}
                            </Form.Label>
                            <Form.Group>
                              <Form.Row>
                                <Col>
                                  <Form.Control
                                    as="select"
                                    name="triggerType"
                                    value={this.state.value}
                                    onChange={this.handleChange}
                                  >
                                    {Object.keys(this.state.ruleDetail).length >
                                    0 ? (
                                      <option>
                                        {
                                          this.state.ruleDetail.trigger
                                            .triggerType
                                        }
                                      </option>
                                    ) : (
                                      <option>
                                        no trigger type is avaiable
                                      </option>
                                    )}
                                  </Form.Control>
                                </Col>
                              </Form.Row>
                            </Form.Group>
                            <Form.Label className="triggerLabel">
                              Action Type :{" "}
                            </Form.Label>
                            <Form.Group>
                              <Form.Row>
                                <Col>
                                  <Form.Control
                                    as="select"
                                    name="actionType"
                                    value={this.state.value}
                                    onChange={this.handleChange}
                                  >
                                    {Object.keys(this.state.ruleDetail).length >
                                    0 ? (
                                      <option>
                                        {
                                          this.state.ruleDetail.action
                                            .actionType
                                        }
                                      </option>
                                    ) : (
                                      <option>
                                        no action type is avaiable
                                      </option>
                                    )}
                                  </Form.Control>
                                </Col>
                              </Form.Row>
                            </Form.Group>
                          </Form>
                          <Form.Group>
                            <Form.Row>
                              <Col>
                                <Button variant="primary" type="submit">
                                  Delete
                                </Button>
                              </Col>                              
                              {this.state.popup ? (
                                <PopUp toggle={this.togglePop} />
                              ) : null}
                            </Form.Row>
                          </Form.Group>
                        </form>
                      )}
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

RuleList.propTypes = {
  getRuleDetails: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
  ruleDetails: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
  ruleDetails: state.ruleDetails,
});

export default connect(mapStateToProps, { getRuleDetails })(RuleList);
