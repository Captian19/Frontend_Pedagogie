import React, { Component } from "react";

import {
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CRow,
  } from '@coreui/react'
import VisiteMedicale, { BibliothequeHome } from "../../../../components/bibliotheque/BibliothequeHome";

class VisiteMed extends Component {
    render(){
        return(
            <CCard>
            <CCardBody>
            <CRow>
                <CCol sm="12">
                   <BibliothequeHome></BibliothequeHome>
                </CCol>
            </CRow>
            </CCardBody>
            </CCard>
        )
    }
}

export default VisiteMed