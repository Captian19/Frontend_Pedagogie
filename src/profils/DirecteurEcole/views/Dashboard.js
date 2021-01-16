import React, { Component } from "react";

import {
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CRow,
  } from '@coreui/react'

class Dashboard extends Component {
    render(){
        return(
            <CCard>
            <CCardBody>
            <CRow>
                <CCol sm="12">
                    <h1>Hello World Directeur de l'ecole</h1>
                </CCol>
            </CRow>
            </CCardBody>
            </CCard>
        )
    }
}

export default Dashboard