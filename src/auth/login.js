import React, { Component } from "react";
import './../assets/css/login.css';
import teaching from './../assets/img/teaching.svg';
import logo from './../assets/img/ept.png';
import { Link, Redirect } from "react-router-dom";

import {login} from "./../actions/auth";

import {connect} from "react-redux";

import PropTypes from "prop-types"

class Login extends Component {
    
    state = {
        email:'',
        password: ''
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.login(this.state.email, this.state.password);
    }
    render() {

        const isAuthenticated = this.props.isAuthenticated;
        const { email, password} = this.state;


        if(isAuthenticated && this.props.user.CurrentRoles.find(role => (role.role_type === "ETUDIANT"))) {
           return <Redirect to="/etudiant" />
        }
        
        else if (isAuthenticated && this.props.user.CurrentRoles.find(role => (role.role_type === "MEMBRE_SCOLARITE"))) {
            return <Redirect to="/scolarite" />
        }

        else if (isAuthenticated && this.props.user.CurrentRoles.find(role => (role.role_type === "ADMIN"))) {
            return <Redirect to="/admin" />
        }

        else if (isAuthenticated && this.props.user.CurrentRoles.find(role => (role.role_type === "MEMBRE_FINANCE"))) {
            return <Redirect to="/finance" />
        }

        else if (isAuthenticated && this.props.user.CurrentRoles.find(role => (role.role_type === "MEMBRE_BIBLIOTHEQUE"))) {
            return <Redirect to="/bibliotheque" />
        }
        else if (isAuthenticated && this.props.user.CurrentRoles.find(role => (role.role_type === "ENSEIGNANT"))) {
            return <Redirect to="/enseignant" />
        }
        else if (isAuthenticated && this.props.user.CurrentRoles.find(role => (role.role_type === "COMPTABLE"))) {
            return <Redirect to="/comptable" />
        }
        else if (isAuthenticated && this.props.user.CurrentRoles.find(role => (role.role_type === "MEDECIN"))) {
            return <Redirect to="/medecin" />
        }
        else if (isAuthenticated && this.props.user.CurrentRoles.find(role => (role.role_type === "COMMUNICATION"))) {
            return <Redirect to="/communication" />
        }
        
        return(
            
            <div className="container-fluid">
                <div className="row no-gutter">
                    <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image">
                        <img src={teaching} className="img-fluid" />
                    </div>
                    <div className="col-md-8 col-lg-6">
                    <div className="login d-flex align-items-center py-5">
                        <div className="container">
                        <div className="row">
                            <div className="col-md-9 col-lg-8 mx-auto">
                            <div className="text-center">
                            <img src={logo} className="img-fluid mb-3 text" width="150px" />
                            </div>
                            <div className="shadow py-4 mb-4">
                                <h3 className="text-center">ESPACE NUMERIQUE DE TRAVAIL</h3>
                            </div>
                            {this.props.errors.length > 0 && (
                                <div>
                                {this.props.errors.map(error => (
                                    <div class="alert alert-danger" role="alert" key={error.field}>
                                        {error.message}
                                    </div>
                                ))}
                                </div>
                            )}
                            <form onSubmit={this.onSubmit}>
                                <div className="form-label-group">
                                    <input 
                                    type="email" 
                                    id="inputEmail" 
                                    className="form-control" 
                                    name="email" placeholder="Adresse Email"
                                    value={email}
                                    required onChange={this.onChange} />
                                    <label htmlFor="inputEmail">Email</label>
                                </div>

                                <div className="form-label-group">
                                    <input type="password"
                                     id="inputPassword" 
                                     name="password" 
                                     className="form-control" placeholder="Mot de passe" 
                                     value={password}
                                     required onChange={this.onChange} />
                                    <label htmlFor="inputPassword">Mot de passe</label>
                                </div>

                                <div className="custom-control custom-checkbox mb-3">
                                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                    <label className="custom-control-label" htmlFor="customCheck1">Remember password</label>
                                </div>
                                <button className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2" type="submit">Se connecter</button>
                            </form>
                            <div className="text-center mt-2">
                                <Link to="/changePassword">Mot de passe oublié ?</Link>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    let errors = [];
    if (state.auth.errors) {
      errors = Object.keys(state.auth.errors).map(field => {
        return {field, message: state.auth.errors[field]};
      });
    }
    return {
      errors,
      isAuthenticated: state.auth.isAuthenticated,
      user:state.auth.user
    };
  }

// const mapStateToProps = (state) => (
//     {
//     isAuthenticated: state.auth.isAuthenticated,
//     user: state.auth.user,
//     errors: state.auth.errors
// }
// );


export default connect(mapStateToProps, {login})(Login)