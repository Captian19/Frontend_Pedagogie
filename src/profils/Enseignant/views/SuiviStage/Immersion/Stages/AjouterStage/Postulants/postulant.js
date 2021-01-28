import React, { useState, useEffect } from 'react';


import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow
} from '@coreui/react'

import Typography from '@material-ui/core/Typography';

import axios from 'axios'



function Postuler({match}){

  const [reload, setReload] = useState(false)

    useEffect(()=>{
      getPostulants();
    },[reload])

    
    const [postulants, setPostulants] = useState([])
    const getPostulants = () =>{
      axios.get(`http://localhost:8000/api/stage/entreprises/immersion/postulants/${match.params.slug}/`)
      .then((res)=>{
        setPostulants(res.data.choix);
      })
      .catch(e=> console.log(e))
    }

    function refreshPage() {
      setReload(!reload)
    }

   

    const refuser = (pk) =>{
      axios.delete(`http://localhost:8000/api/stage/entreprises/immersion/postulants/delete/${pk}`)
      .then(()=>{
        console.log('Supprimé')
        refreshPage()
    })
      .catch(e => console.log(e))
    }


    const accepter = async (data,eleve, supprimer) =>{
      const today = new Date().getFullYear().toString()
      data['stagiaire'] = parseInt(eleve);
      data['entreprise'] = match.params.slug;
      data['annee_stage'] = today;
      data['classe'] = document.getElementById('classe').textContent;
      data['stage_git'] = true;
      await axios.post(`http://localhost:8000/api/stage/entreprises/${match.params.slug}/stages/`, data)
      .then(() => {
          refuser(supprimer)
      })
      .catch(err => console.log(err));
  }



  return (
    <>
      <CCard>
        <CCardBody>
        {postulants.length>0 && <h1 style={{color:'grey', fontFamily:'sans-serif'}}>{postulants[0].entreprise.nom_entreprise}</h1>}
            
            <CCol sm="12">
              <CRow>
             {postulants.length>0 ?
             <>
             {postulants.map((item)=>(
                
               <CCol sm="4">
               <CCard>
               <CCardHeader>
                 <div style={{width:'70px', height:'70px'}} className="mb-2">
                   <img src="https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png" alt="profile" style={{width:'100%', height:'100%'}}/>
                 </div>

                 <div style={{ right:"15px",top:"15px",position:"absolute",}} >
                <button className="btn-sm btn-pill btn-info " onClick={()=>accepter({},item.eleve_postulant.id, item.id)}>accepter</button>
                </div>
                 
                 <h5>{item.eleve_postulant && <span>{item.eleve_postulant.user.first_name} {item.eleve_postulant.user.last_name}</span>} </h5>
               </CCardHeader>
               <CCardBody>
               {/* <Typography variant="body2" >Stage numero : <span style={{fontWeight:'bold'}}>  Numero stage</span></Typography> */}
                   <Typography variant="body2" >
                     
                     <div>
                      Classe : <span style={{fontWeight:'bold'}} id="classe" > { item.eleve_postulant && item.eleve_postulant.classe}</span>
                     </div>
                   
                   </Typography>
                   
                   <Typography variant="body2" ><span style={{fontWeight:'bold' }}>  <button className=" btn btn-pill  btn-danger " onClick={()=>refuser(item.id)}>Refuser</button> </span></Typography>
                   
               </CCardBody>
               </CCard>
               </CCol>

             ))}
             </>
           :
             <h2>Aucun postulant</h2>
            
            } 
            
            </CRow>
            </CCol>
        </CCardBody>
      </CCard>
    </>

    
  )
}

export default Postuler;