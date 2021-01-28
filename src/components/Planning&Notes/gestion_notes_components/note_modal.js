import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
// For the modal
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
// Form element
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';

// Importing all the icons i need
import Send from '@material-ui/icons/Send';
import Edit from "@material-ui/icons/Edit";


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

export default function NoteModal(props) {
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
    const row = props.note;
    const id_note = row._id;
    var notes = JSON.parse(row.notes);

    const onNoteChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        for (let index = 0; index < notes.length; index++) {
            if (notes[index].type_evaluation == name) {
                notes[index].note = parseFloat(value);
                return;
            }

        }
        // notes.append({
        //     type_evaluation: name,
        //     note: value
        // });

    }

    const handleSubmit = async () => {
        var valide = true;
        notes.map(note => {
            if (note.note == "" || Number.isNaN(note.note) || note.note > 20 || note.note < 0) {
                alert("Entrer une note valide pour l'" + note.type_evaluation)
                valide = false;
            }
        })
        if (valide) {
            // alert("C'est OK");
            await axios.put("http://localhost:8000/api/notes/note/modifier/" + id_note + "/", {note: notes}).then(response => {
                if (response.status < 400) {
                    props.reloadComponent();
                    setOpen(false);
                }
            })
        }
    }

    const body = (
        <Card style={modalStyle} className={classes.paper}>
            <h4 id="simple-modal-title">Vous êtes en train de modifier les notes de <b>{props.eleve.first_name + " " + props.eleve.last_name}</b></h4>
            <FormControl>
                {notes.map((note, index) => {
                    return <TextField name={note.type_evaluation} onChange={onNoteChange} style={{ margin: 10 }} key={index} defaultValue={note.note} id="outlined-basic" label={note.type_evaluation} variant="outlined" />
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