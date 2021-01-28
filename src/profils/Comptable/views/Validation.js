import React, { Component } from "react";

import {
    CCard,
    CCardBody,
    CCol,
    CRow,
  } from '@coreui/react'
import RecuComptable from "../../../components/moduleInscription/RecuComptable";
import axios from 'axios';



class Validation extends Component {

    state = {
        Etudiant : ""
    }

    componentDidMount(){
        
        const id = this.props.match.params.id;
        let url = `http://127.0.0.1:8000/api/InfoEtudiantDetail/${id}`;
    
        axios.get(url, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(response => {
            this.setState({
                Etudiant : response.data
            })
        
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
                        <h1 style={{color:"white"}}>VALIDATION DU PAIEMENT </h1>
                    </div>
                    <RecuComptable Etudiant = {this.state.Etudiant}></RecuComptable>
                </CCol>
            </CRow>
            </CCardBody>
            </CCard>
        )
    }
}

export default Validation