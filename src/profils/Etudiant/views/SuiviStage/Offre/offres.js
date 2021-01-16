import React, { Component } from "react";

import {
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CRow,
    CBadge,
    CCollapse
  } from '@coreui/react'

import Tableau from './tableau'



function Offres() {
    return(
        <CCard>
            <CCardBody>
                <CRow>
                    <CCol sm="12">
                        
                        <Tableau/>
                        
                    </CCol>
                </CRow>
            </CCardBody>
        </CCard>
    );
}

export default Offres;