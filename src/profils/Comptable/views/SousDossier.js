import React, { Component } from "react";
import fiche from '../../../assets/moduleInscription/img/fichier.png'
import { Link } from 'react-router-dom';
import axios from 'axios';


import {
    CCard,
    CCardBody,
    CCol,
    CRow,
  } from '@coreui/react'

class SousDossier extends Component {

    state = {
        etudiant : []
      };
    
      componentDidMount(){
         
        let email = this.props.match.params.email 
        let url = `http://127.0.0.1:8000/api/InfoEtudiantByEmail/${email}`;
        axios.get(url, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(response => {
            this.setState({
                etudiant : response.data
            })
            // console.log(this.state.etudiant[0])
        
            
        })
        .catch(e =>{
            console.log(e)    
                })
     
    }

    render(){
        return(
            <CCard>
            <CCardBody>
            <CRow>
                <CCol sm="12">
                        <div className="card container  text-center pt-3  bg-primary white-text">
                            <h1 style={{color:"white"}}>RECUS D'INSCRIPTION</h1>
                        </div>
                        <div className="row mt-3 mb-5">
                            {this.state.etudiant.map(etudiant => {
                                return (
                                            <div className="col-lg-3 mt-3 text-center ">
                                                <Link to={`/comptable/dossier-etudiant-fichiers-reçu/${etudiant.anneeScolaire}/${etudiant.email}`}>
                                                    <img width="150px" src={fiche}></img>
                                                    <div >{etudiant.classe} {etudiant.departement}</div>
                                                    <div >{etudiant.anneeScolaire}</div>
                                                </Link>
                                            </div>
                                        
                                )
                                } )}
                        </div>
                    
                </CCol>
            </CRow>
            </CCardBody>
            </CCard>
        )
    }
}

export default SousDossier