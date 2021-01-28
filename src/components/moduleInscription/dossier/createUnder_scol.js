import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import doc from '../../../assets/moduleInscription/img/doc.svg'
class UnderCreate_scol extends Component{ 
    state ={
        etat : false,
        redirect : "",
    }
    Afficher = () =>{
                const redirect = '/scolarite/UnderList'
                this.setState({redirect})
    }
    handleChange = () => {
        this.setState({etat:true})
    }
    changer = () => setTimeout(this.handleChange, 2000);
    CreationSousDossier = (etat) =>{
          
        if (etat==false) { 
          
            return ( 
                <div id="file-upload-form" class="uploader mt-5">
                    <label for="file-upload" id="file-drag">
                        <div id="start">
                                <i  aria-hidden="true"></i>
                                <h3 className="mb-5"><b>Creation sous dossier en cours !</b></h3>
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
                                <h3 className="mt-5"><b>Sous dossier Créé  !</b></h3>
                        </div>
                    </label>     
                    <div>
                        <button onClick={this.Afficher} className="btn btn-primary" >Consulter le  dossier</button>
                    </div>
   
                </div> 
            ); 
        }        
    } 
    render() { 
        if (this.state.redirect=="/scolarite/UnderList"){
            return( 
            <Redirect to={this.state.redirect}/>       
            )}
        {this.changer()}
        return ( 
            <div className="text-center">
                <div className="card container   bg-primary white-text">
                    <h1 style={{color:"white"}}>CRÉATION SOUS DOSSIER</h1>
                </div>

                <div class="row mt-5">
                    <div className="col-lg-6">
                        <img className="img-fluid" src={doc} width="700px" height="500px" ></img>
                    </div>
                    <div className="col-lg-6 ml-auto align-self-center">
                        {this.CreationSousDossier(this.state.etat)}
                    </div>
                </div>
        
                <div class="accordion container mt-5"   id="accordionExample">
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
                                    Le sous dossier de l'etudiant  fait référence à son niveau ou à la classe de l'année scolaire courant.Il contient des les fichiers entre parenthèses(bulletins, papiers de naissaces, certificat d'inscription...)
                                </div>
                            </div>
                        </div>
                </div>


            </div>

        );
    }
}
export default UnderCreate_scol;
