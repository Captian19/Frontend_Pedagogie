import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ProgressionBox from '../../../../../components/Planning&Notes/cahier_de_texte_components/progression_box';
import BigLineChart from '../../../../../components/Planning&Notes/cahier_de_texte_components/big_line_chart';
import { loadProgressionsClasse } from "../../../../../actions/Planning&Notes/cahier_de_texte_services";
import { loadPlanningsClasse } from "../../../../../actions/Planning&Notes/planning_services";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";
import Typography from '@material-ui/core/Typography';
// Reducer
import { connect } from "react-redux";
import { useParams } from 'react-router-dom';

import { getStyle, hexToRgba } from '@coreui/utils'
import LoadingSpinner from '../../../../../components/Planning&Notes/loading_spinner';

const brandSuccess = getStyle('success') || '#4dbd74'
const brandInfo = getStyle('info') || '#20a8d8'
const brandDanger = getStyle('danger') || '#f86c6b'

// Some styling
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
    const [loading_progressions, setLoadingProgressionsState] = React.useState(true);
    const [loading_plannings, setLoadingPlanningsState] = React.useState(true);

    const [nombre_heures_cours_state, setNombreHeuresCours] = React.useState([])
    const [nombre_absences_state, setNombreHeuresAbsences] = React.useState([])
    const [nombre_heures_absences_state, setNombreAbsences] = React.useState([])
    const [labels_state, setLabelsState] = React.useState([]);

    const { niveau, departement } = useParams();

    const [role] = React.useState(() => {
        var current_role = null;
        props.auth.user.CurrentRoles.map(role => {
            // console.log(role)
            if (role.role_type == "DIRECTEUR_DES_ETUDES") {
                return current_role = {
                    type: role.role_type,
                    id: role.id,
                    departement: "all",
                    annee: role.annee,
                };
            }
            else if (role.role_type == "CHEF_DE_DEPARTEMENT") {
                return current_role = {
                    type: role.role_type,
                    id: role.id,
                    departement: role.departement,
                    annee: role.annee,
                };
            }

        })
        return current_role;
    })

    React.useEffect(async () => {
        try{
        await loadPlanningsClasse(niveau, departement, role.annee).then(response => {
            var nombre_heures_cours = [];
            var nombre_absences = [];
            var nombre_heures_absences = [];
            var labels = [];
            response.map(planning => {
                var absences = 0;  // Le nombre d'absences du planning
                var heures_absences = 0;  // Le nombes d'heures d'absences du planning
                var heures_cours = 0;  // Le nombre d'heures de cours executées dans le planning
                JSON.parse(planning.seances).map(seance => {
                    const cahierSeance = JSON.parse(seance.cahierSeance)
                    const absents = cahierSeance.absents != "" ? cahierSeance.absents.split(",").map(x => +x).length : 0;
                    heures_cours += cahierSeance.nbHeures;
                    absences += absents;
                    heures_absences += (absents * cahierSeance.nbHeures);
                })
                nombre_heures_cours.push(heures_cours);
                nombre_absences.push(absences);
                nombre_heures_absences.push(heures_absences);
                labels.push(planning.dateDebut);
            })

            setNombreHeuresCours(nombre_heures_cours);
            setNombreAbsences(nombre_absences);
            setNombreHeuresAbsences(nombre_heures_absences);
            setLabelsState(labels);
            setLoadingPlanningsState(false);
        });
        await loadProgressionsClasse(niveau, departement, role.annee).then(response => {
            setProgressionState(response.progressions ?? []);
            setLoadingProgressionsState(false);
        });
    }catch(e){
        console.log(e);
        alert("Une erreur est survenue lors du chargement des données.")
        setLoadingPlanningsState(false);
        setLoadingProgressionsState(false);
    }
    }, []);
    const get_chart_infos = (label, data, backgroundColor, borderColor, pointHoverBackgroundColor) => {
        return {
            label: label,
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            pointHoverBackgroundColor: pointHoverBackgroundColor,
            borderWidth: 2,
            data: data
        };
    }
    return (
        <div className={classes.root} style={{ alignContent: "center" }}>
            {loading_progressions ?
                <div className="sweet-loading">
                    <ClipLoader
                        css={override}
                        size={150}
                        color={"#123abc"}
                        loading={loading_progressions}
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
                        {loading_plannings ?
                            <LoadingSpinner loadging={loading_plannings} />
                            :
                            <BigLineChart style={{ height: '300px', marginTop: '40px' }}
                                datasets={[
                                    get_chart_infos("Heures de cours", nombre_heures_cours_state, hexToRgba(brandInfo, 10), brandInfo, brandInfo),
                                    get_chart_infos("Absences", nombre_absences_state, 'transparent', brandSuccess, brandSuccess),
                                    get_chart_infos("Heures Absences", nombre_heures_absences_state, 'transparent', brandDanger, brandDanger),
                                ]}
                                labels={labels_state}
                            />
                        }
                        <Typography style={{ marginTop: 5, marginLeft: 15, marginBottom: 5, }} align="center" variant="h4" color="textSecondary" component="p">Les cours de la classe du {niveau} {departement}.</Typography>
                        <Grid container spacing={3} style={{ margin: 2 }}>
                            {progressions.map((progression, index) =>
                                <Grid item xs={12} sm={4} key={index}>
                                    <ProgressionBox progression={progression} role={role.type}></ProgressionBox>
                                </Grid>
                            )}
                        </Grid>
                    </React.Fragment>
            }


        </div>
    )


}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, null)(Progressions)
