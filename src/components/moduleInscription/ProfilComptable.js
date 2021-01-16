import React, { Component } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

class Profil extends Component {
    state = { 

    };



    render() { 
        return ( 

            
     
            <div className="col-lg-3 ml-5 card">
                <div class="testimonial text-center">

                    <div class="avatar mx-auto mt-3">
                        <img src="https://mdbootstrap.com/img/Photos/Avatars/img%20(26).jpg" class="rounded-circle img-fluid mt-3" width="100px"/>
                    </div>

                    <h4 class="font-weight-bold  mt-4 text-center">{this.props.etudiant.prenom} {this.props.etudiant.nom.toUpperCase()}</h4>
                    <h4 class="font-weight-bold my-3 text-center">{this.props.etudiant.classe} {this.props.etudiant.departement}</h4>
                    <h4 class="font-weight-bold my-3 text-center">{this.props.etudiant.email}</h4>
                    <Link to={`/comptable/validation-paiement/${this.props.etudiant.id}`} type="submit" class="btn btn-primary justify-content-center">Générer le reçu</Link>

                </div>

            </div>             

      

         );
    }
}
 
export default Profil;