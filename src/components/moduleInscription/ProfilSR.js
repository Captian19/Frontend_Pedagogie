import React, { Component } from "react";
import { Link } from 'react-router-dom';
import avatar from '../../assets/img/avatar.png'

class ProfilSR extends Component {


    render() { 
        return ( 

            
     
            <div className="col-lg-3 ml-5 card">
                <div class="testimonial text-center">

                    <div class="avatar mx-auto mt-3">
                        <img src={avatar} class="rounded-circle img-fluid mt-3" width="100px"/>
                    </div>

                    <h4 class="font-weight-bold  mt-4 text-center">{this.props.etudiant.prenom} {this.props.etudiant.nom.toUpperCase()}</h4>
                    <h4 class="font-weight-bold my-3 text-center">{this.props.etudiant.classe} {this.props.etudiant.departement}</h4>
                    <h4 class="font-weight-bold my-3 text-center">{this.props.etudiant.email}</h4>
                    <Link to={`/scolarite/inscription-administrative/${this.props.etudiant.prenom}/${this.props.etudiant.nom}/${this.props.etudiant.email}/${this.props.etudiant.classe}/${this.props.etudiant.departement}/${this.props.etudiant.anneeScolaire.split("-")[0]}/${this.props.etudiant.anneeScolaire.split("-")[1]}/${this.props.etudiant.IDE}`}
                     class="btn btn-primary justify-content-center">Inscrire</Link>

                </div>

            </div>             

      

         );
    }
}
 
export default ProfilSR;