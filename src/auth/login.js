import React,{useEffect} from "react";
import './../assets/css/auth/main.css';
import './../assets/css/auth/util.css';
import logo from './../assets/img/ept.png';
import { Link,useHistory } from "react-router-dom";
import photo from "./../assets/img/tenue.JPG";

import {login} from "./../actions/auth";
import {useForm} from "react-hook-form";

import {connect} from "react-redux";
import "jquery/dist/jquery.min.js";
import $ from "jquery";

const Login = (props) => {
    const {register, handleSubmit, formState} = useForm()
    const {isSubmitting} = formState;
    const history = useHistory();

    const onSubmit = async data => {
        await props.login(data.email,data.password);
    }

    const isAuthenticated = props.isAuthenticated;

    const focus = () => {
        $('.input100').each(function(){
            $(this).on('blur', function(){
                if($(this).val().trim() != "") {
                    $(this).addClass('has-val');
                }
                else {
                    $(this).removeClass('has-val');
                }
            })    
        })
    }

    useEffect(() => focus(),[])

    if(isAuthenticated && props.user.CurrentRoles.find(role => (role.role_type === "ETUDIANT"))) {
        history.push("/etudiant");
    }
    else if (isAuthenticated && props.user.CurrentRoles.find(role => (role.role_type === "MEMBRE_SCOLARITE"))) {
        history.push("/scolarite");
    }
    else if (isAuthenticated && props.user.CurrentRoles.find(role => (role.role_type === "ADMIN"))) {
        history.push("/admin");
    }
    else if (isAuthenticated && props.user.CurrentRoles.find(role => (role.role_type === "MEMBRE_FINANCE"))) {
        history.push("/finance");
    }
    else if (isAuthenticated && props.user.CurrentRoles.find(role => (role.role_type === "GERANT_BIBLIOTHEQUE"))) {
        history.push("/bibliotheque");
    }
    else if (isAuthenticated && props.user.CurrentRoles.find(role => (role.role_type === "ENSEIGNANT"))) {
        history.push("/enseignant");
    }
    else if (isAuthenticated && props.user.CurrentRoles.find(role => (role.role_type === "COMPTABLE"))) {
        history.push('/comptable')
    }
    else if (isAuthenticated && props.user.CurrentRoles.find(role => (role.role_type === "MEDECIN"))) {
        history.push("/medecin");
    }
    else if (isAuthenticated && props.user.CurrentRoles.find(role => (role.role_type === "COMMUNICATION"))) {
        history.push("/communication");
    }
    else if (isAuthenticated && props.user.CurrentRoles.find(role => (role.role_type === "MAITRE_STAGE"))) {
        history.push("/maitre_stage");
    }
    else if (isAuthenticated && props.user.CurrentRoles.find(role => (role.role_type === "ASSISTANT_CHEF_DEPARTEMENT"))) {
        history.push("/assistant-departement");
    }
    else if (isAuthenticated){
        return <h1>Login successful</h1>
    }

    return(
        <div className="limiter">
		<div className="container-login100">
			<div className="wrap-login100">
				<form className="login100-form validate-form" onSubmit={handleSubmit(onSubmit)}>
					
					<div className="text-center">
                        <img src={logo} className="img-fluid mb-3 text" width="150px" />
                        </div>
                        <div className="shadow py-4 px-2 mb-3">
                            <h3 className="text-center"><b>ESPACE NUMERIQUE DE TRAVAIL</b></h3>
                    </div>

                    {props.errors.length > 0 && (
                        <div>
                        {props.errors.map(error => (
                            <div class="alert alert-danger" role="alert" key={error.field}>
                                {error.message}
                            </div>
                        ))}
                        </div>
                    )}

					<div className="wrap-input100 validate-input" data-validate="Veuillez entre un email correct au format: ept@ept.sn">
						<input className="input100" type="text" name="email" required ref={register} />
						<span className="focus-input100"></span>
						<span className="label-input100">Email</span>
					</div>
					
					
					<div className="wrap-input100 validate-input" data-validate="Password is required">
						<input className="input100" type="password" name="password" required ref={register}/>
						<span className="focus-input100"></span>
						<span className="label-input100">Mot de passe</span>
					</div>

					<div className="flex-sb-m w-full p-t-3 p-b-32">
						<div className="contact100-form-checkbox">
							<input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me" />
							<label className="label-checkbox100" for="ckb1">
								Remember me
							</label>
						</div>

						<div>
							<Link to="/veu" className="txt1">
								Guide d'utilisation
							</Link>
						</div>
					</div>
			

					<div className="container-login100-form-btn">
						<button class="login100-form-btn">
							<b>Se connecter</b>
						</button>
					</div>
                    <div class="text-center p-t-46 p-b-20">
						<span class="txt2">
							Copyright EPT 2020
						</span>
					</div>
				</form>

				<div class="login100-more" style={{backgroundImage: "url("+ photo +")"}}>
				</div>
			</div>
		</div>
	</div>
    )
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

export default connect(mapStateToProps, {login})(Login)