import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';


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
 * This component defines a row in the body of the table.
 * It can contain the nom or the prenom or a TextField when we want to add a note.
 * @param {*} props 
 */
export default function Row(props) {

    const classes = useStyles();
    const one_note_change = (id_eleve, evaluation, note) => {
        props.add_note(id_eleve, evaluation, note);
    }
    return (
        <TableRow hover role="checkbox" tabIndex={-1} key={props.row._id}>

            {props.columns.map((column) => {
                const id_eleve = props.row.id
                const column_id = column.id;
                const label = column.label;
                return (column_id != "prenom" && column_id != "nom" ?
                    <TableCell key={column.id} align={column.align} >
                        <form className={classes.textfield} noValidate autoComplete="off">
                            <TextField id="outlined-basic" label={label} variant="outlined" defaultValue={props.get_note(id_eleve, column_id)} onChange={(event) => one_note_change(id_eleve, column_id, event.target.value)} />
                        </form>
                    </TableCell>
                    : column_id == "prenom" ?
                        <TableCell key={column.id} align={column.align}>{props.row.user.first_name}</TableCell> :
                        column_id === "nom" ?
                        <TableCell key={column.id} align={column.align}>{props.row.user.last_name}</TableCell> : null
                );
            })}
        </TableRow>
    );
}