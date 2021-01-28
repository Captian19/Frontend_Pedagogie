import React, { Component } from "react";
import { Link } from 'react-router-dom';
import fiche from '../../assets/moduleInscription/img/fichier.png'

class Doc extends Component {
  


    render() { 
        return ( 

            <div className="col-lg-2 mt-3 text-center ">
                <Link to={`/comptable/dossier-etudiant-fichiers-reçu/${this.props.etudiant.anneeScolaire}/${this.props.etudiant.email}`}>
                    <img width="100px" src={fiche}></img>
                    <div >{this.props.etudiant.prenom} {this.props.etudiant.nom}</div>
                    <div >{this.props.etudiant.classe}</div>
                    <div >{this.props.etudiant.anneeScolaire}</div>
                </Link>
            </div>

         );
    }
}
 
export default Doc;