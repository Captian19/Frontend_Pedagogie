import React, { useState, useEffect } from "react"

import {CCard, CCardHeader, CCardBody,CCol, CRow,CContainer,CInputRadio,
CForm,CFormGroup,CLabel,CInput,CFormText,CSelect,CButton,CCardFooter,CAlert
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import {connect} from "react-redux";
import axios from "axios";

import {useForm} from "react-hook-form";

const AddUser = (props) => {

    const [roles, setRoles] = useState([]);
    const [choice, setChoices] = useState('');
    const [message, setMessage] = useState({
        type:'',
        message:''
    });

    const {register,errors,handleSubmit} = useForm();

    const onHandleChange = (mychoice) => {
        setChoices(mychoice);
    }

    const onSubmit = (data,e) => {
        const body = JSON.stringify(data);
        // axios.post("http://localhost:8000/api/auth/createUser/",body)
        // .then(res => {
        //     setMessage({type:"success",message:res.data.message});
        // })
        // .catch(err => {
        //     setMessage({type:"fail",message:err.response.data.message});
        // })
        e.target.reset();
        console.log(data);
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

    useEffect(() => {
        getListRoles();
    },[])


    return (
        <CRow>
        <CCol xs="12" sm="12">
        <CCard sm="12" lg="12">
        <CCardHeader>
          <h4>Créer un compte {choice}</h4>
        </CCardHeader>
        <CCardBody>
        <CContainer fluid>
            <CRow>
            <CCol sm="12">
            {message.type === "success" && (
                <div className="mt-2">
                <CAlert color="success">{message.message}</CAlert>
                </div>
            )}
            {message.type === "fail" && (<div className="mt-2">
                <CAlert color="danger">{message.message}</CAlert>
             </div>)
            }    
            <CForm className="py-2" onSubmit={handleSubmit(onSubmit)}>
            <CFormGroup>
                <CLabel htmlFor="nf-prenom">Prénom</CLabel>
                <CInput
                    type="text"
                    id="nf-prenom"
                    name="first_name"
                    placeholder="Entrer un prénom..."
                    innerRef={register({required:true})}
                />
                {errors.first_name && <CFormText className="help-block" color="danger">Ce champ est obligatoire !</CFormText>}
                </CFormGroup>
                <CFormGroup>
                <CLabel htmlFor="nf-nom">Nom</CLabel>
                <CInput
                    type="text"
                    id="nf-nom"
                    name="last_name"
                    placeholder="Entrer un nom..."
                    innerRef={register({required:true})}
                />
                {errors.last_name && <CFormText className="help-block" color="danger">Ce champ est obligatoire !</CFormText>}
                </CFormGroup>
                <CFormGroup>
                <CLabel htmlFor="nf-email">Email</CLabel>
                <CInput
                    type="email"
                    id="nf-email"
                    name="email"
                    placeholder="Entrer Email.."
                    innerRef={register({required:true})}
                />
                {errors.email && <CFormText className="help-block" color="danger">Ce champ est obligatoire !</CFormText>}
                </CFormGroup>
                <CFormGroup>
                    <CLabel htmlFor="sexe">Sexe</CLabel>
                    <CSelect custom name="sexe" id="sexe" innerRef={register}>
                      <option value="M">Homme</option>
                      <option value="F">Femme</option>
                    </CSelect>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel>Choix du profil</CLabel>
                  </CCol>
                  <CCol md="9">
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio custom id="inline-radio1" name="choix" value="etudiant" onClick={() => onHandleChange('etudiant')} />
                      <CLabel variant="custom-checkbox" htmlFor="inline-radio1">Etudiant</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio custom id="inline-radio2" name="choix" value="enseignant" onClick={() => onHandleChange('enseignant')} />
                      <CLabel variant="custom-checkbox" htmlFor="inline-radio2">Enseignant</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio custom id="inline-radio3" name="choix" value="autre" onClick={() => onHandleChange('autre')} />
                      <CLabel variant="custom-checkbox" htmlFor="inline-radio3">Autre</CLabel>
                    </CFormGroup>
                  </CCol>
                </CFormGroup>
                {choice && <CFormGroup>
                    <CLabel htmlFor="role">Role</CLabel>
                    {choice == "etudiant" && (
                        <CSelect custom name="id_role" id="role" innerRef={register}>
                        {roles.filter(role => role.role_type == "ETUDIANT").map(roleFilter => <option key={roleFilter.id} value={roleFilter.id}>{roleFilter.role_type} {roleFilter.classe} {roleFilter.departement}</option>)}
                        </CSelect>
                    )}
                    {choice == "enseignant" && (
                        <CSelect custom name="id_role" id="role" innerRef={register}>
                        {roles.filter(role => role.role_type == "ENSEIGNANT").map(roleFilter => <option key={roleFilter.id} value={roleFilter.id}>{roleFilter.role_type} {roleFilter.classe} {roleFilter.departement}</option>)}
                        </CSelect>
                    )}
                    {choice == "autre" && (
                        <CSelect custom name="id_role" id="role" innerRef={register}>
                        {roles.filter(role => role.role_type.includes('MEMBRE_') || role.role_type.includes('GERANT')).map(roleFilter => <option key={roleFilter.id} value={roleFilter.id}>{roleFilter.role_type} {roleFilter.classe} {roleFilter.departement}</option>)}
                        </CSelect>
                    )}
                  </CFormGroup>}
                  <CCardFooter>
                    <CButton type="submit" size="sm" color="success"><CIcon name="cil-scrubber" /> Envoyer</CButton>
                    <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Annuler</CButton>
                </CCardFooter>
            </CForm>
            </CCol>
        </CRow>
        </CContainer>            
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