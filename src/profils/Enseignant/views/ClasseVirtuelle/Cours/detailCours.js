// Ce composant affiche l'ensemble des publications d'un cours donné publication.
// On y trouve également le formulaire permettent de poster de nouvelle publication ou annonce


import React,  { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import PosterFile from './posterFile';
import Publication from './publication';
import axios from 'axios';
import {connect} from "react-redux";
import welcome from "../../../../../img/bienvenue.png";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    minHeight: 20,
    alignItems: 'flex-start',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    alignSelf: 'flex-end',
  },
}));

const DetailCours = (props) => {
  const [cours, setCours] = useState(null)
  const [prof, setProf] = useState(24)
  const [is_getted, setIsGetted] = useState(false)
  const [prof_is_getted, set_prof_bool] = useState(false)
  const [reloader, setReloaderState] = React.useState(false)

  // Recharger uniquement le component publication lors d'une nouvelle publication 
  const reloadComponent = () => {
    setReloaderState(!reloader)
  };
    const config = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${props.token}`
    },
}

// Recupération d'un cours donné grâce à son identifaint (id) et à celui du professeur correspondant
  const getCours = (id) => {
    axios.get(`http://localhost:8000/cours_virtuel/${id}`)
        .then(res => {
          setCours(res.data);
          axios.get(`https://users-ent.herokuapp.com/api/auth/users/${res.data.id_prof}`, config)
               .then(res => { 
                 setProf(res.data);
                 set_prof_bool(true)
                })
               .catch(err => console.log(err))
          setIsGetted(true);
        })
  }

  useEffect(() => {
    getCours(window.location.href.split("/")[window.location.href.split("/").length -1]);
  },[])
  const classes = useStyles();
  console.log(window.location.href.split("/")[window.location.href.split("/").length -1])
  return (
    <div className={classes.root}>
    {is_getted ? (

      <AppBar position="static" class="text-white bg-dark p-2 rounded">
        <Toolbar className={classes.toolbar}>

          <Typography className={classes.title} variant="h4" color="blue"  noWrap>
            {cours.ec.nom}</Typography>
            {prof_is_getted ? (
              <Typography className = {classes.AppBar} variant= "subtitle2">{prof.first_name}  {prof.last_name}</Typography>
            ):(
              <Typography className = {classes.AppBar} variant= "subtitle2">nom professeur</Typography>
            )}
          
          <IconButton aria-label="display more actions" edge="end" color="inherit">
            <MoreIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    ):(

      <AppBar position="static" class="text-white bg-dark p-2 rounded">
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h4" color="blue"  noWrap>
            Apprentissage</Typography>
          <Typography className = {classes.AppBar} variant= "subtitle2">Default Prof</Typography>
          <IconButton aria-label="search" color="inherit">
            <SearchIcon />
          </IconButton>
          <IconButton aria-label="display more actions" edge="end" color="inherit">
            <MoreIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    )}
      
      <div className="row">
      <div className="col-md-3">
      <div className="card m-3"><img src={welcome}/></div>
      </div>
      <div className="col-md-9">
      {is_getted ? (
        <PosterFile cours={props.cours} reloadComponent={reloadComponent} />
      ):(
        "Pas de cours"
      )}
      

      
      <Publication reloader={reloader} />
      </div>
      </div>
      
    </div>
  );
}

const mapStateToProps = state => ({
  token: state.auth.token,
  roles: state.auth.user.CurrentRoles
})

export default connect(mapStateToProps,null)(DetailCours);
