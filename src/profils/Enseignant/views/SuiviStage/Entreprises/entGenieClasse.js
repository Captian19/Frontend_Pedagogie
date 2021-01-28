import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {CDataTable,CBadge} from '@coreui/react'


const getBadge = partenaire => {
switch (partenaire) {
    case true: return 'success'
    case false: return 'warning'
    default: return 'danger'
} 
}

const fields = ['nom_entreprise','telephone_entreprise','lien_page','adresse_entreprise', 'type_stage','partenaire']



function EntrepriseClasseGenie(props){
    useEffect(() =>{
        refreshLists();
},[]);


    const [entreprises_classe_genie, setEntreprises_classe_genie] = useState([]);

    const refreshLists =  () => {
        axios.get(`http://localhost:8000/api/stage/entreprises/dept/${props.genie}/classe/${props.classe}/`)
        .then(res => {
            setEntreprises_classe_genie(res.data);
        })
        .catch(err =>console.log(err));
    }

    
    return(
        <div className="btn-group" style={{width: "100%"}} >
            <h5 className="btn-lg  btn-block btn-ghost-info  dropdown-toggle mb-4"  data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="True">{props.genie}</h5>
        <div className="dropdown-menu" style={{width: "100%"}}>
        <CDataTable
            className="dropdown-item"
            items={entreprises_classe_genie}
            fields={fields}
            // itemsPerPage={10}
            hover
            // pagination
            scopedSlots = {{
                'partenaire':
                (item)=>{
                    return (
                        <td>
                            <CBadge color={getBadge(item.partenaire)}>
                                {item.partenaire == true ? 'OUI' : 'NON'}
                            </CBadge>
                        </td>
                    );}
            }}
        />
        </div>
        </div>
    )

}


export default EntrepriseClasseGenie;