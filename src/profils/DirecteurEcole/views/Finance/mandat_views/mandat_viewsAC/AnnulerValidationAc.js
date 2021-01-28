import React from "react";
import SP from '@material-ui/icons/ShutterSpeed';
import {Link} from "react-router-dom";

class AnnulerValidationAC extends React.Component{
    constructor(props) {
        super(props);
        this.state =  { 
            liste:[]   
         }
      }

      componentDidMount(){
        fetch(`http://localhost:8000/mandatement/MandatementAc/${this.props.id}/`)
            .then(res => res.json())
            .then(data => this.setState({liste: data}))
            .catch(err => console.error(err));
    }

       handleSubmitAc=()=>{

        const dataToSend = {avis_credit:this.state.liste.avis_credit, avis_creditUpload:this.state.liste.avis_creditUpload,
             bl: this.state.liste.bl, bon_d_engagement:this.state.liste.bon_d_engagement, bon_d_engagementUpload:this.state.liste.bon_d_engagementUpload,
             bordereau_trans:this.state.liste.bordereau_trans, bordereau_transUpload:this.state.liste.bordereau_transUpload,
             date_Ac:this.state.liste.date_Ac, editeur:this.state.liste.editeur, facture_definitive:this.state.liste.facture_definitive,
             facture_proformat:this.state.liste.facture_proformat, mandat:this.state.liste.mandat, mandatUpload:this.state.liste.mandatUpload, 
             mandat_name:this.state.liste.mandat_name, motif_rejet_comptable:this.state.liste.motif_rejet_comptable,
             motif_rejet_directeur:this.state.liste.motif_rejet_directeur, pv:this.state.liste.pv, pv_upload:this.state.liste.pv_upload,
            rejet_comptable:this.state.liste.rejet_comptable, rejet_directeur:false, 
            valid_comptable:this.state.liste.valid_comptable, valid_directeur:false}
    
   
        fetch(`http://localhost:8000/mandatement/MandatementAc/${this.props.id}/`,{
        method: 'PUT',
        headers: {
            Accept: 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify(dataToSend)
        }).then(
            data => console.log(data)
        )
        alert('Validation annulé');
        this.refs.btn.setAttribute("disabled", "disabled");

    }


    render() {
        return(
            <>
                <button type="button" ref="btn" className='btn btn-lg btn-warning' onClick={this.handleSubmitAc}>
                    <SP/> Annuler Validation
                </button>
            </>
        )
    }
}
export default AnnulerValidationAC;