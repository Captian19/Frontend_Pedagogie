import React, { useState, useEffect} from 'react'

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardFooter,
  CProgress
} from '@coreui/react'
import axios from "axios";
import img from '../../../../../img/file.png';
import {connect} from "react-redux"




const Publication = (props) => {
  const [cours, setCours] = useState(null)
  const [pub, setPub] = useState([])
  const [is_getted, setIsGetted] = useState(false)
  const [pub_is_getted, set_pub_bool] = useState(false)

  const getCours = (id) => {
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


useEffect(async () => {
  getCours(window.location.href.split("/")[window.location.href.split("/").length -1])
  getPub(window.location.href.split("/")[window.location.href.split("/").length -1])
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

              <div class="row justify-content-center">
                <div class="col-8">
                  <CCard borderColor="secondary"  xs="6" className="mt-2 mb-2 ml-12 mr-12">
                    <CCardBody className="text-center">
                    {p.annonce}
                    </CCardBody>
                    <CCardFooter className="text-center pt-0 pb-0">
                    <small>
                     date & heure : {p.dateDepot} à {p.heureDepot}
                    </small>
                    </CCardFooter>
                  </CCard>
                </div>
              </div>       

              </>
            ) 
            :
            (
              
              <>
              <div class="row justify-content-center">
                <div class="col-8">
                <CCard borderColor="secondary" xs="6" className="mt-2 mb-2 ml-12 mr-12">
                  <CCardFooter className="mb-0 mt-0">
                  <div className="mt-0 text-center">{p.annonce}</div>
                  </CCardFooter>
                  <div className="float-right text-center"><a href={"http://localhost:8000" + p.fichier } target="_blank">
                      <img src={img} width="30" height="30" alt="fichier"/></a>
                  </div>
                  {/* <div md="9">{p.annonce}</div> */}
                  <CCardFooter className="text-center pt-0 pb-0">
                    <small>
                    date & heure : {p.dateDepot} à {p.heureDepot}
                    </small>
                  </CCardFooter>
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