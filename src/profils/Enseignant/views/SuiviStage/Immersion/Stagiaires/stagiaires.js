import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useHistory, Link } from 'react-router-dom';

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardFooter,
  CDataTable,
  CCol} from '@coreui/react'


  const style ={
    stagiaires:{
      backgroundColor:'#DC7633',
      color:'#fff'
    }
  }


function Stages(){
  const history = useHistory()

  useEffect(()=>{
    listStages();
    getEleves();
  }, [])


  const [listEleves, setListEleves] = useState([])
  const[cbon, setCbon] = useState(false)
  const getEleves = () =>{
    axios.get(`http://users-ent.herokuapp.com/api/auth/ETUDIANT/GIT/`)
    .then((res)=>{
      setListEleves(res.data)
      setCbon(true)
    })
    .catch(e=>console.log(e))
  }

  const [isOk, setIsOk] = useState(false)
  const [stagiaires, setStagiaires] = useState([])
  const listStages = ()=>{
    axios.get(`http://localhost:8000/api/stage/entreprises/immersion/stages/`)
    .then((res)=>{
      const liste = []
      for(let i =0; i<res.data.length; i++){
        liste.push(res.data[i].stages)
      }
      console.log(liste.flat(2))
      setStagiaires(liste.flat(2))
      setIsOk(true)
    })
    .catch(e => console.log(e))

  } 

  return (
      <CCard>
        <CCardHeader style={style.stagiaires}>
        <h1 align='center'>Stagiaires</h1>
        </CCardHeader>
        <CCardBody>
          
          { (cbon && isOk)  && 
          <>

          <h4>Nombre : {stagiaires.length}</h4>

          <CDataTable
          items={stagiaires}
          fields={[
            {key:'Prenom', label:'PRENOM' ,_style:{fontWeight:'bold'}}, 
            {key:'Nom', label:'NOM' ,_style:{fontWeight:'bold'}}, 
            {key:'Classe', label:'CLASSE' ,_style:{fontWeight:'bold'}}, 
            {key:'entreprise', label:'ENTREPRISE' ,_style:{fontWeight:'bold'}}, 
            {key:'date_debut_stage', label:'DEBUT STAGE' ,_style:{fontWeight:'bold'}}, 
            ]}
          hover
          sorter
          dark
          pagination
          itemsPerPageSelect
          onRowClick={(item) =>history.push(`/enseignant/immersion/single/${item.entreprise.slug}/stage/edit/${item.id}`)  }
          scopedSlots = {{
            
            'Prenom':
            (item)=>{
              let eleve = (listEleves.filter(el=> el.id == item.stagiaire))[0]
             return  <>{item !=='undefined' && <td>{item.stagiaire && eleve.user.first_name}</td>}</>
            },

            'Nom':
            (item) =>{
              let eleve = (listEleves.filter(el=> el.id == item.stagiaire))[0]
            return  <>{item !=='undefined' && <td>{item.stagiaire && eleve.user.last_name}</td>}</>
            },

            'Classe':
            (item) =>{
              let eleve = (listEleves.filter(el=> el.id == item.stagiaire))[0]
             return <>{item !=='undefined' && <td>{item.stagiaire && eleve.classe}</td>}</>
            },

            'entreprise':
            (item) =>{
             return  <> <td>{item.entreprise && item.entreprise.nom_entreprise}</td>    </>
            },

          }}
          />

            <CCol sm="12">
          
            </CCol>
        
            </>
          }
        </CCardBody>

        <CCardFooter>
          <Link to = "/enseignant/immersion/stagiaires/formulaire">
          <div>
            <button className="btn btn-link">Voir le formulaire de Note des Stagiaires</button>  
          </div>
          </Link>
          
        </CCardFooter>
      </CCard>
  )
}


export default Stages;