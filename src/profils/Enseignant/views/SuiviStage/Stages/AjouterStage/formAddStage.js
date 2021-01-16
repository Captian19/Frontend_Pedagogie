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

import {
    CCol,
    CForm,
    CFormGroup,
    CLabel,
    CSelect} from '@coreui/react'

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
      <Button variant="outlined" color="secondary" onClick={handleClickOpen}  style={{right:'10px', bottom:'10px', position:'absolute'}}>
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
          />
        </CCol>

          <Typography gutterBottom color='primary'>
            Selectionnez un etudiant pour lui attribuer un stage dans cette entreprise
          </Typography> 

        </DialogContent>
        <DialogActions>
         ® Copyright EPT
        </DialogActions>
      </Dialog>
    </div>
  );
}



//composant qui remplit les options dans Select
function ChoisirStagiaire({classe, genie,slug}){
    const {register, handleSubmit} = useForm({})

    useEffect(()=>{
        getEtudiants();
        
    },[])


    const onSubmit = (data) => {
        refresh(data);
        console.log('data', data);
        cancelCourse();
    }

    const cancelCourse = () => { 
        document.getElementById("create-stage-form").reset();
        refreshPage();
    }

    function refreshPage() {
        window.location.reload(false);
    }

    // pour obtenir la liste des etudiants pouvant postuler aux stages de l'entreprise
    const [etudiants,setEtudiants] = useState([])
    const getEtudiants = () =>{
        axios.get(`http://localhost:8000/api/stage/entreprises/etudiants/${classe}/${genie}`)
        .then(res => setEtudiants(res.data))
        .catch(e => console.log(e))
    }

    const refresh = async (data) =>{
        data['stagiaire'] = parseInt(data['stagiaire']);
        data['entreprise'] = slug;
        await axios.post(`http://localhost:8000/api/stage/entreprises/${slug}/stages/`, data)
        .then((res) => {
            console.log('res.data',res.data);
        })
        .catch(err => console.log(err));
    }


    return(
        <>
        <p>Il y a {etudiants.length} etudiants de la classe {classe}-{genie}</p>



            <CForm method="POST"  id="create-stage-form"  encType="application/json" onSubmit={handleSubmit(onSubmit)}>
                <CFormGroup>
                    <CLabel htmlFor="stagiaire">Stagiaire</CLabel>
                    {etudiants.length > 0 ?
                    <>
                        <CSelect
                          type="text"
                            id="stagiaire"
                            name="stagiaire"
                            innerRef={register({required: true})}
                            >
                        
                                <option value="3">selectionner</option>
                                {etudiants.map((eleve) =>{
                                    if(eleve.etudiant){
                                      return <option value={eleve.etudiant && eleve.etudiant_id} key={eleve.etudiant && eleve.etudiant.id}>{eleve.etudiant && eleve.etudiant.username}</option>
                                    }
                                        
                                })}
                            
                            
                        </CSelect>
                        
                        
                    </>
                    : <h6>aucun etudiant</h6>
                    }  
                   
            </CFormGroup>
            
            <CFormGroup>
                    <div >
                        <button type='submit' className='btn btn-pill-success' >valider</button>
                    </div>
            </CFormGroup>
                       
        </CForm>


        
        </>
    )
}





export default Formulaire;