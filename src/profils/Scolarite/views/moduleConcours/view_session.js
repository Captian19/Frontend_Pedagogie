// Y mettre formulaire emploi du temps

import React, { Component } from "react";
import {
    CCard,
} from '@coreui/react';

import Vue_Session from '../../../../components/moduleConcours/session/vue_session';

import {connect} from "react-redux";
import {edit_Session, add_Session, get_LatestSession} from "../../../../actions/moduleConcours/action_session";
import {add_Calendrier, edit_Calendrier, get_CalendriersBySession} from "../../../../actions/moduleConcours/action_calendrier";


class View_Session extends Component {

    constructor(props) {
        super(props);
        this.state = {
            new_session: {
                annee_session: "",
                ponderation_bac: 0.5,
                ponderation_lycee: 0.1,
                ponderation_concours: 0.4,
                etat_session: 0
            },
            calendrier_insc: {
                etat_session: "1",
                start: "",
                end: ""
            },
            calendrier_conc: {
                etat_session: "2",
                start: "",
                end: ""
            },
            calendrier_final: {
                etat_session: "3",
                start: "",
                end: ""
            },
            calendrier:{
                etat_session: "1",
                start: "",
                end: ""
            },
            liste_cal: [],
            list_is_getted: false,
            calendrier1_is_created: false,
            calendrier2_is_created: false,
            calendrier3_is_created: false,
            calendrier1_updated: false,
            calendrier2_updated: false,
            calendrier3_updated: false,
            id_cal: "",
            id_cal2: "",
            id_cal3: "",
            new_session_created: false,
            new_session_update: false,
            id_session: ""
        }

        this.handleChangeSess = this.handleChangeSess.bind(this);
        this.handleChangeState = this.handleChangeState.bind(this);
        this.handleChangeCal = this.handleChangeCal.bind(this);
        this.handleChangeIns = this.handleChangeIns.bind(this);
        this.handleChangeConc = this.handleChangeConc.bind(this);
        this.handleChangeFin = this.handleChangeFin.bind(this);
        this.handleSubmitCal = this.handleSubmitCal.bind(this);
        this.handleSubmitSess = this.handleSubmitSess.bind(this);

    }

    async checkIfSession(){
       await this.props.get_Sessions().then(res => {
               if (res.data.annee_session === new Date().getFullYear())
               {
                   let sess = {
                       ...this.state.new_session,
                       "annee_session": res.data.annee_session,
                       "etat_session": res.data.etat_session,
                       "ponderation_bac": res.data.ponderation_bac
                   };
                   this.setState({
                       new_session: sess,
                       new_session_created: true,
                       id_session: res.data.id
                   })
               }

        }).catch(err => {
            console.log(err);
           this.setState({
               new_session_created: false
           })
       })
    }

    checkIfCalendrier(n, year){
        this.props.get_CalendriersBySession(year).then(res => {
            let list_cal = res.data.results
            if (list_cal.length > 0){
                if(list_cal.length === 3)
                    this.setState({liste_cal: list_cal, list_is_getted: true})
                let found = list_cal.filter(cal => cal.etat_session === n)[0]
                console.log(found);
                if (found !== undefined) {
                    let id_cal = found.id;
                    delete found.id
                    delete found.session
                    switch(n){
                        case 1:
                            this.setState({
                                calendrier: {},
                                id_cal: id_cal,
                                calendrier1_is_created: true
                            })
                            break;
                        case 2:
                            this.setState({
                                calendrier: {},
                                id_cal2: id_cal,
                                calendrier2_is_created: true
                            })
                            break;
                        case 3:
                            this.setState({
                                calendrier: {},
                                id_cal3: id_cal,
                                calendrier3_is_created: true
                            })
                            break;
                        default:
                            return console.log("nothing")
                    }
                }else{
                    switch(n){
                        case 1:
                            this.setState({
                                calendrier1_is_created: false
                            })
                            break;
                        case 2:
                            this.setState({
                                calendrier2_is_created: false
                            })
                            break;
                        case 3:
                            this.setState({
                                calendrier3_is_created: false
                            })
                            break;
                        default:
                            return console.log("nothing")
                    }
                }

            }
        }).catch(err => console.log(err))
    }

    handleChangeSess(e){
        let {name, value} = e.target;
        let state_i = {...this.state.new_session, [name]: value}
        this.setState({
            new_session: state_i
        });
        console.log(state_i)
    }

    handleChangeState(e){
        let {name, checked} = e.target;
        let state_i = {...this.state.new_session, [name]: Number(checked)}
        this.setState({
            new_session: state_i,
            new_session_created: true
        });
        console.log(state_i)
    }

    handleChangeCal(e){
        let {name, value} = e.target;
        let state_i = {...this.state.calendrier, [name]: value}
        this.setState({
            calendrier: state_i
        });
        console.log(state_i)
    }

    handleChangeIns(e){
        let {name, value} = e.target;
        let state_i = {...this.state.calendrier_insc, [name]: value}
        this.setState({
            calendrier_insc: state_i,
            calendrier: state_i
        });
        console.log(state_i)
    }

    handleChangeConc(e){
        let {name, value} = e.target;
        let state_i = {...this.state.calendrier_conc, [name]: value}
        this.setState({
            calendrier_conc: state_i,
            calendrier: state_i
        });
        console.log(state_i)
    }
    handleChangeFin(e){
        let {name, value} = e.target;
        let state_i = {...this.state.calendrier_final, [name]: value}
        this.setState({
            calendrier_final: state_i,
            calendrier: state_i
        });
        console.log(state_i)
    }
    // this.props.edit_Session(this.state.id_session, this.state.new_session).then( res => this.setState({new_session_created: true}))
    handleSubmitSess(e){
        e.preventDefault();
        switch (this.state.new_session_created){
            case true:
                return this.props.edit_Session(this.state.id_session, this.state.new_session).then( res => {
                    let sess = {
                        ...this.state.new_session,
                        "annee_session": res.data.annee_session,
                        "etat_session": res.data.etat_session
                    }
                    this.setState({
                        new_session_created: true,
                        new_session_updated: true,
                        id_session: res.data.id,
                        new_session: sess
                    });
                    console.log(res.data)
                }).catch( e => {
                    console.log(e);
                    this.props.add_Session(this.state.new_session).then((res)=> {
                        this.setState({new_session_created: true, id_session: res.data.id});
                        console.log(res.data)
                    }).catch((err) => {
                        console.log(err)
                    });
                })
            case false:
                return this.props.add_Session(this.state.new_session).then((res)=> {
                    this.setState({new_session_created: true, id_session: res.data.id});
                    console.log(res.data)
                }).catch((err) => {
                    console.log(err)
                });
            default:
                return console.log("Konoyaru")
        }
    }

    handleSubmitCal(e){
        e.preventDefault();
        switch (this.state.calendrier.etat_session){
            case "1":
                switch(this.state.calendrier1_is_created){
                    case false:
                        return this.props.add_Calendrier(this.state.calendrier_insc).then(res => {
                            let id_cal = res.data.id
                            delete res.data.id
                            delete res.data.info
                            delete res.data.session
                            let cal = {
                                ...this.state.calendrier,
                                ...res.data
                            }
                            this.setState({
                                calendrier1_is_created: true,
                                calendrier: {},
                                id_cal: id_cal
                            })
                        })
                    case true:
                        return this.props.edit_Calendrier(this.state.id_cal, this.state.calendrier_insc).then(res => {
                            let id_cal = res.data.id
                            delete res.data.id
                            delete res.data.info
                            delete res.data.session
                            let cal = {
                                ...this.state.calendrier,
                                ...res.data
                            }
                            this.setState({
                                calendrier1_is_getted: true,
                                calendrier1_updated: true,
                                calendrier: {},
                                id_cal: id_cal
                            })
                        })
                }
                break;
            case "2":
                switch(this.state.calendrier2_is_created){
                    case false:
                        return this.props.add_Calendrier(this.state.calendrier_conc).then(res => {
                            let id_cal = res.data.id
                            delete res.data.id
                            delete res.data.info
                            delete res.data.session
                            let cal = {
                                ...this.state.calendrier,
                                ...res.data
                            }
                            this.setState({
                                calendrier2_is_created: true,
                                calendrier: {},
                                id_cal2: id_cal
                            })
                        })
                    case true:
                        return this.props.edit_Calendrier(this.state.id_cal2, this.state.calendrier_conc).then(res => {
                            let id_cal = res.data.id
                            delete res.data.id
                            delete res.data.info
                            delete res.data.session
                            let cal = {
                                ...this.state.calendrier,
                                ...res.data
                            }
                            this.setState({
                                calendrier2_is_getted: true,
                                calendrier2_updated: true,
                                calendrier: {},
                                id_cal2: id_cal
                            })
                        })
                }
                break;
            case "3":
                switch(this.state.calendrier3_is_created){
                    case false:
                        return this.props.add_Calendrier(this.state.calendrier_final).then(res => {
                            let id_cal = res.data.id
                            delete res.data.id
                            delete res.data.info
                            delete res.data.session
                            let cal = {
                                ...this.state.calendrier,
                                ...res.data
                            }
                            this.setState({
                                calendrier3_is_created: true,
                                calendrier: {},
                                id_cal3: id_cal
                            })
                        })
                    case true:
                        return this.props.edit_Calendrier(this.state.id_cal3, this.state.calendrier_final).then(res => {
                            let id_cal = res.data.id
                            delete res.data.id
                            delete res.data.info
                            delete res.data.session
                            let cal = {
                                ...this.state.calendrier,
                                ...res.data
                            }
                            this.setState({
                                calendrier3_is_getted: true,
                                calendrier3_updated: true,
                                calendrier: {},
                                id_cal3: id_cal
                            })
                        })
                }
                break;
        }

    }

    componentDidMount(){
        this.checkIfSession().then(() => {
            console.log(this.state.new_session_created);
            if(this.state.new_session_created){
                this.checkIfCalendrier(1, this.state.new_session.annee_session);
                this.checkIfCalendrier(2, this.state.new_session.annee_session);
                this.checkIfCalendrier(3, this.state.new_session.annee_session);
            }

        });
    }

    render(){
       
        return(
            <>
            <CCard>
                <Vue_Session state={this.state}
                        handleChangeSess={this.handleChangeSess}
                        handleChangeCal={this.handleChangeCal}
                        handleChangeIns={this.handleChangeIns}
                        handleChangeConc={this.handleChangeConc}
                        handleChangeFin={this.handleChangeFin}
                        handleSubmitSess={this.handleSubmitSess}
                        handleSubmitCal={this.handleSubmitCal}
                        handleChangeState={this.handleChangeState}
                />
            </CCard>
            </>
        );
    }
}
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps, {add_Calendrier, edit_Calendrier, get_CalendriersBySession, add_Session, edit_Session, get_Sessions: get_LatestSession})(View_Session);