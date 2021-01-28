import React, {useState, useEffect} from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow,CButton } from '@coreui/react'
import {connect} from "react-redux";
import {useHistory} from "react-router-dom"
import axios from "axios";
import RoleItem from "./RoleItem"
import avatar from './../../../assets/img/avatar.png'
import 'font-awesome/css/font-awesome.min.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const User = (props) => {
    const [user, setUser] = useState({});
    const history = useHistory();
    const {
        buttonLabel,
        className
    } = props;
    
    const [roles, setRoles] = useState([]);
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${props.token}`
        },
    }

    const callApi = () => {
        const { match: { params } } = props;
        axios.get(`https://users-ent.herokuapp.com/api/auth/users/${params.id}/`,config)
        .then(res => {
            setUser(res.data);
            console.log(res.data);
        })
        .catch(err => console.log(err));
    }

    const OnOrOff = (id) => {
        axios.get(`https://users-ent.herokuapp.com/api/auth/users/activateUser/${id}`,config)
        .then(res => {
            console.log(res.data);
            window.location.reload();
        })
        .catch(err => console.log(err))
    }

    const getListRoles = () => {
        axios.get("https://users-ent.herokuapp.com/api/roles",config)
        .then(res => {
            setRoles(res.data);
        })
        .catch(err => console.log(err));
    }

    useEffect(
        () => {
            callApi();
            getListRoles();
        }
    ,[]);

    return(
        <CRow>
        <CCol lg={12}>
            <CCard>
            <CCardHeader>
                <CButton color="info" variant="outline" shape="square"  onClick={() => history.push('/admin/users')}><i class="fa fa-arrow-left"></i> Retour</CButton>
            </CCardHeader>
            <CCardBody>
            <div class="main-wrapper">
                <div class="container px-3 px-lg-5">
                <article class="resume-wrapper mx-auto p-5 mb-5 my-2 shadow-lg">
                        <div class="resume-header">
                            <div class="row align-items-center">
                                <div class="resume-title col-12 col-md-6 col-lg-8 col-xl-9">
                                    <h2 class="resume-name mb-0 text-uppercase">{user.first_name} {user.last_name}</h2>
                                    <div class="resume-tagline mb-3 mb-md-0">
                                        <span class="text-success mr-2"><i class="fa fa-circle"></i></span>  
                                        {user.last_login}
                                    </div>
                                </div>
                                <div class="resume-contact col-12 col-md-6 col-lg-4 col-xl-3">
                                    <ul class="list-unstyled mb-0">
                                        <li class="mb-2"><i class="fa fa-phone-square fa-fw fa-lg mr-2 "></i><a class="resume-link">{user.telephone}</a></li>
                                        <li class="mb-2"><i class="fa fa-envelope-square fa-fw fa-lg mr-2"></i><a class="resume-link">{user.email}</a></li>
                                    <li class="mb-2"><i class="fa fa-user fa-fw fa-lg mr-2"></i><a class="resume-link">{user.sexe}</a></li>
                                        <li class="mb-0"><i class="fa fa-map-marker fa-fw fa-lg mr-2"></i>{user.adresse}</li>
                                    </ul>
                                </div>
                            </div>
                            
                        </div>
                        <hr />
                        <div class="resume-intro py-3">
                            <div class="media flex-column flex-md-row align-items-center">
                                <img class="mb-3 mb-md-0 mr-md-5 ml-md-0 rounded-circle mx-auto" src={user.photo ? user.photo : avatar} alt="image" width="150" />
                                <div class="media-body text-left">
                                    <p class="mb-0">Bio ici</p>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div class="resume-body">
                        <div class="row">
                            <div class="resume-main col-12 col-lg-8 col-xl-9 pr-0 pr-lg-5">
                                <section class="work-section py-3">
                                    <h3 class="resume-section-heading mb-4">Roles Actuels</h3>
                                    {user.CurrentRoles ? user.CurrentRoles.map(role => <RoleItem role_type={role.role_type} date_debut={role.date_debut} date_fin={role.date_fin ? role.date_fin : "Présent"} classe={role.classe ? role.classe: "-"} departement={role.departement ? role.departement:"-"} />) : "Aucun role"}
                                </section>
                                <section class="work-section py-3">
                                    <h3 class="resume-section-heading mb-4">Tous les roles</h3>
                                    {user.AllRoles ? user.AllRoles.map(role => <RoleItem role_type={role.role_type} date_debut={role.date_debut} date_fin={role.date_fin ? role.date_fin : "Présent" } classe={role.classe ? role.classe: "-"} departement={role.departement ? role.departement:"-"} />) : "Aucun role"}
                                </section>
                                
                            </div>
                            <aside class="resume-aside col-12 col-lg-4 col-xl-3 px-lg-4 pb-lg-4">
                                <section class="education-section py-3">
                                    <h3 class="text-uppercase resume-section-heading mb-4">Options</h3>
                                    <ul class="list-unstyled resume-education-list">
                                        <li class="mb-3">
                                        <div>
                                            <Button color="success" onClick={toggle}>Ajouter un role {buttonLabel}</Button>
                                            <Modal isOpen={modal} toggle={toggle} className={className}>
                                                <ModalHeader toggle={toggle}>Ajouter un role</ModalHeader>
                                                <ModalBody>
                                                <form>
                                                    <div className="form-group">
                                                        <input type="text" className="form-control" defaultValue={user.first_name} disabled />
                                                    </div>
                                                    <div class="form-group">
                                                    <label for="inputRole">Role</label>
                                                    <select id="inputRole" class="form-control" name="id">
                                                        <option selected>Choisir un role</option>
                                                        {roles.filter(role => role.role_type.includes('MEMBRE_') || role.role_type.includes('ADMIN')).map(roleFilter => <option key={roleFilter.id} value={roleFilter.id}>{roleFilter.role_type} {roleFilter.classe} {roleFilter.departement}</option>)}
                                                    </select>
                                                    </div>
                                                    <button className="float-right btn btn-success" type="submit">
                                                        Ajouter
                                                    </button>
                                                </form>
                                                </ModalBody>
                                                <ModalFooter>
                                                <Button color="danger" onClick={toggle}>Annuler</Button>{' '}
                                                </ModalFooter>
                                            </Modal>
                                            </div>
                                        </li>
                                        <li>
                                            {user.is_active ? <button className="btn btn-danger" onClick={() => OnOrOff()}>Désactiver compte</button> : <button className="btn btn-success" onClick={() => OnOrOff()}>Activer compte</button>}
                                        </li>
                                    </ul>
                                </section>
                            </aside>
                        </div>
                        </div>
                        
                </article>
                </div>
            </div>
            </CCardBody>
            </CCard>
        </CCol>
        </CRow>
    )
}

const mapStateToProps = state => ({
    token: state.auth.token
})

export default connect(mapStateToProps,null)(User)