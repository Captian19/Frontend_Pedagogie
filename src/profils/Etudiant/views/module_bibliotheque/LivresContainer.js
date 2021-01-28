import React, { Component } from "react";

import {
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CRow,
  } from '@coreui/react'

import   Livres  from "../../../../components/bibliotheque/component/Livres";


class LivresContainer extends Component {
    render(){
        return(
            <CCard>
            <CCardBody>
            <CRow>
                <CCol sm="12">
                   <Livres></Livres>
                </CCol>
            </CRow>
            </CCardBody>
            </CCard>
        )
    }
}

export default LivresContainer