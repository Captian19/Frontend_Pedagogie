import React, { useState,useEffect } from "react";

import {
    CCard,
    CCardBody,
    CDataTable,
    CCardHeader,
    CCol,
    CRow,
    CButton
} from '@coreui/react'
import {get_NotesByYear} from "../../../../actions/moduleConcours/action_NoteConcours";
import {connect} from "react-redux"

const Vue_Lots_Candidat = (props) => {

    return(
        <>
            <CCardHeader>
                Liste des candidats relatif au lot
            </CCardHeader>
            <CCardBody>
                <CRow>
                    <CCol sm="12" lg="12">
                        <CDataTable
                            items={props.state.listeIsHere ? props.state.liste_Candidats : []}
                            fields={['prenom', 'nom', 'lycee','note_maths', 'note_physique', 'note_anglais','note_francais', 'moy_concours']}
                            itemsPerPage={15}
                            tableFilter
                            paginationfooter
                            itemsPerPageSelect
                            sorter
                            hover
                            pagination
                            scopedSlots = {{

                                'prenom':
                                    (item, index) =>{
                                        return (
                                            <td className="py-2">
                                                {item.prenom}
                                            </td>
                                        )
                                    },
                                'nom':
                                    (item, index) =>{
                                        return (
                                            <td className="py-2">
                                                {item.nom}
                                            </td>
                                        )
                                    },
                                'lycee':
                                    (item, index) =>{
                                        return (
                                            <td className="py-2">
                                                {item.lycee}
                                            </td>
                                        )
                                    },
                                'note_maths':
                                    (item, index) =>{
                                        return (
                                            <td className="py-2">
                                                {item.note_maths}
                                            </td>
                                        )
                                    },
                                'note_physique':
                                    (item, index) =>{
                                        return (
                                            <td className="py-2">
                                                {item.note_physique}
                                            </td>
                                        )
                                    },
                                'note_francais':
                                    (item, index) =>{
                                        return (
                                            <td className="py-2">
                                                {item.note_francais}
                                            </td>
                                        )
                                    },
                                'note_anglais':
                                    (item, index) =>{
                                        return (
                                            <td className="py-2">
                                                {item.note_anglais}
                                            </td>
                                        )
                                    },
                                'moy_concours':
                                    (item, index) =>{
                                        return (
                                            <td className="py-2">
                                                {item.moy_concours}
                                            </td>
                                        )
                                    },
                            }}
                        />
                    </CCol>
                </CRow>
            </CCardBody>
        </>
    )

}

const mapStateToProps = state => ({
    token: state.auth.token
})

export default connect(mapStateToProps, {get_NotesByYear})(Vue_Lots_Candidat)