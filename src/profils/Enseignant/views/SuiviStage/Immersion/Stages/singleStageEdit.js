import React, {useState, useEffect} from 'react'
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import axios from 'axios'
import {Card,CardHeader,CardBody,Row,Col} from "reactstrap";

  import {CForm,CFormGroup,CLabel,CInput, CSelect} from '@coreui/react'

//import avatar from './../../../../../assets/img/avatar.png'





function SingleStage({match}){
  let history = useHistory()  
    const {handleSubmit, register} = useForm()

    const[reload, setReload] = useState(false)
    useEffect(()=>{
        getStage();
    },[reload])

    function refreshPage() {
        setReload(!reload)
    }

    const cancelCourse = () => { 
        document.getElementById("create-stage-form").reset();
        refreshPage();
    }

    const onSubmit =(data)=>{
        updateStage(data)
        cancelCourse()
    }


    const [stage, setStage] = useState({})
    const getStage = () =>{
        axios.get(`http://localhost:8000/api/stage/entreprises/stage/${match.params.id_stage}/`)
        .then((res)=>{
            setStage(res.data)
            etudiants(res.data.stagiaire)
            encadreurs(res.data.maitre_de_stage)
            //refreshPage()
        })
    }


    const updateStage = (data) => {
        axios.put(`http://localhost:8000/api/stage/entreprises/stage/${match.params.id_stage}/`, data)
        .then(()=>{
            alert("informations mises à jour")
            setReload(!reload)
        })
        .catch(e => console.log(e))
    }


    const deleteStage = () =>{
      let confirmer = window.confirm("Supprimer définitivement ce stage ?");
      if(confirmer){
        axios.delete(`http://localhost:8000/api/stage/entreprises/stage/${match.params.id_stage}/delete/`)
         .then(() => {
           alert('SUPPRESSION REUSSIE')
           return history.push(`/enseignant/immersion/single/${match.params.slug}`);
       })
       .catch(err => console.log(err))
      }
      else return null 
   }  


   const [cbon, setCbon] = useState(false)
   const [user, setUser] = useState({})
   const etudiants = (stagiaire) =>{
      axios.get(`http://users-ent.herokuapp.com/api/auth/ETUDIANT/GIT/`)
      .then((res)=>{
        console.log(res.data)
          let leStagiaire = res.data
          setUser((leStagiaire.filter(el=> el.id == stagiaire))[0])
          setCbon(true);
      })
      .catch(e=>console.log(e))
   }


   const [tousMaitres, setTousMaitres] = useState([])
   const [maitre, setMaitre] = useState({})
   const encadreurs = (encadreur) =>{
    axios.get(`http://users-ent.herokuapp.com/api/auth/MAITRE_STAGE/`)
    .then(res=>{
      setTousMaitres(res.data)
      let leMaitre = res.data;
      setMaitre((leMaitre.filter(el =>el.id == encadreur))[0])
    })
    .catch(e=>console.log(e))
   }






   

    return (
        <>
        <Row>
            <Col lg="7">
                <Card>
                <CardHeader style={{backgroundColor:'#3c4b64', color:'#fff', fontWeigh:'bold'}}>
                  <h4 className="title">Stage {stage.classe_stagiaire} {stage.annee_stage}</h4>
                </CardHeader>

                <CardBody>
                  
                    <Row>
                      <Col className="pr-1" md="5">
                        <CFormGroup>
                          <CLabel>Prénom</CLabel>
                          <CInput
                            defaultValue={user.user && user.user.first_name}
                            disabled
                            type="text"
                          />
                        </CFormGroup>
                      </Col>
                      <Col className="pl-1" md="5">
                        <CFormGroup>
                          <CLabel htmlFor="exampleInputEmail1">
                            Nom
                          </CLabel>
                          <CInput
                            defaultValue={user.user && user.user.last_name}
                            disabled
                            type="text"
                          />
                        </CFormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="4">
                        <CFormGroup>
                          <CLabel>Email</CLabel>
                          <CInput
                            type="text"
                           defaultValue={user.user && user.user.email}
                            disabled
                          />
                        </CFormGroup>
                      </Col>
                      <Col className="pr-1" md="2">
                        <CFormGroup>
                          <CLabel>Sexe</CLabel>
                          <CInput
                            type="text"
                            defaultValue={user.user && user.user.sexe}
                            disabled
                          />
                        </CFormGroup>
                      </Col>
                      <Col className="pl-1 ml-4" md="3">
                        <CFormGroup>
                          <CLabel>Telephone</CLabel>
                          <CInput
                            disabled
                            defaultValue={user.user && user.user.telephone}
                            type="text"
                            //ref={updateProfil}
                          />
                        </CFormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="8">
                        <CFormGroup>
                          <CLabel>Maitre de Stage</CLabel>
                          <CSelect
                            //defaultValue={props.user.adresse}
                            name="maitre_de_stage"
                            type="text"
                            placeholder="Selectionner son maitre de stage..."
                            innerRef={register}
                            //ref={updateProfil}
                          >
                            {tousMaitres && tousMaitres.map(unMaitre =><option value = {unMaitre.id}>{unMaitre.user.first_name} {unMaitre.user.last_name} {unMaitre.user.email}</option>)}
                          </CSelect>
                        </CFormGroup>
                      </Col>
                    </Row>
                    <CForm  action="_method=PUT" method="post"  id="create-stage-form" encType="application/json" onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                      <Col md="4">
                        <CFormGroup>
                          <CLabel> Debut Stage</CLabel>
                          <CInput
                            cols="80"
                            defaultValue={stage.date_debut_stage && stage.date_debut_stage}
                            rows="4"
                            type="date"
                            id="date_debut_stage"
                            name="date_debut_stage"
                            // innerRef={register({required:false})}

                          />
                        </CFormGroup>
                      </Col>
                      <Col md="4">
                        <CFormGroup>
                          <CLabel> Fin Stage</CLabel>
                          <CInput
                            cols="80"
                            name="date_fin_stage"
                            defaultValue={stage.date_fin_stage && stage.date_fin_stage || null}
                            rows="4"
                            type="date"
                            
                            id="date_fin_stage"
                            // innerRef={register({required:false})}

                          />
                        </CFormGroup>
                      </Col>
                    </Row>
                    <button className="btn btn-primary mt-2" type='submit'>Enregistrer</button>
                  </CForm>
                </CardBody>
                </Card>
            </Col>
            <Col md="5">
            <div className="container shadow">
              <div className="row">
                <div className="offset-lg-4 col-lg-4 col-sm-6 col-12 main-section text-center">
                    <div className="row">
                        <div className="col-lg-12 col-sm-12 col-12 profile-header"></div>
                    </div>
                    <div className="row user-detail">
                        <div className="col-lg-12 col-sm-12 col-12">
                            <img src="https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png" className="rounded-circle img-thumbnail" />
                            <h5 className="mt-2 mb-2">{user.user && user.user.first_name} {user.user && user.user.last_name}</h5>
                            {/* <p><i class="fa fa-map-marker" aria-hidden="true"></i> {props.user.adresse}</p> */}

                            <hr />


                            {/* <hr /> */}
                            {/* <span>{props.user.bio}</span> */}
                        </div>
                        <div className="col-lg-12"> 
                        Maitre de Stage
                          <h6 style={{color:"black", fontStyle:"italic"}}>

                            {stage.maitre_de_stage && 
                                <span style={{}}>{maitre.user && maitre.user.first_name} {maitre.user && maitre.user.last_name}</span> 
                            }

                          </h6><hr/>
                        {stage.appreciations && (stage.appreciations.map((appreciation)=>{
                                return  <blockquote  style={{width:"100%"}}> <p key={appreciation.id} style={{widht:"100%", color:"green"}}>{appreciation.appreciations}</p> <hr/> </blockquote> 
                            }))}
                        </div>

                    </div>


                    <h5>Moyenne Stage {(stage.formulaire_stage && stage.formulaire_stage.length>0) ?
                                        <span className="btn btn-pill btn-danger"> {stage.formulaire_stage[0] && stage.formulaire_stage[0].moyenne_generale}</span> :
                                         <span className="btn btn-pill btn-ghost-warning">Non renseignée</span>}</h5>
                    <div className="row user-social-detail">
                        <div className="col-lg-12 col-sm-12 col-12">
                            <a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a>
                            <a href="#"><i className="fa fa-google-plus" aria-hidden="true"></i></a>
                            <a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a>
                        </div>
                    </div>
                </div>
              </div>
            </div>
            </Col>
        </Row>
        <div>
            <button className="btn btn-outline-danger" onClick={deleteStage}>Supprimer le stage</button>
            <i> En cas d'erreur d'attribution par exemple</i>
        </div>
        </>
    )
}



export default SingleStage;