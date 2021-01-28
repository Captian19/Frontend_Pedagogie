import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Grid } from '@material-ui/core';
import '../../../assets/Planning&Notes/css/App.css';
import StaticsTable from './statics_table';
import LoadingSpinner from '../loading_spinner';
import { getUserRoleById } from '../../../actions/Planning&Notes/cahier_de_texte_services';

import {
    CProgress,
} from '@coreui/react'
import { getColor } from '../../../actions/Planning&Notes/gestion_notes_functions';

const useStyles = makeStyles((theme) => ({
    root: {
        // maxWidth: 400,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export default function NoteEleveViewer(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const [prof, setProfState] = React.useState({});
    const [loading_prof, setLoadingProfState] = React.useState(true);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    React.useEffect(async () => {
        const user = await getUserRoleById(props.note.progression.prof);
        setProfState(user.user);
        setLoadingProfState(false);
    }, []);
    return (

        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {props.note.progression.cours.nom[0]}
                    </Avatar>
                }
                title={props.note.progression.cours.nom}
                subheader={loading_prof ?
                    <LoadingSpinner loading={loading_prof} size={20} />
                    :
                    <Typography variant="body2" color="textSecondary" component="p">{`${prof.first_name} ${prof.last_name}`}</Typography>
                }
            />

            <CardContent>
                {JSON.parse(props.note.notes).map(
                    (note_partie, index) => (
                        <React.Fragment>
                            <Typography key={index} variant="body1" color="textSecondary" component="p" align="center"></Typography>
                            <div className="clearfix">
                                <div className="float-left">
                                    <strong>{note_partie.note}</strong>
                                </div>
                                <div className="float-right">
                                    <small className="text-muted">{(note_partie.type_evaluation.charAt(0).toUpperCase() + note_partie.type_evaluation.slice(1)).replace("_", " ")}</small>
                                </div>
                            </div>
                            <CProgress className="progress-xs" color={getColor((note_partie.note * 100) / 20)} value={(note_partie.note * 100) / 20} />
                        </React.Fragment>
                    )
                )}
            </CardContent>
            <CardActions disableSpacing>

                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <StaticsTable statics={props.note.statics}></StaticsTable>
                </CardContent>
            </Collapse>
        </Card>
    );
}
