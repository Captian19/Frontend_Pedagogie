import React, { Component } from "react";
import axios from 'axios';


import {
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CRow,
  } from '@coreui/react'
import Create from  "../../../../components/moduleInscription/dossier/createDoc.js";

class CreatePage extends Component {
    state={
        dossier : {},
    }
    componentDidMount(){
        axios.get(`http://localhost:8000/api/etudiantDetail/1`)
        .then(res => {
            const etudiant = res.data;
            this.setState({ etudiant });
            axios.get(`http://localhost:8000/api/dossierEtudiant/${res.data.id}`)
            .then(response => {
                const dossier = response.data;
                this.setState({ dossier });
                console.log(this.state.dossier)
               
              })
          })
    }
    render(){
        return(
            <CCard>
            <CCardBody>
            <CRow>
                <CCol sm="12">
                    <div class="progress mb-3" style={{height: "25px"}}>
                        <div heigth="20px" class="progress-bar progress-bar-animated progress-bar-striped" role="progressbar" style={{width:"85%", backgroundColor:"green"}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" >Inscription Administrative en cours... 85%</div>
                    </div>
                    <Create dossier={this.state.dossier}></Create>
                </CCol>
            </CRow>
            </CCardBody>
            </CCard>
        )
    }
}

export default CreatePage;