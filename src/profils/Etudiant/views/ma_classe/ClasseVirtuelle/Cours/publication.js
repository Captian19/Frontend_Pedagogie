import React, { useState, useEffect} from 'react'

import {
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CRow
} from '@coreui/react'
import axios from "axios";
import {connect} from "react-redux"
import img from '../../../../../../img/file.png';
 
import avatar from "./../../../../../../assets/img/avatar.png";


const Publication = (props) => {
  const [cours, setCours] = useState(null)
  const [pub, setPub] = useState([])
  const [is_getted, setIsGetted] = useState(false)
  const [pub_is_getted, set_pub_bool] = useState(false);
  const [auteur, setAuteur] = useState('');

  const getCours =  (id) => {
   axios.get(`http://localhost:8000/cours_virtuel/${id}`)
      .then(res => {
        setCours(res.data);
        setIsGetted(true);
      })
}
const getPub = (id) => {
  axios.get(`http://localhost:8000/Support_cours/publication/${id}`)
  .then(res => {
    setPub(res.data);
    
    set_pub_bool(true);
  }).catch( err => console.log(err))
}

const GetUserInPub = async (id) => {
  await axios.get(`https://users-ent.herokuapp.com/api/auth/users/${id}`)
      .then((res) => {
        setAuteur(res.data); //.first_name + " " + res.data.last_name);
        console.log(auteur)
      })
      .catch(err => console.log(err))
      return auteur
}

useEffect(async () => {
   getCours(window.location.href.split("/")[window.location.href.split("/").length -1])
   getPub(window.location.href.split("/")[window.location.href.split("/").length -1]);
},[props.reloader]);

  return (
    <>  
      {is_getted ? (
        <>
        {pub_is_getted ? (
          <>
          {pub.map(p => {


          return (
            p.fichier === null ?  (
              <>   

              <div class="row">
                <div class="col-12">
                <CCard borderColor="secondary"  xs="6" className="mt-2 mb-2 ml-12 mr-12">
                  <CRow>
                    <CCol md="12">
                    <CCardBody>
                      <CRow>
                        <CCol md="1">
                          <img src={avatar} className="rounded-circle" width="40" height="40" />
                        </CCol>
                        <CCol md="8">
                          <div className="float-left">
                          <h5 className="mb-0">{GetUserInPub(p.id_auteur)&& auteur}</h5>
                          <span>{p.dateDepot}</span>
                          </div>
                        </CCol>
                        <CCol md="1">

                        </CCol>
                      </CRow>
                      <CRow>
                       <CCol md="1">

                       </CCol>
                       <CCol md="11">
                        <p className="mt-3">{p.annonce}</p>
                       </CCol>
                      </CRow>
                    </CCardBody>
                    </CCol>
                  </CRow>
                </CCard>
                </div>
                </div>
              </>
            ) 
            :
            (
              
              <>
              <div class="row">
                <div class="col-12">
                <CCard borderColor="secondary"  xs="6" className="mt-2 mb-2 ml-12 mr-12">
                  <CRow>
                    <CCol md="10">
                    <CCardBody>
                      <CRow>
                        <CCol md="1">
                          <img src={avatar} className="rounded-circle" width="40" height="40" />
                        </CCol>
                        <CCol md="8">
                          <div className="float-left">
                          <h5 className="mb-0">{GetUserInPub(p.id_auteur) && auteur}</h5>
                          <span>{p.dateDepot}</span>
                          </div>
                        </CCol>
                        <CCol md="1">

                        </CCol>
                      </CRow>
                      <CRow>
                       <CCol md="1">
                      
                       </CCol>
                       <CCol md="11">
                        <p className="mt-3">{p.annonce}</p>
                       </CCol>
                      </CRow>
                    </CCardBody>
                    </CCol>
                    <CCol md="2">
                      <div className="text-center py-3">
                      <a href={"http://localhost:8000" + p.fichier } target="_blank">
                      <img src={img} className="img-fluid" alt="fichier"/>
                      </a>

                      <a className="btn btn-info mt-2 text-center" href={"http://localhost:8000" + p.fichier } target="_blank">
                        <small>Voir fichier</small>
                      </a>
                      </div>
                    </CCol>
                  </CRow>
                </CCard>
                </div>
                </div>    
                
              </>

              
              
              )

            )
        })}
        </>
      )
      :
      (
        <h1>Liste des publications du cours</h1>
      )}

          </>
        ):(
          <h1>Liste des publications du cours</h1>
        )}
    </>
      
    )
  
}

const mapStateToProps = state => ({
  user:state.auth.user,
  role: state.auth.user.CurrentRoles[0],
  token:state.auth.token
})

// export default Publication ;
export default connect(mapStateToProps,null)(Publication) ;