import React,{useState,useEffect} from "react";

import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CCardGroup,
} from '@coreui/react';


import {
    CChartBar,
    CChartDoughnut,
} from '@coreui/react-chartjs'

import axios from 'axios';


const DetailsYear = (props) => {

    const [stats, setStats] = useState({}); 

    const getStats = () => {
        axios.get(`http://localhost:8000/api/auth/statistiques/${props.match.params.id}`)
        .then(res => {
            setStats(res.data);
        })
        .catch(err => console.log(err))
    }

    useEffect(() => getStats(),{})

    return(
        <CCard>
            <CCardHeader>
               Année Scolaire {stats.annee} 
            </CCardHeader>
            <CCardBody>
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
                Effectif
                </CCardHeader>
                <CCardBody>
                <CChartBar
                    type="bar"
                    datasets={[
                    {
                        label: 'Département',
                        backgroundColor: '#f87979',
                        data: [stats.effectifTC,stats.effectifGIT,stats.effectifGEM,stats.effectifGC,stats.effectifAERO]
                    }
                    ]}
                    labels={['TC','GIT','GEM','GC','AERO']}
                    options={{
                    tooltips: {
                        enabled: true
                    }
                    }}
                />
                </CCardBody>
                </CCard>
            </CCardGroup>
            <CCardGroup columns className = "cols-2">
                <CCard>
                    <CCardHeader>
                        Effecifs
                    </CCardHeader>
                    <CCardBody>
                    <CChartBar
                        type="bar"
                        datasets={[
                        {
                            label: 'Niveau',
                            backgroundColor: '#f87979',
                            data: [stats.effectifTC1,stats.effectifTC2,stats.effectifDIC1,stats.effectifDIC2,stats.effectifDIC3]
                        }
                        ]}
                        labels={['TC1','TC2','DIC1','DIC2','DIC3']}
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
                        Effecifs
                    </CCardHeader>
                    <CCardBody>
                    <CChartBar
                        type="bar"
                        datasets={[
                        {
                            label: 'Classe',
                            backgroundColor: '#f87979',
                            data: [stats.effectifDIC1GIT,stats.effectifDIC2GIT,stats.effectifDIC3GIT,0,stats.effectifDIC1GC,stats.effectifDIC2GC,stats.effectifDIC3GC,0,stats.effectifDIC1GEM,stats.effectifDIC2GEM,stats.effectifDIC3GEM,0,stats.effectifDIC1AER0,stats.effectifDIC2AERO,stats.effectifDIC3AERO]
                        }
                        ]}
                        labels={['DIC1 GIT','DIC2 GIT','DIC3 GIT','','DIC1 GC','DIC2 GC','DIC3 GC','','DIC1 GEM','DIC2 GEM','DIC3 GEM','','DIC1 AERO','DIC2 AERO','DIC3 AERO']}
                        options={{
                        tooltips: {
                            enabled: true
                        }
                        }}
                />
                    </CCardBody>
                </CCard>
            </CCardGroup>
            </CCardBody>
            </CCard>
    )
}

export default DetailsYear