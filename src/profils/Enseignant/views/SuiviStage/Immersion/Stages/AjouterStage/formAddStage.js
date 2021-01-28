import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { withStyles } from "@material-ui/core/styles";
import axios from 'axios';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

import {CCol,CForm,CFormGroup,CLabel,CSelect} from '@coreui/react'

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);





function Formulaire(props) {


   
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="secondary" onClick={handleClickOpen}  style={{float:'right'}}>
       + Stagiaire
      </Button>
     
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Ajouter un stagiaire à l'entreprise <span style={{ color : "red"}} >{props.entreprise}</span> 
        </DialogTitle>
        <DialogContent dividers>


        <CCol xs="10" style={{maxWidth:"70%"}}>
          <ChoisirStagiaire
              genie={props.genie}
              classe={props.classe}
              slug={props.slug}
              clickLoad = {props.clickLoad}
          />
        </CCol>

          <Typography gutterBottom color='primary'>
            Selectionnez un etudiant pour lui attribuer un stage dans cette entreprise
          </Typography> 

        </DialogContent>
        <DialogActions>
         ®  Ecole Polytechnique de Thies
        </DialogActions>
      </Dialog>
    </div>
  );
}



//composant qui remplit les options dans Select
function ChoisirStagiaire({slug, clickLoad}){
    const {register, handleSubmit, formState} = useForm({})
    const {isSubmitting} = formState

    const[, setGenie] = useState([])
    const getListGenie = () =>{
      axios.get(`https://users-ent.herokuapp.com/api/departements`)
      .then((res)=>{
          // console.log(res.data);
          setGenie(res.data);
      })
      .catch(e => console.log(e))
    }


    const[classe, setClasse] = useState([])
    const getListClasse = () =>{
      axios.get(`https://users-ent.herokuapp.com/api/classes`)
      .then((res)=>{
        setClasse(res.data);
      })
      .catch(e => console.log(e))
    }

    useEffect(()=>{
      getListGenie(); 
      getListClasse();
    },[])


    const onSubmit1 = (data) => {
        refresh(data);
        console.log('data', data);
        cancelCourse();
    }

    const cancelCourse = () => { 
        document.getElementById("create-stage-form").reset();
    }


    const onSubmit = (data) => {
      getEtudiants(data.classe,'GIT');
    }

    // pour obtenir la liste des etudiants pouvant postuler aux stages de l'entreprise
    const [etudiants,setEtudiants] = useState([])
    const getEtudiants = (clas, dept) =>{
        axios.get(`http://users-ent.herokuapp.com/api/auth/ETUDIANT/${clas}/${dept}/`)
        .then(res => {
          setEtudiants(res.data);
        })
        .catch(e => console.log(e))
    }



    const refresh = async (data) =>{
        const today = new Date().getFullYear().toString()
        data['stagiaire'] = parseInt(data['stagiaire']);
        data['entreprise'] = slug;
        data['annee_stage'] = today;
        data['stage_git'] = true;
        await axios.post(`http://localhost:8000/api/stage/entreprises/${slug}/stages/`, data)
        .then(() => {
          clickLoad()   //pour rafraichir les donnees
        })
        .catch(err => console.log(err));
    }


    return(
        <>

            <form className="mb-2" onSubmit={handleSubmit(onSubmit)} id="form-add-stagiaire">
                    <div className="row">
                    <div className="col-md-4">
                            <div className="form-group">
                            <select className="form-control" name="classe" ref={register}>
                            {classe.map(cla => <option value={cla['niveau']} key ={cla['id']}>{cla['niveau']}</option>)}
                            </select>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="form-group">
                            <select className="form-control" name="departement" ref={register}>
                              <option value='GIT'>GIT</option>
                            </select>
                            </div>
                        </div>
                       
                        <div className="col-md-3">
                            <button type="submit" className="btn btn-primary">Rechercher</button>
                        </div>
                    </div>
                </form>


        



            <CForm method="POST"  id="create-stage-form"  encType="application/json" onSubmit={handleSubmit(onSubmit1)}>
            {etudiants.length > 0 ?
                    
                    <>
                <CFormGroup>
                    <CLabel htmlFor="stagiaire">Effectif : {etudiants.length}</CLabel>

                       
                   
                        <CSelect
                          type="text"
                            id="stagiaire"
                            name="stagiaire"
                            innerRef={register({required: true})}
                            >
                        
                                {etudiants.map((eleve) =>{
                                    if(eleve){
                                      return <option value={eleve.id} key={eleve.id}>{eleve.user.first_name}  {eleve.user.last_name}</option>
                                    }     
                                })}
                        </CSelect>
                   
                   
                </CFormGroup>
            
                <CFormGroup>
                    <div >
                        <button type='submit' className='btn btn-pill-success' disabled={isSubmitting} onClick={clickLoad}>valider</button>
                    </div>
                </CFormGroup>  

            </>

                    : <h2>Aucun etudiant</h2>
            }                       
        </CForm>

        </>
    )
}





export default Formulaire;