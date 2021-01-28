import React, { Component } from "react";
import { Link } from 'react-router-dom';
import carte from '../../assets/moduleInscription/img/ca.png'

class DocCom extends Component {
  


    render() { 
        return ( 

            <div className="col-lg-2 mt-3 text-center ">
                <Link to={`/communication/carte-etudiant/${this.props.etudiant.id}`}>
                    <img width="100px" src={carte}></img>
                    <div >{this.props.etudiant.prenom} {this.props.etudiant.nom}</div>
                    <div >{this.props.etudiant.departement}</div>
                    <div >{this.props.etudiant.anneeScolaire}</div>
                </Link>
            </div>

         );
    }
}
 
export default DocCom;