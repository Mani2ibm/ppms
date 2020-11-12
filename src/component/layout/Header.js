import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onLogout(e) {
    e.preventDefault();
    this.props.logoutUser();
    this.props.history.push("/login");
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const authLinks = (
      <ul className="nav-menu">
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li class="menu-has-children">
          <Link>Service</Link>
          <ul className="dropdown">
            <li>
              <Link to="/rule/create">
                Rule Create
              </Link>
            </li>
            <li>
              <Link to="/rule/trigger">
                Rule Trigger
              </Link>
            </li>
            <li>
              <Link to="/rule/action">
                Rule Action
              </Link>
            </li>
            <li>
              <Link to="/rule/list">
                Rule Listing
              </Link>
            </li>
            <li>
              <Link to="/rule/edit">
                Rule Edit
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link onClick={this.onLogout.bind(this)}>Logout</Link>
        </li>
      </ul>
    );
    const guestLinks = (
      <ul className="nav-menu">
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    );
    return (
      <header id="header">
        <div className="container main-menu">
          <div className="row align-items-center justify-content-between d-flex">
            <div id="logo">
              <Link>LOGO</Link>
              {/* <img src={logo} alt="" title="" /> */}
            </div>
            <nav id="nav-menu-container">
              {isAuthenticated ? authLinks : guestLinks}
            </nav>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(withRouter(Header));
