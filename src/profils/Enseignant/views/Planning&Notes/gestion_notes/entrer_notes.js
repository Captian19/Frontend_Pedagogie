import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import { Button, Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import NoteRow from '../../../../../components/Planning&Notes/gestion_notes_components/note_row';
import { useHistory, useParams } from "react-router-dom";
import { loadNoteCours, saveNotes } from '../../../../../actions/Planning&Notes/gestion_notes_services';
import { liste_de_classe } from '../../../../../actions/Planning&Notes/cahier_de_texte_services';
import { loadProgression } from '../../../../../actions/Planning&Notes/planning_services';
import LoadingSpinner from '../../../../../components/Planning&Notes/loading_spinner';

function createData(prenom, nom, evaluation_1, examen_final) {
    const density = evaluation_1 / examen_final;
    return { prenom, nom, evaluation_1, examen_final, density };
}




const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        margin: 20,
    },
    textfield: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    container: {
        maxHeight: 440,
    },
}));

/**
 * This component defines the table of Notes.
 * We use it to display of to add new notes
 */
export default function TableOfNote() {

    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [eleves, setElevesState] = React.useState([])
    const [loading, setLoadingState] = React.useState(true);
    const [notes_eleves, setNotesEleveState] = React.useState([]);
    const [ponderations, setPonderationsState] = React.useState({});
    const [progression, setProgressionState] = React.useState({});
    const { id_progression } = useParams();
    const history = useHistory();

    const [columns, setColumnsState] = React.useState(
        [
            { id: 'prenom', label: 'Prénom', minWidth: 170 },
            { id: 'nom', label: 'Nom', minWidth: 100 },
            // {
            //     id: 'evaluation_1',
            //     label: 'Evaluation\u00a01',
            //     minWidth: 170,
            //     align: 'right',
            // },
            {
                id: 'examen_final',
                label: 'Examen\u00a0Final',
                minWidth: 170,
                align: 'right',
            },

        ]
    );

    // var ponderations = {};
    // var notes_eleves = []

    /**
     * If the notes for this progression has al ready been defined, we will directly see the defined notes
     */
    React.useEffect(async () => {
        await loadNoteCours(id_progression).then(data => {
            if (data.length > 0) {
                alert("Vous avez déjà entré des notes pour ce cours!");
                history.replace("/enseignant/voir-notes/" + id_progression)
            }
        }).then(async () =>
            await loadProgression(id_progression).then(response => {
                setProgressionState(response);
                return response.classe;
            }).then(async (classe) => {
                await liste_de_classe(classe.niveau, classe.departement).then(response => {
                    setNotesEleveState(response.map(eleve => {
                        return { "_id": eleve.id, "examen_final": "" };
                    }))

                    setElevesState(response);
                    setLoadingState(false);
                })
            })
        )

    }, [])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };



    const add_new_column = (nom) => {
        const id_column = 'evaluation_' + (columns.length - 2);
        const column = {
            id: id_column,
            label: 'Evaluation\u00a0' + (columns.length - 2),
            minWidth: 170,
            align: 'right',
        };
        columns.pop();
        columns.push(column);
        columns.push({
            id: 'examen_final',
            label: 'Examen\u00a0Final',
            minWidth: 170,
            align: 'right',
        });

        notes_eleves.map(note_eleve => note_eleve[id_column] = "");
        ponderations[id_column] = "";

        setColumnsState([...columns]);
    }

    /**
     * For getting the ponderations entered by the prof
     * @param {string} id_column 
     * @param {Float32} value 
     */
    const on_ponderation_change = (id_column, value) => {
        if (!Number.isNaN(parseFloat(value))) {
            setPonderationsState(prevponderations => {
                prevponderations[id_column] = parseFloat(value);
                return prevponderations;
            })
        }
        else alert("Veuillez entrer une ponderation valide.")
    }

    async function save_notes() {
        for (let index = 0; index < notes_eleves.length; index++) {

            for (let column = 2; column < columns.length; column++) {
                if (notes_eleves[index][columns[column].id] == "" || Number.isNaN(notes_eleves[index][columns[column].id])) {
                    alert("Veuillez saisir une note correcte de " + eleves[index].user.first_name + " " + eleves[index].user.last_name + " en " + columns[column].label);
                    return;
                }
            }
        }
        const values = Object.values(ponderations);
        const sum = values.reduce((accumulator, currentValue) => accumulator + currentValue);
        if (sum >= 99 && sum < 101) {
            await saveNotes(id_progression, notes_eleves, ponderations).then(response => {
                if (response < 400) history.push("/enseignant/voir-notes/" + id_progression);
                else alert("Problème lors de l'enregistrement des notes.")
            })
        }

        else alert("La somme de toutes les pondérations doit être égale à 100.");

    }


    /**
     * This function is for adding a note to the list of notes.
     * @param {*} id_eleve 
     * @param {*} evaluation 
     * @param {*} note 
     */
    function add_note(id_eleve, evaluation, note) {
        setNotesEleveState(prev_notes => {
            prev_notes.map((note_eleve) => {
                if (note_eleve._id == id_eleve) note_eleve[evaluation] = parseFloat(note);
            })
            return prev_notes;
        })

    }

    function get_note(id_eleve, evaluation) {
        for (let index = 0; index < notes_eleves.length; index++) {
            if (notes_eleves[index]._id == id_eleve) return notes_eleves[index][evaluation];

        }

    }
    return (
        loading ?
            <LoadingSpinner loading={loading} />
            :
            <div>
                <Typography variant="body1" color="textSecondary" component="p">Cours de {progression.cours.nom}</Typography><br></br>
                <center>
                    <Button variant="contained" color="primary" onClick={() => add_new_column()}>Ajouter une NOTE</Button>
                </center>
                <Paper className={classes.root}>
                    <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table" size="small">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {eleves.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                    return (
                                        <NoteRow row={row} columns={columns} get_note={get_note} add_note={add_note}></NoteRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[100, 50, 10]}
                        component="div"
                        count={eleves.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />

                </Paper>
                <Paper className={classes.root} style={{ padding: 10 }}>
                    <Typography variant="body1" color="textSecondary" component="p">Veuillez définir les pondérations (en pourcentages)</Typography><br></br>
                    <Grid container spacing={4} alignContent="flex-start" >
                        {columns.map((column) => {
                            const column_id = column.id;
                            const label = column.label;
                            if (column_id != "prenom" && column_id != "nom")
                                return (
                                    <Grid item xm={6}>
                                        <TextField id="outlined-basic" label={label} variant="outlined" onChange={(event) => on_ponderation_change(column_id, event.target.value)} />
                                    </Grid>
                                );
                        })}
                    </Grid>

                </Paper>
                <Button style={{ margin: 40 }} variant="contained" color="primary" onClick={() => save_notes()}>Sauvegarder</Button>

            </div>
    );
}


