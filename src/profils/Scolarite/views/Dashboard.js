import React, { Component } from "react";
import View_Session from "./moduleConcours/view_session";
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
            <View_Session/>
        )
    }
}

export default Dashboard