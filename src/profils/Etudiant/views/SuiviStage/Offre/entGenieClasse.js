import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {
    CDataTable,
    CBadge
} from '@coreui/react'


const getBadge = partenaire => {
switch (partenaire) {
    case true: return 'success'
    case false: return 'warning'
    default: return 'danger'
} 
}




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
        <div className="" style={{width: "100%"}} >
            <div className="btn  btn-block btn-lg btn-info  mb-4"  data-display="static" aria-haspopup="true" aria-expanded="True"> <h4>Stages {props.classe} -- {props.genie} </h4> </div>
        <div className="" style={{width: "100%"}}>
        <CDataTable
            className="dropdown-item"
            items={entreprises_classe_genie}
            fields={props.fields}
            tableFilter
            hover
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