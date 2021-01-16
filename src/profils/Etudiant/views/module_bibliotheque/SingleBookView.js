import React, { Component } from "react";

import {
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CRow,
  } from '@coreui/react'
import  SingleBook  from "../../../../components/bibliotheque/SingleBook";

class SingleBookView extends Component {
    render(){
        return(
            <CCard>
            <CCardBody>
            <CRow>
                <CCol sm="12">
                   <SingleBook></SingleBook>
                </CCol>
            </CRow>
            </CCardBody>
            </CCard>
        )
    }
}

export default SingleBookView