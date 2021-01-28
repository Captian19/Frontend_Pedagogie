import React, { useState, useEffect } from "react"
import avatar from '../../../../../assets/img/avatar.png';
import {
    CCard,
    CCardBody,
    CDataTable,
    CCardHeader,
    CCol,
    CRow,
} from '@coreui/react'

import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom"
import axios from "axios";
import { connect } from "react-redux";

const fields = ['avatar', 'Prénom', 'Nom', 'classe', 'departement', 'Année']

const ListClasse = (props) => {
    const [etudiants, setEtudiant] = useState([]);
    const [annees, setAnnee] = useState([]);
    const [classes, setClasse] = useState([]);
    const [departements, setDepartement] = useState([]);
    const [loading, setLoading] = useState(true);

    const history = useHistory();
    const { register, handleSubmit } = useForm()

    const [role] = React.useState(() => {
        var current_role = null;
        props.auth.user.CurrentRoles.map(role => {
            current_role = role;
        })
        return current_role;
    })

    const onSubmit = (data) => {
        getListByClasse(data.classe, role.departement, data.annee);
    }
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${props.auth.token}`
        },
    }

    const getListByClasse = (classe, departement, annee) => {
        axios.get(`https://users-ent.herokuapp.com/api/auth/ETUDIANT/${classe}/${departement}/${annee}/`, config)
            .then(res => {
                setEtudiant(res.data);
                setLoading(false);
            })
            .catch(err => console.log(err))
    }

    const getListAnnee = () => {
        axios.get('https://users-ent.herokuapp.com/api/anneescolaires', config)
            .then(res => {
                setAnnee(res.data);
            })
            .catch(err => console.log(err));
    }

    const getListClasse = () => {
        axios.get('https://users-ent.herokuapp.com/api/classes', config)
            .then(res => {
                setClasse(res.data);
            })
            .catch(err => console.log(err));
    }


    useEffect(() => {
        getListClasse();
        getListAnnee();
    }, []);

    return (
        <CRow>
            <CCol lg={12}>
                <CCard>
                    <CCardHeader>
                        <h4>Liste des étudiants par classe</h4>
                    </CCardHeader>
                    <CCardBody>
                        <form className="mb-3 p-2 mx-2 shadow" onSubmit={handleSubmit(onSubmit)}>
                            <div className="row">
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <select className="form-control" name="classe" ref={register}>
                                            {classes.map(classe => <option value={classe.niveau}>{classe.niveau}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <select className="form-control" name="departement" ref={register}>
                                            {role.role_type == "ASSISTANT_CHEF_DEPARTEMENT" ?
                                                <option value={role.departement}>{role.departement}</option>
                                                :
                                                departements.map(departement => <option value={departement.nom_dept}>{departement.nom_dept}</option>)
                                            }
                                        </select>

                                    </div>
                                </div>
                                <div className="col-md-3">
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
                                    onRowClick={(item) => history.push(`/assistant-departement/voir-absences-eleve/${item.classe}/${item.departement}/${item.id}`)}
                                    hover
                                    sorter
                                    hover
                                    pagination
                                    loading={loading}
                                    noItemsViewSlot={
                                        'Choissisez une classe et une année scolaire'
                                    }
                                    scopedSlots={{

                                        'Prénom':
                                            (item, index) => {
                                                return (
                                                    <td className="py-2" key={index}>
                                                        {item.user.first_name}
                                                    </td>
                                                )
                                            },
                                        'Nom':
                                            (item, index) => {
                                                return (
                                                    <td className="py-2" key={index}>
                                                        {item.user.last_name}
                                                    </td>
                                                )
                                            },
                                        'Année':
                                            (item, index) => {
                                                return (
                                                    <td className="py-2" key={index}>
                                                        {item.annee}
                                                    </td>
                                                )
                                            },
                                        'avatar':
                                            (item, index) => {
                                                return (
                                                    <td key={index}>
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

const mapStateToProps = (state) => ({
    auth: state.auth,
})

export default connect(mapStateToProps, null)(ListClasse)