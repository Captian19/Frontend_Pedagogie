import React, {  } from 'react';
import {CCard,CCardBody,CCardHeader,CCol} from '@coreui/react'
import { Link, Redirect,useHistory, useLocation } from 'react-router-dom';

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
  },
  paper: {
    padding: theme.spacing(3),
    margin: 'auto',
    maxWidth: 'auto',
    
  },
  image: {
    width: 412,
    maxHeight: 400,
    boxShadow: "10px 10px 10px grey",
    
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '50%',
    
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
                  <h4>{props.domaine}</h4>
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography variant="body2" style={{ cursor: 'pointer' }}>
                Adresse : {props.adresse}
                </Typography>
                <Typography variant="body2" style={{ cursor: 'pointer' }}>
                Telephone: {props.telephone_entreprise}
                
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography variant="body2" >
                <h5> <span className="textSecondary">Classe : {props.classe_stage}</span></h5>
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
      </Paper>
    </div>
  );
}




function Stage(props){

    return (
        <>
    
        <CCol xs="12" sm="6" md="4">
          <Link style={{textDecoration:'none', color:'grey'}} >
            <CCard>
            <CCardHeader>
                <h5>{props.nom}</h5>
            </CCardHeader>
            <CCardBody>
                <Typography variant="body2" >
                  {props.classe && 
                  <div>
                Classe : <span style={{fontWeight:'bold'}}> {props.classe}</span>
                </div>
                }
                </Typography>
                


                <Typography variant="body2" ><span style={{fontWeight:'bold'}}> {props.genie} </span></Typography>
                <Typography variant="body2" >Stage numero : <span style={{fontWeight:'bold'}}>  {props.numero}</span></Typography>

                {props.date_debut_stage && <Typography variant="body2" >Domaine {props.date_debut_stage}</Typography>}
                {props.date_fin_stage && <Typography variant="body2" >Domaine {props.date_fin_stage}</Typography>}
                {/* Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. */}
            </CCardBody>
            </CCard>
            </Link>
        </CCol>
       
      

      </>


    )
}



export {Stage, Detail};