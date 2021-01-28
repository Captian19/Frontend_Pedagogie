import React, { Component } from "react";

import {
    CCard,
    CCardBody,
    CCol,
    CRow,
  } from '@coreui/react'

class Annee extends Component {
    render(){
        return(
            <CCard>
            <CCardBody>
            <CRow>
                <CCol sm="12">
                    <h1>Annee Scolaire</h1>
                </CCol>
            </CRow>
            </CCardBody>
            </CCard>
        )
    }
}

export default Annee