import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Auth from "../Authentication/Auth";
import { Redirect } from "react-router-dom";

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: Auth.getUserId(),
      customer: [],
      token: "",
      login: "",
      fName: "",
      lName: "",
      email: "",
      Cemail: "",
      password: "",
      cDeleteEmail: "",
    };

    this.setFname = this.setFname.bind(this);
    this.updateUserDetails = this.updateUserDetails.bind(this);
    this.setLname = this.setLname.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.setCemail = this.setCemail.bind(this);
    
  }

  setFname(event) {
    this.setState({
      fName: event.target.value,
    });
  }
  setLname(event) {
    this.setState({
      lName: event.target.value,
    });
  }
  setEmail(event) {
    this.setState({
      email: event.target.value,
    });
  }
  setPassword(event) {
    this.setState({
      password: event.target.value,
    });
  }
  setCemail(event) {
    this.setState({
      Cemail: event.target.value,
    });
  }

 


  componentDidMount() {
 
    this.displayUserDetails();
    // this.updateUserDetails();
   
  }

  async displayUserDetails () {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: Auth.getUserId() }),
      };
      const res = await fetch(
        "http://localhost:5000/reset/reset",
        requestOptions
      );
      const user = await res.json();
      console.log(user);
      this.setState({
        fName: user.fname,
        lName: user.lname,
        email: user.email,
        password: "",
      });
    } catch (e) {
      console.log(e);
    }
  }

  async updateUserDetails() {
  
    try {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json","token": Auth.getToken() },
        body: JSON.stringify({
        
          fname: this.state.fName,
          lname:this.state.lName
        }),
      };
      await fetch("http://localhost:5000/reset/register", requestOptions);
     this.displayUserDetails();
      
    } catch (e) {
      console.log(e);
    }
  }

  async deleteCustomer() {
  if(this.state.Cemail==this.state.email){
    try {
      const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json","token":Auth.getToken() },
        
      };
      await fetch("http://localhost:5000/register/register/"+this.state.user, requestOptions);
      
      // this.loadCartProducts();
      this.setState({
				redirect: true,
			  });
    } catch (e) {
      console.log(e);
    }
  }else{
    alert("Please enter a valid email address!");
  }
  }


  

  render() {

    if (this.state.redirect) {
      return <Redirect to="/register" />;
      }
    return (
      <Router>
        <Switch>
          <div>
            <div>
              <section class="login_box_area section-margin">
                <div class="container">
                  <div
                    className="card bg-light mt-3"
                    style={{ width: "600px", marginLeft: "300px" }}
                  >
                    <div
                      className="form-signin"
                      
                    
                    >
                      <button
                        className="btn btn-md btn"
                        
                        style={{ width: "180px", marginLeft: "225px" }}
                      >
                        <a href="/Home">Home</a>
                      </button>
                      <h1 className="h3 mb-3 font-weight-normal">
                        Account Details
                      </h1>
                      <div
                        className="input-group mb-2"
                        style={{ width: "500px", marginLeft: "50px" }}
                      >
                        <div className="input-group-prepend">
                          <div className="input-group-text">First Name</div>
                        </div>
                        <input
                          type="text"
                          id="inputFname"
                          name="uFname"
                          onChange={this.setFname}
                          value={this.state.fName}
                          className="form-control"
                          placeholder="First name"
                          autoFocus
                        ></input>
                      </div>

                      <div
                        className="input-group mb-2"
                        style={{ width: "500px", marginLeft: "50px" }}
                      >
                        <div className="input-group-prepend">
                          <div className="input-group-text">Last Name</div>
                        </div>
                        <input
                          type="text"
                          id="inputLname"
                          name="uLname"
                          onChange={this.setLname}
                          defaultValue={this.state.lName}
                          className="form-control"
                          placeholder="Last name"
                          autoFocus
                        ></input>
                      </div>

                      <div
                        className="input-group mb-2"
                        style={{ width: "500px", marginLeft: "50px" }}
                      >
                        <div className="input-group-prepend">
                          <div className="input-group-text">Email</div>
                        </div>
                        <input
                          type="email"
                          id="inputEmail1"
                          name="uEmail"
                          onChange={this.setEmail}
                          value={this.state.email}
                          className="form-control"
                          placeholder="Email address"
                          autoFocus
                          readOnly
                        ></input>
                      </div>

                      <div
                        className="input-group mb-2"
                        style={{ width: "500px", marginLeft: "50px" }}
                      >
                        
                      </div>

                     
                      <button
                        className="btn btn-md btn-warning "
                        
                        style={{ width: "180px", marginLeft: "225px" }}
                        onClick={
                this.updateUserDetails
              }
              className="button"
                      >
                        Update
                      </button>
                    </div>

                    <label htmlFor="sel1">Input your email here to delete the account :</label>
                     <input type="email" id="inputEmail" name="dCusEmail" onChange={this.setCemail} value={this.state.Cemail} className="form-control" placeholder="Email address" required autoFocus></input>
                    <button className="btn btn-md btn-danger " onClick={()=>{if (window.confirm('This can not be undone')) this.deleteCustomer()}} type="submit" style={{width:"180px", marginLeft:"225px"}}>Delete Account</button>
                    

                   
                  </div>
                </div>
              </section>
            </div>
          </div>
        </Switch>
      </Router>
    );
  }
}

export default Profile;
