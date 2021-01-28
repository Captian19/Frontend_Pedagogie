import React, { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import all from "../../../constants/moduleConcours/someConstants";
import Select from "react-select";
import Button from '@material-ui/core/Button';
import Create_Superviseur from "./add_superviseur";
import Create_Responsable from "./add_responsable";
import {
    get_Superviseurs,
    get_Responsables
} from "../../../actions/moduleConcours/action_superviseur_responsable";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

const CentreCreateForm = (props) => {

    const [nom_centre, setNom_centre] = useState("");
    const [nombre_classe, setNombre_classe] = useState(0);
    const [nbre_surveillant, setNbre_surveillant] = useState(0);
    const [region, setRegion] = useState(0)
    const [departement, setDepartement] = useState(0);
    const [superviseur, setSuperviseur] = useState("");
    const [responsable, setResponsable] = useState("");
    const [superviseurs, setSuperviseurs] = useState([]);
    const [responsables, setResponsables] = useState([]);
    const onSubmit = (e) => {
        e.preventDefault();
        props.add_Centre({nom_centre, nombre_classe, nbre_surveillant, region, departement, superviseur, responsable})
            .then(() => {
                setNom_centre("");
                props.history.push('/scolarite/concours/liste_centre');
                alert("Centre AJOUTÉ")
            })
        console.log({nom_centre, nbre_surveillant, departement, region})

    }
    const getSup = () => {
        props.get_Superviseurs().then(res => {
            setSuperviseurs(res.data.results);
        }).catch(err => console.log(err))
    }
    const getRes = () => {
        props.get_Responsables().then(res => {
            setResponsables(res.data.results);
        }).catch(err => console.log(err))
    }

    useEffect(() => {
        getRes();
        getSup();
    }, [])
    return (
        <Form onSubmit={onSubmit}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Nom Centre</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Le nom du centre"
                    value={nom_centre}
                    onChange={(e) => setNom_centre(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Nombre de salle</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Nombre de salle dispo"
                    value={nombre_classe}
                    onChange={(e) => setNombre_classe(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Nombre de surveillant</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Nombre de surveillant"
                    value={nbre_surveillant}
                    onChange={(e) => setNbre_surveillant(e.target.value)}
                />
            </Form.Group>
            <div className="row">
                <div className="col col-md-6">
                    <Form.Group controlId="formBasicPassword">

                        <Form.Label>Superviseur</Form.Label>
                        <Select
                            onChange={(e) => setSuperviseur(e.value)}
                            placeholder="Choisir un superviseur"
                            options={superviseurs.length > 0 &&
                            superviseurs.map((key) => (
                                { value: key.id, label: key.prenom + " " + key.nom, color: '#00B8D9', isFixed: true }
                            ))}
                        />



                    </Form.Group>
                </div>
                <div className="col col-md-6">
                    <Form.Group>
                        <Form.Label>Pas dans la liste?</Form.Label>
                        <Create_Superviseur setSuperviseurs={setSuperviseurs}/>
                    </Form.Group>
                </div>
            </div>
            <div className="row">
                <div className="col col-md-6">
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Responsable</Form.Label>
                        <Select
                            onChange={(e) => setResponsable(e.value)}
                            placeholder="Choisir un responsable"
                            options={responsables.length > 0 &&
                            responsables.map((key) => (
                                { value: key.id, label: key.prenom + " " + key.nom, color: '#00B8D9', isFixed: true }
                            ))}
                        />
                    </Form.Group>
                </div>
                <div className="col col-md-6">
                    <Form.Group>
                        <Form.Label>Pas dans la liste?</Form.Label>
                        <Create_Responsable setResponsables={setResponsables}/>
                    </Form.Group>
                </div>
            </div>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Region</Form.Label>
                <Select
                    onChange={(e) => setRegion(e.value)}
                    placeholder="Selectionnez la région"
                    options={
                        Object.keys(all.REGION_LIST).map((key) => (
                            { value: key, label: all.REGION_LIST[key], color: '#00B8D9', isFixed: true }
                        ))}
                />

            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Département</Form.Label>
                <Select
                    onChange={(e) => setDepartement(e.value)}
                    placeholder="Selectionnez le département"
                    options={
                        Object.keys(all.DEPARTEMENT[region]).map((key) => (
                        { value: key, label: all.DEPARTEMENT[region][key], color: '#00B8D9', isFixed: true }
                        ))}
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


const Create_Centre = (props) => {

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        props.getAllCentres();
    };
    const handleShow = () => setShow(true);

    return (
        <>

            <div
                className="d-flex align-items-center"
                style={{ height: "5vh" }}
            >
                <Button variant="contained" color="default" onClick={handleShow}>
                    <i className="fas fa-plus-circle"/> nouveau centre
                </Button>
            </div>
            <br/><br/>


            <Modal show={show} onHide={() => {
                handleClose();
                props.get_Centres().then(res => props.setCentres(res.data.results));
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>Nouveau centre</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CentreCreateForm add_Centre={props.add_Centre} get_Superviseurs={props.get_Superviseurs} get_Responsables={props.get_Responsables} history={props.history}/>
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
    connect(mapStateToProps, {get_Superviseurs, get_Responsables}))(Create_Centre);
