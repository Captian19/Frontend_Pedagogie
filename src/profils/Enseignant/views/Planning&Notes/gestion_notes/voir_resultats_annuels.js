import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import LoadingSpinner from "../../../../../components/Planning&Notes/loading_spinner";
import { connect } from 'react-redux';
import VoirResultat from '../../../../../components/Planning&Notes/gestion_notes_components/voir_resultat_annuel';
import { loadBulletins } from '../../../../../actions/Planning&Notes/gestion_notes_services';
import { useParams } from 'react-router-dom';


const useStyles = makeStyles({
    root: {
        minWidth: 1000,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});


function ResultatsCard(props) {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    const [resultats, setResultatsState] = React.useState([]);
    const [loading, setLoadingState] = React.useState(true);
    const { id_classe } = useParams();
    const annee = props.auth.user.currentRoles[0].annee;
    console.log(id_classe)
    React.useEffect(async () => {
        await loadBulletins(id_classe, annee).then((response) => {
            setResultatsState(response);
            // console.log(response);
            setLoadingState(false);
        })
    }, [])
    return (
        loading ?
            <LoadingSpinner loading={loading} />
            :
            <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        La liste des résultats annuels.
                    </Typography>
                    {resultats.length == 0 ?
                        <Typography className={classes.pos} color="textSecondary">
                            Pas de résultats annuels disponibles actuellement.
                    </Typography>
                        :
                        resultats.map(resultat =>
                            <div style={{marginTop:10}}>
                                <VoirResultat resultat={resultat} ></VoirResultat>
                            </div>
                        )}
                </CardContent>
            </Card>
    );
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, null)(ResultatsCard)