import React from "react";
import Stop from '@material-ui/icons/Stop';


class RejetButtonAc extends React.Component{
    constructor(props) {
        super(props);
        this.state =  { 
            liste:[],
            motif_rejet_comptable:''
         }
      }

    componentDidMount(){
    fetch(`http://localhost:8000/mandatement/MandatementAc/${this.props.id}/`)
        .then(res => res.json())
        .then(data => this.setState({liste: data}))
        .catch(err => console.error(err));
    }

    handleChangeMotifRejetComptable=(event)=>{
        this.setState({motif_rejet_comptable: event.target.value});
      }


    handleSubmitAc=()=>{

        const dataToSend = {avis_credit:this.state.liste.avis_credit, avis_creditUpload:this.state.liste.avis_creditUpload,
             bl: this.state.liste.bl, bon_d_engagement:this.state.liste.bon_d_engagement, bon_d_engagementUpload:this.state.liste.bon_d_engagementUpload,
             bordereau_trans:this.state.liste.bordereau_trans, bordereau_transUpload:this.state.liste.bordereau_transUpload,
             date_Ac:this.state.liste.date_Ac, editeur:this.state.liste.editeur, facture_definitive:this.state.liste.facture_definitive,
             facture_proformat:this.state.liste.facture_proformat, mandat:this.state.liste.mandat, mandatUpload:this.state.liste.mandatUpload, 
             mandat_name:this.state.liste.mandat_name, motif_rejet_comptable:this.state.motif_rejet_comptable,
             motif_rejet_directeur:this.state.liste.motif_rejet_directeur, pv:this.state.liste.pv, pv_upload:this.state.liste.pv_upload,
             rejet_comptable:true, rejet_directeur:this.state.liste.rejet_directeur, 
             valid_comptable:false, valid_directeur:this.state.liste.valid_directeur}
    
   
        fetch(`http://localhost:8000/mandatement/MandatementAc/${this.props.id}/`,{
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
                <form onSubmit={this.handleSubmitAc}>
                    <div class="modal-body">
                        <textarea class="form-control" required value={this.state.motif_rejet_comptable} onChange={this.handleChangeMotifRejetComptable}  rows="4"></textarea>
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
export default RejetButtonAc;