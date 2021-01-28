import React from 'react';
import TextField from '@material-ui/core/TextField';
import { changeNoteFinale, updatePonderations } from "../../../actions/Planning&Notes/gestion_notes_services";

// For the modal
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
// Form element
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';

// Importing all the icons i need
import Send from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
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
        margin: theme.spacing(2),
    },
}));

export default function NoteFinaleModal(props) {
    const classes = useModalStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [note_finale, setNoteFinaleState] = React.useState(props.data.note_finale)
    // Ces deux fonctions suivantes servent à ouvrir et à fermer le modal
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onNoteChange = (value) => setNoteFinaleState(value);

    const handleSubmit = async () => {
        if (isNaN(parseFloat(note_finale)) || note_finale < 0 || note_finale > 20) alert('Entrer une note valide');
        else {
            await changeNoteFinale(props.data.id_note, note_finale).then(status => {
                if (status < 400) props.change_note(note_finale);
                else alert("Problème de communication avec le serveur.")
            })
            handleClose();
        }
    }
    const body = (
        <Card style={modalStyle} className={classes.paper}>
            <h5 id="simple-modal-title">Entrer la nouvelle note finale de {props.data.prenom} {props.data.nom} en {props.data.ec}.</h5>
            <FormControl>
                <TextField name="note_finale" onChange={(event) => onNoteChange(event.target.value)} style={{ margin: 10 }} defaultValue={note_finale} id="outlined-basic" label="Nouvelle Note Finale" variant="outlined" />
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
            {/* <IconButton onClick={handleOpen}>
                <Edit color="secondary" />
            </IconButton> */}
            <h6 onClick={handleOpen} >{note_finale}</h6>
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