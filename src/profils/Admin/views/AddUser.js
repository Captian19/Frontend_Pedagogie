import React, { useState, useEffect } from "react"

import {CCard, CCardHeader, CCardBody,CCol, CRow,
} from '@coreui/react'

import {connect} from "react-redux";
import axios from "axios";

import {useForm} from "react-hook-form";

const AddUser = (props) => {

    const [roles, setRoles] = useState([]);
    const [classes, setClasses] = useState([]);
    const [departements, setDepartments] = useState([]);
    const [annees, setAnnee] = useState([]);
    const [message, setMessage] = useState('');

    const {register, handleSubmit} = useForm()

    const onSubmit = data => {
        const body = JSON.stringify(data);
        axios.post("https://users-ent.herokuapp.com/api/auth/admin/addUser",body,config)
        .then(res => {
            setMessage(res.data.message);
        })
        .catch(err => {
            setMessage(err.response.data.message);
        })
    }

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${props.token}`
        },
    }

    const getListRoles = () => {
        axios.get("https://users-ent.herokuapp.com/api/roles",config)
        .then(res => {
            setRoles(res.data);
        })
        .catch(err => console.log(err));
    }

    const getListClasses = () => {
        axios.get("https://users-ent.herokuapp.com/api/classes",config)
        .then(res => {
            setClasses(res.data);
        })
        .catch(err => console.log(err));
    }

    const getListDepartements = () => {
        axios.get("https://users-ent.herokuapp.com/api/departements",config)
        .then(res => {
            setDepartments(res.data);
        })
        .catch(err => console.log(err));
    }

    const getListAnnee = () => {
        axios.get('https://users-ent.herokuapp.com/api/anneescolaires',config)
        .then(res => {
            setAnnee(res.data);
        })
        .catch(err => console.log(err));
    }

    useEffect(() => {
        getListRoles();
        getListClasses();
        getListDepartements();
        getListAnnee();
    },[])


    return (
        <CRow>
        <CCol xs="12" sm="6">
        <CCard sm="12" lg="6">
        <CCardHeader>
          Ajouter un utilisateur
        </CCardHeader>
        <CCardBody>
        
            <form onSubmit={handleSubmit(onSubmit)}>
                {message ? <div className="alert alert-info">{message}</div> : ""}
                <div class="form-row">
                    <div class="form-group col-md-6">
                    <label for="inputEmail4">Prénom</label>
                    <input type="text" class="form-control" id="inputEmail4" name="first_name" ref={register({required:true})} />
                    </div>
                    <div class="form-group col-md-6">
                    <label for="inputPassword4">Nom</label>
                    <input type="text" class="form-control" id="inputPassword4" name="last_name" ref={register({required: true})} />
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                    <label for="inputEmail4">Email</label>
                    <input type="email" class="form-control" id="inputEmail4" name="email" ref={register({required:true})} />
                    </div>
                    <div class="form-group col-md-6">
                    <label for="inputPassword4">Password</label>
                    <input type="password" class="form-control" id="inputPassword4" name="password" ref={register({required: true})} />
                    </div>
                </div>
                <div class="form-group">
                    <label for="inputRole">Sexe</label>
                    <select id="inputRole" class="form-control" name="id" ref={register({required:true})}>
                        <option value="M">Homme</option>
                        <option value="F">Femme</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="inputRole">Role</label>
                    <select id="inputRole" class="form-control" name="id" ref={register({required:true})}>
                        <option selected>Choisir un role</option>
                        {roles.map(role => <option key={role.id} value={role.id}>{role.role_type} {role.classe} {role.departement}</option>)}
                    </select>
                </div>
                <div class="form-group">
                    <label for="inputRole">Année Scolaire</label>
                    <select id="inputRole" class="form-control" name="id" ref={register({required:true})}>
                        <option selected>Choisir une année scolaire</option>
                        {annees.map(annee => <option key={annee.id} value={annee.id}>{annee.alias}</option>)}
                    </select>
                </div>
                <button type="submit" class="btn btn-primary">Créer compte</button>
            </form>
        
        </CCardBody>
        </CCard>
        </CCol>
        <CCol xs="12" sm="6">
        <CCard xs="12" sm="6">
            <CCardHeader>
                Ajouter un nouveau role
            </CCardHeader>
            <CCardBody>
            <form>
                <div class="form-group">
                    <label for="inputRole">Type Role</label>
                    <input type="text" class="form-control" id="inputRole" />
                </div>
                <div class="form-group">
                    <label for="inputRole">Classe</label>
                    <select id="inputRole" class="form-control">
                        <option selected>Choisir une classe</option>
                        <option value="">Null</option>
                        {classes.map(classe => <option key={classe.id} value={classes.id}>{classe.niveau} {classe.departement}</option>)}
                    </select>
                </div>
                <div class="form-group">
                    <label for="inputRole">Département</label>
                    <select id="inputRole" class="form-control">
                        <option selected>Choisir un département</option>
                        <option value="">Null</option>
                        {departements.map(departement => <option key={departement.id} value={departement.id}>{departement.nom_dept}</option>)}
                    </select>
                </div>
                <button type="submit" class="btn btn-primary">Ajouter</button>
            </form>
            </CCardBody>
        </CCard>
        </CCol>
        </CRow> 
    )
}

const mapStateToProps = state => ({
    token: state.auth.token
})

export default connect(mapStateToProps,null)(AddUser)