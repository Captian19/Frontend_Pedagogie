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

const fields = ['avatar','Prénom','Nom','Classe','Departement','Année']

const ListClasse = (props) => {
    const [users, setUsers] = useState([]);
    const [annees, setAnnee] = useState([]);

    const history = useHistory();
    const {register, handleSubmit} = useForm()

    const onSubmit = (data) => {
        getListByRole(data.role,data.annee);
    }

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${props.token}`
        },
    }

    const getListByRole = (role,annee) => {
        axios.get(`https://users-ent.herokuapp.com/api/auth/${role}/${annee}/`,config)
        .then(res =>{
            setUsers(res.data);
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


    useEffect(()=> {
        getListAnnee();
    },[]);

    return(
        <CRow>
        <CCol lg={12}>
            <CCard>
            <CCardHeader>
                Liste des utilisateurs
            </CCardHeader>
            <CCardBody>
                <form className="mb-2" onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="form-group">
                            <select className="form-control" name="role" ref={register}>
                            <option value="ETUDIANT">ETUDIANT</option>
                            <option value="ENSEIGNANT">ENSEIGNANT</option>
                            <option value="ADMIN">ADMIN</option>
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
                    items={users}
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
                        'Classe':
                        (item,index) => {
                            return (
                                <td className="py-2">
                                    {item.classe ? item.classe:"-"}
                                </td>
                            )
                        },
                        'Departement':
                        (item,index) => {
                            return (
                                <td className="py-2">
                                    {item.departement ? item.departement:"-"}
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