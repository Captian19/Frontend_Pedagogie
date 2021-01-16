import React, { Component } from "react";

import {
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CRow,
  } from '@coreui/react'
import   Recu  from "../../../../components/bibliotheque/Recu";

class VisiteMed extends Component {
    render(){
        return(
            <CCard>
            <CCardBody>
            <CRow>
                <CCol sm="12">
                   <Recu></Recu>
                </CCol>
            </CRow>
            </CCardBody>
            </CCard>
        )
    }
}

export default VisiteMed