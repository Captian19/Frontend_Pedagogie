import React, {useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Page1 from "./page1";
import Page2 from "./page2";
import Page3 from "./page3";
import ReactToPrint from "react-to-print";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

function getSteps() {
    return ['Page1', 'Page2', 'Page3'];
}

function GetStepContent(stepIndex, id) {

    const componentRef = useRef();

    switch (stepIndex) {
        case 0:
            return (
                <>
                    <div>
                        <Page1  ref={componentRef} />
                        <ReactToPrint
                            trigger={() => <Button className="btn btn-outline-primary">Imprimer</Button>}
                            content={() => componentRef.current}
                        />
                    </div>
                </>
            )
        case 1:
            return (
                <>
                    <div>
                        <Page2 id_Ac={id} ref={componentRef} />
                        <ReactToPrint
                            trigger={() => <Button className="btn btn-outline-primary">Imprimer</Button>}
                            content={() => componentRef.current}
                        />
                    </div>
                </>
            )
        case 2:
            return (
                <>
                    <div>
                        <Page3 id_Ac={id} ref={componentRef} />
                        <ReactToPrint
                            trigger={() => <Button className="btn btn-outline-primary">Imprimer</Button>}
                            content={() => componentRef.current}
                        />
                    </div>
                </>
            )
        default:
            return 'Unknown stepIndex';
    }
}

export default function HorizontalLabelPositionBelowStepper(props) {
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
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                    <div>
                        <Typography className={classes.instructions}>All steps completed</Typography>
                        <Button onClick={handleReset}>Réinitialisé</Button>
                    </div>
                ) : (
                    <div>
                        <Typography className={classes.instructions}>{GetStepContent(activeStep, props.id_Ac)}</Typography>
                        <div>
                            <Button
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                className={classes.backButton}
                            >
                                Retour
                            </Button>
                            <Button variant="contained" color="primary" onClick={handleNext}>
                                {activeStep === steps.length - 1 ? 'Terminé' : 'Suivant'}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}