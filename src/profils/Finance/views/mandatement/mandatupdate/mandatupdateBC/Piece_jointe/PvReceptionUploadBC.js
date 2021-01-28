import React, {Component} from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdbreact';



class PvReceptionUploadBC extends Component {
    constructor(props) {
        super(props);
        this.state = {
            document : [],
            liste: []
        }
    }

    handleChangedocument = (event) => {
        this.setState({
            file_uploaded: event.target.files[0],

        });
    }


    saveDocumentsEtudiant = (event) => {
        event.preventDefault();

        let form_data = new FormData();
        form_data.append('file_uploaded', this.state.file_uploaded, this.state.file_uploaded.name);

        fetch(`http://127.0.0.1:8000/mandatement/uploadPvReceptionBc/${this.props.id_Bc}/`, {
            method: 'PUT',
            headers: {
                "Accept":"application/json",
            },
            body:form_data,
        }).then(res => res.json())
            .then(response => window.alert(`${this.state.files.length} files uploaded succesfully!`))
            .catch(err => window.alert('Error uploading files :('))
    };

    fileData = () => {

        if (this.state.file_uploaded) {

            return (
                <div className="card">
                    <h2 className="mt-3">Les Informations Du Fichier</h2>
                    <p>Nom: {this.state.file_uploaded.name}</p>
                    <p>Type Fichier: {this.state.file_uploaded.type}</p>
                </div>
            );
        }
    };

    fileColor = () =>{
        if(this.state.file_uploaded){
            return "fa fa-file-pdf-o"
        }
        else{
            return "fa fa-download"
        }
    }

    fileColor2 = () =>{
        if(this.state.file_uploaded){
            return "red"
        }
        else{
            return "dark"
        }
    }


    render() {
        return (
            <MDBContainer className="mt-5" >
                <MDBRow>
                    <MDBCol md="6">
                        <form onSubmit={this.saveDocumentsEtudiant}>

                            <div className="input-group mt-3">
                                <div className="input-group-prepend">
                                </div>
                                <div id="file-upload-form" class="uploader mt-5">
                                    <input id="file-upload"  accept="file/pdf"
                                           onChange={this.handleChangedocument} type="file" name="file_uploaded"  />

                                    <label for="file-upload" id="file-drag">
                                        <div id="start">
                                            <i class={this.fileColor()} style={{color : this.fileColor2()}}  aria-hidden="true"></i>
                                            <div><b>Pv de reception Upload</b></div>
                                            {this.fileData()}
                                            <span id="file-upload-btn" class="btn btn-primary">Joindre le fichier</span>
                                        </div>
                                    </label>
                                </div>

                            </div>
                            <div className="text-center py-4 mt-3">
                                <MDBBtn className="btn btn-outline-purple" type="submit" >
                                    Send
                                    <MDBIcon far icon="paper-plane" className="ml-2" />
                                </MDBBtn>
                            </div>
                        </form>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}

export default PvReceptionUploadBC;