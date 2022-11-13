import { Component } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./index.css";

class LoginForm extends Component {
  state = {
    phoneNumber: "",
    password: "",
    showSubmitError: false,
    showPassword: false,
    errorMsg: "",
  };

  onChangePhoneNumber = (event) => {
    this.setState({ phoneNumber: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  submitForm = async (event) => {
    event.preventDefault();
    const { phoneNumber, password } = this.state;
    const phNo = parseInt(phoneNumber);
    if (phoneNumber === "") {
      this.setState({
        showSubmitError: true,
        errorMsg: "Empty Phone Number Field",
      });
      toast.error("Empty Phone Number Field", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (password === "") {
      this.setState({
        showSubmitError: true,
        errorMsg: "Empty Password Field",
      });
      toast.error("Empty Password Field", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (
      phoneNumber.length !== 10 ||
      typeof phNo !== "number" ||
      isNaN(phNo)
    ) {
      this.setState({
        showSubmitError: true,
        errorMsg: "Invalid Phone Number",
      });
      toast.error("Invalid Phone Number", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      const { history } = this.props;

      history("/");
    }
  };

  renderPasswordField = () => {
    const { password, showPassword } = this.state;

    const fieldType = showPassword ? "text" : "password";

    return (
      <>
        <label className="input-label" htmlFor="password">
          Password*
        </label>
        <input
          type={fieldType}
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Enter Password"
        />
      </>
    );
  };

  renderPhoneNumberField = () => {
    const { phoneNumber } = this.state;

    return (
      <>
        <label className="input-label" htmlFor="phoneNumber">
          Phone Number*
        </label>
        <input
          type="text"
          id="phoneNumber"
          className="phone-number-input-field"
          value={phoneNumber}
          onChange={this.onChangePhoneNumber}
          placeholder="Enter Phone Number"
        />
      </>
    );
  };

  onToggleCheckbox = (event) => {
    this.setState({
      showPassword: event.target.checked,
    });
  };

  renderCheckbox = () => (
    <div className="checkbox-input-container">
      <input
        id="checkboxInput"
        type="checkbox"
        className="checkbox-input-field"
        onChange={this.onToggleCheckbox}
      />
      <label className="input-label checkbox-label" htmlFor="checkboxInput">
        Show Password
      </label>
    </div>
  );

  render() {
    const { showSubmitError, errorMsg } = this.state;

    return (
      <div className="login-form-container">
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <div className="login-desktop-img-container">
          <img
            className="login-desktop-img"
            src="https://res.cloudinary.com/dinhpbueh/image/upload/v1668310823/Screenshot_2022-11-13_at_08.58.44_hlmpuv.png"
            alt=""
          />
        </div>
        <div className="form-container-div">
          <img
            className="login-mobile-img"
            src="https://res.cloudinary.com/dinhpbueh/image/upload/v1668310823/Screenshot_2022-11-13_at_09.08.29_wshxn5.png"
            alt="website login"
          />
          <img
            className="login-website-logo"
            src="https://res.cloudinary.com/dinhpbueh/image/upload/v1668151414/NxtWave_TM_Coloured_logo_1_k705pa.png"
            alt="login website logo"
          />
          <form className="form" onSubmit={this.submitForm}>
            <div className="login-input-container">
              {this.renderPhoneNumberField()}
            </div>
            <div className="login-input-container">
              {this.renderPasswordField()}
            </div>
            <div className="login-input-container">{this.renderCheckbox()}</div>
            <button type="submit" className="login-button">
              Login
            </button>
            {showSubmitError && (
              <p className="login-error-message">*{errorMsg}</p>
            )}
          </form>
        </div>
      </div>
    );
  }
}

const withRouter = (Component) => (props) => {
  const history = useNavigate();
  const location = useLocation();
  const params = useParams();
  return (
    <Component
      params={params}
      history={history}
      location={location}
      {...props}
      replace
    />
  );
};

export default withRouter(LoginForm);
