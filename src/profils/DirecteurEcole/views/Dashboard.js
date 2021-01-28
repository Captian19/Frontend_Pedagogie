import React, { Component } from "react";

import {
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CRow,
    CCardGroup,
    CWidgetProgressIcon,
    CProgress
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

class Dashboard extends Component {
    render(){
        return(
            <CCard>
            <CCardBody>
            <CCardHeader>
                Hello World Directeur
            </CCardHeader>
            <CRow>
                <CCol sm="12">
                <CCardGroup className="mb-4">
                    <CWidgetProgressIcon
                    header="47"
                    text="All users"
                    color="gradient-info"
                    value={80}
                    >
                    <CIcon name="cil-people" height="78"/>
                    </CWidgetProgressIcon>
                    <CWidgetProgressIcon
                    header="0"
                    text="News users"
                    color="gradient-success"
                    >
                    <CIcon name="cil-userFollow" height="78"/>
                    </CWidgetProgressIcon>
                    <CWidgetProgressIcon
                    header="20"
                    text="Roles"
                    color="gradient-warning"
                    >
                    <CIcon name="cil-list" height="78"/>
                    </CWidgetProgressIcon>
                    <CWidgetProgressIcon
                    header="28%"
                    text="Returning Visitors"
                    >
                    <CIcon name="cil-chartPie" height="78"/>
                    </CWidgetProgressIcon>
                    <CWidgetProgressIcon
                    header=""
                    text="Années Scolaires"
                    color="gradient-danger"
                    progressSlot={
                        <CProgress color="danger" size="xs" value={75} animated className="my-3"
                    />}
                    >
                    <CIcon name="cil-speedometer" height="36"/>
                    </CWidgetProgressIcon>
                </CCardGroup>
                </CCol>
            </CRow>
            </CCardBody>
            </CCard>
        )
    }
}

export default Dashboard