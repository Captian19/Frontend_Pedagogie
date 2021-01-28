import React, { Component } from "react";
import axios from 'axios';


import {
    CCard,
    CCardBody,
    CCol,
    CRow,
  } from '@coreui/react'
import Reçu from "../../../../components/moduleInscription/dossier/Reçu.js";
import Entete from "../../../../components/moduleInscription/Entete.js";
import { connect } from "react-redux";

class AfficheReçu extends Component {
    state = {
        etudiant : {},
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
                etudiant : response.data
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
                        <h1 style={{color:"white"}}>REÇU {this.state.etudiant.prenom} {this.state.etudiant.nom}</h1>
                    </div>
                    <div className=" mt-5 text-center">
                    <Reçu Etudiant = {this.state.etudiant}></Reçu>
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
export default connect(mapStateToProps,null)(AfficheReçu);