import React, { useState, useEffect } from "react";
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


const fields = ['id_Ac','mandat_name','date_Ac','editeur','motif_rejet_directeur', 'motif_rejet_comptable', 'valid_directeur','valid_comptable']


const Journal = (props) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    
    
    const getBadge = (param) => {
        switch (param) {
            case 'true': return 'success'
            case 'false': return 'danger'
        }
    }

    
const styleLoading = (
    <div className="pt-3 text-center">
      <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
)

    const getListMandats = () => {
        axios.get("http://localhost:8000/mandatement/Journal/")
        .then(res =>{
            setUsers(res.data);
            setLoading(false);
        })
        .catch(err => console.log(err))
    }

    useEffect(() => getListMandats(),[]);
    
    return(
        <CCard>
        <CCardHeader>
        <h4 className='text-center'>Mandatement Avis de credit</h4>
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
                onRowClick={(item) => {item.valid_comptable && history.push(`/finance/mandatviewac/${item.id_Ac}`)}}
                clickableRows
                loading={loading}
                hover
                sorter
                responsive={true}
                hover
                pagination
                noItemsViewSlot={
                    styleLoading
                }
                scopedSlots = {{
                    'id_Ac':
                    (item,index)=>{
                        return (
                            <td className=" mx-auto" style={{textAlign:"center", width:"75px"}}>
                                {item.id_Ac}
                            </td>
                        )
                    },
                    'valid_directeur':
                    (item,index)=>{
                        return (
                            <td style={{fontSize:"1.1em", textAlign:"center"}}>
                                <CBadge 
                                    color={getBadge(item.valid_directeur.toString())}
                                >
                                {item.valid_directeur==true?'Oui':'Non'}</CBadge>
                            </td>
                        )
                    },
                    'valid_comptable':
                    (item,index)=>{
                        return (
                            <td style={{fontSize:"1.1em", textAlign:"center"}}>
                                <CBadge 
                                    color={getBadge(item.valid_comptable.toString())}
                                >
                                {item.valid_comptable==true?'Oui':'Non'}</CBadge>
                            </td>
                        )
                    },
                    'motif-rejet_directeur':
                    (item,index)=>{
                        return (
                            <td className="py-2 mx-auto"  style={{fontSize:"1.1em", textAlign:"center"}}>
                                {item.motif_rejet_directeur}
                            </td>
                        )
                    },
                    'motif-rejet_comptable':
                    (item,index)=>{
                        return (
                            <td className="py-2 mx-auto text-center" style={{fontSize:"1.1em"}}>
                                {item.motif_rejet_comptable}
                            </td>
                        )
                    },
                }}

            />
            </CCol>
        </CRow>
        </CCardBody>
        </CCard>
    )

}



export default Journal