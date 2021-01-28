import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import { useHistory, useParams } from "react-router-dom";

// Form element

import { Grid } from '@material-ui/core';


import { getPrenomNom } from '../../../../../actions/Planning&Notes/gestion_notes_functions';
import { loadNoteCours } from '../../../../../actions/Planning&Notes/gestion_notes_services';
import LoadingSpinner from "../../../../../components/Planning&Notes/loading_spinner";
import PonderationModal from "../../../../../components/Planning&Notes/gestion_notes_components/ponderation_modal";
import { liste_de_classe } from '../../../../../actions/Planning&Notes/cahier_de_texte_services';
import NoteModal from '../../../../../components/Planning&Notes/gestion_notes_components/note_modal';
import ConfirmModal from '../../../../../components/Planning&Notes/gestion_notes_components/confirm_modal';


function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}


function EnhancedTableHead(props) {
    const { classes, order, orderBy, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell>
                {props.headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        // align={headCell.numeric ? 'right' : 'left'}
                        align="left"
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >

                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                        {headCell.id != "prenom" && headCell.id != "nom" ? <ConfirmModal id_progression={props.id_progression} type_evaluation={headCell.label} reloadComponent={props.reloadComponent} /> : null}
                    </TableCell>
                ))}
                <TableCell align="right">
                    Modifier
                </TableCell>
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
}));

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected } = props;

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                {props.cours} / {props.classe.niveau} - {props.classe.departement}
            </Typography>
        </Toolbar>
    );
};



const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

export default function NoteTable() {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [reloading, setReloadingState] = React.useState(false);
    const [loading, setLoadingState] = React.useState(true);

    const [notes, setNotesState] = React.useState([]);
    const [progression, setProgressionState] = React.useState({});
    const [eleves, setElevesState] = React.useState([])

    const [headCells, setHeadCells] = React.useState([]);
    const [emptyRows, setEmptyRowsState] = React.useState(0);
    const { id_progression } = useParams();
    const history = useHistory();

    React.useEffect(async () => {
        setLoadingState(true);
        await loadNoteCours(id_progression).then(response => {

            if (response.length == 0) {
                alert("Vous n'avez plus de notes pour cette évaluation.");
                history.replace("/enseignant/entrer-notes/" + id_progression)
            }
            else {
                // console.log(response)
                const progression = response[0].progression;
                // console.log(progression);
                setProgressionState(progression);
                setNotesState(response);
                setHeadCells([
                    { id: 'prenom', numeric: false, disablePadding: true, label: 'Prénom' },
                    { id: 'nom', numeric: false, disablePadding: false, label: 'Nom' },
                    ...JSON.parse(response[0].notes).map((note) => {
                        return { id: note.type_evaluation, numeric: true, disablePadding: false, label: note.type_evaluation }
                    })
                ]);
                setEmptyRowsState(rowsPerPage - Math.min(rowsPerPage, response.length - page * rowsPerPage));
                return progression.classe;
            }

        }).then(async (classe) => {
            await liste_de_classe(classe.niveau, classe.departement).then(response => {
                setElevesState(response);
                setLoadingState(false);
            })
        })
    }, [reloading]);



    const reloadComponent = () => {
        setReloadingState(reloading => !reloading)
    };
    // The notes are displayed with the following format
    // const notes = [

    //     {
    //         _id: 2,
    //         eleve: 1,
    //         notes: [
    //             {
    //                 type_evaluation: "evaluation_finale",
    //                 note: 12
    //             }
    //         ]
    //     }
    // ];

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };


    // const emptyRows = rowsPerPage - Math.min(rowsPerPage, notes.length - page * rowsPerPage);

    return (
        <div className={classes.root}>

            { loading ?

                <LoadingSpinner loading={loading} />

                : notes.length == 0 ? null :
                    <div>
                        {/* We have to take the API of Pedagogic module in order to have the module info about the EC */}
                        {/* <Typography variant="body1" color="textSecondary" component="p">Cours de {progression.cours.nom}</Typography><br></br> */}
                        <Paper className={classes.root} style={{ padding: 20, marginBottom: 10 }}>
                            <Typography variant="body1" color="textSecondary" component="p">Pondérations</Typography><br></br>
                            <Grid container spacing={4} >
                                <Grid container sm={8} spacing={3}>
                                    {JSON.parse(progression.ponderations).map((ponderation, index) => {
                                        return (
                                            <Grid item xm={2}>
                                                <TextField key={index} id="outlined-basic" label={ponderation.type_evaluation} value={ponderation.ponderation} variant="outlined" disabled size={20} />
                                            </Grid>
                                        );
                                    })}
                                </Grid>
                                <Grid item sm={4}>
                                    <PonderationModal id_progression={id_progression} reloadComponent={reloadComponent} progression={progression} />
                                </Grid>
                            </Grid>
                        </Paper>
                        <Paper className={classes.paper}>

                            <EnhancedTableToolbar cours={progression.cours.libelle} classe={progression.classe} />
                            <TableContainer>
                                <Table
                                    className={classes.table}
                                    aria-labelledby="tableTitle"
                                    size={dense ? 'small' : 'medium'}
                                    aria-label="enhanced table"
                                >
                                    <EnhancedTableHead
                                        classes={classes}
                                        order={order}
                                        orderBy={orderBy}
                                        onRequestSort={handleRequestSort}
                                        rowCount={notes.length}
                                        headCells={headCells}
                                        id_progression={progression._id}
                                        reloadComponent={reloadComponent}
                                    />
                                    <TableBody>
                                        {stableSort(notes, getComparator(order, orderBy))
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row, index) => {
                                                const newheadcells = headCells;
                                                newheadcells.slice(0, 2);
                                                const eleve = getPrenomNom(eleves, row.eleve);
                                                return (
                                                    <TableRow
                                                        hover
                                                        tabIndex={-1}
                                                        key={row.eleve}
                                                    >
                                                        <TableCell padding="checkbox">

                                                        </TableCell>
                                                        <TableCell component="th" scope="row" padding="none">
                                                            {eleve.first_name}
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            {eleve.last_name}
                                                        </TableCell>
                                                        {JSON.parse(row.notes).map((note, index) =>
                                                            <TableCell key={index} align="left">{note.note}</TableCell>
                                                        )}
                                                        <TableCell align="right">
                                                            <NoteModal note={row} id_progression={id_progression} reloadComponent={reloadComponent} eleve={eleve}></NoteModal>
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        {emptyRows > 0 && (
                                            <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                                <TableCell colSpan={6} />
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={notes.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                            />
                        </Paper>
                    </div>
            }
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            />
        </div>
    );
}

