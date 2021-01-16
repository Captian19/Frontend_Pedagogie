import React, { Component } from "react";

import {
    CCard,
    CCardBody,
    CCol,
    CRow,
  } from '@coreui/react'

import {connect} from "react-redux"

class Dashboard extends Component {
    render(){
        return(
            <CCard>
            <CCardBody>
            <CRow>
                <CCol sm="12">
                    <h1>Hello World Etudiant</h1>
                    {this.props.user.CurrentRoles[0].classe}
                    {this.props.user.CurrentRoles[0].departement}
                </CCol>
            </CRow>
            </CCardBody>
            </CCard>
        )
    }
}


const mapStateTopProps = state => ({
    user: state.auth.user
})

export default connect(mapStateTopProps,null)(Dashboard)