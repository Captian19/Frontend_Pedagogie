import React, { Component } from 'react';
import { useState, useEffect } from "react";
import { loadPlanningsClasse, loadPlanningsProf } from "../../../../../actions/Planning&Notes/planning_services";
import LoadingSpinner from "../../../../../components/Planning&Notes/loading_spinner";
import Typography from '@material-ui/core/Typography';
import VoirPlanning from "../../../../Enseignant/views/Planning&Notes/planning/voir_planning";

// Reducer
import { connect } from "react-redux";

function VoirMesPlanning(props) {

    const [plannings, setPlanningsState] = useState([]);
    const [loading, setLoadingState] = useState(true);
    const [role] = useState(() => {
        var current = {};
        props.auth.user.CurrentRoles.map(role => {
            console.log(role)
            if (role.role_type == "ETUDIANT") {
                current["departement"] = role.departement;
                current["niveau"] = role.classe;
                current["annee"] = role.annee;
            }
            if (role.role_type == "RESPONSABLE_CLASSE") {
                current["is_res_classe"] = true;
                current["annee"] = role.annee;
            }
        });
        return current;
    });

    useEffect(async () => {
        try {
            await loadPlanningsClasse(role.niveau, role.departement, role.annee).then(plannings => {
                setPlanningsState(plannings);
                setLoadingState(false);
            })
        } catch (e) {
            console.log(e);
            setLoadingState(false);

        }
    }, [])

    return (
        loading ? <LoadingSpinner loading={loading} />
            :
            plannings.length == 0 ?
                <Typography variant="body1" color="textSecondary" component="p" align="center">Vous n'avez pas de planning pour l'instant <b>{props.auth.user.first_name}</b>.</Typography>
                :
                <VoirPlanning planning={plannings[0]} enseignant={false} />
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, null)(VoirMesPlanning)
