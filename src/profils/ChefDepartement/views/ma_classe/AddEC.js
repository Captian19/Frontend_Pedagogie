import React, { useState, useEffect } from "react"

import {CCard, CCardHeader, CCardBody,CCol, CRow,
} from '@coreui/react'

import {connect} from "react-redux";
import axios from "axios";
import { API_URL_UE } from "../../../../constants/pedagogie";

const AddEC = (props) => {

    const [UE, setListUE] = useState([]);
    const [singleUE, setSingleUE] = useState();
    const [OK, setOK] = useState(false);
    const [nom, setNom] = useState();
    const [CM, setCM] = useState();
    const [TD_TP, setTD_TP] = useState();
    const [TPE, setTPE] = useState();
    const [coef, setCoef] = useState();
    const [creditEC, setCreditEC] = useState();
    const [total_heures, setTotal_heures] = useState();
    const [codeEC, setCodeEC] = useState();   
    const [message, setMessage] = useState('');
    const [departement, setDepartement] = useState('');

    const getDepartement = () => {
        props.roles.map((role) => {
            if(role.role_type == "CHEF_DE_DEPARTEMENT"){
                setDepartement(role.departement);
            }
        })
    }    

    const onSubmit = e => {
        e.preventDefault()
        axios.post(`http://localhost:8000/EC/POST_EC`,{"nom":nom,"CM":CM, "TD_TP":TD_TP, "TPE":TPE, "coef":coef, "creditEC":creditEC, "total_heures":total_heures, "codeEC":codeEC, "ue":singleUE})
        .then(res => {
            alert("EC ajouté avec succès");
            setMessage(res.data.message);
            setNom("");
            setCM("");
            setTD_TP("");
            setTPE("");
            setCoef("");
            setCreditEC("");
            setTotal_heures("");
            setCodeEC("");


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

    const getListUE = () => {
       // var id_dept = departement.toString();
        axios.get(API_URL_UE) //`http://localhost:8000/UE/departement/${id_dept}`)
        .then(res => {
            setListUE(res.data);
            setOK(true);
            console.log(res.data);
        })
        .catch(err => console.log(err));
    }


    useEffect(() => {
        getListUE();
        getDepartement();
    },[])

    console.log("Amou", departement.toString());
    return (
        <CRow>
        <CCol xs="12" sm="12">
        <CCard sm="12" lg="6">
        <CCardHeader>
          Ajouter un nouvel EC
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
                    <label for="CM">CM</label>
                    <input type="number" class="form-control" value={CM} id="CM" name="CM" onChange={(event)=>setCM(event.target.value)} />
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                    <label for="TD_TP">TD_TP</label>
                    <input type="number" class="form-control" value={TD_TP} id="TD_TP" name="TD_TP" onChange={(event)=>setTD_TP(event.target.value)} />
                    </div>
                    <div class="form-group col-md-6">
                    <label for="TPE">TPE</label>
                    <input type="number" class="form-control" value={TPE} id="TPE" name="TPE" onChange={(event)=>setTPE(event.target.value)} />
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                    <label for="coef">coef</label>
                    <input type="number" class="form-control" id="coef" value={coef} name="coef" onChange={(event)=>setCoef(event.target.value)} />
                    </div>
                    <div class="form-group col-md-6">
                    <label for="creditEC">Credit EC</label>
                    <input type="number" class="form-control" id="creditEC" value={creditEC} name="creditEC" onChange={(event)=>setCreditEC(event.target.value)} />
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                    <label for="total_heures">Total_heures</label>
                    <input type="number" class="form-control" value={total_heures} id="total_heures" name="total_heures" onChange={(event)=>setTotal_heures(event.target.value)} />
                    </div>
                    <div class="form-group col-md-6">
                    <label for="codeEC">Code de l'EC</label>
                    <input type="text" class="form-control" id="codeEC" value={codeEC} name="codeEC" onChange={(event)=>setCodeEC(event.target.value)} />
                    </div>
                </div>
                <div class="form-group">
                    <label for="ue">UE</label>
                    <select id="ue" class="form-control" name="ue" onChange={(event)=>setSingleUE(event.target.value)}>
                        <option selected>Choisir UE</option>
                        {UE.map(single => <option key={single.id} value={single.id}>{single.nom}</option>)}
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

export default connect(mapStateToProps,null)(AddEC)