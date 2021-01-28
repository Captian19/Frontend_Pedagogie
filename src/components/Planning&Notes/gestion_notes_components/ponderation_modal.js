import React from 'react';
import TextField from '@material-ui/core/TextField';
import { updatePonderations } from "../../../actions/Planning&Notes/gestion_notes_services";

// For the modal
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
// Form element
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';

// Importing all the icons i need
import Send from '@material-ui/icons/Send';
import Edit from "@material-ui/icons/Edit";
import { makeStyles } from '@material-ui/core/styles';

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

export default function PonderationModal(props) {
    const classes = useModalStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const id_progression = props.id_progression;
    // Ces deux fonctions suivantes servent à ouvrir et à fermer le modal
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const ponderations = JSON.parse(props.progression.ponderations);

    
    const onPonderationChange = (type_evaluation, value) => {
        if (value != "" && !Number.isNaN(parseFloat(value))) {
            for (let index = 0; index < ponderations.length; index++) {
                if (ponderations[index].type_evaluation == type_evaluation) {
                    ponderations[index].ponderation = parseFloat(value);
                }
            }
        }
        else alert("Entrer une valeur correcte.");
    }


    const handleSubmit = async () => {
        var valide = true;
        var sum = 0;
        ponderations.map(ponderation => {
            if (ponderation.ponderation == "" || Number.isNaN(ponderation.ponderation) || ponderation.ponderation > 100 || ponderation.ponderation < 0) {
                alert("Entrer une ponderation valide pour l'" + ponderation.type_evaluation)
                valide = false;
                return;
            }
            sum += ponderation['ponderation'];
        })
        if (sum < 99 || sum > 101){
            alert("La somme de toutes les pondrations doit être égale à 100");
            return;
        }
        if (valide) {
            // alert("C'est OK");
            await updatePonderations(id_progression, ponderations).then(status => {
                if (status < 400) {
                    props.reloadComponent();
                    setOpen(false);
                }
                else alert ("Erreur lors de la sauvegarde de la pondération.");
            })
        }
    }
    const body = (
        <Card style={modalStyle} className={classes.paper}>
            <h4 id="simple-modal-title">Vous êtes entrain de modifier les pondérations</h4>
            <FormControl>
                {ponderations.map((ponderation, index) => {
                    return <TextField name={ponderation.type_evaluation} onChange={(event) => onPonderationChange(ponderation.type_evaluation, event.target.value)} style={{ margin: 10 }} key={index} defaultValue={ponderation.ponderation} id="outlined-basic" label={ponderation.type_evaluation} variant="outlined" />
                })}
                <Button variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<Send />} onClick={handleSubmit}>Valider
                </Button>
            </FormControl>
        </Card>
    );

    return (
        <div>
            <Button className={classes.button} startIcon={<Edit />} color="primary" onClick={handleOpen}>
                Modifier
            </Button>
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