import React, { useState, useEffect } from 'react'

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CCollapse,

  CFormGroup,

  CTextarea,

  CRow
} from '@coreui/react'
import { useForm } from "react-hook-form";
import axios from "axios";


const Collapses = (props) => {

  const [collapse, setCollapse] = useState(false)
  const [collapseMulti, setCollapseMulti] = useState([false, false])
  const [accordion, setAccordion] = useState(1)
  const [fade, setFade] = useState(true)
  const [annonce, setAnnonce] = useState("")
  const [cours, setCours] = useState(props.cours)
  const [fichier, setFichier] = useState("")
  const [is_getted, setIsGetted] = useState(false)
  const { handleSubmit } = useForm()

  const getCours = async (id) => {
    await axios.get(`http://localhost:8000/cours_virtuel/${id}`)
      .then(res => {
        setCours(res.data);
        setIsGetted(true);
      })
  }

  useEffect(async () => {
    await getCours(window.location.href.split("/")[window.location.href.split("/").length - 1]);
  }, [])

  const toggle = (e) => {
    setCollapse(!collapse)
    e.preventDefault()
  }

  const toggleMulti = (type) => {
    let newCollapse = collapseMulti.slice()
    switch (type) {
      case "left":
        newCollapse[0] = !collapseMulti[0];
        break;
      case "right":
        newCollapse[1] = !collapseMulti[1];
        break;
      case "both":
        newCollapse[0] = !collapseMulti[0];
        newCollapse[1] = !collapseMulti[1];
        break;
      default:
    }
    setCollapseMulti(newCollapse)
  }

  const toggleFade = () => {
    setFade(!fade)
  }

  const handleChange = e => {
    console.log(e.target.value);
    setAnnonce(e.target.value);
  }
  const onChangeFile = (e) => {
    const file = e.target.files[0];
    setFichier(file);
    console.log(file);
  }

  const onSubmit = () => {

    let formData = new FormData();
    formData.append("fichier", fichier);
    formData.append("annonce", annonce);
    formData.append("cours", cours.id);
    // formData.append("first_name", props.user.first_name);
    // formData.append("last_name", props.user.last_name);;
    

    axios.post(`http://localhost:8000/Support_cours`, formData)
      .then(res => {
        alert("Annonce publiée avec succès");
        props.reloadComponent();
        setAnnonce("");
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    is_getted == false
      ?
      null
      :
      <>
      <div class="row justify-content-center">
      <div class="col-12">
      <CRow>
        <CCol xl="12">
          <div id="accordion" className="mt-3">
            <CCardHeader id="headingOne">
              <CButton
                block
                className="text-left m-0 p-0"
                onClick={() => setAccordion(accordion === 0 ? null : 0)}
                borderColor="none"
              >
                <h6 className="py-2 text-center" >
                  <b>Faire une annonce pour votre classe</b>
                </h6>
              </CButton>
            </CCardHeader>
            <CCollapse show={accordion === 0}>
              <CCardBody>
                <CCol md="16">
                  <CCard md="12">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <CCardBody>
                        <CRow>
                          <CCol xs="12">
                            <CFormGroup>
                                <CTextarea
                                  name="annonce"
                                  id="textarea-input"
                                  onChange={handleChange}
                                  rows="6"
                                  placeholder="Faire une annonce ..."
                                />
                              
                            </CFormGroup>
                            <div className="float-left" padding="0">
                              {/* <button className="btn btn-info">Joindre Fichier</button> */}
                              <input id="file-input" name="fichier"
                                type="file" 
                                required = {false}
                                onChange={onChangeFile} />
                            </div>
                            <div className="float-right">
                              <button className="btn" onClick={() => setAccordion(accordion === 0 ? null : 0)}>Publier</button>
                            </div>
                          </CCol>
                        </CRow>
                      </CCardBody>
                    </form>

                  </CCard>
                </CCol>
              </CCardBody>
            </CCollapse>
          </div>
        </CCol>
      </CRow>
      </div>
    </div>
  

      
      </>
  )
}

export default Collapses