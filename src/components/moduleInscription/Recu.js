import React, {Component} from 'react';
import logoEPT from '../../../src/assets/moduleInscription/img/0.png'
import localization from 'moment/locale/fr';
import moment from 'moment';

moment.updateLocale('fr', localization);
    


class RecuInscription extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    genre = () =>{
        let a = null;
            if(this.props.etudiant.sexe==="Masculin"){
              a = "Mr"
            }
            else{
              a = "Mlle, Mme"
            }
    
            return a
        }
    
    montantLettre = () =>{
            let a = null;
                if(this.props.etudiant.classe==="DIC2" || this.props.etudiant.classe==="DIC3"){
                  a = "Cinquante mille FCFA"
                }
                else{
                  a = "Vingt cinq mille FCFA"
                }
      
                return a
    }
    
    montantChiffre = () =>{
        let a = null;
            if(this.props.etudiant.classe==="DIC2" || this.props.etudiant.classe==="DIC3"){
              a = "50.000 F"
            }
            else{
              a = "25.000 F"
            }
    
            return a
    }

    


  

    render() { 
        return ( 
            <div>
              
              <div id="page" className="container mt-5 d-flex justify-content-center ">
         
                    <div  className="col-lg-8 border pb-5 mt-3 ">
                                    
                        <div className="row text-center">
                            <div className="col-lg-2">
                                <img src={ logoEPT} width="80" height="110"></img>
                            </div>
                
                            <div className="col-lg-8 text-center">
                                <small>République du SENEGAL</small><br></br>
                                <i>Ministère de l'Enseignement Supérieur de la Recherche et de L'Innovation</i>
                                <h5><b className="font-weight-bold">ECOLE POLYTECHNIQUE DE THIES</b></h5>
                                <h5><b className="font-weight-bold">AGENCE COMPTABLE</b></h5>
                                <hr></hr>
                            </div>
                
                            <div className="col-lg-2">
                                <img src={ logoEPT} width="80" height="110"></img>
                            </div>
                                        
                            <hr className="hr1"></hr>
                        </div>

                        <div className="row ">
                            <div className=" col-lg-12 text-center">
                                <b>Droit d'inscription année académique {this.props.etudiant.anneeScolaire}</b><br></br>
                                <b>Reçu 00499 &nbsp;&nbsp;&nbsp; B.P.F {this.montantChiffre()}</b>
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className=" col-lg-12">
                                <div className="row">
                                    <div className="ml-5">
                                        {this.genre()} &nbsp;&nbsp;<b>{this.props.etudiant.prenom} {this.props.etudiant.nom}</b> 
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="ml-5">
                                        Né(e) le &nbsp;&nbsp; <b>{moment(this.props.etudiant.dateNaissance).format('d MMMM  YYYY')} </b>
                                    </div>
                                    <div className="col-lg-4">
                                        A <b>{this.props.etudiant.lieuNaissance}</b>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="ml-5">
                                        La somme de &nbsp;&nbsp;<b>{this.montantLettre()}</b> 
                                    </div>
                                </div>
                                
                            
                            <div className="row">
                                <div className="col-lg-7 d-flex ml-3">
                                    &nbsp;&nbsp;&nbsp;  Département <b> &nbsp;&nbsp; {this.props.etudiant.departement}</b> <br></br>
                                    {/* <small className="d-flex">A conserver et à présenter en cas de réclamation</small> */}
                                </div>
                                <div className="col-lg-4">
                                    Filiére &nbsp;&nbsp; <b>{this.props.etudiant.classe}</b><br></br>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Thiès, le<b> {moment(this.props.etudiant.date).format('Do MMMM  YYYY')}</b><br></br>
                                    <b style={{textDecoration: "underline}"}}>LE CAISSIER</b><br></br>
                                    {/* <img src= { cachet}  style={{marginTop: "-60px"}} height="150" width="150px"></img> */}


                                </div>

                            </div>
                            </div>
                        </div>
                                    
                    </div>
                </div>

                        


            </div>
                 
         );
    }
}
 
export default RecuInscription;