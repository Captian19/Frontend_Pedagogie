import React,{useRef,useState} from 'react';
import {CCard, CCardHeader,CCol, CRow,
CForm,CFormGroup,CLabel,CInput,CFormText,CButton,CCardFooter,CAlert
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

import {useForm} from "react-hook-form";
import axios from 'axios';
import {connect} from "react-redux";
import {logout} from "./../../actions/auth";

const ChangePassword = () => {

    const {register,errors,handleSubmit,watch} = useForm()
    const password2 = useRef({});
    const [message,setMessage] = useState({
        type:'',
        message:''
    })
    password2.current = watch("password2", "");

    const onSubmit = (data,e) => {
        const body = {
            "password":data.password,
            "password2":data.password2
        }
        axios.put('http://localhost:8000/api/auth/user/change-password',body)
        .then(res => {
            setMessage({type:"success",message:res.data.message});
        })
        .catch(err => {
            setMessage({type:"fail",message:err.response.data.message});
            console.log(err.response.data);
        })
        e.target.reset();

    }


    return (
            <CRow className="justify-content-center">
                <CCol md="6">
                <CCard className="px-4 py-4">
                    <CCardHeader>
                        <h3>Changer de mot de passe</h3>
                    </CCardHeader>
                    <CForm className="py-4" onSubmit={handleSubmit(onSubmit)}>
                    {message.type === "success" && (
                        <div className="mt-2">
                        <CAlert color="success">{message.message}</CAlert>
                        </div>
                    )}
                    {message.type === "fail" && (
                        <div className="mt-2">
                        <CAlert color="danger">{message.message}</CAlert>
                        </div>
                    )}
                    <CFormGroup className="py-2">
                    <CLabel htmlFor="nf-old-password">Ancien Mot de passe</CLabel>
                    <CInput
                        type="password"
                        id="nf-old-password"
                        name="password"
                        placeholder="Entrer votre ancien mot de passe..."
                        innerRef={register({
                            required:"Veuillez entrer votre ancien mot de passe !",
                            minLength: {
                                value:8,
                                message: "Le mot de passe doit contenir au moins 8 caracteres."
                            }
                        })}
                    />
                    {errors.password && <CFormText className="help-block" color="danger">{errors.password.message}</CFormText>}
                    </CFormGroup>
                    <CFormGroup className="py-2">
                    <CLabel htmlFor="nf-new-password1">Nouveau Mot de passe</CLabel>
                    <CInput
                        type="password"
                        id="nf-new-password1"
                        name="password2"
                        placeholder="Entrer votre nouveau mot de passe..."
                        innerRef={register({
                            required:"Veuillez entrer un nouveau mot de passe !",
                            minLength: {
                                value:8,
                                message: "Le mot de passe doit contenir au moins 8 caracteres."
                            }
                        })}
                    />
                    {errors.password2 && <CFormText className="help-block" color="danger">{errors.password2.message}</CFormText>}
                    </CFormGroup>
                    <CFormGroup className="py-2">
                    <CLabel htmlFor="nf-new-password-confirmation">Confirmation Nouveau Mot de passe</CLabel>
                    <CInput
                        type="password"
                        id="nf-new-password-confirmation"
                        name="password2Confirmation"
                        placeholder="Confirmer votre nouveau mot de passe..."
                        innerRef={register({
                            validate: value => 
                            value === password2.current || "Le mot de passe enrré ne correspond pas !"
                        })}
                    />
                    {errors.password2Confirmation && <CFormText className="help-block" color="danger">{errors.password2Confirmation.message}</CFormText>}
                    </CFormGroup>
                    <CCardFooter>
                    <CButton type="submit" size="sm" color="success"><CIcon name="cil-scrubber" /> Envoyer</CButton>
                    <CButton type="reset" size="sm" color="danger" className="float-right"><CIcon name="cil-ban" /> Annuler</CButton>
                    </CCardFooter>
                    </CForm>
                </CCard>
                </CCol>
            </CRow>
    )
}

const mapStateTopProps = (state) => ({
    user:state.auth.user,
    token:state.auth.token
})

export default connect(mapStateTopProps,{logout})(ChangePassword)
