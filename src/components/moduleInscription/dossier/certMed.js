import React, { Component } from "react";
import axios from 'axios';
import moment from 'moment';
import localization from 'moment/locale/fr';

moment.updateLocale('fr', localization);

class CertifMedic extends Component {
    
    Aptitude = () =>{
        if (this.props.Etudiant.validationMedecin == true){
            return(<b> APTE</b>)
        }
        else {
            return(<b> INAPTE</b>)
        }
    }
    Genre = () =>{
        if(this.props.Etudiant.sexe == "Masculin"){
            return(<label> Mr</label>)
        }
        else{
            if(this.props.Etudiant.situationMatrimoniale == "Célibataire"){
                return(<label> Mlle</label>)
            }
            else{return(<label> Mme</label>)}
        }
    }
    render() { 
        return ( 

                <div align="justify">
                    <div className="col-lg-12 border mt-3  text-center">
                        <h1>CERTIFICAT D'APTITUDE</h1>
                    </div>

                <div className="row mt-5 container">
                    <p style={{fontSize:'15px'}}>Je Soussigné <b>Mr .................................................................. Médecin  au Centre Médical</b>, certifie que :</p>
                    <p style={{fontSize:'15px'}}>&nbsp; {this.Genre()} <b>{this.props.Etudiant.prenom} {this.props.Etudiant.nom}</b></p><br></br>
                </div>
                <div className="row mt-3 container">
                    <p style={{fontSize:'15px'}}> Etudiant(e) en : <b>{this.props.Etudiant.classe}</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Département : <b>{this.props.Etudiant.departement}</b></p>
                </div>

                <div className="row mt-3 container">
                    <p style={{fontSize:'15px'}}> Est &nbsp;&nbsp;&nbsp;&nbsp; {this.Aptitude()} &nbsp;&nbsp;&nbsp;&nbsp; à suivre les enseignements dispensés à l’Ecole Polytechnique de Thiès.
                    </p>
                </div>

                <div className="row mt-3 container">
        <p style={{fontSize:'15px'}}> Fait à Thiès le,   : <b>{moment(this.props.Etudiant.date).format("Do MMMM YYYY")}</b></p>
                </div>

                <div className="col-lg-12 text-right mt-5 container">
                    <p style={{fontSize:'15px'}}> <b> Signature et Cachet du Médecin</b></p>
                </div>

                </div>

         );
    }
}
 
export default CertifMedic;