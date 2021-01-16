import React, { Component } from "react";

import {
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CRow,
  } from '@coreui/react'
import VisiteMedicale from "../../../../components/moduleInscription/VisiteMedicale";


class VisiteMed extends Component {
    render(){
        return(
            <CCard>
            <CCardBody>
            <CRow>
                <CCol sm="12">
                    <div class="progress mb-3" style={{height: "25px"}}>
                            <div class="progress-bar progress-bar-animated progress-bar-striped" role="progressbar" style={{width:"50%", backgroundColor:"green"}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">Inscription Administrative en cours... 50%</div>
                    </div>
                    <VisiteMedicale></VisiteMedicale>
                </CCol>
            </CRow>
            </CCardBody>
            </CCard>
        )
    }
}

export default VisiteMed