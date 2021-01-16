import React, { Component } from "react";


import {
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CRow,
  } from '@coreui/react'
import ValidationFrais from "../../../../components/moduleInscription/ValidationFrais";

class FraisIns extends Component {
    render(){
        return(
            <CCard>
            <CCardBody>
            <CRow>
                <CCol sm="12">
                    <div class="progress mb-3" style={{height: "25px"}}>
                        <div heigth="20px" class="progress-bar progress-bar-animated progress-bar-striped" role="progressbar" style={{width:"75%", backgroundColor:"green"}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" >Inscription Administrative en cours... 75%</div>
                    </div>
                    <ValidationFrais></ValidationFrais>
                </CCol>
            </CRow>
            </CCardBody>
            </CCard>
        )
    }
}

export default FraisIns