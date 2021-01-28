/*
=========================   Composant pour les pfes pour un departement bien precis     =========================   
*/

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardFooter,
  CCol,
  CInput,
  CSelect,
  CRow,
  CForm,
  CFormGroup,
  CTextarea
} from "@coreui/react";

import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import { red } from "@material-ui/core/colors";

import { connect } from "react-redux";

const couleur = {
  0: "info",
  1: "default",
  2: "danger",
};




function PfesDept(props) {
  useEffect(() => {
    getPfeByDept();
    getListe();
    getEnseignants();
  }, []);

  //url change en fonction du role de l'utilisateur.
  //Si c'est un chef de departement, c'est seulement les pfes de son departement qui sont affichés
  //Si c'est le directeur de l'ecole ou des Etudes, ce sont  tous les pfes qui sont affichés
  let url = props.role.departement
    ? `http://localhost:8000/api/pfe/pfes/${props.role.departement}`
    : `http://localhost:8000/api/pfe/pfes/`;


    const [isOk, setIsOk] = useState(false)
    const [liste, setListe]= useState([])
    const getListe = () =>{
        axios.get(`http://users-ent.herokuapp.com/api/auth/ETUDIANT/DIC2/${props.role.departement}/`)
        .then((res)=>{
            console.log(res.data)
            setListe(res.data)
            setIsOk(true)
        })
        .catch(e=> console.log(e))
    }


  const [pfes, setPfes] = useState([]);
  const getPfeByDept = () => {
    axios.get(url)
      .then((res) => {
        console.log("pfes", res.data);
        setPfes(res.data);
      })
      .catch((e) => console.log(e));
  };

  const[isOk2, setIsOk2] = useState(false)
  const [enseignants, setEnseignants] = useState([])
  const getEnseignants = () => {
    axios.get(`http://users-ent.herokuapp.com/api/auth/ENSEIGNANT/`)
    .then((res)=>{
      console.log(res.data);
      setEnseignants(res.data)
      setIsOk2(true)
    })
    .catch(e => console.error(e))
  }


  return (
    <>
      <CCard>
        <CCardBody style={{backgroundColor:'#3c4b64', color:'#fff'}}>
          {props.role.departement ? (
            <>
              <h1>Projets de Fin d'Etudes - {props.role.departement}</h1>
            </>
          ) : (
            <h1>Projets de Fin d'Etudes</h1>
          )}

          {/* On affiche le bouton pour ajouter un sujet de PFE si l'utilisateur est le responsable des Pfes */}
          <>
            {props.all_role.map((item) => {
              if (item.role_type == "RESPONSABLE_PFE") {
                return (
                  <AjouterPfe
                    label="+SUJET"
                    genie_resp={props.role.departement}
                  />
                );
              } else {
                return null;
              }
            })}
          </>

          <div>Total : {pfes.length} pfes </div>
        </CCardBody>
      </CCard>

      <CCard>
        <CCardBody>
          <CRow>
            {((isOk && isOk2) && pfes) ? (
              <>
                {pfes.map((pfe, index) => {
                    let listeid = pfe.exposants.split(',')
                    let exposants = [...liste.filter(user=>(
                        listeid.includes(String(user.id)) 
                    )) ]

                    let enseignant_id = pfe.jury.split(',')
                    let membres = [...enseignants.filter(user=>(
                        enseignant_id.includes(String(user.id))
                    ))]
                    console.log('membres', membres)
                    console.log(enseignant_id)

                    return <>
                  <CCol xs="12" sm="6" md="4" key={pfe.id}>
                    
                      <CCard>
                        <Link style={{textDecoration:'none', color:'#3c4b64', fontWeight:'bold'}} to={{pathname:`/enseignant/pfes/postulants/${pfe.id}`} }>
                        
                          <CCardHeader color={couleur[`${(index)%3}`]}  className="text-white" style={{height:'60pt', padding:'auto'}}>
                          {pfe.sujet.toUpperCase()}
                          </CCardHeader>

                        </Link>
                        <CCardBody style={{height:'150pt'}}>
                          <CRow
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              flexWrap: "noWrap",
                            }}
                          >
                              {pfe.exposants !='ras' ? (
                                  <>
                                  {exposants.map(eleve =>(
                                    <>
                                      <div style={{marginLeft:'1em', fontWeight:'bold'}}>
                                          {eleve.user.first_name}  {eleve.user.last_name}
                                      </div>
                                    <br/>
                                  </>
                                  ))}
                                  </>
                              ):
                              <p>Aucun Exposant</p>
                              }
                          </CRow>
                          <hr />
                          <h4><u>Jury</u></h4>
                          <CRow
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              flexWrap: "NoWrap",
                              justifyContent: "space-around",
                              alignItems: "center",
                            }}
                          >
                            {pfe.jury !='ras'  ? (
                              <>
                                {membres.map(membre => {
                                   return <>
                                        <div style={{marginLeft:'1em', fontStyle:'italic'}}>
                                        {membre.user.first_name}  {membre.user.last_name}
                                        </div>
                                    </>
                              
                                })}
                              </>
                            ) : (
                              <h5 style={{color:'red'}}>Aucun membre</h5>
                            )}
                          </CRow>
                        </CCardBody>

                        <CCardFooter>
                        <AjouterMembreJury
                        pfe_id={pfe.id}
                        />
                           
                        </CCardFooter>
                      </CCard>
                    
                  </CCol>
                  </>
                })}
              </>
            ) : (
              <h1>Aucun PFE</h1>
            )}
          </CRow>
        </CCardBody>
      </CCard>
    </>
  );
}


//formulaire d'ajout d'un sujet de pfe
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    marginBottom: "2em",
    marginTop: "1em",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #fff",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


//composant pour ajouter un pfe
function AjouterPfe(props) {
  const classes = useStyles();


  const { register, handleSubmit } = useForm({
    mode: "onSubmit",
  });

  const cancelCourse = () => {
    document.getElementById("create-pfe-form").reset();
    refreshPage();
  };

  function refreshPage() {
    window.location.reload(false);
  }

  const refresh = (data) => {
    data["genie"] = props.genie_resp;
    console.log(props.genie_resp);
    axios.post(`http://localhost:8000/api/pfe/pfes/creer/`, data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  const onSubmit1 = (data) => {
    console.log(data);
    refresh(data);
    cancelCourse();
  };

  const [open1, setOpen1] = React.useState(false);

  const handleOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  return (
    <div style={{ right: "15px", top: "5px", position: "absolute" }}>
      <button
        type="button"
        onClick={handleOpen1}
        className="btn btn-pill btn-ghost-danger"
      >
        {props.label}
      </button>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open1}
        onClose={handleClose1}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        >


        <Fade in={open1}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Ajouter un sujet de PFE</h2>
            <p id="transition-modal-description">
              <u>NB</u> : Le sujet ajouté ne comportera pas d'exposants. <br />
              Il sera soumis aux étudiants pour qu'ils puissent faire leur choix{" "}
              <br />
            </p>
            <p id="transition-modal-description">
              {" "}
              Ce choix sera validé par le Responsable de PFE{" "}
            </p>

            <CForm
              method="post"
              id="create-pfe-form"
              encType="application/json"
              onSubmit={handleSubmit(onSubmit1)}
            >
              <CFormGroup>
                <CTextarea
                  type="Textearea"
                  name="sujet"
                  id="sujet"
                  style={{height:'50pt'}}
                  placeholder="Sujet PFE..."
                  innerRef={register({ required: true })}
                />
                <br />
                <CTextarea
                  type="Textearea"
                  name="description"
                  id="description"
                  style={{height:'90pt'}}
                  placeholder="Description du sujet..."
                  innerRef={register({ required: true })}
                />
                <div>
                  <button className=" btn btn-success" type="submit">
                    {" "}
                    valider
                  </button>
                </div>
              </CFormGroup>
            </CForm>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};




//composant pour ajouter un membre du jury au pfe
function AjouterMembreJury(props){
  
  useEffect(()=>{
    getEnseignants()
  },[])

  const classes = useStyles();

  const { register, handleSubmit } = useForm({
    mode: "onSubmit",
  });


  const cancelCourse = () => {
    //document.getElementById("create-pfe-form").reset();
    refreshPage();
  };

  function refreshPage() {
    window.location.reload(false);
  }

  const [enseignants, setEnseignants] = useState([])
  const getEnseignants = () => {
    axios.get(`http://users-ent.herokuapp.com/api/auth/ENSEIGNANT/`)
    .then((res)=>{
      console.log(res.data);
      setEnseignants(res.data)
    })
    .catch(e => console.error(e))
  }


  const postMembreDuJury = (data) =>{
    axios.put(`http://localhost:8000/api/pfe/pfes/${props.pfe_id}/jury/ajouter/`, data)
    .then(res=>console.log(res.data))
    .catch(e=>console.log(e))
  }

  const onSubmit1 = (data) => {
    console.log(data);
    postMembreDuJury(data)
    cancelCourse();
  };

  const [open1, setOpen1] = useState(false);

  const handleOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  return (
    <div >
        <button className="btn-sm btn-pill btn-ghost-dark" onClick={handleOpen1} style={{fontStyle:'italic', float:'right'}}> 
            <span style={{fontSize:'16pt', fontWeight:'bold'}}>+</span>Membre du jury 
        </button>
     

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open1}
        onClose={handleClose1}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        >


        <Fade in={open1}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Ajouter un membre de Jury</h2>
            
            <p>Veuillez selectionner un enseignant</p>
            <CForm
              method="post"
              id="ajouter-pfe-jury"
              encType="application/json"
              onSubmit={handleSubmit(onSubmit1)}
            >
              <CFormGroup>
                <CSelect name="jury" id="id_jury" innerRef={register}>
                  {enseignants && enseignants.map(enseignant =>{
                    return <option value={enseignant.id} key={enseignant.id}>{enseignant.user.first_name}  {enseignant.user.last_name}</option>
                  })}

                </CSelect> 
                <hr />

                <div>
                  <button className=" btn btn-ghost-dark" type="submit">
                    {" "}
                    +
                  </button>
                </div>
              </CFormGroup>
            </CForm>
          </div>
        </Fade>
      </Modal>
    </div>
  );

}





const MapToState = (state) => ({
  role: state.auth.user.CurrentRoles[0],
  all_role: state.auth.user.CurrentRoles,
});

export default connect(MapToState, null)(PfesDept);
