import React, {useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Bordereau from "./bordereau/bordereau";
import MandatUpload from "./Piece_jointe/MandatUpload";
import AvisCreditUpload from "./Piece_jointe/AvisCreditUpload";
import BordereauUpload from "./Piece_jointe/BordereauUpload";
import AvisCreditPrint from "./avis_de_credit/AvisCredit";
import Mandat from "./mandat/Mandat";
import ReactToPrint from "react-to-print";
import "./mandat/print.css"

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
    return ['Mandat', 'Avis de Credit', 'Bordereau'];
}

function GetStepContent(step,id) {
    const componentRef = useRef();
    switch (step) {
        case 0:
            return (
                <>
                    <div>
                        <Mandat id_Ac={id} ref={componentRef} />
                        <ReactToPrint
                            trigger={() => <Button className="btn btn-outline-primary">Imprimer</Button>}
                            content={() => componentRef.current}
                        />
                    </div>
                    <MandatUpload id_Ac={id}/>
                </>
            )
        case 1:
            return (
                <>
                    <div>
                        <AvisCreditPrint id_Ac={id} ref={componentRef} />
                        <ReactToPrint
                            trigger={() => <Button className="btn btn-outline-primary">Imprimer</Button>}
                            content={() => componentRef.current}
                        />
                    </div>
                    <AvisCreditUpload id_Ac={id}/>
                </>
            )
        case 2:
            return (
                <>
                    <Bordereau id_Ac={id}/>
                    <BordereauUpload id_Ac={id}/>
                </>
            )
        default:
            return 'Unknown step';
    }
}

export default function Ordonnancement(props) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
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
                            <Typography>{GetStepContent(index,props.id_Ac)}</Typography>
                            <div className={classes.actionsContainer}>
                                <div>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        className={classes.button}
                                    >
                                        Retour
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        className={classes.button}
                                    >
                                        {activeStep === steps.length - 1 ? 'Terminé' : 'Suivant'}
                                    </Button>
                                </div>
                            </div>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} className={classes.resetContainer}>
                    <Typography>Toutes les étapes sont terminées</Typography>
                    <Button onClick={handleReset} className={classes.button}>
                        Réinitialisé
                    </Button>
                </Paper>
            )}
        </div>
    );
}