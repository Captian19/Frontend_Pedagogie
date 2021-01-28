import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

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


    useEffect(()=>{
      getPostulants();
      console.log(match)
    },[])


    const [postulants, setPostulants] = useState([])
    const getPostulants = () =>{
      axios.get(`http://localhost:8000/api/pfe/pfes/${match.params.pfe_id}/postulance/`)
      .then((res)=>{
        console.log(res.data.choix);
        setPostulants(res.data.choix);
      })
      .catch(e=> console.log(e))
    }

    function refreshPage() {
      window.location.reload(false);
    }

   

    const refuser = (pk) =>{
      axios.delete(`http://localhost:8000/api/pfe/pfes/postulance/${pk}/delete/`)
      .then(()=>{
        //alert('Demande Supprimée')
        refreshPage()
    })
      .catch(e => console.log(e))
    }


    const accepter = async (data,exposant, supprimer) =>{
      data['exposants'] = String(exposant);
      console.log('data ', data);
      await axios.put(`http://localhost:8000/api/pfe/pfes/${match.params.pfe_id}/edit/`, data)
      .then((res) => {
          console.log(res.data)
          refuser(supprimer)
      })
      .catch(err => console.log(err));
    }



  return (
    <>
      <CCard>
        <CCardBody>
        {postulants.length>0 && <h1 style={{color:'grey', fontFamily:'sans-serif'}}>{postulants[0].sujet_postule.sujet}</h1>}
            
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
                <button className="btn-pill btn-info " onClick={()=>accepter({},item.etudiant.id, item.id)}>accepter</button>
                </div>
                 
                 <h5>{item.etudiant && <span>{item.etudiant.user.first_name} {item.etudiant.user.last_name}</span>} </h5>
               </CCardHeader>
               <CCardBody>
               {/* <Typography variant="body2" >Stage numero : <span style={{fontWeight:'bold'}}>  Numero stage</span></Typography> */}
                   <Typography variant="body2" >
                     
                     <div>
                      Classe : <span style={{fontWeight:'bold'}}> { item.etudiant && item.etudiant.classe}</span>
                     </div>
                   
                   </Typography>
                   
                   <Typography variant="body2" ><span style={{fontWeight:'bold'}}> 
                   {console.log(item.id)} 
                   <button className="btn-pill btn-outline-danger " onClick={()=>refuser(item.id)}>Refuser</button> 
                   </span>
                   </Typography>
                   
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