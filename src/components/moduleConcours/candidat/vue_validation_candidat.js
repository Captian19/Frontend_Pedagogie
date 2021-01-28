import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {lighten, makeStyles} from '@material-ui/core/styles';
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
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Form} from "react-bootstrap";
import FormGroup from "@material-ui/core/FormGroup";
import all from "../../../constants/moduleConcours/someConstants";
import {withStyles} from "@material-ui/core";

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


const headCells = [
    {
        id: 'first_name',
        numeric: false,
        disablePadding: true,
        label: 'prénom',
        header: 'Prénom',
        defaultWidth: 100,
        resizable: false,
    },
    {
        id: 'last_name',
        numeric: false,
        disablePadding: false,
        label: 'nom',
        header: 'Nom',
        defaultWidth: 80,
        resizable: false,
    },
    {id: 'date_naissance', disablePadding: false, numeric: false, label: 'date naissance', header: 'date naissance'},
    {id: 'lieu_naissance', disablePadding: false, numeric: false, label: 'lieu naissance', header: 'lieu naissance'},
    {
        id: 'pays', numeric: false, disablePadding: false, label: 'pays', header: 'pays', render: ({value}) =>
            <span>{value}</span>
    },
    {id: 'telephone', numeric: false, disablePadding: false, label: 'telephone', header: 'telephone'},
    {id: 'lycee', numeric: false, disablePadding: false, label: 'lycee', header: 'Etablissement', minWidth: 350},
    {id: 'nom_centre', numeric: false, disablePadding: false, label: 'centre', header: 'centre', minWidth: 350},
    {id: 'serie', numeric: false, disablePadding: false, label: 'serie', header: 'serie'},
    {id: 'filieres', numeric: false, disablePadding: false, label: 'filieres', header: 'filieres'},

    {id: 'action', label: 'action', disablePadding: false, header: 'action', minWidth: 170}
];

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: '#3120e8',
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 15,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.focus,
        },
    },
}))(TableRow);

function EnhancedTableHead(props) {

    const {classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort} = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <StyledTableRow>
                <StyledTableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{'aria-label': 'select all desserts'}}
                    />
                </StyledTableCell>
                {headCells.map((headCell) => (
                    <StyledTableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
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
                    </StyledTableCell>
                ))}
            </StyledTableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
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
    const {numSelected, selected} = props;
    const [open, setOpen] = React.useState(false);
    const [deleted, setDeleted] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        props.get_Candidats().then(res => props.setSourceData(res.data.results.filter(el => el.has_paid === false)))
        props.setSelected([])
    };

    const suppression = (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Suppression du candidat {props.selected[0]}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {deleted ? (
                            <span className="alert alert-success">
                                Candidat supprimé avec succès!
                            </span>
                        ):(
                            <span className="alert alert-warning">
                                Cette action est irréversible! Vous voulez vraiment supprimer?
                            </span>
                        )}

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Annuler
                    </Button>
                    <Button onClick={e => {
                        e.preventDefault();
                        props.delete(selected[0]).then(() => {
                            setDeleted(true);
                        });

                    }} color="red" autoFocus>
                        Supprimer
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );

    // React.useEffect(() => {
    //     props.setSourceData()
    // }, [])

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {deleted ? (
                        <>
                            {numSelected} supprimés
                        </>
                    ):(
                        <>
                            {numSelected} selectionnés
                        </>
                    )}

                </Typography>
            ) : (
                <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                    Liste des candidats de la session actuelle
                </Typography>
            )}

            {numSelected === 1 ? (
                <>
                    <Tooltip title="Delete">
                        <IconButton aria-label="delete">
                            <DeleteIcon onClick={handleClickOpen}/>
                        </IconButton>
                    </Tooltip>
                    {suppression}
                </>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton aria-label="filter list">
                        <FilterListIcon/>
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
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
        minWidth: 850,
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

export default function Liste_Candidat(props) {
    const [sourceData, setSourceData] = React.useState([]);

    const rows = (sourceData !== undefined && sourceData.length > 0) ? sourceData : props.listCandidat
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);


    // EDIT
    const [open, setOpen] = React.useState(false);

    const [candidat_plateforme, setCandidatPlateforme] = React.useState(null)
    const [Ok, setOk] = React.useState(false)

    const handleClickOpen = () => {
        props.get_Candidat(selected[0]).then(res => {
            setCandidatPlateforme(res.data)
        }).then(() => setOk(true))
            .catch(error => {
            setOk(false);
            console.log(error);
        })
    };

    const handleClose = () => {
        props.get_Candidats().then(res => setSourceData(res.data.results.filter(el => {
            return el.has_paid === false || el.doc_received === false || el.formulaire_is_received === false
            }
        ))).catch(error => console.log(error))
        setOk(false);
        setSelected([]);
    };


    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
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

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    // React.useEffect(()=>{
    //     setSourceData(props.candidatSessions);
    // }, [])
    return (
        <>
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <EnhancedTableToolbar numSelected={selected.length}
                                          selected={selected}
                                          delete={props.delete_Candidat}
                                          setSourceData={setSourceData}
                                          get_Candidats={props.get_Candidats}
                                          setSelected={setSelected}
                    />
                    <TableContainer>
                        <Table
                            className={classes.table}
                            aria-labelledby="tableTitle"
                            size={dense ? 'small' : 'medium'}
                            aria-label="enhanced table"
                        >
                            <EnhancedTableHead
                                classes={classes}
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={rows.length}
                            />
                            <TableBody>
                                {stableSort(rows, getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        const isItemSelected = isSelected(row.id);
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <StyledTableRow
                                                hover
                                                onClick={(event) => handleClick(event, row.id)}
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row.id}
                                                selected={isItemSelected}
                                            >
                                                <StyledTableCell padding="checkbox">
                                                    <Checkbox
                                                        checked={isItemSelected}
                                                        inputProps={{'aria-labelledby': labelId}}
                                                    />
                                                </StyledTableCell>
                                                <StyledTableCell component="th" id={labelId} scope="row" padding="none">
                                                    {row.user.first_name}
                                                </StyledTableCell>
                                                <StyledTableCell>{row.user.last_name}</StyledTableCell>
                                                <StyledTableCell>{row.date_naissance}</StyledTableCell>
                                                <StyledTableCell>{row.lieu_naissance}</StyledTableCell>
                                                <StyledTableCell>{all.NATIONALITE[row.pays]}</StyledTableCell>
                                                <StyledTableCell>{row.user.telephone}</StyledTableCell>
                                                <StyledTableCell>{row.lycee.nom_lycee}</StyledTableCell>
                                                <StyledTableCell>{row.nom_centre.nom_centre}</StyledTableCell>
                                                <StyledTableCell>{all.SERIE[row.serie]}</StyledTableCell>
                                                <StyledTableCell>{row.filieres}</StyledTableCell>

                                                <StyledTableCell>
                                                    <Button variant="outlined" color="primary"
                                                            onClick={handleClickOpen}>
                                                        Editer
                                                    </Button></StyledTableCell>
                                            </StyledTableRow>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <StyledTableRow style={{height: (dense ? 33 : 53) * emptyRows}}>
                                        <StyledTableCell colSpan={12}>
                                            {props.listCandidat.length === 0 ?
                                                <h1 align="center" className="text-info">Tous les candidats ont été validés</h1> :
                                                <h1 align="center" className="text-info"></h1>
                                            }

                                        </StyledTableCell>
                                    </StyledTableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Paper>
                <FormControlLabel
                    control={<Switch checked={dense} onChange={handleChangeDense}/>}
                    label="Dense padding"
                />
            </div>
            {Ok ? (
                <EditCandidat handleClose={handleClose}
                              candidat_plateforme={candidat_plateforme}
                              open={Ok}
                              candidat={selected}
                              edition={props.edit_Candidat}
                              setSourceData={setSourceData}
                />
            ):(
                <></>
            )}

        </>
    );
}

const EditCandidat = (props) => {

    const [dossierOk, setDossierOk] = React.useState(props.candidat_plateforme.formulaire_is_received)
    const [hasPaid, setHasPaid] = React.useState(props.candidat_plateforme.has_paid)
    const [docReceived, setDocReceived] = React.useState(props.candidat_plateforme.doc_received)
    const [prenom, setPrenom] = React.useState(props.candidat_plateforme.user.first_name)
    const [nom, setNom] = React.useState(props.candidat_plateforme.user.last_name)
    const [submitted, setSubmitted] = React.useState(false)
    const [state, setState] = React.useState({
        non: false,
        has_paid: false,
    });
    const [state3, setState3] = React.useState({
        non: false,
        doc_received: false,
    });
    const [state2, setState2] = React.useState({
        non: false,
        formulaire_is_received: false,
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        let data = {
            'formulaire_is_received': dossierOk,
            'has_paid': hasPaid,
            'doc_received': docReceived
        }
        console.log(data)
        props.edition(props.candidat_plateforme.id, data).then(res=> {
            setSubmitted(true);
            console.log(res.data);
        }).catch(error => console.log(error))
    }
    const handleChangePaiement = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
        setHasPaid(event.target.checked)
    };
    const handleChangeDoc = (event) => {
        setState3({ ...state3, [event.target.name]: event.target.checked });
        setDocReceived(event.target.checked)
    };
    const handleChangeDossier = (event) => {
        setState2({ ...state2, [event.target.name]: event.target.checked });
        setDossierOk(event.target.checked)
    };
    const alertSuccessEdit = () => {
        if (submitted){
            return (<div className="alert alert-success" id="success-alert" role="alert">
                Données enregistrées avec succés!
            </div>)
        }
        else {
            return (<div className="alert alert-info" id="success-alert" role="alert">
                Veuillez bien remplir les champs!
            </div>)
        }
    }

    return (
        <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">

            <DialogTitle id="form-dialog-title">Edition Candidat</DialogTitle>


            <DialogContent>
                <DialogContentText>
                    <div>Ce formulaire sert a valider les candidats de la session (ou à saisir les notes de ces derniers)</div>
                    {alertSuccessEdit()}
                </DialogContentText>
                {props.open ? (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Prenom</Form.Label>
                            <Form.Control
                                type="text"
                                name="first_name"
                                value={prenom}
                                onChange={(e) => {
                                    setPrenom(e.target.value);
                                    console.log(prenom)
                                }}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Nom</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nom"
                                name="last_name"
                                value={nom}
                                onChange={(e) => {
                                    setNom(e.target.value);
                                    console.log(nom)
                                }}
                            />
                        </Form.Group>

                        <div className="row">
                            <div className="col-md-4">
                                <FormGroup>
                                    <FormControlLabel
                                        control={<Switch
                                            checked={hasPaid}
                                            onChange={handleChangePaiement}
                                            color="primary"
                                            name="has_confirmed"
                                            inputProps={{ 'aria-label': 'primary checkbox' }}/>}
                                        label="Paiement effectué?"
                                    />
                                </FormGroup>
                            </div>

                            <div className="col-md-4">
                                <FormGroup>
                                    <FormControlLabel
                                        control={<Switch
                                            checked={dossierOk}
                                            onChange={handleChangeDossier}
                                            color="primary"
                                            name="formulaire_is_received"
                                            inputProps={{ 'aria-label': 'primary checkbox' }}/>}
                                        label="formulaire reçu?"
                                    />
                                </FormGroup>
                            </div>
                            <div className="col-md-4">
                                <FormGroup>
                                    <FormControlLabel
                                        control={<Switch
                                            checked={docReceived}
                                            onChange={handleChangeDoc}
                                            color="primary"
                                            name="doc_received"
                                            inputProps={{ 'aria-label': 'primary checkbox' }}/>}
                                        label="Bulletins/relevés reçus?"
                                    />
                                </FormGroup>
                            </div>
                        </div>



                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Confirmer l'éxactitude des données!" />
                        </Form.Group>

                        <Button variant="contained" color="primary" type="submit" block>
                            Valider
                        </Button>
                    </Form>
                ):(
                    <span className="font-5xl alert alert-warning">Veuiller selectionnez le candidat à éditer!</span>
                )}

            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
}

