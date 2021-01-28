import React, { Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TableCell from '@material-ui/core/TableCell';
import Card from '@material-ui/core/Card';
import { convertIdCourseToLibelle, getProfFromId } from '../../../actions/Planning&Notes/planning_functions';
// Form element
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { IconButton, MenuItem } from "@material-ui/core";

// Importing all the icons i need
import DeleteIcon from '@material-ui/icons/Delete';
import Send from '@material-ui/icons/Send';

import AddIcon from '@material-ui/icons/Add';

// Importing colors
import { red, blueGrey } from '@material-ui/core/colors';

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

const useStyles = makeStyles((theme) => ({
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

class ReSeanceCell extends Component {
    constructor(props) {
        super(props);
        this.id = props.id;
        this.state = {
            cours: "",
            duree: "",
            prof: "",
            active: true,
            courses: props.courses,
            profs: props.profs
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.activeChanger = this.activeChanger.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
        this.changedCells = [];

    }

    // Function for changing the status of this SeanceCell by displaying it or not
    activeChanger() {
        /**
         * After the component mounts, we will proceed to this following steps:
         * First we look in all the cells that has to hange
         * If this Seancecell is in this array, we change the state
         */
        const cells_to_change = this.props.cells_to_change;
        for (var i = 0; i < cells_to_change.length; i++) {
            if (cells_to_change[i] === this.id) {
                this.setState(state => ({
                    active: !state.active,
                }));
                this.props.resetCellsToChange();
            }
        }
    }

    handleSubmit(values) {
        /**
         * The role of this function is to set the informations about the current course
         * After that it will tell to the parent the cells to change for a span
         */
        this.setState(
            values,
        );
        this.setState(state => (
            {
                duree: parseInt(state.heureFin) - parseInt(this.props.heureDebut),
            }
        )
        );
        const duree = parseInt(values.heureFin) - parseInt(this.props.heureDebut)
        const jour = this.props.jour;
        const heureDebut = this.props.heureDebut;

        var cells_to_change = [];
        if (duree > 1) {
            for (var i = heureDebut + 1; i < heureDebut + duree; i++) {
                var id_cell = jour + i
                cells_to_change.push(id_cell);
            }
        }
        this.props.cellChanger(cells_to_change, this.props.id);
        this.changedCells = cells_to_change;
        this.props.addSeance(
            {
                cours: values.cours,
                prof: values.prof,
                jour: this.props.jour,
                heureDebut: this.props.heureDebut,
                duree: parseInt(values.heureFin) - parseInt(this.props.heureDebut),
            }
        )
    }

    componentDidUpdate() {
        this.activeChanger();
    }

    deleteCourse() {
        this.setState({
            cours: "",
            duree: 0,
            prof: "",
            // active: true
        });
        this.props.cellChanger(this.changedCells, this.props.id);
        this.props.deleteSeance(this.props.id)
    }

    handleView() {
        /*
        Fetching the values of the cell and telling the parent the cells to change
        
        The role of this function is to set the informations about the current course
        After that it will tell to the parent the cells to change for a span
        */
        const values = this.props.seance;
        // console.log(values);

        if (values != null) {
            this.setState(
                values,
            );
            const duree = values.duree;
            const jour = values.jour;
            const heureDebut = values.heureDebut;

            var cells_to_change = [];
            if (duree > 1) {
                for (var i = parseInt(heureDebut) + 1; i < parseInt(heureDebut) + parseInt(duree); i++) {
                    var id_cell = jour + i

                    cells_to_change.push(id_cell);
                }
            }
            console.log("Mon id", this.props.id);

            this.props.cellChanger(cells_to_change, this.props.id);
            this.changedCells = cells_to_change;
            this.props.addSeance(
                {
                    cours: values.cours,
                    prof: values.prof,
                    jour: this.props.jour,
                    heureDebut: this.props.heureDebut,
                    duree: parseInt(values.heureFin) - parseInt(this.props.heureDebut),
                }
            )
        }

    }

    componentDidMount() {
        this.handleView();
    }


    render() {
        const active = this.state.active;
        return (
            active ? // If this cell is active, we display it
                this.state.cours === "" ?
                    <TableCell key={this.props.className}>
                        <SeanceModal courses={this.props.courses} profs={this.props.profs} handleSubmit={this.handleSubmit} jour={this.props.jour} heureDebut={this.props.heureDebut} taken_cells={this.props.taken_cells} />
                    </TableCell>
                    :
                    <TableCell rowSpan={this.state.duree} style={this.state.cours ? { backgroundColor: blueGrey[90], borderWidth: 1, borderStyle: "inset", borderBottomColor: red, borderTopWidth: 2, borderTopStyle: 'dashed', } : {}}>
                        <div>
                            <center>
                                {convertIdCourseToLibelle(this.props.courses, this.state.cours)}
                            </center>
                            <center style={{ fontStyle: "italic" }}>
                                {getProfFromId(this.props.profs, this.state.prof)}
                            </center>
                            <center>
                                Duree: {this.state.duree + " heure(s)"}
                            </center>
                            <center>
                                <IconButton onClick={this.deleteCourse} color="secondary" >
                                    <DeleteIcon />
                                </IconButton>
                            </center>
                        </div>
                    </TableCell>
                : // else we hide it
                null
        );
    }
}

function SeanceModal(props) {
    const classes = useStyles();
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

    var seance = {} // Ce dictionnaire contiendra toutes les informations relatives à la seance

    seance['heureDebut'] = props.heureDebut // On assigne l'heure de début de la séance passée par les props
    var handleChange = (e) => {
        let target = e.target;
        seance[target.name] = target.value;
        // console.log(target.name, target.value);
    };

    var handleSubmit = (e) => {
        if (parseInt(props.heureDebut) >= 8 && seance.heureFin < 13 && seance.prof != undefined && seance.cours.length > 0) {
            props.handleSubmit(seance);
            handleClose();
        }

        else if (parseInt(props.heureDebut) >= 15 && seance.heureFin < 20 && seance.prof != undefined && seance.cours.length > 0) {
            props.handleSubmit(seance);
            handleClose();
        }

        else alert("Veuillez remplir correctement les champs!");

        e.preventDefault();
    };

    var heuresPossibles = () => {
        var array = [];
        for (let i = props.heureDebut + 1; i <= props.heureDebut + 4; i++) {
            const j = i - 1;
            if (props.taken_cells.includes(props.jour + j)) break;
            else array.push(i);
        }
        return array;
    }
    const body = (
        <Card style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">Cours du {props.jour} à {props.heureDebut} heures</h2>
            <FormControl>
                <InputLabel id="demo-simple-select-label">Cours</InputLabel>
                <Select name="cours" onChange={handleChange} labelId="demo-simple-select-label"
                    id="demo-simple-select">
                    {props.courses.map(course =>
                        <MenuItem value={course['id']} key={course['nom']}>{course.nom}</MenuItem>
                    )}
                </Select>

                <FormControl>
                    <InputLabel id="demo-simple-select-label2">Prof</InputLabel>
                    <Select name="prof" onChange={handleChange} labelId="demo-simple-select-label2"
                        id="demo-simple-select2">
                        {props.profs.map(prof =>
                            <MenuItem value={prof['id']} key={prof['id']}>{prof.user.sexe + ". " + prof.user.first_name + " " + prof.user.last_name}</MenuItem>
                        )}
                    </Select>
                </FormControl>
                <FormControl>
                    <p>
                        Heure de Début : {props.heureDebut} heures.
                    </p>
                </FormControl>
                <FormControl>
                    <InputLabel id="demo-simple-select-label3">Heure de Fin</InputLabel>
                    <Select name="heureFin" onChange={handleChange} labelId="demo-simple-select-label3"
                        id="demo-simple-select3">
                        {
                            heuresPossibles().map(e =>
                                <MenuItem value={e} key={e}>
                                    {e + " heures"}
                                </MenuItem>
                            )
                        }
                    </Select>
                </FormControl>
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
            <Button className={classes.button} startIcon={<AddIcon />} color="primary" onClick={handleOpen}>
                Ajouter
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


export default ReSeanceCell;