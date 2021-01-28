import React from "react";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import DeniedAccess from "./../components/auth/403"

const PrivateRoute = ({component: Component, auth,pass,...rest}) => (

    <Route
    {...rest}
    render={(props) => {
      if (auth.isLoading) {
        return <h2>Loading...</h2>;
      } 
      else if (!auth.isAuthenticated) {
        return <Redirect to="/" />;
      }
      else if (auth.user.CurrentRoles.find(role => (role.role_type === pass))) {
      
        return <Component {...props} />;
      } 
      else {
        return <DeniedAccess pass={pass} />
      }
    }}
  />

);

const mapStateToProps = (state) => ({
    auth: state.auth,
})


export default connect(mapStateToProps)(PrivateRoute)