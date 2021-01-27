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
                    {this.props.user.CurrentRoles[0].classe}
                    {this.props.user.CurrentRoles[0].departement}
                    <h5>Ops, Votre Emploi du temps n'est pas encore disponible</h5>
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