import React,{useState, useEffect} from "react"
import avatar from "./../../../assets/img/avatar.png"
import {
    CCard,
    CCardBody,
    CDataTable,
    CCardHeader,
    CCol,
    CRow,
    CBadge
} from '@coreui/react'

import {useForm} from "react-hook-form";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom"
import axios from "axios";

const fields = ['avatar','Prénom','Nom','classe','departement','Année']

const ListClasse = (props) => {
    const [etudiants, setEtudiant] = useState([]);
    const [annees, setAnnee] = useState([]);
    const [departements,setDepartement] = useState([]);

    const history = useHistory();
    const {register, handleSubmit} = useForm()

    const onSubmit = (data) => {
        getListByDepartement(data.departement,data.annee);
    }

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${props.token}`
        },
    }

    const getListByDepartement = (departement,annee) => {
        axios.get(`https://users-ent.herokuapp.com/api/auth/ETUDIANT/${departement}/${annee}/`,config)
        .then(res =>{
            setEtudiant(res.data);
        })
        .catch(err => console.log(err))
    } 

    const getListAnnee = () => {
        axios.get('https://users-ent.herokuapp.com/api/anneescolaires',config)
        .then(res => {
            setAnnee(res.data);
        })
        .catch(err => console.log(err));
    }

    const getListDepartement = () => {
        axios.get('https://users-ent.herokuapp.com/api/departements',config)
        .then(res => {
            setDepartement(res.data);
        })
        .catch(err => console.log(err));
    }

    useEffect(()=> {
        getListAnnee();
        getListDepartement();
    },[]);

    return(
        <CRow>
        <CCol lg={12}>
            <CCard>
            <CCardHeader>
                Liste des etudiants 
            </CCardHeader>
            <CCardBody>
                <form className="mb-2" onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="form-group">
                            <select className="form-control" name="departement" ref={register}>
                            {departements.map(departement => <option value={departement.id}>{departement.nom_dept}</option>)}
                            </select>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                            <select className="form-control" name="annee" ref={register}>
                            {annees.map(annee => <option value={annee.id}>{annee.alias}</option>)}
                            </select>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <button type="submit" className="btn btn-primary">Rechercher</button>
                        </div>
                    </div>
                </form>
                {/*  La liste des etudiants */}
                <CRow>
                <CCol sm="12" lg="15">
                <CDataTable
                    items={etudiants}
                    fields={fields}
                    paginationfooter
                    clickableRows
                    onRowClick={(item) => history.push(`/admin/users/${item.user.id}`)}
                    hover
                    sorter
                    hover
                    pagination
                    scopedSlots = {{

                        'Prénom':
                        (item,index) => {
                            return (
                                <td className="py-2">
                                    {item.user.first_name}
                                </td>
                            )
                        }, 
                        'Nom':
                        (item,index) => {
                            return (
                                <td className="py-2">
                                    {item.user.last_name}
                                </td>
                            )
                        }, 
                        'Année':
                        (item,index) => {
                            return (
                                <td className="py-2">
                                    {item.annee}
                                </td>
                            )
                        },
                        'avatar':
                        (item, index) => {
                            return(
                                <td>
                                    <img src={item.user.photo != null ? item.user.photo : avatar} className="rounded-circle" width="40" height="40" />
                                </td>
                            )
                        }
                }}

                />
                </CCol>
            </CRow>
            </CCardBody>
            </CCard>
        </CCol>
        </CRow>
    )

}

const mapStateTopProps = state => ({
    token: state.auth.token
})

export default connect(mapStateTopProps,null)(ListClasse)