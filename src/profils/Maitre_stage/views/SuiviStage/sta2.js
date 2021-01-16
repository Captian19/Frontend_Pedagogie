import React from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import { withStyles } from "@material-ui/core/styles";
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';


import {CForm,CFormGroup,CLabel,CTextarea,CInput} from '@coreui/react'


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    marginBottom: '2em',
    marginTop:'1em'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },

  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },


}));




//=====================================================================================================
const styles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });



const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });



const DialogContent = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);
  
  const DialogActions = withStyles((theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
  }))(MuiDialogActions);



//============================================FIN=========================================================




export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [expanded2] = React.useState(false);
  const handleAprreciate = () =>{
      setExpanded(!expanded2);
  };


const [open1, setOpen1] = React.useState(false);

const handleOpen1 = () => {
    setOpen1(true);
};

const handleClose1 = () => {
    setOpen1(false);
};




//=====================================================================================================

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

//=====================================================================================================

const {register, handleSubmit} = useForm({
    mode:"onSubmit",
})

const cancelCourse = () => { 
    document.getElementById("create-stage-form").reset();
    refreshPage();
}

function refreshPage() {
    window.location.reload(false);
}

const onSubmit = (data) => {
    refresh(data);
    console.log('data', data);
    cancelCourse();
}

const cancelCourse1 = () => { 
    document.getElementById("create-note-form").reset();
    refreshPage();
}
const onSubmit1 = (data) => {
    console.log(data);
    cancelCourse1();
    noterStage(data);
}






const refresh =  (data) =>{
    axios.post(`http://localhost:8000/api/stage/entreprises/stages/maitre_stage/stagiaire/apprecier/${props.lien}/`, data)
    .then((res) => {
        console.log('res.data',res.data);
        
    })
    .catch(err => console.log(err));
}


const noterStage = (data) =>{
    axios.put(`http://localhost:8000/api/stage/entreprises/stages/maitre_stage/stagiaire/noter/${props.lien}/`, data)
    .then(() => {
        alert("la note a été ajouté")
    })
    .catch(e => console.log(e))
    
}


  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {props.logo}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings"  color="primary" onClick={handleClickOpen}>
            <span style={{fontSize:'12px'}}> + Appreciations </span>
          </IconButton>
        }
        title={props.nom_stagiaire}
        subheader={props.debut}
      />
     
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          This impressive paella is a perfect party dish and a fun meal to cook together with your
          guests. Add 1 cup of frozen peas along with the mussels, if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites"   onclick={handleAprreciate} aria-expanded={expanded2}>
          {props.classe} - {props.genie}
        
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Appreciations:</Typography>
          
          {props.appreciations.map( function (item, index) {
                  return <div style= {{color:'grey', fontStyle:'italic'}}>
                         <Typography paragraph key={index}> 
                            {String(item['appreciations'])}
                        </Typography>
                      </div>;
              })   
          }
        </CardContent>
      </Collapse>


    <div>
      <button type="button" onClick={handleOpen1} className="btn btn-sm btn-link">
          Noter le Stage
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
            <h2 id="transition-modal-title">Noter le stage</h2>
            <p id="transition-modal-description"><u>NB</u> : A rappeler que ceci est la note globale du stage de l'étudiant</p>
            <p id="transition-modal-description">Mieux vaut la definr à la fin du Stage</p>

            <CForm action="_method=PUT" method="post"  id="create-note-form" encType="application/json" onSubmit={handleSubmit(onSubmit1)}>
                <CFormGroup>
                    <CInput
                        type="number"
                        name= "note_stage"
                        id="note_stage"
                        placeholder="Note..."
                        innerRef = {register({required:true})}
                    />

                    <div>
                        <button  className=" btn btn-success" type = "submit"> valider</button>
                    </div>
                </CFormGroup>


            </CForm>

          </div>
        </Fade>
      </Modal>
    </div>



      

      {/* //dialog appreciations formulaire */}
      <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Votre impression de la semaine sur le travail de <span style={{fontStyle:"italic", color:"grey"}}>{props.nom_stagiaire} </span>
        </DialogTitle>
        <DialogContent dividers>
          

          <CForm method="POST"  id="create-stage-form" encType="application/json" onSubmit={handleSubmit(onSubmit)}>
          <CFormGroup>
                  <CLabel htmlFor="appreciations">Impression</CLabel>
                  <CTextarea
                    style={{maxWidth:"100%", height:"150px"}}
                    type="text"
                    id="appreciations"
                    name="appreciations"
                    placeholder="Appreciations..."
                    innerRef={register({required: true})}
                  />
        
            </CFormGroup>
                <div className="">
                <button type='submit' className='btn btn-default' >OK</button>
                </div>
            </CForm>
          
        </DialogContent>
        <DialogActions>
         
        </DialogActions>
      </Dialog>
    </div>
    </Card>
  );
}
