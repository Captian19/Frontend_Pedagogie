import React from 'react'
import {
    CBadge,
    CCardHeader,
    CCol,
    CProgress,
    CRow,
    CCallout
} from '@coreui/react'
import { loadProgressionsClasse } from '../../../actions/Planning&Notes/cahier_de_texte_services';
import LoadingSpinner from '../loading_spinner';


export default function ProgressionOverview(props) {

    const [progressions, setProgressionsState] = React.useState([]);
    const [executed, setExecutedState] = React.useState(0)
    const [total, setTotalState] = React.useState(0)
    const [loading, setLoadingState] = React.useState(true);

    React.useEffect(async () => {
        try {
            await loadProgressionsClasse(props.niveau, props.departement, props.annee).then(res => {
                var total_exec = 0;
                res.progressions.map((progression) => {
                    total_exec += progression.nbHeuresExecutees;
                })
                setExecutedState(total_exec);
                setTotalState(res.total_heures);
                setProgressionsState(res.progressions);
                setLoadingState(false);
            })
        } catch (e) {
            alert("Une erreur est survenue lors de la récupération des progressions des cours.");
            setLoadingState(false);
            console.log(e) }
    }, [])
    return (
        loading ?
            <LoadingSpinner loading={loading} />
            :
            progressions.length == 0 ?
                <CCardHeader>
                    Pas de progressions en ce moment.
                </CCardHeader>
                :
                <React.Fragment>

                    <CCardHeader>
                        Progression des cours de la {props.niveau + "-" + props.departement}
                    </CCardHeader>
                    <CCol xs="12" md="12" xl="12" style={{ marginBottom: 20 }}>

                        <CRow>
                            <CCol sm="6">
                                <CCallout color="info">
                                    <small className="text-muted">Total d'heures exécuteés</small>
                                    <br />
                                    <strong className="h4">{executed}</strong>
                                </CCallout>
                            </CCol>
                            <CCol sm="6">
                                <CCallout color="danger">
                                    <small className="text-muted">Total d'heures de cours</small>
                                    <br />
                                    <strong className="h4">{total}</strong>
                                </CCallout>
                            </CCol>
                        </CRow>

                        <hr className="mt-0" />
                        <CRow>

                            {progressions.map((progression) =>

                                <CCol sm="6">


                                    <div className="progress-group mb-4">
                                        <div className="progress-group-prepend">
                                            <span className="progress-group-text">
                                                {progression.cours.nom}
                                            </span>
                                        </div>
                                        <div className="progress-group-bars">
                                            <small style={{ fontSize: 10 }} className="text-muted">{progression.nbHeuresExecutees}</small>
                                            <CProgress label="Helllo" name="Hello" content="Hello" className="progress-xs" color="info" value={progression.nbHeuresExecutees} />

                                            <small style={{ fontSize: 10 }} className="text-muted">{progression.cours.CM + progression.cours.TD_TP}</small>
                                            <CProgress className="progress-xs" color="danger" value={progression.cours.CM + progression.cours.TD_TP} />
                                        </div>
                                    </div>
                                </CCol>
                            )}
                        </CRow>

                        <div className="legend text-center">
                            <small>
                                <sup className="px-1"><CBadge shape="pill" color="info">&nbsp;</CBadge></sup>
                            Nombre d'heures exécutées.
                            &nbsp;
                            <sup className="px-1"><CBadge shape="pill" color="danger">&nbsp;</CBadge></sup>
                            Nombre total d'heures.
                        </small>
                        </div>
                    </CCol>
                </React.Fragment>
    )
}