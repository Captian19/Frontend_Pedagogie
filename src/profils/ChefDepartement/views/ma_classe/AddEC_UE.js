import React, { useState, useEffect } from "react"

import {CCard, CCardHeader, CCardBody,CCol, CRow,
} from '@coreui/react'

import {connect} from "react-redux";
import axios from "axios";

import {useForm} from "react-hook-form";
import { API_URL_UE } from "../../../../constants/pedagogie";

const AddEC_UE = (props) => {

    const [UE, setListUE] = useState([]);
    // const [classes, setClasses] = useState([]);
    // const [departements, setDepartments] = useState([]);
    // const [annees, setAnnee] = useState([]);
    const [message, setMessage] = useState('');

    const {register, handleSubmit} = useForm()

    const onSubmit = data => {
        console.log(data);
        axios.post(`http://localhost:8000/EC/POST_EC`,data)
        .then(res => {
            setMessage(res.data.message);
            setListUE([]);
        })
        .catch(err => {
            setMessage(err.response.data.message);
            console.log(err);
        })
    }

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${props.token}`
        },
    }

    const getListUE = () => {
        axios.get(API_URL_UE)
        .then(res => {
            setListUE(res.data);
            console.log(res.data);
        })
        .catch(err => console.log(err));
    }

    // const getListClasses = () => {
    //     axios.get("https://users-ent.herokuapp.com/api/classes",config)
    //     .then(res => {
    //         setClasses(res.data);
    //     })
    //     .catch(err => console.log(err));
    // }

    // const getListDepartements = () => {
    //     axios.get("https://users-ent.herokuapp.com/api/departements",config)
    //     .then(res => {
    //         setDepartments(res.data);
    //     })
    //     .catch(err => console.log(err));
    // }


    useEffect(() => {
        getListUE();
       // getListClasses();
        //getListDepartements();
    },[])

    // console.log(props.departement);

    return (
        <CRow>
        <CCol xs="12" sm="6">
        <CCard sm="12" lg="6">
        <CCardHeader>
          Ajouter un nouvel EC
        </CCardHeader>
        <CCardBody>
        
            <form onSubmit={handleSubmit(onSubmit)}>
                {message ? <div className="alert alert-info">{message}</div> : ""}
                <div class="form-row">
                    <div class="form-group col-md-6">
                    <label for="nom">Nom</label>
                    <input type="text" class="form-control" id="nom" name="nom" ref={register({required:true})} />
                    </div>
                    <div class="form-group col-md-6">
                    <label for="CM">CM</label>
                    <input type="number" class="form-control" id="CM" name="CM" ref={register({required: true})} />
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                    <label for="TD_TP">TD_TP</label>
                    <input type="number" class="form-control" id="TD_TP" name="TD_TP" ref={register({required:true})} />
                    </div>
                    <div class="form-group col-md-6">
                    <label for="TPE">TPE</label>
                    <input type="number" class="form-control" id="TPE" name="TPE" ref={register({required: true})} />
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                    <label for="coef">coef</label>
                    <input type="number" class="form-control" id="coef" name="coef" ref={register({required:true})} />
                    </div>
                    <div class="form-group col-md-6">
                    <label for="creditEC">Credit EC</label>
                    <input type="number" class="form-control" id="creditEC" name="creditEC" ref={register({required: true})} />
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                    <label for="total_heures">Total_heures</label>
                    <input type="number" class="form-control" id="total_heures" name="total_heures" ref={register({required:true})} />
                    </div>
                    <div class="form-group col-md-6">
                    <label for="codeEC">Code de l'EC</label>
                    <input type="text" class="form-control" id="codeEC" name="codeEC" ref={register({required:true})} />
                    </div>
                </div>
                <div class="form-group">
                    <label for="ue">UE</label>
                    <select id="ue" class="form-control" name="ue" ref={register({required:true})}>
                        <option selected>Choisir UE</option>
                        {UE.map(single => <option key={single.id} value={single.id}>{single.nom}</option>)}
                    </select>
                </div>
                <button type="submit" class="btn btn-primary">Ajouter</button>
            </form>
        
        </CCardBody>
        </CCard>
        </CCol>
        {/* <CCol xs="12" sm="6">
        <CCard xs="12" sm="6">
            <CCardHeader>
                Ajouter une nouvelle UE
            </CCardHeader>
            <CCardBody>
            <form>
                <div class="form-group">
                    <label for="inputRole">Nom</label>
                    <input type="text" class="form-control" id="inputRole" />
                </div>
                <div class="form-group">
                    <label for="inputRole">Code UE</label>
                    <input type="text" class="form-control" id="inputRole" />
                </div>
                <div class="form-group">
                    <label for="inputRole">Classe</label>
                    <select id="inputRole" class="form-control">
                        <option selected>Choisir une classe</option>
                        {classes.map(classe => <option key={classe.id} value={classes.id}>{classe.niveau} {classe.departement}</option>)}
                    </select>
                </div>
                <div class="form-group">
                    <label for="inputRole">Département</label>
                    <select id="inputRole" class="form-control">
                        <option selected>Choisir un département</option>
                        {departements.map(departement => <option key={departement.id} value={departement.id}>{departement.nom_dept}</option>)}
                    </select>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="inputEmail4">Coef UE</label>
                        <input type="text" class="form-control" id="inputEmail4" name="first_name" ref={register({required:true})} />
                    </div>
                    <div class="form-group col-md-6">
                        <label for="inputPassword4">Credit UE</label>
                        <input type="text" class="form-control" id="inputPassword4" name="last_name" ref={register({required: true})} />
                    </div>
                </div>
                <button type="submit" class="btn btn-primary">Ajouter</button>
            </form>
            </CCardBody>
        </CCard>
        </CCol> */}
        </CRow> 
    )
}

const mapStateToProps = state => ({
    token: state.auth.token,
    departement: state.auth.user.CurrentRoles.map((role, index)=>{
        if(role.role_type == "CHEF_DE_DEPARTEMENT"){
            return (role.departement)
        }
    }),
})

export default connect(mapStateToProps,null)(AddEC_UE)
