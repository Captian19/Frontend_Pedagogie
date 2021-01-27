// Ce composant renvoie l'ensemble des cours virtuels d'un département donné.

import React, { Component } from "react";
import { Table } from "reactstrap";
import {connect} from 'react-redux' ;
import axios from 'axios';
import {API_URL_COURS} from "../../../../../constants/pedagogie/index";


class CourseList extends Component {

    state = {
        modal: false,
        cours: [],
        coursProf:[],
        is_getted: false,
        is_chef_dpt: true,
        listeEnseignant:[]
    };


    // Recupération de l'ensemble des cours pour un département donné.
    getCoursDept(dept) {
        axios.get(`https://users-ent.herokuapp.com/api/auth/ENSEIGNANT/`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${this.props.token}`
            },
        })
               .then(res => { 
                 this.setState({listeEnseignant:res.data});
                })
                .then(() => {
                    axios.get(API_URL_COURS + "/departement/" + dept).then(res => {
                        let data = []
                        res.data.map(cours => {
                            let prof = this.state.listeEnseignant.filter(e => e.user.id === cours.id_prof)[0]
                            data.push({...cours,prof:prof})
                        })
                        this.setState({cours: data, is_getted: true})
                    console.log(data);
                })
               .catch(err => console.log(err))
    })
    };

    // Suppression d'un EC de la maquette
    handleDelete(id){
        axios.delete(API_URL_COURS + "/DEL/" + id)
        .then((data) =>{
            if(data){
                this.componentDidMount();
            }
        })
    }



    componentDidMount() {
        if(this.props.role.departement === undefined){
            this.getCoursDept(this.props.roles.departement);}
            else{
                this.getCoursDept(this.props.role.departement)
            }
    }

  render() {
    return (
      <Table striped bordered>
        <thead>
          <tr>
            <th className="text-center"><b><h4>Liste des Cours {this.props.role.departement || this.props.roles.departement}</h4></b></th>
            <th className="text-center"><b><h4>Professeurs</h4></b></th>
            <th className="text-center"><b><h4>Date de creation</h4></b></th>
            <th className="text-center"><b><h4>Action</h4></b></th>
          </tr>
        </thead>
        <tbody>
        {this.state.is_getted ? (
                        this.state.cours.map(cours => {
                            return(
                            <>
                                <tr>
                                    <td className="text-center" ><h5>{cours.ec.nom}</h5></td>
                                    <td className="text-center" ><h5>{cours.prof ? cours.prof.user.first_name + " " + cours.prof.user.last_name : ''}</h5></td>
                                    <td className="text-center" ><h5>{cours.dateCreation}</h5></td>
                                    <td className="text-center"><h4 className="btn bg-github" value={cours.id}
                                                                                              onClick={() => this.handleDelete(cours.id)}>del</h4></td>
                                </tr>
                            </>
                            )}))
                            :
                            (
                                "Ops, aucun cours disponible pour le moment" 
                            )}
        </tbody>
        </Table>
    )
}
}
                                





const mapStateToProps = state => ({
    user:state.auth.user,
    role: state.auth.user.CurrentRoles[0],
    roles: state.auth.user.CurrentRoles[1],
    token:state.auth.token
})

export default connect(mapStateToProps,null)(CourseList);