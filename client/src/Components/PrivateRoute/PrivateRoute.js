// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import React from "react";
import Auth from "../../Authentication/Auth";
import { Redirect, Route } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Wrapper from "../../Hoc/Wrapper";

const PrivateRoute = ({ component: Component, role, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const loggedIn = Auth.isAuthenticated();
      if (!loggedIn) {
        // not logged in so redirect to login page with the return url
        return (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        );
      }

      // check if route is restricted by role
      if (Auth.getUserLevel() !== 'admin') {
        if (role == 'admin' && Auth.getUserLevel() !== "admin") {
          return <Redirect to={{ pathname: "/Home" }} />;
        } else if (role == 'sm' && Auth.getUserLevel() !== "sm") {
          return <Redirect to={{ pathname: "/Home" }} />;
        }
      }

      // authorised so return component
      return (
        <Wrapper>
          <NavBar />
          <Component {...props} />
        </Wrapper>
      );
    }}
  />
);
export default PrivateRoute;
