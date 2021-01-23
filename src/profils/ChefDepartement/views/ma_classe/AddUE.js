import React, { useState, useEffect } from "react"

import {CCard, CCardHeader, CCardBody,CCol, CRow,
} from '@coreui/react'

import {connect} from "react-redux";
import axios from "axios";

import {useForm} from "react-hook-form";
import { API_URL_UE } from "../../../../constants/pedagogie";

const AddUE = (props) => {

    const [classes, setListClasses] = useState([]);
    const [singleClasse, setSingleClasse] = useState();
    const [singleSemestre, setSingleSemestre] = useState();
    const [OK, setOK] = useState(false);
    const [nom, setNom] = useState();
    const [codeUE, setCodeUE] = useState();
    const [coefUE, setCoefUE] = useState();
    const [creditUE, setCreditUE] = useState();
    const [departement, setDepartement] = useState('');
    const [message, setMessage] = useState('');

    const getDepartement = () => {
        props.roles.map((role) => {
            if(role.role_type == "CHEF_DE_DEPARTEMENT"){
                setDepartement(role.departement);
            }
        })
    }

    

    const onSubmit = e => {
        e.preventDefault()
        axios.post(`http://localhost:8000/UE/POST_UE`,{"nom":nom,"codeUE":codeUE, "departement":departement, "classe":singleClasse, "coefUE":coefUE, "creditUE":creditUE, "semestre":singleSemestre})
        .then(res => {
            alert("UE ajoutée avec succès");
            setMessage(res.data.message);
            setNom("");
            setCodeUE("");
            setCoefUE("");
            setCreditUE("");
        })
        .catch(err => {
            setMessage(err.response.data.message);
            console.log(err.response);
        })
    }

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${props.token}`
        },
    }


    const getListClasse = () => {
        axios.get("https://users-ent.herokuapp.com/api/classes",config)
        .then(res => {
            setListClasses(res.data);
            setOK(true);
        })
        .catch(err => console.log(err));
    }

    // const getListDepartements = () => {
    //     axios.get("https://users-ent.herokuapp.com/api/departements",config)
    //     .then(res => {
    //         setDepartments(res.data);
    //     })
    //     .catch(err => console.log(err));
    // }


    useEffect(() => {
        getListClasse();
        getDepartement();
    },[])

    // console.log(props.departement);

    return (
        <CRow>
        <CCol xs="12" sm="12">
        <CCard sm="12" lg="6">
        <CCardHeader>
          Ajouter une nouvelle UE
        </CCardHeader>
        <CCardBody>
        
            <form onSubmit={onSubmit}>
                {message ? <div className="alert alert-info">{message}</div> : ""}
                <div class="form-row">
                    <div class="form-group col-md-6">
                    <label for="nom">Nom</label>
                    <input type="text" class="form-control" value={nom} id="nom" name="nom" onChange={(event)=>setNom(event.target.value)} />
                    </div>
                    <div class="form-group col-md-6">
                    <label for="CM">Code de l'UE</label>
                    <input type="text" class="form-control" value={codeUE} id="codeUE" name="codeUE" onChange={(event)=>setCodeUE(event.target.value)} />
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                    <label for="TD_TP">Coefficient de l'U.E.</label>
                    <input type="number" class="form-control" value={coefUE} id="coefUE" name="coefUE" onChange={(event)=>setCoefUE(event.target.value)} />
                    </div>
                    <div class="form-group col-md-6">
                    <label for="TPE">Credit de l'U.E.</label>
                    <input type="number" class="form-control" value={creditUE} id="creditUE" name="creditUE" onChange={(event)=>setCreditUE(event.target.value)} />
                    </div>
                </div>
                <div class="form-row">

                </div>
                <div class="form-group">
                    <label for="ue">classe</label>
                    <select id="ue" class="form-control" name="ue" onChange={(event)=>setSingleClasse(event.target.value)}>
                        <option selected>Choisir la classe</option>
                        {OK && classes.map(classe => <option key={classe.id} value={classes.niveau}>{classe.niveau}</option>)}
                    </select>
                </div>
                <div class="form-group">
                    <input type="text" className="form-control" value={departement} name="departement" onChange={(event)=>(event.target.value)}/>
                </div>
                <div class="form-group">
                    <label for="ue">Semestre</label>
                    <select id="semestre" class="form-control" name="semestre" onChange={(event)=>setSingleSemestre(event.target.value)}>
                        <option value="S1">Semestre 1</option>
                        <option value="S2">Semestre 2</option>
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
    token: state.auth.token,
    roles: state.auth.user.CurrentRoles
})

export default connect(mapStateToProps,null)(AddUE)