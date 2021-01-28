import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Formulaire_Calendrier from './formulaire_calendrier';
import Demarrer_Session from './demarrer_session';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import HourglassEmptySharpIcon from '@material-ui/icons/HourglassEmptySharp';

const useStyles1 = makeStyles((theme) => ({
  paper: {
    padding: '6px 16px',
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

function CustomizedTimeline({state}) {
  const classes = useStyles1();

  return (
      <Timeline align="alternate">
        <TimelineItem>
          <TimelineOppositeContent>
            {state.list_is_getted ? (
                <>
                  <Typography variant="body2" color="textSecondary">
                    début: {state.liste_cal.filter(cal => cal.etat_session === 1)[0].start}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    fin: {state.liste_cal.filter(cal => cal.etat_session === 1)[0].end}
                  </Typography>
                </>
            ):(
                <Typography variant="body2" color="textSecondary">
                  21 Avril 2020
                </Typography>
            )}

          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot>
              <HourglassEmptySharpIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} className={classes.paper}>
              <Typography variant="h6" component="h1">
                Debut phase Inscription
              </Typography>
              <Typography>Ouverture inscription des candidats sur la plateforme</Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent>
            {state.list_is_getted ? (
                <>
                  <Typography variant="body2" color="textSecondary">
                    début: {state.liste_cal.filter(cal => cal.etat_session === 2)[0].end} à 15h00
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    fin: 18h00
                  </Typography>
                </>
            ):(
                <Typography variant="body2" color="textSecondary">
                  15 Juin 2020
                </Typography>
            )}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="primary">
              <HourglassEmptySharpIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} className={classes.paper}>
              <Typography variant="h6" component="h1">
                Jour du concours
              </Typography>
              <Typography>Soumission du relevé possible à partir de ce moment (Espace Candidat)</Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent>
            {state.list_is_getted ? (
                <>
                  <Typography variant="body2" color="textSecondary">
                    début: {state.liste_cal.filter(cal => cal.etat_session === 2)[0].start}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    fin: {state.liste_cal.filter(cal => cal.etat_session === 3)[0].end}
                  </Typography>
                </>
            ):(
                <Typography variant="body2" color="textSecondary">
                  21 Juin 2020
                </Typography>
            )}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="default">
              <HourglassEmptySharpIcon />
            </TimelineDot>
            <TimelineConnector className={classes.secondaryTail} />
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} className={classes.paper}>
              <Typography variant="h6" component="h1">
                Phase finale
              </Typography>
              <Typography>Demarrage correction des copies et Cloture de la soumission (Espace Candidat)</Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent>
            {state.list_is_getted ? (
                <>
                  <Typography variant="body2" color="textSecondary">
                    fin: {state.liste_cal.filter(cal => cal.etat_session === 3)[0].end}
                  </Typography>
                </>
            ):(
                <Typography variant="body2" color="textSecondary">
                  21 Avril 2020
                </Typography>
            )}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="secondary">
              <HourglassEmptySharpIcon />
            </TimelineDot>
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} className={classes.paper}>
              <Typography variant="h6" component="h1">
                Publication résultats
              </Typography>
              <Typography>résultats du concours et établissement de rapport</Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
  );
}





const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function getSteps() {
  return ['Demarrer Session', 'Session Inscription', 'Session Concours', 'Session Finale'];
}

function getStepContent(step, props) {
  switch (step) {
    case 0:
      return <Demarrer_Session new_session={props.state.new_session}
                               handleChangeSess={props.handleChangeSess}
                               handleSubmitSess={props.handleSubmitSess}
                               handleChangeState={props.handleChangeState}
      />;
    case 1:
        return <Formulaire_Calendrier etat_session={1}
                                      calendrier={props.state.calendrier_insc}
                                      iscreated={props.state.calendrier1_is_created}
                                      isupdated={props.state.calendrier1_updated}
                                      handleChangeCal={props.handleChangeIns}
                                      handleSubmitCal={props.handleSubmitCal}
        />;
    case 2:
        return <Formulaire_Calendrier etat_session={2}
                                      calendrier={props.state.calendrier_conc}
                                      iscreated={props.state.calendrier2_is_created}
                                      isupdated={props.state.calendrier2_updated}
                                      handleChangeCal={props.handleChangeConc}
                                      handleSubmitCal={props.handleSubmitCal}
        />;
    case 3:
        return <Formulaire_Calendrier etat_session={3}
                                      calendrier={props.state.calendrier_final}
                                      iscreated={props.state.calendrier3_is_created}
                                      isupdated={props.state.calendrier3_updated}
                                      handleChangeCal={props.handleChangeFin}
                                      handleSubmitCal={props.handleSubmitCal}
        />;
    default:
      return 'Unknown step';
  }
}

export default function Vue_Init_Concours(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(4);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>{getStepContent(index, props)}</Typography><br/><br/>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Terminer' : 'Suivant'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <CustomizedTimeline state={props.state}/>
          <Button onClick={handleReset} className={classes.button}>
            Modifier
          </Button>
        </Paper>
      )}
    </div>
  );
}
