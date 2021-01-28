import React, { useState, useEffect } from "react"

import {CCard, CCardHeader, CCardBody,CCol, CRow,CDataTable,CButton
} from '@coreui/react'

import axios from "axios";
import {useHistory} from "react-router-dom"

const fields = [{ key: 'Année Scolaire', _style: { width: '20%'} },
{ key: 'Début', _style: { width: '20%'} },
{ key: 'Fin', _style: { width: '20%',align:'center'} },
{ key: 'Option', _style: {width:'20%'}}
]

const StatYear = (props) => {
    const [years, setYears] = useState([]);
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    const getYears = () => {
        axios.get('http://localhost:8000/api/anneescolaires')
        .then((res) => {
            setYears(res.data);
            setLoading(false);
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        getYears();
    },[])

    return(
        <CCard>
        <CCardHeader>
        <h4>Statistiques</h4>
        </CCardHeader>
        <CCardBody>
        <CRow>
            <CCol sm="12" lg="15">
            <CDataTable
                items={years}
                fields={fields}
                tableFilter
                paginationfooter
                itemsPerPageSelect
                itemsPerPage={15}
                clickableRows
                hover
                sorter
                dark
                bordered
                responsive={true}
                loading={loading}
                pagination
                onRowClick={(item) => history.push(`/admin/statistiques/annee-scolaire/${item.id}`)}
                noItemsViewSlot={
                    'Loading'
                }
                scopedSlots = {{
                    'Année Scolaire':
                    (item,index) => {
                        return (
                            <td className="py-2">
                                {item.alias}
                            </td>
                        )
                    }, 
                    'Début':
                        (item,index) => {
                            return (
                                <td className="py-2">
                                    {item.date_debut}
                                </td>
                            )
                        },
                    'Fin':
                    (item,index) => {
                        return (
                            <td className="py-2">
                                {item.date_fin}
                            </td>
                        )
                    },  
                    'Option':
                    (item,index) => {
                        return(
                            <td className="py-2">
                                <CButton color="primary" onClick={() => {history.push(`/admin/statistiques/annee-scolaire/${item.id}`)}}>Voir</CButton>
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

export default StatYear