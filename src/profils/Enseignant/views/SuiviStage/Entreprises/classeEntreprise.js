import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CDataTable,
    CCol,
    CRow,
    CBadge
} from '@coreui/react'


const getBadge = partenaire => {
switch (partenaire) {
    case true: return 'success'
    case false: return 'warning'
    default: return 'danger'
} 
}

const fields = ['nom_entreprise', 'domaine','classe_stage','telephone_entreprise','lien_page','partenaire']



function EntrepriseClasse(props){
    useEffect(() =>{
        refreshLists();
},[]);


    const [entreprises_classe, setEntreprises_classe] = useState([]);

    const refreshLists =  () => {
        axios.get(`http://localhost:8000/api/stage/entreprises/classe/${props.classe}/`)
        .then(res => {
            setEntreprises_classe(res.data);
        })
        .catch(err =>console.log(err));
    }

    
    return(
        <div>
            <h3 className="btn btn-primary">{props.classe}</h3>
        {entreprises_classe.length > 0 ?
        <CDataTable
            items={entreprises_classe}
            fields={fields}
            itemsPerPage={10}
            hover
            pagination
            scopedSlots = {{
                'partenaire':
                (item)=>{
                    return (
                        <td>
                            <CBadge color={getBadge(item.partenaire)}>
                                {item.partenaire == true ? 'OUI' : 'NON'}
                            </CBadge>
                        </td>
                    );
                }
            }}
        />
        :<h3>Aucune Entreprise</h3>
        }
        </div>
    )

}


export default EntrepriseClasse;