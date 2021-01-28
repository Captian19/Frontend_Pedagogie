import React, { useState,useEffect } from "react";
import URL from "../../../actions/moduleConcours/entry_URL"

import {
    CCard,
    CCardBody,
    CDataTable,
    CCardHeader,
    CCol,
    CRow,
    CButton
} from '@coreui/react'

import axios from "axios"
import {useHistory} from "react-router-dom"
import {connect} from "react-redux"

const Vue_Liste_Correcteur = (props) => {
    const [users, setUsers] = useState([]);
    const [correcteurs, setCorrecteurs] = useState([]);
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${props.token}`
        },
    }


    const getListProfs = () => {
        axios.get('https://users-ent.herokuapp.com/api/auth/ENSEIGNANT/',config)
            .then(res =>{
                setUsers(res.data);
                setLoading(false);
            })
            .catch(err => console.log(err))
    }

    const getCorrecteurs = () => {
        axios.get(URL+`candidats/correcteurs`)
            .then(res => {
                let a = []
                a = res.data.results.map(el => el.id_correcteur)
                setCorrecteurs(a)
                console.log(a)
                history.push("/scolarite/concours/liste_correcteur/")
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {getListProfs(); getCorrecteurs()},[]);

    return(
        <>
            <CCardHeader>
                Liste des professeurs (cliquer sur Ajouter pour designer comme correcteur)
            </CCardHeader>
            <CCardBody>
                <CRow>
                    <CCol sm="12" lg="12">
                        <CDataTable
                            items={users.filter(user => correcteurs.includes(String(user.user.id)))}
                            fields={['first_name','last_name','email','adresse','telephone','Role']}
                            itemsPerPage={15}
                            tableFilter
                            paginationfooter
                            itemsPerPageSelect
                            sorter
                            hover
                            pagination
                            loading={loading}
                            scopedSlots = {{
                                'Role':
                                    (item, index) =>{
                                        return (
                                            <td className="bg-gray-100">
                                                <span className="alert alert-info"><i className="fas fa-pencil-square-o"/>Correcteur</span>
                                            </td>
                                        )
                                    },

                                'first_name':
                                    (item, index) =>{
                                        return (
                                            <td className="py-2">
                                                {item.user.first_name}
                                            </td>
                                        )
                                    },
                                'last_name':
                                    (item, index) =>{
                                        return (
                                            <td className="py-2">
                                                {item.user.last_name}
                                            </td>
                                        )
                                    },
                                'email':
                                    (item, index) =>{
                                        return (
                                            <td className="py-2">
                                                {item.user.email}
                                            </td>
                                        )
                                    },
                                'telephone':
                                    (item, index) =>{
                                        return (
                                            <td className="py-2">
                                                {item.user.telephone}
                                            </td>
                                        )
                                    },
                                'adresse':
                                    (item, index) =>{
                                        return (
                                            <td className="py-2">
                                                EPT
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

export default connect(mapStateToProps,null)(Vue_Liste_Correcteur)