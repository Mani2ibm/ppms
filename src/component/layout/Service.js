import React, { Component } from "react";
import "./service.css";
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { saveRuleDetails } from '../../actions/ruleCreation'
import { Form, Button, Col } from "react-bootstrap";

class Service extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name:"",
            isChecked: false,
            // rulename:"",
            // ruledesc:"",
            // citycode:"",
            // queueno:""
        }
    }

    toggleChange = () => {
      this.setState({
        isChecked: !this.state.isChecked,
      });
    }

    componentDidMount(){
      if(Object.keys(this.props.ruleCreation.creation).length > 0){
        const rulename = this.props.ruleCreation.creation.rulename;
        const ruledesc = this.props.ruleCreation.creation.ruledesc;
        const citycode = this.props.ruleCreation.creation.citycode;
        const queueno =this.props.ruleCreation.creation.queueno;
        this.setState({rulename:rulename,ruledesc:ruledesc,citycode:citycode,queueno:queueno})
      }
    }

    saveRuleHandler = (event) =>{
        event.preventDefault();
        const formData = new FormData(event.target);
        const form = {};
        for (let [key, value] of formData.entries()) {
            form[key] = value
        }
        console.log("Form Data", form);
        if(form.rulename !== ""){
            this.props.saveRuleDetails(form);
            this.props.history.push("/rule/trigger")
        }
    }

  render() {
    return (
      <section className="banner-area relative ser-banner">
        <div className="overlay overlay-bg"></div>
        <div className="container">
          <div className="row ser-fullscreen align-items-center justify-content-between">
            <div className="ser-container">
              <div className="ser-col col-lg-12 col-md-12 banner-left">
                <h1 className="text-white">Rule Creation</h1>
              </div>
              <div className="ser-col col-lg-12 col-md-12 banner-left">
                <div class="tripStatusContainer upcoming">
                  <div class="tripStatusWrap" id="tripStatusWrap">
                    <ul class="txtFild">
                
                      <form onSubmit={this.saveRuleHandler}>
                        <Form.Row>
                          <Form.Group as={Col} controlId="formGridName">
                            <Form.Label>Rule Name</Form.Label>
                            <Form.Control
                              type="name"
                              name= "rulename"
                              value={this.state.rulename}
                              placeholder="Enter Rule name"
                              required
                            />
                          </Form.Group>
                        </Form.Row>

                        <Form.Group controlId="formGridDesc">
                          <Form.Label>Rule Description</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows="3"
                            name= "ruledesc"
                            value={this.state.ruledesc}
                            placeholder="Enter Rule description"
                            required
                          />
                        </Form.Group>

                        <Form.Row>
                          <Form.Group as={Col} controlId="formGridCityCode">
                            <Form.Label>Pseudo city code</Form.Label>
                            <Form.Control
                              type="number"
                              name= "citycode"
                              value={this.state.citycode}
                              placeholder="Enter Pseudo city code"
                              required
                            />
                          </Form.Group>

                          <Form.Group as={Col} controlId="formGridQueueNo">
                            <Form.Label>Queue Number </Form.Label>
                            <Form.Control
                              type="number"
                              name= "queueno"
                              value={this.state.queueno}
                              placeholder="Enter Queue Number "
                              required
                            />
                          </Form.Group>
                        </Form.Row>

                        <fieldset>
                        <Form.Group controlId="formGridSegments">
                          <Form.Label>Select the type of segments </Form.Label>
                          <Form.Row>
                            <Form.Group as={Col} controlId="airSegmnet">
                              <Form.Check
                                type="checkbox"
                                label="Air Segment"
                                name="airSegmnet" 
                                id="airSegmentId"
                              />
                            </Form.Group>
                            <Form.Group as={Col} controlId="carSegment">
                              <Form.Check
                                type="checkbox"
                                label="Car Segment"
                                name="carSegment"
                                id="carSegmentId"
                              />
                            </Form.Group>
                            <Form.Group as={Col} controlId="hotelSegment">
                              <Form.Check
                                type="checkbox"
                                label="Hotel Segment"
                                name="hotelSegment" 
                                id="hotelSegmentId"
                              />
                            </Form.Group>
                          </Form.Row>
                        </Form.Group>
                        </fieldset>                      
                        <Button variant="primary" type="submit">Create</Button>      
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

Service.propTypes = {
    saveRuleDetails: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
    ruleCreation: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth : state.auth,
    error: state.error,
    ruleCreation: state.ruleCreation,
})

export default  connect(mapStateToProps,{ saveRuleDetails })(Service);
