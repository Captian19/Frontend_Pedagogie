import React, { Component } from "react";

import {
    CCard,
    CCardBody,
    CCol,
    CRow,
} from '@coreui/react'

import VoirPlanning from './Planning&Notes/planning/voir_planning';

import { connect } from "react-redux"

class Dashboard extends Component {
    render() {
        return (
            <React.Fragment>
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
                <CCard>
                    <CCardBody>
                        <CRow>
                            <CCol sm="12">
                                {/* <h3>Planning de la {this.props.user.CurrentRoles[0].classe}-{this.props.user.CurrentRoles[0].departement}</h3> */}
                                <VoirPlanning />
                            </CCol>
                        </CRow>
                    </CCardBody>
                </CCard>
            </React.Fragment>
        )
    }
}


const mapStateTopProps = state => ({
    user: state.auth.user
})

export default connect(mapStateTopProps, null)(Dashboard)