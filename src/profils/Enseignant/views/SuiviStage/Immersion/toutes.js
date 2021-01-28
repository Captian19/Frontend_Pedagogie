import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";

import {CDataTable,CBadge, CForm,CFormGroup,CInput,CCol,CRow,} from '@coreui/react'
import { useHistory} from 'react-router-dom';


const getBadge = partenaire => {
    switch (partenaire) {
        case true:  return "success";
        case false: return "warning";
        default: return "danger";
} 
};

const getActif = actif =>{
  switch (actif) {
    case true: return "info";
    case false: return "danger"
    default: return "danger";
  }
}


function Toutes(props){
    const history = useHistory();

    const {register, handleSubmit} = useForm({})


    const [rafraichir, setRafraichir] = useState(false)
    const [entreprises, setEntreprises] = useState([]);
    const refreshLists =  (year = new Date().getFullYear().toString()) => {
        
        axios.get(`http://localhost:8000/api/stage/entreprises/immersion/annee/${year}`)
        .then(res => {
            setEntreprises(res.data);
            setRafraichir(true)
        })
        .catch(err =>console.log(err));
    }

    const onSubmitYear = (data)=>{
        console.log(data)
        refreshLists(data.annee)  
    }


    useEffect(() => {
        refreshLists();
    }, [props.reload, rafraichir]);
    
    

    return (
        <div style={{ fontWeight: "bold" }}>

             <CForm  onSubmit={handleSubmit(onSubmitYear)} style={{width:'50%'}}>
        <CRow
          style={{
            width:'100%',
            display:'flex',
            justifyContent:'space-around',
            marginBottom:'3em',
          }}
        >
          <CCol md-6>
            <CFormGroup className="mt-1">
              <CInput
                type="number"
                name="annee"
                id="annee"
                placeholder="Rechercher par annee..."
                innerRef={register}
              />
            </CFormGroup>
          </CCol>

          <CCol xs-4>
            <button className="btn btn-primary" type="submit">
              Rechercher
            </button>
          </CCol>
        </CRow>
      </CForm>

        {entreprises.length > 0 ?
        <>
        <CDataTable
        className="mt-5 ml-2"
            items={entreprises}
            fields={['nom_entreprise',{key:'adresse_entreprise', label:'Adresse'} ,'telephone_entreprise',{
                key: 'partenaire',
                label: 'Partenaire',
                _style: { width: '10%' },
                filter: false
              },{
                key: 'actif',
                label: 'Actif ?',
                _style: { width: '10%' },
              }
            ]}
            tableFilter
            itemsPerPageSelect
            itemsPerPage={7}
            hover
            pagination
            onRowClick={(item) =>history.push(`/enseignant/immersion/single/${item.slug}`)  }

            scopedSlots = {{
                'partenaire':
                (item)=>(
                    <td>
                    <CBadge color={getBadge(item.partenaire)}>
                        {item.partenaire==true ?'OUI':'NON'}
                    </CBadge>
                    </td>
                ), 
                'actif':
                (item)=>(
                    <td>
                    <CBadge color={getActif(item.actif)}>
                        {item.actif==true ?'V':'X'}
                    </CBadge>
                    </td>
                ),   
            }}
        />
        
        </>
        :<h4
          className=" btn btn-pill  btn-warning"
          align="center"
          style={{ width: "100%", cursor: "default" }}
        >
          !Aucune Entreprise
        </h4>
        }
        </div>
    )

}


export default Toutes;