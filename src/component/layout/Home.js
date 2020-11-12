import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

class Home extends Component {
constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        
        return (
            <section className="banner-area relative">
                <div className="overlay overlay-bg"></div>
                <div className="container">
                    <div className="row fullscreen align-items-center justify-content-between">
                        <div className="col-lg-6 col-md-6 banner-left">
                            <h1 className="text-white">PNR Management System</h1>
                            <p className="text-white">
                                To enable you to update your customer's PNR status..!
							</p>
                            <Link to="/rule/create" className="primary-btn text-uppercase">Get Started</Link>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

Home.propTypes = {
    auth: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth : state.auth,
    error: state.error
})
export default connect(mapStateToProps,{ })(Home)