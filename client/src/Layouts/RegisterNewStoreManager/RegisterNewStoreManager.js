import React from "react";

const RegisterNewStoreManager = (props) => {
  return (
    <div className="bg-light mt-4 p-4">
      <form className="login_form"  id="contactForm">
        <div className="row pt-4">
          <div className="col-sm  form-group">
            <input
              type="text"
              className="form-control"
              id="firstName"
              placeholder="First Name"
              onChange={props.onChangeFname}
              value={props.valueFname}
            />
          </div>
          <div className="col-sm  form-group">
            <input
              type="text"
              className="form-control"
              id="lastName"
              placeholder="Last Name"
              onChange={props.onChangeLname}
              value={props.valueLname}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm form-group">
            <div className="creat_account">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email"
                onChange={props.onChangeEmail}
                value={props.valueEmail}
              />
            </div>
          </div>
          <div className="col-sm form-group">
            <button
              type="submit"
              value="submit"
              className="button button-login w-100"
              onClick={props.regNewUser}
            >
              Generate Login and Send
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterNewStoreManager;
