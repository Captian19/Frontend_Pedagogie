import React from "react";

import {
    CCard,
    CCardBody,
    CCol,
    CRow  } from '@coreui/react'


import Stages from './stages';



function Offres() {
    return(
        <CCard>
            <CCardBody>
                <CRow>
                    <CCol sm="12">
                        
                        <Stages/>
                        
                    </CCol>
                </CRow>
            </CCardBody>
        </CCard>
    );
}

export default Offres;