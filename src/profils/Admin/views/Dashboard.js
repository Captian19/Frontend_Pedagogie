import React,{useState,useEffect} from "react";

import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CCardGroup,
    CWidgetProgressIcon,
} from '@coreui/react';


import {
    CChartBar,
    CChartDoughnut,
} from '@coreui/react-chartjs'

import axios from 'axios';
import {connect} from "react-redux";

import CIcon from '@coreui/icons-react';

const Dashboard = (props) => {
    const [stats, setStats] = useState({});
    const [loading,setLoading] = useState(true);

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${props.token}`
        },
    }

    const getStats = () => {
        axios.get('https://users-ent.herokuapp.com/api/auth/statistiques')
        .then(res => {
            setStats(res.data);
            setLoading(false);
            console.log(res.data);
        })
        .catch(err => console.log(err));
    }

    useEffect(() => getStats(),{});

    return(
        <CCard>
        <CCardBody>
        <CCardHeader>
            Dashboard 
        </CCardHeader>
        <CRow>
            <CCol sm="12">
                <CCardGroup className="mb-4">
                <CWidgetProgressIcon
                header={stats.nbreUsersTotal}
                text="Nombre des utilisateurs"
                color="gradient-info"
                value={100}
                >
                <CIcon name="cil-people" height="78"/>
                </CWidgetProgressIcon>

                <CWidgetProgressIcon
                header={stats.nbreUsersActif}
                text="Nombre des utilisateurs actifs"
                color="gradient-success"
                value={(stats.nbreUsersActif/stats.nbreUsersTotal)*100}
                >
                <CIcon name="cil-userFollow" height="78"/>
                </CWidgetProgressIcon>

                <CWidgetProgressIcon
                header={"0"+stats.nbreUsersInactif}
                text="Nombre des utilisateurs inactifs"
                color="gradient-warning"
                value={(stats.nbreUsersInActif/stats.nbreUsersTotal)*100}
                >
                <CIcon name="cil-user-unfollow" height="78"/>
                </CWidgetProgressIcon>

                <CWidgetProgressIcon
                header={stats.nbreRole}
                text="Les différents profils"
                color="gradient-info"
                value={100}
                >
                <CIcon name="cil-list" height="78"/>
                </CWidgetProgressIcon>
        
                </CCardGroup>


                <CCardGroup>

                <CWidgetProgressIcon
                header={stats.annee}
                text="Année en cours"
                color="gradient-info"
                value="50"
                >
                <CIcon name="cil-list" height="78"/>
                </CWidgetProgressIcon>

                <CWidgetProgressIcon
                header={stats.nbreNiveau}
                text="Niveau"
                color="gradient-info"
                value={100}
                >
                <CIcon name="cil-list" height="78"/>
                </CWidgetProgressIcon>

                <CWidgetProgressIcon
                header={stats.nbreDepartement}
                text="Departement"
                color="gradient-info"
                value={100}
                >
                <CIcon name="cil-list" height="78"/>
                </CWidgetProgressIcon>

                <CWidgetProgressIcon
                header={stats.nbreAnnee}
                text="Les années scolaires"
                color="gradient-info"
                value={100}
                >
                <CIcon name="cil-speedometer" height="78"/>
                </CWidgetProgressIcon>

                </CCardGroup>
            </CCol>
        </CRow>
        </CCardBody>
        <CCardGroup columns className = "cols-2">
            <CCard>
            <CCardHeader>
                utilisateurs
            </CCardHeader>
            <CCardBody>
            <CChartDoughnut
                type="doughnut"
                datasets={[
                {
                    backgroundColor: [
                    '#41B883',
                    '#E46651',
                    '#00D8FF',
                    '#DD1B16',
                    '#F679B3'
                    ],
                    data: [stats.nbreEtudiantActuel, stats.nbreEnseignantActuel, stats.nbreMembreScolarite, stats.nbreMembreFinance, stats.nbreMembreBibliotheque]
                }
                ]}
                labels={['Etudiant', 'Enseignat', 'Scolarite', 'Finance', 'Bibliotheque']}
                options={{
                tooltips: {
                    enabled: true
                }
                }}
            />
            </CCardBody>
            </CCard>
            <CCard>
        <CCardHeader>
          Comptes
          <div className="card-header-actions">
            <a to="/admin/users" className="card-header-action">
              <small className="text-muted">Liste des utilisateurs</small>
            </a>
          </div>
        </CCardHeader>
        <CCardBody>
          <CChartBar
            type="bar"
            datasets={[
              {
                label: 'Statistique',
                backgroundColor: '#f87979',
                data: [stats.nbreUsersActif, stats.nbreUsersInActif]
              }
            ]}
            labels={['actif','inactif']}
            options={{
              tooltips: {
                enabled: true
              }
            }}
          />
        </CCardBody>
      </CCard>
        </CCardGroup>
        </CCard>
    )
}

const mapStateToProps = state => ({
    token: state.auth.token
})

export default connect(mapStateToProps,null)(Dashboard)