import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Send from '@material-ui/icons/Send';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { createBulletins, loadTableauNotesSemestriel } from '../../../../../actions/Planning&Notes/gestion_notes_services';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Reload from '@material-ui/icons/Repeat';

// Form Elements
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { MenuItem } from "@material-ui/core";

// Styling 
import '../../../../../assets/Planning&Notes/css/App.css';
import { blueGrey, green, grey } from '@material-ui/core/colors';


import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import LoadingSpinner from '../../../../../components/Planning&Notes/loading_spinner';
import NoteFinaleModal from '../../../../../components/Planning&Notes/gestion_notes_components/note_finale_modal';
import { Grid } from '@material-ui/core';

const useRowStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));


function Row(props) {
    const row = props.row;
    const classes = useRowStyles();

    /**
     * This function is for creating all the cells containing a note
     */
    const create_note_row = () => {
        var note_cells = [];
        {
            row.notes_ue.map((note_ue, index) => {
                note_ue.notes_ec.map((note_ec, index) => {
                    note_cells.push(<Cell key={index} align="right" value={note_ec} prenom={row.prenom} nom={row.nom} />)
                });
                note_cells.push(<TableCell key={index + 10} align="right" >{note_ue.note_finale}</TableCell>)
            }
            )
        }
        return note_cells;
    }
    return (
        <React.Fragment>
            <TableRow className={classes.root} style={{ backgroundColor: blueGrey[50], borderWidth: 1, borderStyle: "inset" }}>
                <TableCell className={"cell"}>{row.prenom}</TableCell>
                <TableCell className={"cell"}>{row.nom}</TableCell>
                {create_note_row().map(element => element)}
                <TableCell className={"cell"} align="right">{row.moyenne_generale}</TableCell>
                {props.semestre == 2 ?
                    <React.Fragment>
                        <TableCell className={"cell"} align="right">{row.moyenne_generale_1}</TableCell>
                        <TableCell className={"cell"} align="right">{row.moyenne_annuelle}</TableCell>
                        <TableCell className={"cell"} align="right" style={{ width: 200 }}>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">Décision</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    name="etat"
                                    onChange={(event) => props.handleEtatChange(props.row.eleve, event.target.value)}
                                    label="decision"
                                >
                                    <MenuItem></MenuItem>
                                    <MenuItem value="Passage">Passage</MenuItem>
                                    <MenuItem value="Redoublement">Redoublement</MenuItem>
                                    <MenuItem value="Exclusion">Exclusion</MenuItem>
                                </Select>
                            </FormControl>
                        </TableCell>
                    </React.Fragment>
                    :
                    null
                }
            </TableRow>
        </React.Fragment>
    );
}


Row.propTypes = {
    row: PropTypes.shape({
        calories: PropTypes.number.isRequired,
        carbs: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        history: PropTypes.arrayOf(
            PropTypes.shape({
                amount: PropTypes.number.isRequired,
                customerId: PropTypes.string.isRequired,
                date: PropTypes.string.isRequired,
            }),
        ).isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        protein: PropTypes.number.isRequired,
    }).isRequired,
};


function Cell(props) {
    const [open, setOpen] = React.useState(false);
    const [note_finale, setNoteFinaleState] = React.useState(props.value.note_finale);

    /**
     * This is for changing only the note in the cell instead of reloading all the table
     * @param {float} new_note 
     */
    const change_note = (new_note) => setNoteFinaleState(new_note);

    return (
        <TableCell align="right" style={{ minWidth: 40 }}>
            <Grid container spacing={1} alignContent="center" sm={12} xs={12}>
                <Grid item sm={4} xs={4}>
                    <NoteFinaleModal change_note={change_note} data={{ id_note: props.value.id_note, note_finale: props.value.note_finale, ec: props.value.ec, prenom: props.prenom, nom: props.nom }} />
                </Grid>
                <Grid item sm={4} xs={4}>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </Grid>
                {/* <Grid item sm={4} xs={4}>
                    {note_finale}
                </Grid> */}
            </Grid>
            <div style={{ paddingBottom: 0, paddingTop: 0 }}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box margin={1}>
                        <SimpleCard note_ec={props.value} />
                    </Box>
                </Collapse>
            </div>
        </TableCell>
    )
}


const cardStyles = makeStyles({
    root: {
        minWidth: 170,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginTop: 12,
    },
});

function SimpleCard(props) {
    const classes = cardStyles();

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.pos} color="textSecondary">
                    Notes évaluations
                </Typography>
                {props.note_ec.notes.map((note, index) =>
                    <Typography variant="body2" component="p" key={index}>
                        {`${note.type_evaluation}: ${note.note}`}
                    </Typography>
                )}
                <Typography className={classes.pos} color="textSecondary">
                    Pondérations
                </Typography>
                {props.note_ec.ponderations.map((ponderation, index) =>
                    <Typography variant="body2" component="p" key={index}>
                        {`${ponderation.type_evaluation}: ${ponderation.ponderation} %`}
                    </Typography>
                )}

            </CardContent>

        </Card>
    );
}

const useStyles = makeStyles({
    table: {
        minWidth: 800,
    },
    title: {
        fontSize: 14,
    },
    ue_cell: {

    },
    root: {
        minWidth: 170,
        marginBottom: 10,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginTop: 12,
    },
});

function TableauSemestriel(props) {
    const classes = useStyles();
    const [role] = React.useState(() => {
        var current_role = {};
        current_role['is_DE'] = false;
        props.auth.user.CurrentRoles.map(role => {
            if (role.role_type == "ENSEIGNANT") {
                current_role['type'] = role.role_type;
                current_role['id'] = role.id;
                current_role['annee'] = role.annee;
            }
            if (role.role_type == "DIRECTEUR_DES_ETUDES") {
                current_role["is_DE"] = true;
                current_role['annee'] = role.annee;
            }

        })
        return current_role;
    })
    const { id_classe } = useParams();
    const [notes, setNotesState] = React.useState([]);
    const [loading, setLoadingState] = React.useState(true)
    const [ues, setUesState] = React.useState([])
    const [ecs, setEcsState] = React.useState([])
    const [etats, setEtatState] = React.useState({});
    const [semestre, setSemestreState] = React.useState(0);

    const reload_component = async () => setLoadingState(true);
    const history = useHistory();
    const handleEtatChange = (id_eleve, etat) => setEtatState(prev_etat => {
        prev_etat[id_eleve] = etat;
        console.log(id_eleve, etat);
        return prev_etat;
    })
    React.useEffect(async () => {
        if (loading) {
            var ues = [];
            var ecs = [];
            await loadTableauNotesSemestriel(id_classe).then((response) => {
                const sem = response.splice(0, 1)[0].semestre;
                setSemestreState(sem); // We get the corresponding semester which is the fisrt element of the response
                if (sem != 0) {
                    setNotesState(response);
                    ues = response[0].notes_ue.map(note_ue => {
                        note_ue.notes_ec.map(note => ecs.push(note.ec));
                        ecs.push("Moyenne Totale UE")
                        return {
                            nom: `${note_ue.ue} (Coef : ${note_ue.coeff})`,
                            nb_ec: note_ue.notes_ec.length,
                        }
                    });
                    setUesState(ues);
                    setEcsState(ecs);
                }
                setLoadingState(false)

            })
        }

    }, [loading])

    const deliberer = async () => {
        await loadTableauNotesSemestriel(id_classe).then(async (response) => {
            const sem = response.splice(0, 1)[0].semestre;
            await createBulletins(id_classe, semestre, response, etats, role.annee).then(response => console.log(response)).then(() => {
                history.replace("/enseignant/voir-resultats-annuels/" + id_classe)
            });
        });
    }

    return (
        loading ?
            <LoadingSpinner loading={loading} />
            :
            semestre == 0 ?
                <Typography className={classes.pos} color="textSecondary">
                    Plus de délibération pour cette année.
            </Typography>
                :
                <div>
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography className={classes.pos} color="textSecondary">
                                Tableau de délibération du semestre {semestre}.
                        </Typography>
                        </CardContent>
                        <Button variant="contained"
                            color="primary"
                            style={{ margin: 10 }}
                            className={classes.button}
                            startIcon={<Reload />} onClick={reload_component}>Rafraichir
                    </Button>
                    </Card>
                    <TableContainer component={Paper}>
                        <Table style={{ minWidth: 700 }} aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={2} className={"cell"} />
                                    {ues.map((ue, index) =>
                                        <TableCell style={{ backgroundColor: blueGrey[100], borderWidth: 1, borderStyle: "inset" }} colSpan={ue.nb_ec + 1} key={index} align="center" className={classes.root} >{ue.nom}</TableCell>
                                    )}
                                    <TableCell rowSpan={3} align="right" className={classes.root} >Moyenne Générale</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={2} className={"cell"}>
                                        EC
                            </TableCell>
                                    {ecs.map((ec, index) =>
                                        <TableCell rowSpan={ec === "Moyenne Totale UE" ? 2 : 1} key={index} align="right" style={ec === "Moyenne Totale UE" ? { backgroundColor: green[100], borderWidth: 1, borderStyle: "inset" } : { backgroundColor: grey[100], borderWidth: 1, borderStyle: "inset" }}>{ec}</TableCell>
                                    )}
                                </TableRow>
                                <TableRow>
                                    <TableCell className={"cell"}>
                                        Prénom
                                    </TableCell>
                                    <TableCell className={"cell"}>
                                        Nom
                                    </TableCell>
                                    {ecs.map((ec, index) =>
                                        ec == "Moyenne Totale UE" ? null :
                                            <TableCell key={index} align="right" style={{ backgroundColor: grey[100], borderWidth: 1, borderStyle: "inset" }}>Notes/20</TableCell>
                                    )}
                                    {semestre == 2 ?
                                        <React.Fragment>
                                            <TableCell className="cell" style={{ width: 200 }}>Moyenne Semestre 1</TableCell>
                                            <TableCell className="cell" style={{ width: 200 }}>Moyenne Annuelle</TableCell>
                                            <TableCell className="cell" style={{ width: 200 }}>Décision</TableCell>
                                        </React.Fragment>
                                        :
                                        null
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {notes.map((row) => (
                                    <Row key={row.eleve} row={row} handleEtatChange={handleEtatChange} semestre={semestre} />
                                ))}
                            </TableBody>
                        </Table>
                        {role.is_DE != true ?
                            <Button variant="contained"
                                style={{ margin: 15 }}
                                color="secondary"
                                className={classes.button}
                                startIcon={<Send />} onClick={deliberer}>Délibérer
                            </Button>
                            :
                            null
                        }
                    </TableContainer>
                </div>
    );
}


const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, null)(TableauSemestriel)