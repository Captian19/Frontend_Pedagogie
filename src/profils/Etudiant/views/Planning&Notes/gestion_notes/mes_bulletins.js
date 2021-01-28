import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LoadingSpinner from "../../../../../components/Planning&Notes/loading_spinner";
import { connect } from 'react-redux';
import VoirResultat from '../../../../../components/Planning&Notes/gestion_notes_components/voir_resultat_annuel';
import { loadAllBulletinsEleve, loadBulletinEleve, simulerBulletin } from '../../../../../actions/Planning&Notes/gestion_notes_services';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import See from '@material-ui/icons/More';
import Simuler from '@material-ui/icons/FindInPage';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 1000,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 18,
    },
    pos: {
        marginBottom: 12,
    },
    button: {
        margin: theme.spacing(1),
    },
}));


function MesBulletins(props) {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    const [resultats, setResultatsState] = React.useState([]);
    const [current_resultat, setCurrentResultatState] = React.useState({});
    const [loading, setLoadingState] = React.useState(true);
    const [id_user] = React.useState(() => props.auth.user.id);
    const [see_all, setSeeAllState] = React.useState(false);
    const [simuler_bulletin, setSimulerBulletinState] = React.useState(false);  // Will bi true if the user simulate the bulletin
    const [bulletin_simule, setBulletinSimuleState] = React.useState(null);  // The simulated bulletin

    const { eleve, user } = useParams();

    const [role] = React.useState(() => {
        var current = null;
        props.auth.user.CurrentRoles.map(role => {
            if (role.role_type == "ETUDIANT") current = role;
            if (role.role_type === "CHEF_SCOLARITE" || role.role_type === "ASSISTANT_CHEF_DEPARTEMENT") current = role;
        });
        return null;
    });
    console.log(props.auth)
    React.useEffect(async () => {
        try {
            await loadBulletinEleve(eleve ?? role.id).then((response) => {
                setCurrentResultatState(response ?? null)

            });
            await loadAllBulletinsEleve(user ?? id_user).then((response) => {
                setResultatsState(response ?? []);
                setLoadingState(false);
            });
        } catch (e) {
            console.log(e);
            alert("Pas de résultats annuels disponibles pour le moment.")
            setLoadingState(false);
        }
    }, [])
    const simuler = async () => {
        setSimulerBulletinState(true);
        try {
            await simulerBulletin(role.classe, role.departement, role.id).then(response => {
                setBulletinSimuleState(response.data);
            });
        } catch (e) {
            console.log(e)
            alert("Pas de simulation possible pour le moment.")
        }
        setSimulerBulletinState(false);
    }
    const set_see_all = () => setSeeAllState(!see_all);
    return (
        <React.Fragment>
            {role != null ?
                simuler_bulletin ?
                    <LoadingSpinner size={30} />
                    :
                    bulletin_simule == null ?
                        <Button className={classes.button} startIcon={<Simuler />} color="primary" onClick={simuler}>
                            Simuler Bulletin
                    </Button>
                        :
                        <Typography className={classes.pos} color="textSecondary">
                            Après simulation, vous avez une moyenne de {bulletin_simule.moyenne_generale ?? bulletin_simule.moyenne_generale} pour ce semestre.
                    </Typography>
                :
                null
            }
            {loading ?
                <LoadingSpinner loading={loading} />
                :
                <Grid container xs={12} sm={12}>
                    <Grid item xs={12} sm={12}>
                        {resultats.length == 0 ?
                            <Typography className={classes.pos} color="textSecondary">
                                Pas de résultats annuels disponibles actuellement.
                            </Typography>
                            :
                            <VoirResultat resultat={current_resultat} print={false}></VoirResultat>
                        }
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        {
                            see_all == false ?
                                <Button variant="contained"
                                    style={{ margin: 15 }}
                                    color="secondary"
                                    className={classes.button}
                                    startIcon={<See />} onClick={set_see_all}>Voir tous les resultats
                                </Button>
                                :
                                <div style={{ marginTop: 10 }}>
                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                        Tous résultats annuels.
                                    </Typography>
                                    {resultats.length == 0 ?
                                        <Typography className={classes.pos} color="textSecondary">
                                            Pas de résultats annuels disponibles actuellement.
                                        </Typography>
                                        :
                                        resultats.map(resultat =>
                                            <VoirResultat resultat={resultat} print={role.role_type === "CHEF_SCOLARITE" || role.role_type === "ASSISTANT_CHEF_DEPARTEMENT" ? true : false}></VoirResultat>
                                        )}
                                </div>
                        }
                    </Grid>
                </Grid>
            }
        </React.Fragment>
    );
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, null)(MesBulletins);