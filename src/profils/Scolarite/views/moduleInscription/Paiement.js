import React, {Component} from 'react';
import axios from 'axios';
import '../../../../assets/moduleInscription/css/VisiteMedicale.scss'
import {Redirect} from 'react-router-dom';
import f from '../../../../assets/moduleInscription/img/f.svg'
import {
    CCard,
    CCardBody,
    CCol,
    CRow,
  } from '@coreui/react'
import RecuInscription from '../../../../components/moduleInscription/RecuInscription';

class Paiement extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            validationComptable : false,
            Etudiant : '',
            redirect : "",
            etudiant : {},
            dossier : {}
         }
    }

    componentDidMount(){

  
        let url =`http://127.0.0.1:8000/api/InfoEtudiantDetail/${this.props.match.params.id}`

        axios.get(url, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(response => {
            this.setState({
               Etudiant : response.data,
               validationComptable : response.data.validationComptable
            })
            console.log(response.data)
    
            
        })
        .catch(e =>{
            console.log(e)
            console.log("Error")
        })


     
    }

    display = (eta) =>{
        let a = null;
            if(eta===false){
              a = "visible mt-5"
            }
            else{
              a = "d-none"
            }
  
            return a
    }

    displayRecu = (eta) =>{
        let a = null;
            if(eta===true){
              a = "visible"
            }
            else{
              a = "d-none"
            }
  
            return a
    }
   /////////////////////////////////////////////////////////////////
    //POur créer le dossier
    createUnder = event => {
        event.preventDefault();
            axios.post(`http://localhost:8000/api/sousDossierDetails/${this.state.Etudiant.id}`,{
                        nom : this.state.Etudiant.anneeScolaire,
                        etudiant : this.state.Etudiant.id,
                        classe : this.state.Etudiant.classe
                        })
                .then(res => {
                        console.log(res);
                        console.log(res.data);
                        })
            const redirect = "/scolarite/UnderCreation"
            this.setState({redirect})
    }
    

    DisplayEtatPaiement = (etat) =>{

        if (etat===false) { 
          
            return ( 
                <div id="file-upload-form" class="uploader mt-5">
                    <label for="file-upload" id="file-drag">
                        <div id="start">
                                <i  aria-hidden="true"></i>
                                <h3 className="mb-5"><b>Validation des  frais d'inscription en cours !</b></h3>
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
                                <h3 className="mt-5"><b>Paiement effectué !</b></h3>
                        </div>
                    </label>   
                </div> 
            ); 
        }        
    }


    render() { 
        if(this.state.redirect=="/scolarite/UnderCreation"){
            return (<Redirect to={this.state.redirect}/>)
        }
       
        return ( 

            <CCard>
            <CCardBody>
            <CRow>
                <CCol sm="12">
                <div class="progress mb-3" style={{height: "25px"}}>
                        <div heigth="20px" class="progress-bar progress-bar-animated progress-bar-striped" role="progressbar" style={{width:"75%", backgroundColor:"green"}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" >Inscription Administrative en cours... 75%</div>
                    </div>
            <div className="text-center">

                <div className="card container   bg-primary white-text">
                    <h1 style={{color:"white"}}>PAIEMENT DES FRAIS D'INSCRIPTION</h1>
                </div>
                
           
                <div class="row mt-5">
                    <div className="col-lg-6">
                        <img className="img-fluid" src={f} width="700px" height="500px" ></img>
                    </div>
                    <div className="col-lg-6 ml-auto">
                        {this.DisplayEtatPaiement(this.state.Etudiant.validationComptable)}
                    </div>
                </div>

                <div className={this.displayRecu(this.state.validationComptable)} >
                    <RecuInscription Etudiant={this.state.Etudiant} OnClick={this.createUnder }></RecuInscription>     
                </div>
                

                <div class="accordion container mt-5" className={this.display(this.state.validationComptable)}  id="accordionExample">
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
                                Veuillez vous rendre au niveau de l'agence comptable pour payer vos frais d'inscription<br></br>
                                Ensuite vous pouvez vous reconnecter au niveau de la plateforme pour continuer votre<br></br> 
                                inscription administrative.<br></br>
                                Merci !                            </div>
                            </div>
                        </div>
                </div>


            </div>
            </CCol>
            </CRow>
            </CCardBody>
            </CCard>
         );
    }
}
 
export default Paiement;