import React, { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import all from "../../../constants/moduleConcours/someConstants";
import Select from "react-select";
import Button from '@material-ui/core/Button';
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {get_Superviseurs, add_Superviseur} from "../../../actions/moduleConcours/action_superviseur_responsable";

const SuperviseurCreateForm = (props) => {

    const [prenom, setPrenom] = useState("");
    const [nom, setNom] = useState("");
    const [adresse, setAdresse] = useState("");
    const [telephone, setTelephone] = useState("")
    const onSubmit = (e) => {
        e.preventDefault();
        props.add_Superviseur({prenom, nom, adresse, telephone})
            .then(() => {
                setPrenom("");
                alert("Supervieur AJOUTÉ")
            })

    }
    return (
        <Form onSubmit={onSubmit}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Prenom</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Le prenom du superviseur"
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Nom</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Nom du superviseur"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Adresse domicile</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Adresse du superviseur"
                    value={adresse}
                    required={false}
                    onChange={(e) => setAdresse(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Numero telephone</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Tel. du superviseur"
                    value={telephone}
                    required={false}
                    onChange={(e) => setTelephone(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Confirmer l'éxactitude des données!" />
            </Form.Group>

            <Button variant="contained" color="primary" type="submit" block>
                Créer
            </Button>
        </Form>
    );
};


const Create_Superviseur = (props) => {

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        props.get_Superviseurs().then(res => props.setSuperviseurs(res.data.results))
    };
    const handleShow = () => setShow(true);

    return (
        <>

            <div
                className="d-flex align-items-left"
                style={{ height: "5vh" }}
            >
                <Button variant="contained" color="default" onClick={handleShow}>
                    <i className="fas fa-plus-circle"/> Add Superviseur
                </Button>
            </div>
            <br/><br/>


            <Modal show={show} onHide={() => {
                handleClose();
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>Nouveau Superviseur</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SuperviseurCreateForm add_Superviseur={props.add_Superviseur}/>
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
    auth: state.auth
});
export default compose(
    withRouter,
    connect(mapStateToProps, {get_Superviseurs, add_Superviseur}))(Create_Superviseur);
