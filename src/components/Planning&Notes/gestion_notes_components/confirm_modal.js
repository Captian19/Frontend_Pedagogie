import React from 'react';
import { deleteEvaluation } from "../../../actions/Planning&Notes/gestion_notes_services";

// For the modal
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
// Form element
import Button from '@material-ui/core/Button';

// Importing all the icons i need
import Send from '@material-ui/icons/Send';
import Cancel from '@material-ui/icons/Cancel';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Grid } from '@material-ui/core';

// Styling part !
function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${50}%`,
        left: `${50}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useModalStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    button: {
        margin: theme.spacing(1),
    },
}));

export default function ConfirmModal(props) {
    const classes = useModalStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    // Ces deux fonctions suivantes servent à ouvrir et à fermer le modal
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async () => {
        await deleteEvaluation(props.id_progression, props.type_evaluation).then(status => {
            if (status < 400) {
                alert("Evaluation Supprimée.");
                handleClose();
                props.reloadComponent();
            }
            else alert("Erreur lors de la suppression.")
        })
    }

    const body = (
        <Card style={modalStyle} className={classes.paper}>
            <h4 id="simple-modal-title">Voulez-vous réellement supprimer toutes les notes de l'{props.type_evaluation}</h4>
            <Grid container spacing={3} >


                <Grid item sm={6} >
                    <Button variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<Cancel />} onClick={handleClose}>Annuler
                    </Button>
                </Grid>
                <Grid item sm={6} >
                    <Button variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<Send />} onClick={handleSubmit}>Valider
                    </Button>
                </Grid>
            </Grid>

        </Card>
    );

    return (
        <div>
            <IconButton onClick={handleOpen}>
                <DeleteForeverIcon />
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}