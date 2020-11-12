import React, { Component } from 'react'
import "./login.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock, faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            pass: '',
            passState: false,
            error: {},
            formSubmitted: false,
            autoHideSnackBarDuration: 4000,
            formUpdateSeverity: 'success',
            formUpdatedMsg: '',
        };
    }

    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/home');
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log("login...")
        if(nextProps.auth.isAuthenticated){
            this.setState({ userState: false, passState: false,formSubmitted: true,formUpdateSeverity: 'success',
            formUpdatedMsg: 'Parameters updated successfully', });
            this.props.history.push('/home')
        }
        console.log(nextProps.errors)
        if(Object.keys(nextProps.errors).length !== 0){
            console.log("erross.....")
            this.setState({
                username:'',
                pass:'',
                formSubmitted: true,
                formUpdateSeverity: 'error',
                formUpdatedMsg: nextProps.errors,
            })
        }
    }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        if (nam === 'username') {
            this.setState({ userState: false });
        }
        else {
            this.setState({ passState: false });
        }
        this.setState({ [nam]: val });
    }

    handleSnackBarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ formSubmitted: false })
    };

    mySubmitHandler = (event) => {
        event.preventDefault();
        let pass = this.state.pass;
        let name = this.state.username;
        if (pass === '' && name === '') {
            this.setState({ userState: true, passState: true });
        } else if (pass === '') {
            this.setState({ passState: true });
        } else if (name === '') {
            this.setState({ userState: true });
        }
        else {
            const user = {
                username: name,
                password: pass,
            }
            this.props.loginUser(user);
            console.log(user)
        }

    }

    render() {
        return (
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100 p-t-50 p-b-30">
                        <form className="login100-form validate-form" onSubmit={this.mySubmitHandler}>

                            <div className="login100-form-avatar">
                                <FontAwesomeIcon icon={faSignInAlt} className="avatar" />
                            </div>

                            <span className="login100-form-title p-t-20 p-b-45">
                                Agent Log In
						    </span>

                            <div className={`wrap-input100 validate-input m-b-10 ${this.state.userState ? "alert-validate" : ''}`} data-validate="Username is required">
                                <input className="input100 log" type="text" name="username" value={this.state.username} placeholder="Username" onChange={this.myChangeHandler}></input>
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                    <FontAwesomeIcon icon={faUser} />
                                </span>                            
                            </div>

                            <div className={`wrap-input100 validate-input m-b-10 ${this.state.passState ? "alert-validate" : ''}`} data-validate="Password is required">
                                <input className="input100 pass" type="password" name="pass" value={this.state.pass} placeholder="Password" onChange={this.myChangeHandler}></input>
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                    <FontAwesomeIcon icon={faLock} />
                                </span>
                            </div>

                            <div className="container-login100-form-btn p-t-10">
                                <button className="login100-form-btn">
                                    Login
							</button>
                            </div>
                        </form>
                    </div>
                </div>
                <Snackbar open={this.state.formSubmitted} autoHideDuration={this.state.autoHideSnackBarDuration} onClose={(event, reason) => this.handleSnackBarClose(event, reason)}>
                    <Alert onClose={(event, reason) => this.handleSnackBarClose(event, reason)} severity={this.state.formUpdateSeverity}>
                        {this.state.formUpdatedMsg}
                    </Alert>
                </Snackbar>
            </div>
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth : state.auth,
    errors : state.errors
})
export default connect(mapStateToProps,{ loginUser })(Login);