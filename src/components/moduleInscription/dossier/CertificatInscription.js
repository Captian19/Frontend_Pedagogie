import React, {Component} from 'react';
import '../../../assets/moduleInscription/css/CertificatInscription.css';
import cachet from "../../../assets/moduleInscription/img/2.png";
import Entete from '../Entete';
import moment from 'moment';
import localization from 'moment/locale/fr';

moment.updateLocale('fr', localization);//Pour formater la date
class CertificatInscription extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    Classe= () =>{
        if (this.props.Etudiant.classe == "TC1"){
            return(<b className="large">Première année de Tronc Commun</b>)
        }
        else if (this.props.Etudiant.classe == "TC2"){
            return(<b className="large">Deuxième année de Tronc Commun</b>)
        }
        else if (this.props.Etudiant.classe == "DIC1"){
            return(<b className="large">Première année du Diplome d'Ingénieur de Conception</b>)
        }
        else if (this.props.Etudiant.classe == "DIC2"){
            return(<b className="large">Deuxième année du Diplome d'Ingénieur de Conception</b>)
        }
        else if (this.props.Etudiant.classe == "DIC3"){
            return(<b className="large">Troisième année du Diplome d'Ingénieur de Conception</b>)
        }
    }
    Departement = () =>{
        if (this.props.Etudiant.departement=="GIT"){
            return(<b className = "large"> Génie Informatique Et Télécommunications</b>)
        }
        else if (this.props.Etudiant.departement=="GEM"){
            return(<b className = "large"> Génie ElectroMecanique</b>)
        }
        else if (this.props.Etudiant.departement=="GC"){
            return(<b className = "large"> Génie Civil</b>)
        }
        else if (this.props.Etudiant.departement=="AERO"){
            return(<b className = "large"> Génie Aeronautique</b>)
        }
    }
    Genre = () =>{
        if(this.props.Etudiant.sexe=="Masculin"){
            return(<label>Monsieur</label>)
        }
        else{
            if(this.props.Etudiant.situationMatrimoniale=="Célibataire"){
                return(<label>Mademoiselle</label>)
            }
            else{
                return(<label>Madame</label>)
            }
            
        }
    }
    render() { 
        return ( 
                <div>
                    <div className="container  mt-3 shadow">
                        <Entete/>
                        <hr style={{border : "1px solid black"}}></hr>
                        <div className="row mt-3 ml-3">
                            <div className=" col-lg-12 text-center">
                                <h1><b style={{fontWeight:"bold"}}>CERTIFICAT D'INSCRIPTION</b></h1>
                                <h3 className="mt-3">**************************************</h3>
                            </div>
                            <div class="mt-3 " align="justify">
                                <p className = "medium">Le Chef du Service de la Scolarité soussigné, certifie que  </p>
                                <p className = "medium">{this.Genre()} : <b className = "large"> {this.props.Etudiant.prenom}  {this.props.Etudiant.nom}  </b>  </p>
                                <p className = "medium" className="mt-3">Né le :<b className = "large"> {moment(this.props.Etudiant.dateNaissance).format("Do MMMM YYYY")} </b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; à &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b className = "large" > {this.props.Etudiant.lieuNaissance} </b> </p>
                                <p className = "medium">Est régulièrement inscrit en :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {this.Classe()} </p>
                                <p className = "medium">Option :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.Departement()} </p>
                                <p className = "medium">Pour l'année Scolaire :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b className = "large">{this.props.Etudiant.anneeScolaire}</b> </p>
                                <p className = "medium">Fait à Thiès le , :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b className = "large"> {moment(this.props.Etudiant.date).format("Do MMMM YYYY")}</b> </p>    
                                <div className="row">
                                    <div className="col-lg-12 text-right">
                                     <b >Le Chef du Service de la Scolarité</b> 
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-12 text-right">
                                        <img src={ cachet}  style={{marginTop: "-10px", marginRight:"40px"}} height="150" width="150px"></img>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12 text-center">
                        <button type="submit" className="btn btn-primary mt-5 col-lg-4  " onClick={this.print} id="btn">Imprimer le Document</button>
                    </div>
                </div>
                 
         );
    }
}
 
export default CertificatInscription;