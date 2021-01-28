import React, { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import Button from '@material-ui/core/Button';
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {get_Responsables, add_Responsable} from "../../../actions/moduleConcours/action_superviseur_responsable";

const ResponsableCreateForm = (props) => {

    const [prenom, setPrenom] = useState("");
    const [nom, setNom] = useState("");
    const [adresse, setAdresse] = useState("");
    const [telephone, setTelephone] = useState("")
    const onSubmit = (e) => {
        e.preventDefault();
        props.add_Responsable({prenom, nom, adresse, telephone})
            .then(() => {
                setPrenom("");
                alert("responsable AJOUTÉ")
            })

    }
    return (
        <Form onSubmit={onSubmit}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Prenom</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Le prenom du responsable"
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Nom</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Nom du responsable"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Adresse domicile</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Adresse du responsable"
                    value={adresse}
                    required={false}
                    onChange={(e) => setAdresse(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Numero telephone</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Tel. du responsable"
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


const Create_Responsable = (props) => {

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        props.get_Responsables().then(res => props.setResponsables(res.data.results))
    };
    const handleShow = () => setShow(true);

    return (
        <>

            <div
                className="d-flex align-items-center"
                style={{ height: "5vh" }}
            >
                <Button variant="contained" color="default" onClick={handleShow}>
                    <i className="fas fa-plus-circle"/> Add Responsable
                </Button>
            </div>
            <br/><br/>


            <Modal show={show} onHide={() => {
                handleClose();
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>Nouveau Responsable</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ResponsableCreateForm add_Responsable={props.add_Responsable}/>
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
    connect(mapStateToProps, {get_Responsables, add_Responsable}))(Create_Responsable);
