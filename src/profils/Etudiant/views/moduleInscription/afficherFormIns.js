import React, { Component } from "react";
import axios from 'axios';


import {
    CCard,
    CCardBody,
    CCol,
    CRow,
  } from '@coreui/react'
import CertifMedic from "../../../../components/moduleInscription/dossier/certMed.js";
import Entete from "../../../../components/moduleInscription/Entete.js";
import FicheInscription from "../../../../components/moduleInscription/dossier/Fiche.js";
import { connect } from "react-redux";

class AfficheInscription extends Component {
    state = {
        Etudiant : {},
    }
    componentDidMount(){
        let anneeScolaire = `${this.props.match.params.anneeScolaire}`
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
    render(){
        return(
            <CCard>
            <CCardBody>
            <CRow>
                <CCol sm="12">
                    <div className="card container mb-5  text-center pt-3  bg-primary white-text">
                        <h1 style={{color:"white"}}>FICHE INSCRIPTION {this.state.Etudiant.prenom} {this.state.Etudiant.nom}</h1>
                    </div>
                    <div className=" mt-5 text-center">
                    
                    <FicheInscription Etudiant={this.state.Etudiant}/>
                    </div>
                </CCol>
            </CRow>
            </CCardBody>
            </CCard>
        )
    }
}
const mapStateToProps = state => ({
    user: state.auth.user
  })
export default connect(mapStateToProps,null)(AfficheInscription);