import React, { Component } from "react";

import {
    CCard,
  } from '@coreui/react';


  import { makeStyles } from '@material-ui/core/styles';
  import AppBar from '@material-ui/core/AppBar';

  import Ajout_Candidat from "../../../../components/moduleConcours/candidat/ajout_candidat";
  
  const useStyles = makeStyles((theme) => ({
      root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
      },
    }));
    
  const Header = function() {
      const classes = useStyles();
    
      return (
        <div className={classes.root}>
          <AppBar position="static">
              <center><h2>Formulaire Candidat</h2></center> 
          </AppBar>
        </div>
      );
}


class View_Ajout_Candidat extends Component {
    render(){
        return(
            <CCard>
                <Header />
                <Ajout_Candidat />
            </CCard>
        );
    }
}

export default View_Ajout_Candidat;