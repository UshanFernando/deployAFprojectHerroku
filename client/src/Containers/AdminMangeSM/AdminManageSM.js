import React, { Component } from "react";
import Wrapper from "../../Hoc/Wrapper";
import StoreManagersList from "../../Layouts/StoreMangersList/StoreManagersList";
import RegisterNewStoreManager from "../../Layouts/RegisterNewStoreManager/RegisterNewStoreManager";
import Alert from "../../Components/Alert/Alert";
import Auth from "../../Authentication/Auth";

export class AdminManageSM extends Component {
  constructor(props) {
    super(props);
    this.registerSM = this.registerSM.bind(this);
    this.loadStoreManagers = this.loadStoreManagers.bind(this);
    this.deleteSM = this.deleteSM.bind(this);
    this.state = {
      storeManagers: null,
      userRegAlert: false,
      userRegMsg: "",
      userRegTheme: "",
      fname: "",
      lname: "",
      email: "",
    };
  }

  async componentDidMount() {
    this.loadStoreManagers();
  }
  render() {
    return (
      <Wrapper>
        <h4 className="pt-4">Register New Store Managers</h4>
        <RegisterNewStoreManager
          onChangeLname={this.lnameInputChange}
          onChangeFname={this.fnameInputChange}
          onChangeEmail={this.emailInputChange}
          regNewUser={this.registerSM}
          valueFname={this.state.fname}
          valueLname={this.state.lname}
          valueEmail= {this.state.email}
        />
        <Alert
          show={this.state.userRegAlert}
          theme={this.state.userRegTheme}
          msg={this.state.userRegMsg}
          hideAlert={this.hideAlert}
        />
        <h4 className="pt-4">Registered Store Managers</h4>
        <div className="listScrollable">
          <StoreManagersList
            storeManagersList={this.state.storeManagers}
            onDelete={this.deleteSM}
          />
        </div>
      </Wrapper>
    );
  }

  hideAlert = () => {
    this.setState({
      userRegAlert: false,
    });
  };

  lnameInputChange = (e) => {
    this.setState({ lname: e.target.value });
  };

  fnameInputChange = (e) => {
    this.setState({ fname: e.target.value });
  };

  emailInputChange = (e) => {
    this.setState({ email: e.target.value });
  };

  validateRegUser = () => {
    if (
      this.state.lname.trim() == "" ||
      this.state.fname.trim() == "" ||
      this.state.email.trim() == ""
    ) {
      this.setState({
        userRegAlert: true,
        userRegMsg: "Please provide all required fields!",
        userRegTheme: "danger",
      });
      return false;
    } else {
      return true;
    }
  };

  async registerSM(event) {
    event.preventDefault();
    if (this.validateRegUser()) {
      try {
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: Auth.getToken(),
          },
          body: JSON.stringify({
            fname: this.state.fname,
            lname: this.state.lname,
            email: this.state.email,
          }),
        };
        const res = await fetch(
          "http://localhost:5000/admin/storemanager",
          requestOptions
        );
        const data = await res.json();

        console.log(data);
        if (data.hasOwnProperty("error")) {
          this.setState({
            userRegMsg: data.error,
            userRegAlert: true,
            userRegTheme: "danger",
          });
        } else {
          if (data.hasOwnProperty("ok")) {
            this.setState({
              lname: "",
              fname: "",
              email: "",
              userRegMsg: data.ok,
              userRegAlert: true,
              userRegTheme: "success",
            });
            this.loadStoreManagers();
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  async loadStoreManagers() {
    try {
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json", token: Auth.getToken() },
      };
      const res = await fetch(
        "http://localhost:5000/admin/storemanager",
        requestOptions
      );
      const data = await res.json();
      this.setState({
        storeManagers: data,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async deleteSM(id) {
    try {
      const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json", token: Auth.getToken() },
        body: JSON.stringify({ id: id }),
        token: Auth.getToken(),
      };
      await fetch("http://localhost:5000/admin/storemanager", requestOptions);
      this.loadStoreManagers();
    } catch (e) {
      console.log(e);
    }
  }
}

export default AdminManageSM;
