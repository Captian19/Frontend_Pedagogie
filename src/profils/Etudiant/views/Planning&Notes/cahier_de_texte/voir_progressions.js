import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ProgressionBox from '../../../../../components/Planning&Notes/cahier_de_texte_components/progression_box';
import { loadProgressionsClasse } from "../../../../../actions/Planning&Notes/cahier_de_texte_services";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";
import Typography from '@material-ui/core/Typography';
// Reducer
import { connect } from "react-redux";

// Some styling
const blueColor = "#2699FB";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        // width: "70%"
    },
    form: {
        '& > *': {
            margin: theme.spacing(1),
            // width: '25ch',
        },
    },
    icon: {
        '& > .fa': {
            margin: theme.spacing(2),
        },
    },
    button: {
        margin: theme.spacing(1),
    },
    paragraphe: {
        textAlign: 'start',
    }
}));


function Progressions(props) {
    const classes = useStyles();
    const [progressions, setProgressionState] = React.useState([]);
    const [loading, setLoadingState] = React.useState(true);
    const [role] = React.useState(() => {
        var current = {};
        props.auth.user.CurrentRoles.map(role => {
            if (role.role_type == "ETUDIANT") {
                current["annee"] = role.annee
                current["departement"] = role.departement;
                current["niveau"] = role.classe
            }
            // if (role.role_type == "RESPONSABLE_CLASSE") {
            //     current["is_res_classe"] = true;
            // }
        });
        return current;
    });

    React.useEffect(async () => {
        try {
            await loadProgressionsClasse(role.niveau, role.departement, role.annee).then(response => {
                setProgressionState(response.progressions ?? []);
                setLoadingState(false);
            });
        }catch(e){
            console.log(e);
            alert("Une erreur est survenue lors du chargement des données.")
        }
    }, []);
    return (
        <div className={classes.root} style={{ alignContent: "center" }}>
            {loading ?
                <div className="sweet-loading">
                    <ClipLoader
                        css={override}
                        size={150}
                        color={"#123abc"}
                        loading={loading}
                    />
                </div>
                :
                progressions.length == 0 ?
                    <div>

                        <Typography style={{ marginTop: 10, marginLeft: 15 }} variant="body1" color="textSecondary" component="p">Pas de cours ence moment.</Typography>
                        <Typography style={{ marginTop: 10, marginLeft: 15 }} variant="body2" color="textSecondary" component="p">Vérifier qu'au moins une des séances a été renseignée dans le cahier de texte.</Typography>
                    </div>

                    :
                    <React.Fragment>
                        <Typography style={{ marginTop: 5, marginLeft: 15, marginBottom: 5, }} align="center" variant="h4" color="textSecondary" component="p">Mes cours.</Typography>
                        <Grid container spacing={3} style={{ margin: 2 }}>
                            {progressions.map((progression, index) =>
                                <Grid item xs={12} sm={4} key={index}>
                                    <ProgressionBox progression={progression} printProf={true}></ProgressionBox>
                                </Grid>
                            )}
                        </Grid></React.Fragment>
            }


        </div>
    )


}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, null)(Progressions)
