import React, {  } from 'react';
import {CCard,CCardBody,CCardHeader,CCol} from '@coreui/react'
import CIcon from "@coreui/icons-react"
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width : '95%',
    boxShadow: "1px 1px 80px grey",
    borderRadius : "15px",
  },
  paper: {
    padding: theme.spacing(3),
    margin: 'auto',
    maxWidth: 'auto',
    borderRadius : "15px",
    
  },
  image: {
    width: 412,
    maxHeight: 400,
    boxShadow: "10px 10px 10px grey",
    borderRadius : "15px",
    
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '50%',
    borderRadius : "15px",
    
  },
  flote:{
    right:"15px",
    top:"15px",
    position:"absolute",
    ":hover:after":{
      content:"cet element sera supprime",
      cursor:"hand",
      top:"30px"
    }

  }
   
}));




function Detail(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="img" src="https://geniecivil08.e-monsite.com/medias/files/maison1.jpg" />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={3}>
              <Grid item xs>
                
               
              </Grid>
              <Grid item xs>
                <Typography variant="body2" >
                  <h4>{props.type_stage}</h4>
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography variant="body2" style={{ cursor: 'pointer' }}>
                <CIcon name ='cil-Home'/>  {props.adresse}
                </Typography>
                <Typography variant="body2" style={{ cursor: 'pointer' }}>
                <CIcon name ='cil-Phone'/>  {props.telephone_entreprise}
                
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography variant="body2" >
                <h5> <span className="textSecondary">{props.classe_stage}</span></h5>
                </Typography>
              </Grid>
            </Grid>
            <Grid item md>
                <Typography variant="subtitle1" color="textSecondary">
                    <h1>{props.nom_entreprise}</h1>
                </Typography>
            </Grid>
            <Grid item >
                <Typography variant="subtitle1" color="textPrimary">
                    <button className="btn btn-danger" onClick={props.supprimer}>Supprimer</button>
                </Typography>
            </Grid>
            
            </Grid>

          </Grid>
          <Grid item md={12}>
                <Typography variant="subtitle1" color="textPrimary">
                  <Link to={{pathname:`/enseignant/entreprises/single/${props.slug}/postulants`} }>
                  
                    <button className="btn btn-pill btn-link" >Voir Postulants</button>
                    </Link>
                </Typography>
        </Grid>
      </Paper>
    </div>
  );
}



const styles = {

      right:"15px",
      top:"15px",
      position:"absolute",
      "&::before":{
        content:"X--",
        cursor:"hand",
        top:"300px"
      }
}


// composant qui retourne les cases individuelles des stagiaires
function Stage(props){
    
    return (
        <>
    
        <CCol xs="12" sm="6" md="4">
          <Link style={{textDecoration:'none', color:'grey'}} to={{pathname:`/enseignant/entreprises/single/${props.slug}/stage/edit/${props.numero}`} }>
            <CCard>
            <CCardHeader>
              <div style={{width:'40px', height:'40px'}} className="mb-2">
                <img src="https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png" alt="profile" style={{width:'100%', height:'100%'}}/>
              </div>

              <div style={styles} >
                <button className="btn-pill btn-outline-primary " onClick={props.delete_stage}>edit</button>
                </div>
              <h5>{props.prenom} {props.nom}</h5>
            </CCardHeader>
            <CCardBody>
            <Typography variant="body2" >Stage numero : <span style={{fontWeight:'bold'}}>  {props.numero}</span></Typography>
                <Typography variant="body2" >
                  {props.classe && 
                  <div>
                   Classe : <span style={{fontWeight:'bold'}}> {props.classe}</span>
                  </div>
                }
                </Typography>
                


                <Typography variant="body2" ><span style={{fontWeight:'bold'}}> {props.genie} </span></Typography>
                

                {props.debut_stage && <Typography variant="body2" >Debut : {props.debut_stage}</Typography>}
                {props.fin_stage && <Typography variant="body2" >Fin : {props.fin_stage}</Typography>}
                
            </CCardBody>
            </CCard>
            </Link>
        </CCol>
      </>


    )
}



export {Stage, Detail};