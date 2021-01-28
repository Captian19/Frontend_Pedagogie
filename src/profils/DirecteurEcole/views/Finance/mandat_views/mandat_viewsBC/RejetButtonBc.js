import React from "react";
import Stop from '@material-ui/icons/Stop';
import {Link} from "react-router-dom";

class RejetButtonBc extends React.Component{
    constructor(props) {
        super(props);
        this.state =  { 
            liste:[],
            motif_rejet_directeur:''
         }
      }

    componentDidMount(){
    fetch(`http://localhost:8000/mandatement/MandatementBc/${this.props.id}/`)
        .then(res => res.json())
        .then(data => this.setState({liste: data}))
        .catch(err => console.error(err));
    }

    handleChangeMotifRejetDirecteur=(event)=>{
        this.setState({motif_rejet_directeur: event.target.value});
      }


    handleSubmitBc=()=>{

        const dataToSend = {bon_caisseUpload:this.state.liste.bon_caisseUpload, bon_d_engagementUpload:this.state.liste.bon_d_engagementUpload,
             bl: this.state.liste.bl, bon_d_engagement:this.state.liste.bon_d_engagement, 
             bordereau_trans:this.state.liste.bordereau_trans, bordereau_transUpload:this.state.liste.bordereau_transUpload,
             date_Bc:this.state.liste.date_Bc, editeur:this.state.liste.editeur, facture_definitive:this.state.liste.facture_definitive,
             facture_proformat:this.state.liste.facture_proformat, mandat:this.state.liste.mandat, mandatUpload:this.state.liste.mandatUpload, 
             mandat_name:this.state.liste.mandat_name, motif_rejet_comptable:this.state.liste.motif_rejet_comptable,
             motif_rejet_directeur:this.state.motif_rejet_directeur, pv:this.state.liste.pv, pv_upload:this.state.liste.pv_upload,
             rejet_comptable:this.state.liste.rejet_comptable, rejet_directeur:true, 
             valid_comptable:this.state.liste.valid_comptable, valid_directeur:false}
    
   
        fetch(`http://localhost:8000/mandatement/MandatementBc/${this.props.id}/`,{
        method: 'PUT',
        headers: {
            Accept: 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify(dataToSend)
        }).then(
            data => console.log(data)
        )


    }


    render() {
        return(
            <>
                <button type="button" className='btn btn-lg btn-danger' data-toggle="modal" data-target="#exampleModal" onClick={this.handleSubmitAc}>
                <Stop/> Rejetter
            </button>

                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Motif Rejet</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form onSubmit={this.handleSubmitBc}>
                    <div class="modal-body">
                        <textarea class="form-control" required value={this.state.motif_rejet_directeur} onChange={this.handleChangeMotifRejetDirecteur}  rows="4"></textarea>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-dark" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-light">Save</button>
                    </div>
                </form>
                </div>
            </div>
            </div>
            </>
        )
    }
}
export default RejetButtonBc;