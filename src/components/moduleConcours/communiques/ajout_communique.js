import React, { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import Button from '@material-ui/core/Button';
import {DropzoneArea} from 'material-ui-dropzone'
import { AttachFile, AudioTrack, Description, PictureAsPdf, Theaters } from '@material-ui/icons';
import { createStyles, makeStyles } from '@material-ui/core/styles';





const AjoutCommuniqueForm = (props) => {

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
                <Form.Label>Titre Communiqué</Form.Label>
                <Form.Control
                    type="text"
                    name="titre"
                    placeholder="Le titre du communiqué"
                    value={props.newCommunique.titre_rapport}
                    onChange={props.handleChange}
                />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Date communiqué</Form.Label>
                <Form.Control
                    type="date"
                    name="date_communique"
                    placeholder="La date du communique"
                    onChange={props.handleChange}
                />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <DropzoneArea
                    dropzoneText={"Insérer le communiqué ici (cliquer ou glisser)"}
                    name="file"
                    onChange={props.handleFileChange}
                    getPreviewIcon={handlePreviewIcon}
                />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Confirmer l'éxactitude des données!" />
            </Form.Group>
            <Button variant="contained" color="primary" type="submit" block>
                Créer
            </Button>
        </form>
    );
};


const Ajout_Communique = (props) => {

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
                    <i className="fas fa-plus-circle"/> Nouveau Communique
                </Button>
            </div>
            <br/><br/>


            <Modal show={show} onHide={() => {
                handleClose();
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>Nouveau Communique</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AjoutCommuniqueForm newCommunique={props.newCommunique}
                                         handleSubmit={props.handleSubmit}
                                         handleChange={props.handleChange}
                                         handleFileChange={props.handleFileChange}/>
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

export default Ajout_Communique;
