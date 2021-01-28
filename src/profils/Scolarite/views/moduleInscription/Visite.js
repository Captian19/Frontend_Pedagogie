import React, { Component } from "react";
import '../../../../assets/moduleInscription/css/VisiteMedicale.scss'
import m from '../../../../assets/moduleInscription/img/m.svg'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Link} from "react-router-dom";
import Entete from '../../../../components/moduleInscription/Entete';

import {
    CCard,
    CCardBody,
    CCol,
    CRow,
  } from '@coreui/react'
import CertificatMedical from "../../../../components/moduleInscription/CertificatMedical";

class Visite extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            validationMedecin : false,
            Etudiant : ""
         }
    }

    componentDidMount(){

        let anneeScolaire = this.props.anneeScolaire
        let email = this.props.email
        let url =`http://127.0.0.1:8000/api/InfoEtudiantByAnneeScolaireEmail/${anneeScolaire}/${email}`

        axios.get(url, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(response => {
            this.setState({
                validationMedecin : response.data.validationMedecin  ,
                Etudiant : response.data
            })
    
            
        })
        .catch(e =>{
            console.log(e)
        })
     
    }

    displayCertificat = (eta) =>{
        let a = null;
            if(eta===true){
              a = "visible"
            }
            else{
              a = "d-none"
            }
  
            return a
    }


  




    DisplayVisiteMedicale = (etat) =>{

        if (etat===false) { 
          
            return ( 
                <div id="file-upload-form" class="uploader mt-5">
                    <label for="file-upload" id="file-drag">
                        <div id="start">
                                <i  aria-hidden="true"></i>
                                <h3 className="mb-5"><b>Visite médicale en cours !</b></h3>
                                <div class="text-center">
                                <div class="spinner-border" style={{width : "8rem", height: "8rem"}}  role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                                </div>
                        </div>
                    </label>        
                </div>  
             
            ); 
          } else { 
            
            return(
                <div id="file-upload-form" class="uploader mt-5">
                    <label for="file-upload" id="file-drag">
                        <div id="start">
                                <i  aria-hidden="true"></i>
                                <div class="text-center">
                                    <svg width="10em" height="10em" viewBox="0 0 16 16" class="bi bi-check-circle-fill" fill="green" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                    </svg>
                                </div>
                                <h3 className="mt-5"><b>APTE !</b></h3>
                                <Link to={`/scolarite/inscription-administrative-paiement/${this.state.Etudiant.id}`}  className="btn bg-primary white-text">ETAPE SUIVANTE</Link>
                                
                        </div>
                    </label>        
                </div> 
            ); 
        }        
    }


    render(){
        return(
            <CCard>
            <CCardBody>
            <CRow>
                <CCol sm="12">
                    <div class="progress mb-3" style={{height: "25px"}}>
                            <div class="progress-bar progress-bar-animated progress-bar-striped" role="progressbar" style={{width:"50%", backgroundColor:"green"}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">Inscription Administrative en cours... 50%</div>
                    </div>
                    <div className="text-center">
                 
                        
                        <div className="card container  bg-primary white-text">
                            <h1  style={{color:"white"}}>VISITE MEDICALE</h1>
                        </div>
        
                        
                        <div class="row">
                            <div className="col-lg-6">
                                <img className="img-fluid" src={m} width="700px" height="500px" ></img>
                            </div>
                            <div className="col-lg-6 mb-5 ml-auto">
                                {this.DisplayVisiteMedicale(this.state.validationMedecin)}
                            </div>
                        </div>
        
                        <div  className={this.displayCertificat(this.state.validationMedecin)}>
                            
                            
                            <div class="accordion container" id="accordionExample">
                                    <div class="card">
                                        {/* <div class="card-header" id="headingOne">
                                        <h2 class="mb-0"> */}
                                            {/* <button style={{fontSize : "30px"}} class="btn btn-link btn-block text-left text-center" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            CERTIFICAT D'APTITUDE
                                            </button> */}
                                        {/* </h2>
                                        </div> */}
        
                                        <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                                        <div class="card-body">
                                            <Entete></Entete>
                                            <CertificatMedical Etudiant = {this.state.Etudiant}></CertificatMedical>
                                        </div>
                                        </div>
                                    </div>
                            </div>
                                
                        
                        
                            
                        </div>
        
                        <div className={this.displayCertificat(!this.state.validationMedecin)} class="accordion container mt-5" id="accordionExample">
                                <div class="card">
                                    <div class="card-header" id="headingOne">
                                    <h2 class="mb-0">
                                        <button class="btn btn-link btn-block text-left text-center" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        Informations importantes
                                        </button>
                                    </h2>
                                    </div>
        
                                    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                                    <div class="card-body">
                                    Veuillez vous rendre au niveau de l'infirmerie pour effectuer votre visite médicale.<br></br>
                                    Ensuite vous pouvez vous reconnecter au niveau de la plateforme pour continuer votre<br></br> 
                                    inscription administrative.<br></br>
                                    Merci !
                                    </div>
                                    </div>
                                </div>
                        </div>
        
                    </div>
                </CCol>
            </CRow>
            </CCardBody>
            </CCard>
        )
    }
}

export default withRouter(Visite)