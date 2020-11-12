import React, { Component } from "react";
import "./service.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { saveRuleDetails } from '../../actions/ruleCreation'
import { Form, Col, Button } from "react-bootstrap";
import axios from "axios";

class RuleEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ruleDetails: [],
      ruleDetail: {},
      ruleList: [],
      noData: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.editRuleHandler = this.editRuleHandler.bind(this);
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

  handleChange(event) {
    let value = event.target.value;
    const data = this.state.ruleDetails;
    const ruleDetail = data.filter((rule) => rule.creation.rulename === value);
    this.setState({ value: value, ruleDetail: ruleDetail[0] });
    console.log("logs...", ruleDetail[0]);
    this.props.saveRuleDetails(this.state.ruleDetail.creation);
  }

  editRuleHandler = (event) => {
    event.preventDefault();
    this.props.history.push("/rule/create");
  };

  render() {
    return (
      <section className="banner-area relative ser-banner">
        <div className="overlay overlay-bg"></div>
        <div className="container">
          <div className="row ser-fullscreen align-items-center justify-content-between">
            <div className="ser-container">
              <div className="ser-col col-lg-12 col-md-12 banner-left">
                <h1 className="text-white">Edit Rules</h1>
              </div>
              <div className="ser-col col-lg-12 col-md-12 banner-left">
                <div class="tripStatusContainer upcoming">
                  <div class="tripStatusWrap" id="tripStatusWrap">
                    <ul class="txtFild">
                      <form
                        className="ruleForm"
                        onSubmit={this.editRuleHandler}
                      >
                        <Form>
                          <Form.Label className="triggerLabel">
                            Select rule name to edit :{" "}
                          </Form.Label>
                          <Form.Group>
                            <Form.Row>
                              <Col>
                                <Form.Control
                                  as="select"
                                  value={this.state.value}
                                  onChange={this.handleChange}
                                >
                                  <option>select the rule</option>
                                  {this.state.ruleList.map((rulename) => (
                                      <option>{rulename}</option>
                                    ))}
                                </Form.Control>
                              </Col>
                            </Form.Row>
                          </Form.Group>
                          <Form.Group>
                            <Form.Row>
                              <Col>
                                <Button variant="primary" type="submit">
                                  Edit
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

RuleEdit.propTypes = {
  saveRuleDetails: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
});

export default connect(mapStateToProps, {saveRuleDetails})(RuleEdit);
