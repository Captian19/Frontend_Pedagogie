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

import axios from "axios" 
import {useHistory} from "react-router-dom"
import {connect} from "react-redux" 


const fields = ['N','Prenom','Nom',,'email', 'role', 'is_active']

const Inactifs = (props) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${props.token}`
        },
    }


    const getListUsers = () => {
        axios.get('https://users-ent.herokuapp.com/api/auth/users/inactifs/',config)
        .then(res =>{
            setUsers(res.data);
            setLoading(false);
        })
        .catch(err => console.log(err))
    }

    const OnOrOff = (id) => {
        axios.get(`https://users-ent.herokuapp.com/api/auth/users/activer-ou-desactiver/${id}/`,config)
        .then(res => {
            alert('Utilisateur activé avec succès');
        })
        .catch(err => console.log(err))
    }

    useEffect(() => getListUsers(),[]);

    return(
        <CCard>
        <CCardHeader>
        <h4>Les comptes inactifs</h4>
        </CCardHeader>
        <CCardBody>
        <CRow>
            <CCol sm="12" lg="12">
            <CDataTable
                items={users}
                fields={['first_name','last_name','email','adresse','sexe','telephone','roles','Option']}
                itemsPerPage={15}
                tableFilter
                paginationfooter
                itemsPerPageSelect
                hover
                sorter
                hover
                pagination
                loading={loading}
                noItemsViewSlot={
                    'La liste est vide !'
                }
                scopedSlots = {{
                    'Option':
                    (item, index) =>{
                        return (
                            <td className="py-2">
                                <CButton 
                                color="success"
                                variant="outline"
                                shape="square"
                                size="sm" onClick={() => OnOrOff(item.id)}>Activer</CButton>
                            </td>
                        )
                    },
                    'roles':
                    (item,index) => {
                        return (
                            <td className="py-2">
                                {item.CurrentRoles.map((role,index) => 
                                    <p key={index}>
                                        {role.role_type}
                                    </p>
                                )}
                            </td>
                        )
                    }
                }}
            />
            </CCol>
        </CRow>
        </CCardBody>
        </CCard>
    )

}

const mapStateToProps = state => ({
    token: state.auth.token
})

export default connect(mapStateToProps,null)(Inactifs)