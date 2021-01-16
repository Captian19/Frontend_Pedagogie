import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import { useParams } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";
import NoteEleveViewer from '../../../../../components/Planning&Notes/gestion_notes_components/note_viewer';
import { loadNotesEleve } from "../../../../../actions/Planning&Notes/gestion_notes_services";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
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


const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;


export default function AfficherNote() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const [notes, setNotesState] = React.useState(() => []);
    const [loading, setLodingState] = React.useState(true);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const { id_eleve } = useParams();

    React.useEffect(async () => {

        await loadNotesEleve(id_eleve).then(notes => {
            setNotesState(notes);
            setLodingState(false)
        });
    }, []);
    return (
        loading ?
            <div className="sweet-loading">
                <ClipLoader
                    css={override}
                    size={150}
                    color={"#123abc"}
                    loading={loading}
                />
            </div>
            :
            <Grid container spacing={3}>
                {notes.length == 0 ?
                
                <Typography variant="body1" color="textSecondary" component="p">Pas de Notes disponibles.</Typography>

                :
                    notes.map((note, index) => {
                    return (
                        <NoteEleveViewer note={note} key={index}></NoteEleveViewer>

                    );
                })}


            </Grid>

    );
}
