import React from "react";

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: 752,
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        margin: theme.spacing(4, 0, 2),
    },
}));

function generate(element) {
    return [0].map((value) =>
        React.cloneElement(element, {
            key: value,
        }),
    );
}

function InteractiveList() {
    const classes = useStyles();
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);

    return (
        <div className={classes.root}>
            <FormGroup row>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={secondary}
                            onChange={(event) => setSecondary(event.target.checked)}
                        />
                    }
                    label="Liste sessions"
                />
            </FormGroup>

            <Grid container spacing={2}>

                <Grid item xs={12} md={6}>
                    <div className={classes.demo}>
                        <List dense={dense}>
                            {generate(
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <FolderIcon/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary="Single-line item"
                                        secondary={secondary ? 'Secondary text' : null}
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="delete">
                                            <DeleteIcon/>
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>,
                            )}
                        </List>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}


const Demarrer_Session = (props) => {
    const [state, setState] = React.useState({
        etat_session: 0,
        ouverte: 1,
    });

    const handleChange = (event) => {
        setState({...state, [event.target.name]: event.target.checked});
    };

    return (
        <>
            <main className="c-main">
                <div className="form-group">
                    <div className="controls">
                        <div className="row">
                            <div className="col-md-5">
                                <form className="form-horizontal" onSubmit={props.handleSubmitSess}>
                                    <div className="row">
                                        <div className="col col-md-6">
                                            <label className="col-form-label" htmlFor="prependedInput">Année Session</label>
                                            <input
                                                type="text"
                                                name="annee_session"
                                                className="form-control date-own"
                                                value={props.new_session.annee_session}
                                                onChange={props.handleChangeSess}
                                            />
                                        </div>
                                        <div className="col col-md-6 mt-4 pt-3">
                                            <FormGroup className>
                                                <FormControlLabel
                                                    control={<Switch checked={Boolean(props.new_session.etat_session)}
                                                                     onChange={(e) => {
                                                                         props.handleChangeState(e);
                                                                     }} name="etat_session"/>}
                                                    label="Activer la session"
                                                />
                                            </FormGroup>
                                        </div>
                                    </div>
                                    <hr/>
                                    <h4 align="center" className="alert alert-info">Ponderation</h4>
                                    <div className="row">
                                        <div className="col col-md-4">
                                            <label className="col-form-label" htmlFor="prependedInput">Concours</label>
                                            <input
                                                type="text"
                                                name="ponderation_concours"
                                                className="form-control date-own"
                                                value={props.new_session.ponderation_concours}
                                                onChange={props.handleChangeSess}
                                            />
                                        </div>
                                        <div className="col col-md-4">
                                            <label className="col-form-label" htmlFor="prependedInput">Bac</label>
                                            <input
                                                type="text"
                                                name="ponderation_bac"
                                                className="form-control date-own"
                                                value={props.new_session.ponderation_bac}
                                                onChange={props.handleChangeSess}
                                            />
                                        </div>
                                        <div className="col col-md-4">
                                            <label className="col-form-label" htmlFor="prependedInput">Secondaire</label>
                                            <input
                                                type="text"
                                                name="ponderation_lycee"
                                                className="form-control date-own"
                                                value={props.new_session.ponderation_lycee}
                                                onChange={props.handleChangeSess}
                                            />
                                        </div>
                                    </div><br></br>

                                    {/* <button type="submit" className="btn btn-default">Valider</button> */}
                                    <Button type="submit" variant="contained" color="default"> Valider </Button>
                                    {/*<Button variant="contained" color="default" type="submit" onClick={(e) => props.handleSubmitSess(e)}> Valider </Button>*/}
                                </form>
                            </div>
                            <div className="col col-md-7">
                                {/*<InteractiveList/>*/}
                            </div>
                        </div>
                    </div>
                </div>


            </main>
        </>
    );

}

export default Demarrer_Session;