import React, { useState, useEffect } from "react";
import avatar from "./../../../assets/img/avatar.png"
import {
    CCard,
    CCardBody,
    CDataTable,
    CCardHeader,
    CCol,
    CRow,
    CBadge
} from '@coreui/react'

import {useHistory} from "react-router-dom"
import axios from "axios"  
import {connect} from "react-redux"

const getBadge = (is_active) => {
    switch (is_active) {
        case 'true': return 'success'
        case 'false': return 'danger'
    }
}

const fields = ['option','avatar','first_name','last_name','email','telephone','adresse','active','roles']

const styleLoading = (
    <div className="pt-3 text-center">
      <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
)

const AddNewRole = (props) => {
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
        axios.get('https://users-ent.herokuapp.com/api/auth/users/',config)
        .then(res =>{
            const users = res.data;
            setUsers(users);
            setLoading(false);
        })
        .catch(err => console.log(err))
    }

   

    useEffect(() => getListUsers(),[]);
    
    return(
        <CCard>
        <CCardHeader>
        <h4>Tous les utilisateurs</h4>
        </CCardHeader>
        <CCardBody>
        <CRow>
            <CCol sm="12" lg="15">
            <CDataTable
                items={users}
                fields={fields}
                columnFilter
                tableFilter
                paginationfooter
                itemsPerPageSelect
                itemsPerPage={15}
                clickableRows
                loading={loading}
                hover
                sorter
                responsive={true}
                hover
                onRowClick={(item) => history.push(`/admin/users/${item.id}`)}
                pagination
                selectRow
                noItemsViewSlot={
                    'Loading'
                }
                scopedSlots = {{
                    'active':
                    (item,index)=>{
                        return (
                            <td className="py-2 mx-auto">
                                <CBadge 
                                    color={getBadge(item.is_active.toString())}
                                >
                                {item.is_active==true?'Oui':'Non'}</CBadge>
                            </td>
                        )
                    },
                    'roles':
                    (item,index) => {
                        return (
                            <td className="py-2 text-center">
                                {item.CurrentRoles.map((role,index) => 
                                    <p key={index}>
                                        {role.role_type}
                                    </p>
                                )}
                            </td>
                        )
                    },
                    'avatar':
                    (item, index) => {
                        return(
                            <td>
                                <img src={item.photo != null ? item.photo : avatar} className="rounded-circle" width="40" height="40" />
                            </td>
                        )
                    },
                    'option':
                    (item,index) => {
                      return(
                        <td>
                          <input type="checkbox" name="user" />
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

export default connect(mapStateToProps, null)(AddNewRole)