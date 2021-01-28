import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Description, InsertDriveFile, Receipt} from "@material-ui/icons";
import OrdonnancementBC from "./ordonnancementBC";
import {Card} from "@material-ui/core";
import {CardBody, Col, Row} from "reactstrap";
import EngagementBC from "./engagementBC";
import LiquidationBC from "./liquidationBC";

// style definition


const ColorlibConnector = withStyles({
    alternativeLabel: {
        top: 22,
    },
    active: {
        '& $line': {
            backgroundImage:
                'linear-gradient( 95deg,rgb(73, 156, 84) 0%,rgb(73, 156, 84) 50%,rgb(73, 156, 84) 100%)',
        },
    },
    completed: {
        '& $line': {
            backgroundImage:
                'linear-gradient( 95deg,rgb(73, 156, 84) 0%,rgb(73, 156, 84) 50%,rgb(73, 156, 84) 100%)',
        },
    },
    line: {
        height: 3,
        border: 0,
        backgroundColor: '#eaeaf0',
        borderRadius: 1,
    },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
    root: {
        backgroundColor: '#ccc',
        zIndex: 1,
        color: '#fff',
        width: 50,
        height: 50,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    active: {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
    completed: {
        backgroundImage:
            'linear-gradient( 95deg,rgb(73, 156, 84) 0%,rgb(73, 156, 84) 50%,rgb(73, 156, 84) 100%)',
    },
});

function ColorlibStepIcon(props) {
    const classes = useColorlibStepIconStyles();
    const { active, completed } = props;

    const icons = {
        1: <Description />,
        2: <InsertDriveFile />,
        3: <Receipt />,
    };

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
                [classes.completed]: completed,
            })}
        >
            {icons[String(props.icon)]}
        </div>
    );
}

ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     */
    active: PropTypes.bool,
    /**
     * Mark the step as completed. Is passed to child components.
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

function getSteps() {
    return ['Engagement', 'Liquidation', 'Ordonnancement'];
}

function getStepContent(step, id) {
    switch (step) {
        case 0:
            return <EngagementBC id_Bc={id}/>;
        case 1:
            return <LiquidationBC id_Bc={id}/>;
        case 2:
            return <OrdonnancementBC id_Bc={id}/>;
        default:
            return 'Unknown step';
    }
}

export default function MandatupdateBC(props) {
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
        <>
            <div className='content'>
                <Row>
                    <Col xs={12}>


                                <div className={classes.root}> <Card>
                                    <CardBody>
                                    <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
                                        {steps.map((label) => (
                                            <Step key={label}>
                                                <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                                            </Step>
                                        ))}
                                    </Stepper>
                                        </CardBody>
                                  </Card>
                                    <div>
                                        {activeStep === steps.length ? (
                                            <div>
                                                <Typography className={classes.instructions}>
                                                    Toutes les étapes sont terminées
                                                </Typography>
                                                <Button onClick={handleReset} className={classes.button}>
                                                    Réinitialisé
                                                </Button>
                                            </div>
                                        ) : (
                                            <div>
                                                <Typography className={classes.instructions}>{getStepContent(activeStep, props.match.params.id_Bc)}</Typography>
                                                <div>
                                                    <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
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
                                        )}
                                    </div>
                                </div>

                    </Col>
                </Row>

            </div>
        </>
    );
}