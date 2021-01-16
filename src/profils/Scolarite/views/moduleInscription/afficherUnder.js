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
import  Under_scol from  "../../../../components/moduleInscription/dossier/Under_scol.js";

class UnderList extends Component {
    state ={
        sousDossier : [],
    }
    componentDidMount(){
        axios.get(`http://localhost:8000/api/etudiantDetail/1`)
        .then(res => {
            axios.get(`http://localhost:8000/api/dossierEtudiant/${res.data.id}`)
            .then(response => {
                axios.get(`http://localhost:8000/api/sousDossierDetails/${response.data[0].id}`)
                .then( response_1 =>{
                    const sousDossier = response_1.data;
                    this.setState({ sousDossier });
                    console.log(this.state.sousDossier)
                })
               
              })
          })
    }
    render(){
        return(
            <CCard>
            <CCardBody>
            <CRow>
                <CCol sm="12">
                    <div className="card container mb-5  text-center pt-3  bg-primary white-text">
                        <h1 style={{color:"white"}}>SOUS DOSSIER DE Mame Diarra</h1>
                    </div>
                    <div className="row mt-5 text-center">
                    {this.state.sousDossier.map(sous => <Under_scol sousDossier={sous} key={sous.id}></Under_scol>)}

                    </div>
                </CCol>
            </CRow>
            </CCardBody>
            </CCard>
        )
    }
}

export default UnderList;