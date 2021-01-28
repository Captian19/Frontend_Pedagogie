import React, { Component } from "react";
import moment from 'moment';
import localization from 'moment/locale/fr';

moment.updateLocale('fr', localization);
class CertificatMedical extends Component {
  
            genre = () =>{
            let a = null;
                if(this.props.Etudiant.sexe==="Masculin"){
                  a = "Mr"
                }
                else{
                  a = "Mlle, Mme"
                }
      
                return a
            }

            apte = () =>{
                let a = null;
                    if(this.props.Etudiant.validationMedecin===true){
                      a = "APTE"
                    }
                    else{
                      a = "INAPTE"
                    }
          
                    return a
                }


    render() { 



        return ( 

                <div className="pb-5">
                    
                    <div className="col-lg-12 border   text-center">
                        <h1>CERTIFICAT D'APTITUDE</h1>
                    </div>

                    <div className="row mt-5 container">
                        <p style={{fontSize:'15px'}}>Je Soussigné <b> Mr .................................................................. Médecin  au Centre Médical, certifie que :<br></br></b></p>
                       <br></br> <p style={{fontSize:'15px'}}> &nbsp; {this.genre()} <b>{this.props.Etudiant.prenom} {this.props.Etudiant.nom}</b></p><br></br>
                    </div>
                    <div className="row mt-3 container">
                        <p style={{fontSize:'15px'}}> Etudiant(e) en : <b>{this.props.Etudiant.classe}</b> &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;        Département : <b>{this.props.Etudiant.departement}</b></p>
                    </div>

                    <div className="row mt-3 container">
                        <p style={{fontSize:'15px'}}> Est  
                            <b>
                               &nbsp;&nbsp; {this.apte()} &nbsp;&nbsp;
                            </b>
                            à suivre les enseignements dispensés à l’Ecole Polytechnique de Thiès.
                        </p>
                    </div>

                    <div className="row mt-3 container">
                        <p style={{fontSize:'15px'}}> Fait à Thiès le,    <b>{moment(this.props.Etudiant.date).format('Do MMMM YYYY')}</b></p>
                    </div>

                    <div className="col-lg-12 text-right mt-5 container">
                        <p style={{fontSize:'15px'}}> <b> Signature et Cachet du Médecin</b></p>
                    </div>
                </div>

         );
    }
}
 
export default CertificatMedical;