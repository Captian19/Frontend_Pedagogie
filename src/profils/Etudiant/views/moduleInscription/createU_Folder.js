import React, { Component } from "react";


import {
    CCard,
    CCardBody,
    CCol,
    CRow,
  } from '@coreui/react'
import  UnderCreate from  "../../../../components/moduleInscription/dossier/createUnder.js";

class UnderCreatePage extends Component {
    render(){
        return(
            <CCard>
            <CCardBody>
            <CRow>
                <CCol sm="12">
                    <div class="progress mb-3" style={{height: "25px"}}>
                        <div heigth="20px" class="progress-bar progress-bar-animated progress-bar-striped" role="progressbar" style={{width:"100%", backgroundColor:"green"}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" >Inscription Administrative complete 100 %</div>
                    </div>
                    <UnderCreate></UnderCreate>
                </CCol>
            </CRow>
            </CCardBody>
            </CCard>
        )
    }
}

export default UnderCreatePage;