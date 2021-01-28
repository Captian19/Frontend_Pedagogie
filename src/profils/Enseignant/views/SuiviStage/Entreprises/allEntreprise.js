import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

import {
  CDataTable,
  CBadge,
  CForm,
  CFormGroup,
  CInput,
  CCol,
  CRow,
} from "@coreui/react";
import { useHistory } from "react-router-dom";


const getBadge = partenaire => {
  switch (partenaire) {
    case true:  return "success";
    case false: return "warning";
    default: return "danger";
  }
};

function Test(props) {

    const history = useHistory();

    const {register, handleSubmit, formState} = useForm({})
    

    const [rafraichir, setRafraichir] = useState(false)
    const [entreprises, setEntreprises] = useState([]);

    const refreshLists = (year = new Date().getFullYear().toString()) => {
        axios.get(`http://localhost:8000/api/stage/entreprises/annee/${year}/`)
        .then(res => {
            setEntreprises(res.data);
            setRafraichir(true)
        })
        .catch((err) => console.log(err));
    };


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
            fields={[
              {
                key: "nom_entreprise",
                _style: { width: "20%", textAlign: "center" },
              },
              { key: "adresse_entreprise", label: "Adresse" },
              "type_stage",
              "telephone_entreprise",
              {
                key: "partenaire",
                label: "Partenaire",
                _style: { width: "5%" },
                filter: false,
              },
            ]}
            tableFilter
            sorter
            itemsPerPageSelect
            itemsPerPage={7}
            hover
            pagination
            onRowClick={(item) =>
              history.push(`/enseignant/entreprises/single/${item.slug}`)
            }
            scopedSlots={{
              partenaire: (item) => (
                <td>
                  <CBadge color={getBadge(item.partenaire)}>
                    {item.partenaire == true ? "OUI" : "NON"}
                  </CBadge>
                </td>
              ),
              type_stage: (item) =>
                item.type_stage == "Stage ouvrier" ? (
                  <td style={{ color: "blue" }}>{item.type_stage}</td>
                ) : (
                  <td style={{ color: "red" }}>{item.type_stage}</td>
                ),
            }}
          />
        </>
       : 
        <h4
          className=" btn btn-pill  btn-warning"
          align="center"
          style={{ width: "100%", cursor: "default" }}
        >
          !Aucune Entreprise
        </h4>
      }
    </div>
  );
}

export default Test;
