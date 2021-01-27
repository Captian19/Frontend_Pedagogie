import React,{useState,useEffect} from "react";
import {
    CCard,
    CCardBody,
    CCol,
    CRow,
    CDataTable,
    CCardHeader
  } from '@coreui/react'

import {connect} from "react-redux"
import {useHistory} from "react-router-dom"
import axios from "axios"  

const fields = ['avatar','Prénom','Nom','departement','Année']

const ListeEnseignant = (props) => {

    const [users, setUsers] = useState([]);
    
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${props.token}`
        },
    }


    // Obtention de la liste de tous les enseignants d'un d&partement donnée
    const getListUsers = () => {
        axios.get(`https://users-ent.herokuapp.com/api/auth/ENSEIGNANT/${props.role.departement}/`,config)
        .then(res =>{
            const users = res.data;
            setUsers(users);
        })
        .catch(err => console.log(err))
    }

    useEffect(() => getListUsers(),[]);
    
    return (
        <CCard>
            <CCardBody>
            <CRow>
                <CCardHeader>
                    <div className="">
                    <span className="mr-2">Département</span> <span className="display-5">{props.role.departement}</span>
                    </div>
                </CCardHeader>
                <CCol sm="12" md="12">
                <CDataTable
                    items={users}
                    fields={fields}
                    paginationfooter
                    hover
                    sorter
                    hover
                    pagination
                    scopedSlots = {{

                        'Prénom':
                        (item,index) => {
                            return (
                                <td className="py-2">
                                    {item.user.first_name}
                                </td>
                            )
                        }, 
                        'Nom':
                        (item,index) => {
                            return (
                                <td className="py-2">
                                    {item.user.last_name}
                                </td>
                            )
                        }, 
                        'Année':
                        (item,index) => {
                            return (
                                <td className="py-2">
                                    {item.annee}
                                </td>
                            )
                        },
                        'avatar':
                        (item, index) => {
                            return(
                                <td>
                                    <img src={item.user.photo != null ? item.user.photo : ""} className="rounded-circle" width="40" height="40" />
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
    user:state.auth.user,
    role: state.auth.user.CurrentRoles[0],
    token:state.auth.token
})

export default connect(mapStateToProps,null)(ListeEnseignant)