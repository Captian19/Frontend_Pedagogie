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


import Menu from  './menuClasse'

import Colapse from '../AjouterEntreprise/colapse';


function Entreprise() {
    return(
        <CCard>
            <CCardBody>
                <CRow>
                    <CCol sm="12">
                    <h1> </h1>
                        <Menu/>
                        <div>
                            <Colapse/>
                        </div>
                        
                    </CCol>
                </CRow>
            </CCardBody>
        </CCard>
    );
}

export default Entreprise;