import React, { Component } from "react";

import {
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CRow,
  } from '@coreui/react'

import   Quittance  from "../../../../components/bibliotheque/Quittance";


class VisiteMed extends Component {
    render(){
        return(
            <CCard>
            <CCardBody>
            <CRow>
                <CCol sm="12">
                   <Quittance></Quittance>
                </CCol>
            </CRow>
            </CCardBody>
            </CCard>
        )
    }
}

export default VisiteMed