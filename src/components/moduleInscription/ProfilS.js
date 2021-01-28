import React, { Component } from "react";
import { Link } from 'react-router-dom';
import avatar from '../../assets/img/avatar.png'

class ProfilS extends Component {

    render() { 
        return ( 

            
     
            <div className="col-lg-3 ml-5 card">
                <div class="testimonial text-center">

                    <div class="avatar mx-auto mt-3">
                        <img src={avatar} class="rounded-circle img-fluid mt-3" width="100px"/>
                    </div>

                    <h4 class="font-weight-bold  mt-4 text-center">{this.props.etudiant.user.first_name} {this.props.etudiant.user.last_name.toUpperCase()}</h4>
                    <h4 class="font-weight-bold my-3 text-center">{this.props.etudiant.classe} {this.props.etudiant.departement}</h4>
                    <h4 class="font-weight-bold my-3 text-center">{this.props.etudiant.user.email}</h4>
                    <Link to={`/scolarite/inscription-administrative/${this.props.etudiant.user.first_name}/${this.props.etudiant.user.last_name}/${this.props.etudiant.user.email}/${this.props.etudiant.classe}/${this.props.etudiant.departement}/${this.props.etudiant.annee.split("/")[0]}/${this.props.etudiant.annee.split("/")[1]}/${this.props.etudiant.user.id}`}
                    class="btn btn-primary justify-content-center">Inscrire</Link>

                </div>

            </div>             

      

         );
    }
}
 
export default ProfilS;