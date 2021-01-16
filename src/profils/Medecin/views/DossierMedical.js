import React, { Component } from "react";
import {CCard,CCardBody,CCol,CRow,} from '@coreui/react'
import {Input} from "mdbreact";
import '@fortawesome/fontawesome-free/css/all.min.css'; import
'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import DocMed from '../../../components/moduleInscription/DocMed'
import repo from '../../../assets/moduleInscription/img/dossier.png'
import axios from 'axios';
import { Link } from 'react-router-dom';



class DossierMedical extends Component {

    state = {
        search: "",
        etudiant : []
      };
    
      componentDidMount(){
         
    
        // let url = 'http://127.0.0.1:8000/api/InfoEtudiantList';
        let url = 'https://users-ent.herokuapp.com/api/auth/ETUDIANT/3/';
        axios.get(url, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(response => {
            this.setState({
                etudiant : response.data
            })
            console.log(this.state.etudiant)
        
            
        })
        .catch(e =>{
            console.log(e)    
        
            console.log("Error")
        })
     
    }
    
      renderEtudiant = etudiant => {
        const search  = this.state.search;
        
        var code = etudiant.pk;
        
       
    
        return (
          <DocMed etudiant = {etudiant}></DocMed>
        );
      };
    
    
      
    
      onchange = e => {
        this.setState({ search: e.target.value });
      
      };

    render(){

        const  search  = this.state.search.toLowerCase();
        const filteredEtudiant = this.state.etudiant.filter(etudiant => {
          if(search.includes(etudiant.nombreEnfants)){
            return etudiant
          }
       
        });

        return(
            <CCard>
            <CCardBody>
            <CRow>
                <CCol sm="12">
                    <div className="flyout">

                        <div className="card container  text-center pt-3  bg-primary white-text">
                            <h1 style={{color:"white"}}>DOSSIERS MEDICAUX DES ETUDIANTS</h1>
                        </div>

                        <main style={{ marginTop: "4rem" }}>
                            <div className="container border p-3 mb-5">
                            <div className="row text-center">
                            <div className="col-lg-12">
                            <center>
                            <h3>
                            
                                BARRE DE RECHERCHE
                            </h3>
                            </center>
                            </div>
                            <div className="col-lg-11 justify-content-center ml-3 mr-3  card  mt-3 mb-3  text-center">
                            <Input
                            label="Rechercher un Etudiant par son adresse email EPT"
                            icon="search"
                            onChange={this.onchange}
                            />
                            </div>
                            <div className="col" />
                            </div>
                            <div className="row">

                            {filteredEtudiant.map(etudiant => {
                            return this.renderEtudiant(etudiant);
                            })}
                            </div>

                            </div>
                        </main>
                    </div>

         

                    <div className="row mt-3">
                        <div className="col-lg-2 mt-3 text-center ">
                            <Link to='/medecin/dossier-etudiant-fichiers'>
                                <img width="100px" src={repo}></img>
                                <div>Mame Diarra Sow</div>
                            </Link>
                        </div>
                    </div>
                
              
               
                </CCol>
            </CRow>
            </CCardBody>
            </CCard>
        )
    }
}

export default DossierMedical