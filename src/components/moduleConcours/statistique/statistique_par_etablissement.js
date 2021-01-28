import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
    Chart,
    ArgumentAxis,
    ValueAxis,
    BarSeries,
    Title,
    Tooltip,
} from '@devexpress/dx-react-chart-material-ui';


import { EventTracker } from '@devexpress/dx-react-chart';
import { ValueScale, Animation } from '@devexpress/dx-react-chart';
import { easeBounceOut } from 'd3-ease';
import {get_SessionsAll} from "../../../actions/moduleConcours/action_session";
import {
    edit_CandidatSession,
    get_CandidatSessionBySession
} from "../../../actions/moduleConcours/action_CandidatSession";
import {get_Lycees} from "../../../actions/moduleConcours/action_Lycee";
import {connect} from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import {Export} from "devextreme-react/bar-gauge";
// import {Export} from "devextreme-react/bar-gauge";

const styles = {
    titleText: {
        textAlign: 'left',
    },
};
const TextComponent = withStyles(styles)(({ classes, ...restProps }) => (
    <Title.Text {...restProps} className={classes.titleText} />
));

class Statistique_par_etablissement extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            sessions: [],
            lycees: [],
            lycees_ok: false,
            session_ok: false,
            candidats: [],
            candidats_ok: false,
            all_data: {},
            data: [],
        };
        this.changeData = this.changeData.bind(this);
    }
    getSessionsAndLycee = () => {
        this.props.get_SessionsAll().then(res => {
            this.setState({sessions: res.data.results, session_ok: true})
        }).catch(err => console.log(err))
        this.props.get_Lycees().then(res => {
            this.setState({lycees: res.data.results, lycees_ok:true})
        })
    }
    getCandidatBySession = async (year) => {
        await this.props.get_CandidatSessionBySession(year).then(res => {
            this.setState({candidats: res.data.results, candidats_ok:true})
        })
    }
    changeData(e) {
        this.getCandidatBySession(e.target.value).then(() => {
            if(this.state.candidats_ok && this.state.lycees_ok){
                let cand = {}
                let element = []
                this.state.lycees.map(e => {
                    cand['etablissement'] = e.nom_lycee;
                    let n = this.state.candidats.filter(el => el.lycee === e.nom_lycee).length;
                    element.push({'etablissement': e.nom_lycee, 'nombre_candidat': n})
                })
                this.setState({ data: element });
                console.log(element)
            }
        } )
    }

    componentDidMount = () => {
        this.getSessionsAndLycee();
}

    render() {
        const { data: chartData } = this.state;

        return (
            <div className="card">
                <div className="card-header">
                    <h3>Diagramme candidats par établissement et par sessions</h3>
                </div>
                <Paper>
                    <Chart
                        data={chartData}
                    >
                        <ValueScale name="nombre_candidat" />

                        <ArgumentAxis />
                        <ValueAxis scaleName="nombre_candidat" showGrid={true} showLine showTicks showLabels/>

                        <BarSeries
                            name="Repartition par etablissement"
                            valueField="nombre_candidat"
                            argumentField="etablissement"
                            scaleName="nombre_candidat"
                        />

                        {/*<SplineSeries*/}
                        {/*    name="Nombre de candidats"*/}
                        {/*    valueField="total"*/}
                        {/*    argumentField="month"*/}
                        {/*    scaleName="total"*/}
                        {/*/>*/}
                        <Animation duration={2000} easing={easeBounceOut} />
                        <Export enabled={true} />
                        <EventTracker />
                        <Tooltip />
                        <Title text="🏢 répartition par établissement" textComponent={TextComponent} />

                    </Chart>
                    <div className="row">
                        <div className="ml-4 pt-3 col-8 col-md-4">
                    <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="gender3">Session</label>
                    </div>
                    <select className="custom-select" onChange={this.changeData}>
                        <option hidden>Choisir l'année</option>
                        {this.state.session_ok ? this.state.sessions.map(sess => {
                            return <option key={sess.annee_session} value={sess.annee_session}>{sess.annee_session}</option>
                        }):(<>
                                <option>2021</option>
                            </>
                        )}
                    </select>
                    </div>
                        </div>
                    </div>
                </Paper>
            </div>

        );
    }
}
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps, {get_CandidatSessionBySession, get_SessionsAll, get_Lycees})(Statistique_par_etablissement)
