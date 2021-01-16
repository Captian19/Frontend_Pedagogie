import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

export default function DatePicker(props) {
    /*
    Component for picking a date for the calendar.
    */
    const classes = useStyles();

    const handleChange = (e) => props.handleChange(e.target);
    

    return (
        <form className={classes.container} noValidate>
            <TextField
                id="date"
                label={props.label}
                type="date"
                defaultValue={props.defaultValue ?? "2017-05-24"}
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
                style={{margin:12}}
                name="date"
                onChange={handleChange}
            />
        </form>
    );
}
