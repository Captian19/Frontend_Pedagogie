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
import Axios from 'axios';
import NoteRow from '../../../../../components/Planning&Notes/gestion_notes_components/note_row';
import { id_progression } from '../../../../../constants/Planning&Notes/constants';


function createData(prenom, nom, evaluation_1, examen_final) {
    const density = evaluation_1 / examen_final;
    return { prenom, nom, evaluation_1, examen_final, density };
}

const eleves = [
    { _id: 1, prenom: 'Alioune', nom: 'Sarr' },
    // { _id: 2, prenom: 'Falilou', nom: 'Fall' },
    // { _id: 3, prenom: 'Mamadou', nom: 'Sow' },
    // { _id: 4, prenom: 'Mame Diarra', nom: 'Sow' },
    // { _id: 5, prenom: 'Ibrahima Birane', nom: 'Faye' },
    // { _id: 6, prenom: 'Kalidou', nom: 'Dia' },
    // { _id: 7, prenom: 'Fallou', nom: 'Diakhaté' },
    // { _id: 8, prenom: 'Khadim', nom: 'Diakhaté' },
    // { _id: 9, prenom: 'Sokhna Cambel', nom: 'Dieng' },
];


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

    const [columns, setColumnsState] = React.useState(
        [
            { id: 'prenom', label: 'Prénom', minWidth: 170 },
            { id: 'nom', label: 'Nom', minWidth: 100 },
            {
                id: 'evaluation_1',
                label: 'Evaluation\u00a01',
                minWidth: 170,
                align: 'right',
            },
            {
                id: 'examen_final',
                label: 'Examen\u00a0Final',
                minWidth: 170,
                align: 'right',
            },

        ]
    );
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
        console.log(notes_eleves);

        setColumnsState([...columns]);
    }
    const on_ponderation_change = (id_column, value) => {
        for (let index = 0; index < columns.length; index++) {
            if (columns[index].id == id_column) {
                columns[index]['ponderation'] = parseFloat(value);
                console.log(columns[index]['ponderation'])
                return;
            }

        }
    }
    function save_notes() {
        for (let index = 0; index < notes_eleves.length; index++) {

            for (let column = 0; column < columns.length; column++) {
                console.log(notes_eleves[index][columns[column].id])
                if (notes_eleves[index][columns[column].id] == "" || Number.isNaN(notes_eleves[index][columns[column].id])) {
                    console.log(notes_eleves[index][columns[column].id]);
                    alert("Veuillez saisir une note correcte de " + eleves[index].prenom + " " + eleves[index].nom + " en " + columns[column].label);
                    return;
                }
            }
        }
        Axios.post("/api/notes/add/" + id_progression + "/", { 'notes_eleves': notes_eleves }).then(response => console.log(response.data));

    }


    /**
     * This function is for adding a note to the list of notes.
     * @param {*} id_eleve 
     * @param {*} evaluation 
     * @param {*} note 
     */
    function add_note(id_eleve, evaluation, note) {
        notes_eleves.map((note_eleve) => {
            note_eleve._id == id_eleve ? note_eleve[evaluation] = parseFloat(note) : console.log("");
        })
    }

    function get_note(id_eleve, evaluation) {
        for (let index = 0; index < notes_eleves.length; index++) {
            if (notes_eleves[index]._id == id_eleve) return notes_eleves[index][evaluation];

        }

    }
    return (
        <div>
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
            <Paper className={classes.root}>
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

const notes_eleves = eleves.map(eleve => { return { "_id": eleve._id, "evaluation_1": "", "examen_final": "" } });


