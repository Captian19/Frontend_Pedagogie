import React, {Component} from 'react';
import html2PDF from 'jspdf-html2canvas';
import logoEPT from '../../../../src/assets/moduleInscription/img/0.png'
import cachet from '../../../../src/assets/moduleInscription/img/2.png'
import { Link } from 'react-router-dom';

    


class Reçu extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    print = () =>{
        let page = document.getElementById('page');
    html2PDF(page, {
        jsPDF: {
        format: 'a8',
        },
        imageType: 'image/jpeg',
        output: './pdf/generate.pdf'
    });
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
    SommeEnLettre = ()=>{
        if(this.props.Etudiant.classe=="TC1"||this.props.Etudiant.classe=="TC2"||this.props.Etudiant.classe=="DIC1"){
            return(<label>Vingt cinq mille FCFA</label>)
        }
        else{
            return(<label>Cinquante mille FCFA</label>)
        }
    }
    SommeEnChiffre = ()=>{
        if(this.props.Etudiant.classe=="TC1"||this.props.Etudiant.classe=="TC2"||this.props.Etudiant.classe=="DIC1"){
            return(<label>25.000 F</label>)
        }
        else{
            return(<label>50.000 F</label>)
        }
    }

    render() { 
        return ( 
            <div>
              

                <div id="page" className="container mt-5 d-flex justify-content-center ">
         
                    <div className="col-lg-10 card card-body shadow ">
                                    
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
                                <b>Droit d'inscription année académique {this.props.Etudiant.anneeScolaire}</b><br></br>
                                <b>Reçu 00499 &nbsp;&nbsp;&nbsp; B.P.F {this.SommeEnChiffre()}</b>
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className=" col-lg-12">
                                <div className="row ">
                                    <div className="ml-5 text-center">
                                        {this.Genre()} &nbsp;&nbsp;<b>{this.props.Etudiant.prenom} {this.props.Etudiant.nom}</b> 
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="ml-5 mt-3">
                                        Né(e) le &nbsp;&nbsp; <b>{this.props.Etudiant.dateNaissance} </b>
                                    </div>
                                    <div className="col-lg-4">
                                        A <b>{this.props.Etudiant.lieuNaissance}</b>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="ml-5  mt-3">
                                        La somme de &nbsp;&nbsp;<b>{this.SommeEnLettre()}</b> 
                                    </div>
                                </div>
                                
                            
                            <div className="row">
                                <div className="col-lg-7 d-flex ml-3  mt-3">
                                    &nbsp;&nbsp;&nbsp;  Département <b> &nbsp;&nbsp; {this.props.Etudiant.departement}</b> <br></br>
                                    {/* <small className="d-flex">A conserver et à présenter en cas de réclamation</small> */}
                                </div>
                                <div className="col-lg-4">
                                    Filiére &nbsp;&nbsp; <b>{this.props.Etudiant.classe}</b><br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Thiès, le<b> {this.props.Etudiant.date}</b><br></br>
                                    <b style={{textDecoration: "underline}"}}>LE CAISSIER</b><br></br>
                                    <img src= { cachet}  style={{marginTop: "-60px"}} height="150" width="150px"></img>


                                </div>

                            </div>
                            </div>
                        </div>
                                    
                    </div>
                </div>
                
                <div className="row d-flex justify-content-center text-center">
                    <button type="submit" className="btn btn-primary  col-lg-4   " onClick={this.print} id="btn">Imprimer le Reçu</button>              
                </div>

            </div>
                 
         );
    }
}
 
export default Reçu;