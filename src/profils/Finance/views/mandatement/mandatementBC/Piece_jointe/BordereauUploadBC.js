import React, {Component} from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdbreact';



class BordereauUploadBC extends Component {
    constructor(props) {
        super(props);
        this.state = {
            document : null,
            liste:[]
        }
    }

    componentDidMount(){
        fetch('http://127.0.0.1:8000/mandatement/last1')
        .then(res => res.json())
        .then(data => this.setState({liste: data}))
        .catch(err => console.error(err));
    }



    handleChangedocument = (event) => {
        this.setState({
            document: event.target.files[0],

        });
    }



    saveDocumentsEtudiant = (event) => {
        event.preventDefault();

        let form_data = new FormData();
        form_data.append('document', this.state.document, this.state.document.name);

        fetch(`http://127.0.0.1:8000/mandatement/uploadBordereauBc/${this.state.liste[11]}/`, {
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

        if (this.state.document) {

            return (
                <div className="card">
                    <h2 className="mt-3">Les Informations Du Fichier</h2>
                    <p>Nom: {this.state.document.name}</p>
                    <p>Type Fichier: {this.state.document.type}</p>
                </div>
            );
        }
    };

    fileColor = () =>{
        if(this.state.document){
            return "fa fa-file-pdf-o"
        }
        else{
            return "fa fa-download"
        }
    }

    fileColor2 = () =>{
        if(this.state.document){
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
                                           onChange={this.handleChangedocument} type="file" name="fileUpload"  />

                                    <label for="file-upload" id="file-drag">
                                        <div id="start">
                                            <i class={this.fileColor()} style={{color : this.fileColor2()}}  aria-hidden="true"></i>
                                            <div><b>Bordereau</b></div>
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

export default BordereauUploadBC;