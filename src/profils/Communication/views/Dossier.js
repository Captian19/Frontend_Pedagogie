import React, { Component } from "react";
import {CCard,CCardBody,CCol,CRow,} from '@coreui/react'
import {Input} from "mdbreact";
import '@fortawesome/fontawesome-free/css/all.min.css'; import
'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import DocCom from '../../../components/moduleInscription/DocCom'
import repo from '../../../assets/moduleInscription/img/image.png'
import axios from 'axios';
import { Link } from 'react-router-dom';



class Dossier extends Component {

    state = {
        search: "",
        etudiant : []
      };
    
      componentDidMount(){
         
    
        let url = 'http://127.0.0.1:8000/api/CarteEtudiantList';
        axios.get(url, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(response => {
            this.setState({
                etudiant : response.data
            })
        
            
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
          <DocCom etudiant = {etudiant}></DocCom>
        );
      };
    
    
      
    
      onchange = e => {
        this.setState({ search: e.target.value });
      
      };

    render(){

        const  search  = this.state.search.toLowerCase();
        const filteredEtudiant = this.state.etudiant.filter(etudiant => {
          if(search.includes(etudiant.email)){
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
                            <h1 style={{color:"white"}}>DOSSIERS DES ETUDIANTS</h1>
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

                    <div className="row">
                        <div className="col-lg-2 m-5 text-center ">
                            <Link to='/communication/liste-des-etudiants-docs/TC1 TC'>
                                <img width="200px" src={repo} alt="classe"></img>
                                <div className="justify-content-center">TC1</div>
                            </Link>
                        </div>
                        <div className="col-lg-2 m-5 text-center ">
                            <Link to='/communication/liste-des-etudiants-docs/TC2 TC'>
                                <img width="200px" src={repo} alt="classe"></img>
                                <div>TC2</div>
                            </Link>
                        </div>
                        <div className="col-lg-2 m-5 text-center ">
                            <Link to='/communication/liste-des-etudiants-docs/DIC1 GIT'>
                                <img width="200px" src={repo} alt="classe"></img>
                                <div>DIC1 GIT</div>
                            </Link>
                        </div>
                        <div className="col-lg-2 m-5 text-center ">
                            <Link to='/communication/liste-des-etudiants-docs/DIC1 GEM'>
                                <img width="200px" src={repo} alt="classe"></img>
                                <div>DIC1 GEM</div>
                            </Link>
                        </div>
                        <div className="col-lg-2 m-5 text-center ">
                            <Link to='/communication/liste-des-etudiants-docs/DIC1 AERO'>
                                <img width="200px" src={repo} alt="classe"></img>
                                <div>DIC1 AERO</div>
                            </Link>
                        </div>
                        <div className="col-lg-2 m-5 text-center ">
                            <Link to='/communication/liste-des-etudiants-docs/DIC1 GC'>
                                <img width="200px" src={repo} alt="classe"></img>
                                <div>DIC1 GC</div>
                            </Link>
                        </div>
                        <div className="col-lg-2 m-5 text-center ">
                            <Link to='/communication/liste-des-etudiants-docs/DIC2 GIT'>
                                <img width="200px" src={repo} alt="classe"></img>
                                <div>DIC2 GIT</div>
                            </Link>
                        </div>
                        <div className="col-lg-2 m-5 text-center ">
                            <Link to='/communication/liste-des-etudiants-docs/DIC2 GEM'>
                                <img width="200px" src={repo} alt="classe"></img>
                                <div>DIC2 GEM</div>
                            </Link>
                        </div>
                        <div className="col-lg-2 m-5 text-center ">
                            <Link to='/communication/liste-des-etudiants-docs/DIC2 AERO'>
                                <img width="200px" src={repo} alt="classe"></img>
                                <div>DIC2 AERO</div>
                            </Link>
                        </div>
                        <div className="col-lg-2 m-5 text-center ">
                            <Link to='/communication/liste-des-etudiants-docs/DIC2 GC'>
                                <img width="200px" src={repo} alt="classe"></img>
                                <div>DIC2 GC</div>
                            </Link>
                        </div>
                        <div className="col-lg-2 m-5 text-center ">
                            <Link to='/communication/liste-des-etudiants-docs/DIC3 GIT'>
                                <img width="200px" src={repo} alt="classe"></img>
                                <div>DIC3 GIT</div>
                            </Link>
                        </div>
                        <div className="col-lg-2 m-5 text-center ">
                            <Link to='/communication/liste-des-etudiants-docs/DIC3 GEM'>
                                <img width="200px" src={repo} alt="classe"></img>
                                <div>DIC3 GEM</div>
                            </Link>
                        </div>
                        <div className="col-lg-2 m-5 text-center ">
                            <Link to='/communication/liste-des-etudiants-docs/DIC3 AERO'>
                                <img width="200px" src={repo} alt="classe"></img>
                                <div>DIC3 AERO</div>
                            </Link>
                        </div>
                        <div className="col-lg-2 m-5 text-center ">
                            <Link to='/communication/liste-des-etudiants-docs/DIC3 GC'>
                                <img width="200px" src={repo} alt="classe"></img>
                                <div>DIC3 GC</div>
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

export default Dossier