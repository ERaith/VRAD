import React, { Component } from "react";
import PropTypes from "prop-types";

const validEmailRegex = RegExp(
  // eslint-disable-next-line
  /^(([^<>()\[\]\.,;:\s@\']+(\.[^<>()\[\]\.,;:\s@\']+)*)|(\'.+\'))@(([^<>()[\]\.,;:\s@\']+\.)+[^<>()[\]\.,;:\s@\']{2,})$/i
);

class Login extends Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      email: "",
      purpose: "",
      errors: {
        userName: "",
        email: "",
        purpose: ""
      }
    };
  }

  handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case "userName":
        errors.userName =
          value.length < 5 ? "User Name must be 5 characters long!" : "";
        break;
      case "email":
        errors.email = validEmailRegex.test(value) ? "" : "Email is not valid!";
        break;
      case "purpose":
        errors.purpose =
          value === "default" ? "Choose Reason for Traveling." : "";
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value }, () => {
      console.log(errors);
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.validateForm(this.state.errors)) {
      const { login } = this.props;
      const { userName, email, purpose } = this.state;
      login({
        userName: userName,
        email: email,
        purpose: purpose
      });
      console.info("Valid Form");
    } else {
      console.error("Invalid Form");
    }
  };

  validateForm = errors => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    return valid;
  };

  render() {
    const { errors, userName, email, purpose } = this.state;
    const isEnabled =
      errors.email.length === 0 &&
      errors.userName.length === 0 &&
      userName !== "" &&
      email !== "" &&
      errors.purpose === 0;

    return (
      <form>
        <div className="input-wrapper">
          <span className="error">{errors.userName}</span>
          <input
            type="text"
            placeholder="User Name"
            name="userName"
            value={userName}
            onChange={event => this.handleChange(event)}
          />
        </div>

        <div className="input-wrapper">
          <span className="error">{errors.email}</span>
          <input
            type="text"
            placeholder="Email@provider.com"
            name="email"
            value={email}
            onChange={event => this.handleChange(event)}
          />
        </div>
        <div className="input-wrapper">
          <select
            name="purpose"
            value={purpose}
            onChange={event => this.handleChange(event)}
          >
            <option value="default">Select a Purpose</option>
            <option value="buisness">Buisness</option>
            <option value="vacation">Vaction</option>
            <option value="other"> Other</option>
          </select>
        </div>

        <button disabled={!isEnabled} onClick={this.handleSubmit}>
          Login
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  Login: PropTypes.func
};

export default Login;
