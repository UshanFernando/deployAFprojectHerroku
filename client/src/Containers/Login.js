import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Alert from "../Components/Alert/Alert";

class Login extends Component {
  constructor(props) {
    super(props);

    this.addlogin = this.addlogin.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      email: "",
      password: "",
      redirect: false,
      userRegAlert: false,
      userRegMsg: "",
      userRegTheme: "",
    };
  }

  onChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  async addlogin(event) {
    event.preventDefault();
    if (this.state.email.trim() != 0) {
      try {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: this.state.email.toLowerCase(),
            password: this.state.password,
          }),
        };
        const res = await fetch(
          "http://localhost:5000/login/login",
          requestOptions
        );

        const data = await res.json();

        if (data.hasOwnProperty("accessToken")) {
          localStorage.setItem("token", data.accessToken);
          this.setState({
            redirect: true,
          });
        } else {
          this.setState({
            userRegMsg: data.error,
            userRegAlert: true,
            userRegTheme: "danger",
          });
        }
      } catch (e) {
        console.log(e);
      }
    }
  }



  render() {
    if (this.state.redirect) {
      return <Redirect to="/home" />;
    }
    return (
      <div>
        <section class="login_box_area section-margin">
          <div class="container">
            <div class="row">
              <div class="col-lg-6">
                <div class="login_box_img">
                  <div class="hover">
                    <h4>New to our website?</h4>
                    <p>
                      There are advances being made in science and technology
                      everyday, and a good example of this is the
                    </p>
                    <a class="button button-account" href="Register">
                      Create an Account
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="login_form_inner">
                  <h3>Log in to enter</h3>
                  <form
                    class="row login_form"
                    id="contactForm"
                    onSubmit={this.addlogin}
                  >
                    <div class="col-md-12 form-group">
                      <input
                        type="email"
                        required="true"
                        class="form-control"
                        id="name"
                        name="email"
                        placeholder="Email"
                        onfocus="this.placeholder = ''"
                        onblur="this.placeholder = 'Username'"
                        value={this.state.email}
                        onChange={this.onChange}
                      />
                    </div>
                    <div class="col-md-12 form-group">
                      <input
                        type="password"
                        required="true"
                        class="form-control"
                        id="name"
                        name="password"
                        placeholder="Password"
                        onfocus="this.placeholder = ''"
                        onblur="this.placeholder = 'Password'"
                        value={this.state.password}
                        onChange={this.onChange}
                      />
                    </div>
                    
                    <div class="col-md-12 form-group">
                      <button
                        type="submit"
                        value="submit"
                        class="button button-login w-100"
                      >
                        Log In
                      </button>
                      
                      <Alert
                        show={this.state.userRegAlert}
                        theme={this.state.userRegTheme}
                        msg={this.state.userRegMsg}
                        hideAlert={this.hideAlert}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
export default Login;
