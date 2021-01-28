import React, {Component} from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdbreact';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {connect} from "react-redux";
import coche from "../coche.png"
class FactureProformatBC extends Component {
    constructor(props) {
        super(props);
        this.state = {
            document : [],
            liste:[], lot:[]
        }
    }

    async componentDidMount(){
        const delay = ms => new Promise(res => setTimeout(res, ms));
        await delay(4500);
        fetch('http://127.0.0.1:8000/mandatement/last1')
        .then(res => res.json())
        .then(data => this.setState({liste: data}))
        .catch(err => console.error(err));
        await delay(500);
        const dataToSend = {facture_proformat:this.state.liste[5], bon_d_engagement:this.state.liste[7],bon_d_engagementUpload:this.state.liste[12],bl:this.state.liste[3],facture_definitive:this.state.liste[4],pv:this.state.liste[2], pv_upload:this.state.liste[8], mandat:this.state.liste[0], mandatUpload:this.state.liste[9],bon_caisse:this.state.liste[1],bon_caisseUpload:this.state.liste[10],bordereau_trans:this.state.liste[6],bordereau_transUpload:this.state.liste[11], editeur:this.props.user.first_name +" "+ this.props.user.last_name}
        fetch('http://127.0.0.1:8000/mandatement/MandatementBc/',{
            method: 'POST',
            headers: {
                Accept: 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify(dataToSend)
            }).then(
                data => console.log(data)
            )

        await delay(600);
        fetch(`http://127.0.0.1:8000/mandatement/MandatementBc/${this.state.liste[5]}/`)
        .then(res => res.json())
        .then(data => this.setState({lot: data}))
        .catch(err => console.error(err));
    }


    handleChangedocument = (event) => {
        this.setState({
            file_uploaded: event.target.files[0],

        });
    }

    handleChangeMandatName = (event) => {
        this.setState({mandat_name:event.target.value})
    }


    saveDocumentsEtudiant = (event) => {
        event.preventDefault();
        let form_data = new FormData();
        form_data.append('file_uploaded', this.state.file_uploaded, this.state.file_uploaded.name);

        fetch(`http://127.0.0.1:8000/mandatement/uploadFPBc/${this.state.liste[5]}/`, {
            method: 'PUT',
            headers: {
                "Accept":"application/json",
            },
            body:form_data,
        }).then(res => res.json())
            .then(response => window.alert(`${this.state.files.length} files uploaded succesfully!`))
            .catch(err => window.alert('Error uploading files :('))

    };

    handleSubmit= (event) => {
        event.preventDefault();
        const dataToSend1 =  {facture_proformat:this.state.lot.facture_proformat, bon_d_engagement:this.state.lot.bon_d_engagement,
            bon_d_engagementUpload:this.state.lot.bon_d_engagementUpload, bl:this.state.lot.bl, facture_definitive:this.state.lot.facture_definitive,
            pv:this.state.lot.pv, pv_upload:this.state.lot.pv_upload, mandat:this.state.lot.mandat, mandatUpload:this.state.lot.mandatUpload,
            bon_caisse:this.state.lot.bon_caisse,bon_caisseUpload:this.state.lot.bon_caisseUpload, bordereau_trans:this.state.lot.bordereau_trans,
            bordereau_transUpload:this.state.lot.bordereau_transUpload, editeur:this.state.lot.editeur, mandat_name: this.state.mandat_name}
   
            fetch(`http://127.0.0.1:8000/mandatement/MandatementBc/${this.state.liste[5]}/`,{
            method: 'PUT',
            headers: {
              Accept: 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify(dataToSend1)
        }).then(
            data => console.log(data)
        )
        alert('enregistré');

        }

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
                 <div>
                     <form onSubmit={this.handleSubmit} id="basic" style={{display:"none"}}>
                         <div className="row">
                             <div className="col-md-5">
                                 <TextField required  onChange={this.handleChangeMandatName} value={this.state.mandat_name} label="nom Mandatement" variant="outlined" />
                             </div>
                             <div className="col-md-3">
                                 <Button className="btn btn-outline-primary" type="submit">Valider</Button>
                             </div>
                         </div>
                     </form>
                 </div>
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
                                            <div><b>Facture Proforma <img id='coche' style={{display:"none"}} src={coche} width="15px" height="15px"/></b></div>
                                            {this.fileData()}
                                            <span id="file-upload-btn" class="btn btn-primary">Joindre le fichier</span><br/>
                                            <div class="spinner-border card-title text-center" role="status" id='wait'> <span class="sr-only">Loading...</span> </div> 
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
                <script>
                test = function(){

                    setTimeout(function() {
                    var elmt = document.getElementById("coche");
                    var elmt1 = document.getElementById("wait");
                    var elmt2 = document.getElementById("basic");
                    if( elmt != null){elmt.style.display = "inline";}
                    if( elmt1 != null){elmt1.style.display = "none";}
                    if( elmt2 != null){elmt2.style.display = "inline";}
                    else{console.log('error')}

                    }, 6200)
                    }
                    var elmt = document.getElementById("coche");
                    elmt.onload = test();
                </script>
            </MDBContainer>
        );
    }
}

const mapStateToProps = state => ({
    user: state.auth.user
  })
export default connect(mapStateToProps,null)(FactureProformatBC);