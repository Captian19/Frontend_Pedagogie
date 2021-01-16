import React, { Component } from "react";
import Carte from '../../../components/moduleInscription/Carte'

import {
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CRow,
  } from '@coreui/react'

class CarteE extends Component {
    render(){
        return(
            <CCard>
            <CCardBody>
            <CRow>
                <CCol sm="12">
                    <Carte></Carte>
                </CCol>
            </CRow>
            </CCardBody>
            </CCard>
        )
    }
}

export default CarteE