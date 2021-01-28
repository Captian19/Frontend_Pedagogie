import React from 'react';
import { Chart } from 'react-google-charts';
import {get_CandidatSessionBySession, get_CandidatSessions} from "../../../actions/moduleConcours/action_CandidatSession";
import {get_Candidats} from "../../../actions/moduleConcours/action_Candidat";
import {get_Lycees} from "../../../actions/moduleConcours/action_Lycee";
import {connect} from "react-redux";
import Chartkick, { LineChart, PieChart } from 'react-chartkick'
import 'chart.js'

const Statistique_Par_Centre = (props) => {
    const [candidats, setCandidats] = React.useState([]);
    const [total, setTotal] = React.useState(60)
    const [admis, setAdmis] = React.useState([]);
    const [adh, setAdh] = React.useState([]);
    const [chartD, setChartD] = React.useState([]);
    const chartData = [
        ['Task', 'Candidats par genre'],
        ['Masculin', 150],
        ['Feminin', 50],
    ];

    const [chartD2, setChartD2] = React.useState([]);
    const chartData2 = [
        ['Task', 'Candidats inscrits ou non par la scolarite'],
        ['inscrit par la scolarité', 110],
        ['adhèrents', 575],
    ];
    const admisDefault = [
        ['lycee', 'Total reussite'],
        ['Limamoulaye', 12],
        ['Yavuz Selim', 20],
        ['Prytanee Militaire', 7],
        ['Lycee de Mbao', 54],
        ['Lycee de Rufisque', 22],
        ['Lycee Mame Cheikh Mbaye', 3],
        ['Educazur', 42],
        ['Galandou Diouf', 33],
    ]
    const getCandidatsSession = (year) => {
         props.get_CandidatSessionBySession(year).then(response => {
            let table = []
            let cands = response.data.results;
            setCandidats(response.data.results);
            table.push(['Task', 'Candidats par genre'])
            table.push(['Masculin', cands.filter(e => e.sexe === 'M').length]);
            table.push(['Feminin', cands.filter(e => e.sexe === 'F').length]);
            setChartD(table)
             getCandidatsAdherents(response.data.count);
             getLycees(response.data.results);
        }).catch(error => console.log(error))
    }
    const getLycees = (candidat) => {
        let tab = [];
        tab.push(['lycee', 'Total reussite'])
        props.get_Lycees().then(response => {
            let candidat_admis = [...candidat.splice(0, 7)]
            response.data.results.map(l => {
                let p = candidat_admis.filter(cand => cand.lycee === l.nom_lycee).length;
                if(p !== 0)
                    tab.push([`${l.nom_lycee}`, p])
            })
            setAdmis(tab)
            console.log(tab)
        })
    }
    const getCandidatsAdherents = (total) => {
        props.get_Candidats()
            .then(response => {
                setAdh(response.data.results);
                let tab = []
                tab.push(['Task', 'Candidats inscrits ou non par la scolarite'])
                tab.push(['inscrit par la scolarité', total - response.data.count]);
                tab.push(['adhèrents', response.data.count]);
                setChartD2(tab)
            })
            .catch(error => console.log(error))
    }
    React.useEffect(() => {
        getCandidatsSession(new Date().getFullYear());
    }, [])

    return (
        <>
            <div className="container">
                <div className="card">

                    <LineChart xtitle="année"
                               ytitle="nombre de candidats"
                               title="Repartition des candidats par sexe"
                               library={{backgroundColor: "#96c8d6"}}
                               messages={{empty: "CONCOURS EPT pas de données disponibles!"}}
                               data={[{
                                        "name": "nombre de candidats (sexe masculin)",
                                        "data": {
                                            "2013": 2050,
                                            "2014": 2950,
                                            "2015": 1950,
                                            "2016": 2650,
                                            "2017": 2500,
                                            "2018": 2750,
                                            "2019": 2400,
                                            "2020": 3000
                                        }
                                    }, {
                                        "name": "nombre de candidats (sexe feminin)",
                                        "data": {
                                            "2013": 1050,
                                            "2014": 1950,
                                            "2015": 1020,
                                            "2016": 650,
                                            "2017": 1500,
                                            "2018": 1750,
                                            "2019": 1400,
                                            "2020": 1000
                                        }
                                    }]}
                               download={true} />
                </div>
            </div>
        <div className="card">

            <div className="row">
                <div className="col md-6">
                    <Chart
                        width={'500px'}
                        height={'500px'}
                        chartType="PieChart"
                        loader={<div align="center">Chargement du diagramme...</div>}
                        data={chartD2.length > 0 ? chartD2 : chartData2}
                        options={{
                            title: `Candidats de la session ${new Date().getFullYear()} (adhèrents ou non)`,
                            // Just add this option
                            is3D: true,
                        }}
                        rootProps={{ 'data-testid': '2' }}
                    />
                </div>
                <div className="col md-6">
                    <Chart
                        width={'500px'}
                        height={'500px'}
                        chartType="PieChart"
                        loader={<div align="center">Chargement du diagramme...</div>}
                        data={chartD.length > 0 ? chartD : chartData}
                        options={{
                            title: `Candidats de la session ${new Date().getFullYear()} (répartition par sexe)`,
                            // Just add this option
                            is3D: true,
                        }}
                        rootProps={{ 'data-testid': '2' }}
                    />
                </div>
            </div>

        </div>
            <div className="container">
                <div className="heading">
                    <h3>
                        Reussite par établissement: session {new Date().getFullYear()}
                    </h3>
                </div>
                <Chart
                    width={'100%'}
                    height={'100%'}
                    chartType="BarChart"
                    loader={<div align={"center"}>Chargement du diagramme...</div>}
                    data={admis.length > 0 ? admis : [
                        ['lycee', 'Total reussite'],
                        ['Limamoulaye', 12],
                        ['Yavuz Selim', 20],
                        ['Prytanee Militaire', 7],
                        ['Lycee de Mbao', 54],
                        ['Lycee de Rufisque', 22],
                        ['Lycee Mame Cheikh Mbaye', 3],
                        ['Educazur', 42],
                        ['Galandou Diouf', 33],
                    ]}
                    rootProps={{ 'data-testid': '3' }}
                    chartPackages={['corechart', 'controls']}
                    controls={[
                        {
                            controlType: 'StringFilter',
                            options: {
                                axes: {
                                    y: {
                                        1: {side: 'right'},
                                    },
                                },
                                filterColumnIndex: 0,
                                matchType: 'any', // 'prefix' | 'exact',
                                ui: {
                                    label: 'Chercher par lycee',
                                    placeholder: 'nom du lycee'
                                },

                            },
                        },
                    ]}
                />
            </div>

        </>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps, {get_Lycees, get_Candidats, get_CandidatSessions, get_CandidatSessionBySession})(Statistique_Par_Centre);