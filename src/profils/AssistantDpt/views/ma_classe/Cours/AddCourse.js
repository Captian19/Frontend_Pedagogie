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
    const [departement, setDepartement] = useState('');
    const [description, setDescription] = useState('');

    const getDepartement = () => {
        props.roles.map((role) => {
            if(role.role_type == "ASSISTANT_CHEF_DEPARTEMENT"){
                setDepartement(role.departement);
            }
        })
    }

    // const chefDept = props.roles.map((role) => {
    //     if(role.role_type == "CHEF_DE_DEPARTEMENT") {
    //         return role.departement
    //     }
    // })
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
            setDepartement();
            setDescription("");
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

    console.log(departement);
    const getListEC = () => {
        axios.get(`http://localhost:8000/EC`) //departement/`+ `${departement}`)
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
        getDepartement();
    },[])


    return (
        <CCol xs="8" sm="12" className="absolute-center">
        <CCard xs="8" sm="6">
            <CCardHeader>
                Nouveau Cours Virtuel {departement}
            </CCardHeader>
            <CCardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div class="form-group">
                    <label for="inputRole">Cours {departement}</label>
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
                {/* <div class="form-group">
                    <label for="inputRole">Département</label>
                    <select id="inputRole" class="form-control" name="departement" ref={register}>
                        <option selected>Choisir le departement</option>
                        {departements.map(departement => <option key={departement.id} value={departement.nom_dept}>{departement.nom_dept}</option>)}
                    </select>
                </div> */}
                <div class="form-group">
                    <input type="text" className="form-control" value={departement} name="departement" ref={register}/>
                </div>
                <div margin="0">
                    <div for="inputRole">Petite Description du cours</div>
                    <textarea name="description" value={description} rows="6" cols='95' onChange={(event)=>setDescription(event.target.value)} ref={register({required:true})} ></textarea>
                </div>
               
                <button type="submit" class="btn btn-primary">Ajouter</button>
            </form>
            </CCardBody>
        </CCard>
        </CCol>
    )
}

const mapStateToProps = state => ({
    token: state.auth.token,
    roles: state.auth.user.CurrentRoles
})

export default connect(mapStateToProps,null)(AddCourse)