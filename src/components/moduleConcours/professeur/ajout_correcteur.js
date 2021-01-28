import React, { useState,useEffect } from "react";
import URL from "../../../actions/moduleConcours/entry_URL"
import {
    CCard,
    CCardBody,
    CDataTable,
    CCardHeader,
    CCol,
    CRow,
    CButton
} from '@coreui/react'

import axios from "axios"
import {useHistory} from "react-router-dom"
import {connect} from "react-redux"
import Button from "@material-ui/core/Button";
import {Modal} from "react-bootstrap";

const Vue_Ajout_Correcteur = (props) => {
    const [users, setUsers] = useState([]);
    const [correcteurs, setCorrecteurs] = useState([]);
    const [alertMessage, setMessage] = useState({message: 'Veuillez choisir dans la liste', ok: false})
    const history = useHistory();
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${props.token}`
        },
    }


    const getListProfs = () => {
        axios.get('https://users-ent.herokuapp.com/api/auth/ENSEIGNANT/',config)
            .then(res =>{
                console.log("Liste enseignat ==> ", res.data);
                setUsers(res.data);

            })
            .catch(err => console.log(err))
    }

    const create_correcteur = (id) => {
        axios.post(URL+`candidats/correcteurs`,{"id_correcteur": id})
            .then(res => {
                setMessage({ok: true, message: 'correcteur ajouté avec succès!'})
            })
            .catch(err => console.log(err))
    }
    const getCorrecteurs = () => {
        axios.get(URL+`candidats/correcteurs`)
            .then(res => {
                let a = []
                a = res.data.results.map(el => el.id_correcteur)
                setCorrecteurs(a)
                console.log(a)
                history.push("/scolarite/concours/liste_correcteur/")
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {getListProfs(); getCorrecteurs();},[]);

    return(
        <CCard>
            <CCardBody>
                <CRow>
                    {alertMessage.ok ?
                        <>
                            <div className="alert alert-success w-100 m-0 alert-dismissible fade show" role="alert">
                                <strong>ENT-EPT</strong> {alertMessage.message}
                                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        </>
                        :
                        <>
                            <div className="alert alert-warning w-100 m-0 alert-dismissible fade show" role="alert">
                                <strong>ENT-EPT</strong> {alertMessage.message}
                                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        </>
                    }
                    <CCol sm="12" lg="12">
                        <CDataTable
                            items={correcteurs.length>= 0 && users.filter(user => !correcteurs.includes(String(user.user.id)))}
                            fields={['first_name','last_name','telephone','Option']}
                            itemsPerPage={15}
                            tableFilter
                            paginationfooter
                            itemsPerPageSelect
                            sorter
                            hover
                            pagination
                            scopedSlots = {{
                                'Option':
                                    (item, index) =>{
                                        return (
                                            <td className="py-2">
                                                <CButton
                                                    color="primary"
                                                    variant="outline"
                                                    shape="square"
                                                    size="sm" onClick={() => create_correcteur(item.user.id)}><i className="fas fa-pencil-alt"/>Ajouter</CButton>
                                            </td>
                                        )
                                    },

                                'first_name':
                                    (item, index) =>{
                                        return (
                                            <td className="py-2">
                                                {item.user.first_name}
                                            </td>
                                        )
                                    },
                                'last_name':
                                    (item, index) =>{
                                        return (
                                            <td className="py-2">
                                                {item.user.last_name}
                                            </td>
                                        )
                                    },
                                'telephone':
                                    (item, index) =>{
                                        return (
                                            <td className="py-2">
                                                {item.user.telephone}
                                            </td>
                                        )
                                    },
                            }}
                        />
                    </CCol>
                </CRow>
            </CCardBody>
        </CCard>
    )

}

const Create_Correcteur = (props) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>

            <div
                className="d-flex align-items-center"
                style={{ height: "5vh" }}
            >
                <Button variant="contained" color="default" onClick={handleShow}>
                    <i className="fas fa-plus-circle"/>Nouveau Correcteur
                </Button>
            </div>
            <br/><br/>


            <Modal show={show} onHide={() => {
                handleClose();
            }} className="container-fluid">
                <Modal.Header closeButton>
                    <Modal.Title>Liste Enseignant</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Vue_Ajout_Correcteur token={props.token}/>
                </Modal.Body>
                <Modal.Footer>

                    <Button variant="contained" color="secondary" onClick={() => {
                        handleClose();
                    }}>
                        Fermer
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

const mapStateToProps = state => ({
    token: state.auth.token
})

export default connect(mapStateToProps,null)(Create_Correcteur)