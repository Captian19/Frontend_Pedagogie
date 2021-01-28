import React, { Component } from "react";
import { Link } from 'react-router-dom';
import fiche from '../../assets/moduleInscription/img/fichier.png'

class DocMed extends Component {
  


    render() { 
        return ( 

            <div className="col-lg-2 mt-3 text-center ">
                <Link to={`/medecin/dossier-etudiant-fichiers-certifical-medical/${this.props.etudiant.anneeScolaire}/${this.props.etudiant.email}`}>
                    <img width="100px" src={fiche}></img>
                    <div >{this.props.etudiant.prenom} {this.props.etudiant.nom}</div>
                    <div >{this.props.etudiant.classe}</div>
                    <div >{this.props.etudiant.anneeScolaire}</div>
                </Link>
            </div>

         );
    }
}
 
export default DocMed;