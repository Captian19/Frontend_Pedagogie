import React, { Component } from "react";

import Vue_Liste_Correcteur from "../../../../components/moduleConcours/professeur/vue_liste_correcteur";
import Create_Correcteur from "../../../../components/moduleConcours/professeur/ajout_correcteur";

import {
    CCard,
    CCardBody,
    CCol,
    CRow,
} from '@coreui/react';


import Header from '../../../../components/moduleConcours/professeur/vue_correcteur';


class View_Liste_Correcteur extends Component {

    render(){
        return(
            <>
                <CCard>
                <Header />
                    <CCardBody>
                        <CRow> 
                            <CCol>
                                <Create_Correcteur />
                            </CCol>
                        </CRow>
                    </CCardBody>
                    <Vue_Liste_Correcteur />
                </CCard>
            </>
        );
    }
}

export default View_Liste_Correcteur;