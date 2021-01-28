import React, {useState, useEffect} from'react'

import axios from 'axios';

import {CDataTable} from '@coreui/react'





function Maitres(){
  useEffect(()=>{
    get_liste_maitre()
    get_liste_stagiaire();

  },[])

  const [listeMaitre,setListeMaitre] = useState([])
  const get_liste_maitre = () =>{
    axios.get(`http://localhost:8000/api/stage/entreprises/stage/maitre_stage/tout/`)
    .then((res)=>{
      console.log(res.data);
      setListeMaitre(res.data);
    })
    .catch(e=>console.log(e))
  }


  const [isOk, setIsOk] = useState(false)
  const [listeStagiaire, setListeStagiaire]= useState([])
  const get_liste_stagiaire = () =>{
    axios.get(`http://users-ent.herokuapp.com/api/auth/ETUDIANT/DIC2/GIT/`)
    .then((res)=>{
        console.log(res.data)
        setListeStagiaire(res.data)
        setIsOk(true)
    })
    .catch(e=> console.log(e))
  }  




  return (
    <>
      <h1> les maitres de stage </h1>
      {isOk &&
      
      <CDataTable
        items={listeMaitre}
        fields={['entreprise', {key:'maitre_de_stage', label:'Encadreur'},'Email', 'stagiaire']}
        tableFilter
        dark
        itemsPerPageSelect
        itemsPerPage={7}
        hover
        pagination

        scopedSlots = {{
            'entreprise':
            (item)=>(
              <td>
                {item.entreprise.nom_entreprise.toUpperCase()}
              </td>
            ),

            'maitre_de_stage':
            (item)=>(
              <td>
                {item.maitre_de_stage.user.first_name}  {item.maitre_de_stage.user.last_name} 
              </td>
            ),
            
            'Email':
            (item)=>(
              <td style={{fontStyle:'italic'}}>
                {item.maitre_de_stage.user.email}
              </td>
            ),

            'stagiaire':
            (item)=>{
              let eleve = listeStagiaire.filter(element=>(element.id == item.stagiaire))[0];
             
             return (<td>{eleve && eleve.user.first_name}  {eleve && eleve.user.last_name} </td>)
            }
        }}
      />
    }

    </>

  )
}

export default Maitres;