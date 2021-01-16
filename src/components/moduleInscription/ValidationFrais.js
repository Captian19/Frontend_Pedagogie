import React, {Component} from 'react';
import axios from 'axios';
import '../../assets/moduleInscription/css/VisiteMedicale.scss'
import f from '../../assets/moduleInscription/img/f.svg'
import RecuInscription from './RecuInscription';
import {Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import { combineReducers } from 'redux';



class ValidationFrais extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            // validationComptable : false,
            Etudiant : '',
            redirect : "",
            dossier : {}
         }
    }


    componentDidMount(){

   
        let anneeScolaire = `${this.props.user.CurrentRoles[0].date_debut.split("-")[0]}-${this.props.user.CurrentRoles[0].date_fin.split("-")[0]}`
        let email = this.props.user.email
        let url =`http://127.0.0.1:8000/api/InfoEtudiantByAnneeScolaireEmail/${anneeScolaire}/${email}`
        axios.get(url, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(response => {
            this.setState({
                Etudiant : response.data
            })
            console.log(this.state.Etudiant)
        
        })
        .catch(e =>{
            console.log(e)    
        
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
   
    ////////////////////////////////////////////////////////////////
    //Pour créer les sous dossier
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
        const redirect = "/etudiant/UnderCreation"
        this.setState({redirect})
}

    DisplayEtatPaiement = (etat) =>{

        if (etat==false) { 
          
            return ( 
                <div id="file-upload-form" class="uploader mt-5">
                    <label for="file-upload" id="file-drag">
                        <div id="start">
                                <i  aria-hidden="true"></i>
                                <h3 className="mb-5"><b>Validation des frais d'inscription en cours !</b></h3>
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
        if(this.state.redirect=="/etudiant/UnderCreation"){
            return (<Redirect to={this.state.redirect}/>)
        }
        return ( 
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

                <div className={this.displayRecu(this.state.Etudiant.validationComptable)} >
                    <RecuInscription Etudiant={this.state.Etudiant} OnClick={this.createUnder }></RecuInscription>     
                </div>
                

                <div class="accordion container mt-5" className={this.display(this.state.Etudiant.validationComptable)}  id="accordionExample">
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
                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                            </div>
                            </div>
                        </div>
                </div>



                    
       

             

            </div>
         );
    }
}

const mapStateToProps = state => ({
    user: state.auth.user
  })
 
 
export default connect(mapStateToProps,null)(ValidationFrais);