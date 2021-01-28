import React, {useState, useEffect} from 'react';
import axios from 'axios'
import {CCard,CCardBody,CCardFooter,CCardHeader,CCol,CRow,CBadge,CCollapse, CDataTable} from '@coreui/react';

import {connect} from 'react-redux'


const styles= {
  tbhead:{
    marginBottom : '10px',
    border :'solid grey 1px',
    borderCollapse:'collapse',
  },

  titre :{
    fontWeight :'bolder',
    "td":{
      fontSize:'44px',
    },
    
  }
}


function Liste(props){

  useEffect(()=>{
    refreshList(props.departement);
  },[]);


  const [listpfe, setListpfe] = useState([])
  const refreshList = (dept)=>{
    axios.get(`http://localhost:8000/api/pfe/pfes/${dept}`)
    .then((res)=>{
      setListpfe(res.data);
    })
    .catch(e => console.log(e))
  }

  const postulerPfe = (donnees,id_sujet, identifiant) =>{
    console.log(identifiant)
    donnees.etudiant = identifiant
    axios.post(`http://localhost:8000/api/pfe/pfes/${id_sujet}/postulance/`, donnees)
    .then((res) =>{
      console.log(res.data);
      if(typeof(res.data[0])== 'string'){
        alert(res.data)
      }else{
        alert("Soumission réussie")
      }

    })
    .catch(e=>console.log(e))
  }


  return (

    
    <div className="col-lg-12">

      <CDataTable
        items = {listpfe}
        fields={[
          'sujet',
          {key:'valider',label:'Statut'},          
           {key:'exposants', label:'Postulants'},
          'Action'
        ]}
        dark
        hover
        tableFilter
        scopedSlots = {{
          'valider':
          (item)=>{
            return <>
              {item.valider==true ? 
              <td>
                Validé
              </td>
            :
            <td>Non</td>
            }
            </>
          },  
          'exposants':
          (item)=>(
            <td>
              {item.exposants!='ras' && item.exposants.split(',').map((it)=>{ return <div>
                {/* {it.prenom} {it.nom} */}
                prénom nom
                </div>})}
            </td>
          ),

          'Action':
          (item)=>{
            return <>
              {item.Action !== 'undefined'
              &&
              <>
              {item.exposants=='ras' ||  item.exposants.split(',').length <=1 ? 
              <button className="btn btn-pill btn-info" onClick={e=>postulerPfe({},item.id, props.identifiant)}>Postuler</button>
              : <button className=" btn btn-warning" disabled>Aucune</button> 
              } 
              </>   
                 
            }
            </>
          }
         
        }}
      />

      {/* {console.log(listpfe)} */}
    </div>
  )
}


// const MapToState = state =>({
//   role: state.auth.user.CurrentRoles[0],
//   user: state.auth.user
// })

// export default connect(MapToState, null)(Liste);

export default Liste;