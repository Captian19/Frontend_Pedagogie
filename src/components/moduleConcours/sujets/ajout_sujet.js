import React, { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import Button from '@material-ui/core/Button';
import {DropzoneArea} from 'material-ui-dropzone'
import { AttachFile, AudioTrack, Description, PictureAsPdf, Theaters } from '@material-ui/icons';
import { createStyles, makeStyles } from '@material-ui/core/styles';


const AjoutSujetForm = (props) => {
    const handlePreviewIcon = (fileObject, classes) => {
        const {type} = fileObject.file
        const iconProps = {
            className : classes.image,
        }


        switch (type) {
            case "application/msword":
            case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                return <Description {...iconProps} />
            case "application/pdf":
                return <PictureAsPdf {...iconProps} />
            default:
                return <AttachFile {...iconProps} />
        }
    }

    return (
        <form onSubmit={props.handleSubmit}>
            
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Titre sujet</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Titre du sujet"
                    name="titre"
                    value={props.newSubject.titre}
                    onChange={props.handleChange}
                />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Année concours</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Année du concours"
                    name="annee"
                    value={props.newSubject.annee}
                    onChange={props.handleChange}
                />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <DropzoneArea
                    dropzoneText={"Insérer le sujet ici (cliquer ou glisser)"}
                    onChange={props.handleFileChange}
                    getPreviewIcon={handlePreviewIcon}
                />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Confirmer l'éxactitude des données!" />
            </Form.Group>
            {/*<UploadFile handleFileChange={props.handleFileChange}/>*/}
            <button className="btn btn-outline-primary" type="submit">
                Ajouter
            </button>
        </form>
    );
};


const Ajout_Sujet = (props) => {

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
                    <i className="fas fa-plus-circle"/> Nouveau Sujet
                </Button>
            </div>
            <br/><br/>


            <Modal show={show} onHide={() => {
                handleClose();
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>Nouveau Sujet</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AjoutSujetForm newSubject={props.newSubject}
                                    handleSubmit={props.handleSubmit}
                                    handleChange={props.handleChange}
                                    handleFileChange={props.handleFileChange}
                    />
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

export default Ajout_Sujet;