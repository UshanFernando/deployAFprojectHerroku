import React, { Component, useReducer } from 'react'
import { Redirect } from "react-router-dom";



class Register extends Component {

	constructor(props) {
		super(props);
		
		this.addRegister = this.addRegister.bind(this);
		this.onChange = this.onChange.bind(this);
		this.state = {
			utype:"user",
			fname: "",
			lname: "",
			email: "",
			password: "",
			fnameError: "",
			lnameError: "",
			emailError: "",
			passwordError: ""
		}
	  }

	  onChange(event) {
        const target = event.target;
        const value =  target.value
		const name= target.name;
	
       
        this.setState({
            [name]:value
        
        });
      }

	  validate = ()	=>{
		let fnameError= "";
		let lnameError= "";
		let emailError= "";
		let passwordError= "";

		if(!this.state.fname){
			fnameError = "First Name can not be blank"
		}

		if(!this.state.lname){
			lnameError = "Last Name can not be blank"
		}

		if(!this.state.email.includes('@'||'mail.com')){
			emailError = 'Invalid email';
		}

		if(!this.state.password){
			passwordError = "Password can not be blank"
		}

		if(fnameError||lnameError||emailError||passwordError){
			this.setState({fnameError,lnameError,emailError,passwordError});
			return false;
		}
		return true;
	  }

	  async addRegister(event) {

		event.preventDefault();
		const isValid = this.validate();
		if(isValid){
			console.log(this.state);

			this.setState({
				redirect: true,
			  });
		}
		

		if (this.state.fname.trim() != 0) {
		  try {
			const requestOptions = {
			  method: "POST",
			  headers: { "Content-Type": "application/json" },
			  body: JSON.stringify({ 
				utype:this.state.utype,
				  fname: this.state.fname, 
				  lname: this.state.lname,
				  email: this.state.email.toLowerCase(),
				  password: this.state.password
				}),
			};
			 await fetch(
			  "http://localhost:5000/register/register",
			  requestOptions
			);
			
			this.setState({
				fname: "",
				lname: "",
				email: "",
				password: "",
			});
		  } catch (e) {
			console.log(e);
		  }
		}
	  }

render(){

	if (this.state.redirect) {
		return <Redirect to="/login" />;
	  }
    return(
        <div>
            <section class="login_box_area section-margin">
		<div class="container">
			<div class="row">
				<div class="col-lg-6">
					<div class="login_box_img">
						<div class="hover">
							<h4>Already have an account?</h4>
							<p>There are advances being made in science and technology everyday, and a good example of this is the</p>
							<a class="button button-account" href="login">Login Now</a>
						</div>
					</div>
				</div>
				<div class="col-lg-6">
					<div class="login_form_inner register_form_inner">
						<h3>Create an account</h3>
						<form class="row login_form"  id="register_form" onSubmit={this.addRegister}>

						
							
							<div class="col-md-12 form-group">
                                <input type="text" class="form-control" id="name" name="fname" 
                                placeholder="First Name" onfocus="this.placeholder = ''" 
                                onblur="this.placeholder = 'First Name'"
								value={this.state.fname}
                				onChange={this.onChange}/>

								
								<div style={{color:"red"}}>
									{this.state.fnameError}
								</div>
							

							</div>

                            <div class="col-md-12 form-group">
                                <input type="text" class="form-control" id="name" name="lname" 
                                placeholder="Last Name" onfocus="this.placeholder = ''" 
                                onblur="this.placeholder = 'Last Name'"
								value={this.state.lname}
                				onChange={this.onChange}/>

								<div style={{color:"red"}}>
									{this.state.lnameError}
								</div>

							</div>

							<div class="col-md-12 form-group">
                                <input type="text" class="form-control" id="email" name="email" 
                                placeholder="Email Address" onfocus="this.placeholder = ''" 
                                onblur="this.placeholder = 'Email Address'"
								value={this.state.email}
                				onChange={this.onChange}/>

								<div style={{color:"red"}}>
									{this.state.emailError}
								</div>

                            </div>


                            <div class="col-md-12 form-group">
                                <input type="password" class="form-control" id="password" name="password" 
                                placeholder="Password" onfocus="this.placeholder = ''" 
                                onblur="this.placeholder = 'Password'"
								value={this.state.password}
                				onChange={this.onChange}/>

								<div style={{color:"red"}}>
									{this.state.passwordError}
								</div>

                            </div>
              
							
							<div class="col-md-12 form-group">
                                <button type="submit" value="submit" 
                                class="button button-register w-100"
								onClick={this.addRegister}>Register</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</section>
	

        </div>
    )
}


}
export default Register;