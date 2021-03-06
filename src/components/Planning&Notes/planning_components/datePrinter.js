import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function DatesGrid(props) {
  const classes = useStyles();

  return (
    <div className={classes.root} style={{margin: 30}}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>Début : <b>{props.dateDebut}</b></Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>Fin : <b>{props.dateFin}</b></Paper>
        </Grid>
      </Grid>
    </div>
  );
}
