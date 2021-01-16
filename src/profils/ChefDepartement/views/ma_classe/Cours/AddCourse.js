import React, { useState, useEffect } from "react"

import {CCard, CCardHeader, CCardBody,CCol, CRow, CFormGroup, CLabel, CTextarea
} from '@coreui/react'

import {connect} from "react-redux";
import axios from "axios";

import {useForm} from "react-hook-form";
import { API_URL_EC, API_URL_UE } from "../../../../../constants/pedagogie/index";

const AddCourse = (props) => {

    const [EC, setEC] = useState([]);
    const [classes, setClasses] = useState([]);
    const [professeurs, setProfesseurs] = useState([]);
    const [departements, setDepartements] = useState([]);
    const chefDept = props.roles.map((role) => {
        if(role.role_type == "CHEF_DE_DEPARTEMENT") {
            return role.departement
        }
    })
    const {register, handleSubmit} = useForm()

    const onSubmit = data => {
        console.log(data);
        axios.post(`http://localhost:8000/cours_virtuel/create`,data )
        .then(res => {
            alert("Cours ajouté avec succès");
            console.log(res.data);
            setClasses([]);
            setProfesseurs([]);
            setEC([]);
            setDepartements([]);
        })
        .catch(err => {
            console.log("Amou", err);
        })
    }

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${props.token}`
        },
    }

    const getListEC = () => {
        axios.get(API_URL_EC) //  + "/" + chefDept
        .then(res => {
            setEC(res.data);
            console.log(res.data);
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

    const getDepartements = () => {
        axios.get("https://users-ent.herokuapp.com/api/departements",config)
        .then(res => {
            setDepartements(res.data);
        })
        .catch(err => console.log(err));
    }

    const getListProfesseurs = () => {
        axios.get("https://users-ent.herokuapp.com/api/auth/ENSEIGNANT/",config)
        .then(res => {
            setProfesseurs(res.data);
            console.log(res.data);
        })
        .catch(err => console.log(err));
    }


    useEffect(() => {
        getListEC();
        getListClasses();
        getListProfesseurs();
        getDepartements();
    },[])


    return (
        <CRow>
        <CCol xs="12" sm="6">
        <CCard xs="12" sm="6">
            <CCardHeader>
                Nouveau Cours Virtuel {chefDept}
            </CCardHeader>
            <CCardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div class="form-group">
                    <label for="inputRole">Cours {chefDept}</label>
                    <select id="inputRole" class="form-control" name="ec" ref={register({required:true})}>
                        <option selected>Choisir l'EC correspondant</option>
                        {EC.map(single => single.element.map(ec => <option key={ec.id} value={ec.id}>{ec.nom}</option>))}
                    </select>
                </div>
                <div class="form-group">
                    <label for="inputRole">Enseignant</label>
                    <select id="inputRole" class="form-control" name="id_prof" ref={register({required:true})}>
                        <option selected>Choisir l'enseignant</option>
                        {professeurs.map(single => <option key={single.user.id} value={single.user.id}>{single.user.first_name} {single.user.last_name}</option>)}
                    </select>
                </div>
                <div class="form-group">
                    <label for="inputRole">Classe</label>
                    <select id="inputRole" class="form-control" name="classe" ref={register}>
                        <option selected>Choisir une classe</option>
                        {classes.map(classe => <option key={classe.id} value={classes.niveau}>{classe.niveau}</option>)}
                    </select>
                </div>
                <div class="form-group">
                    <label for="inputRole">Département</label>
                    <select id="inputRole" class="form-control" name="departement" ref={register}>
                        <option selected>Choisir le departement</option>
                        {departements.map(departement => <option key={departement.id} value={departement.nom_dept}>{departement.nom_dept}</option>)}
                    </select>
                </div>
                {/* <div class="form-group">
                    <input type="text" className="form-control" value="GIT" name="departement" ref={register}/>
                </div> */}
                <div>
                    <div for="inputRole">Description du cours</div>
                    <textarea name="description" ref={register} rows="6" cols="40" ></textarea>
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
    token: state.auth.token,
    roles: state.auth.user.CurrentRoles
})

export default connect(mapStateToProps,null)(AddCourse)