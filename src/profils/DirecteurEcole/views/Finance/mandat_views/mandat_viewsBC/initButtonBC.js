import React from "react";
import Ok from '@material-ui/icons/AssignmentTurnedIn';
import {Link} from "react-router-dom";

class InitButtonBC extends React.Component{
    constructor(props) {
        super(props);
        this.state =  { 
            liste:[]
         }
      }
      componentDidMount(){
        fetch(`http://localhost:8000/mandatement/MandatementBc/${this.props.id}/`)
            .then(res => res.json())
            .then(data => this.setState({liste: data}))
            .catch(err => console.error(err));
    }

       handleSubmitBc=()=>{

        const dataToSend = {bon_caisseUpload:this.state.liste.bon_caisseUpload, bon_d_engagementUpload:this.state.liste.bon_d_engagementUpload,
             bl: this.state.liste.bl, bon_d_engagement:this.state.liste.bon_d_engagement, 
             bordereau_trans:this.state.liste.bordereau_trans, bordereau_transUpload:this.state.liste.bordereau_transUpload,
             date_Ac:this.state.liste.date_Ac, editeur:this.state.liste.editeur, facture_definitive:this.state.liste.facture_definitive,
             facture_proformat:this.state.liste.facture_proformat, mandat:this.state.liste.mandat, mandatUpload:this.state.liste.mandatUpload, 
             mandat_name:this.state.liste.mandat_name, motif_rejet_comptable:this.state.liste.motif_rejet_comptable,
             motif_rejet_directeur:this.state.liste.motif_rejet_directeur, pv:this.state.liste.pv, pv_upload:this.state.liste.pv_upload,
            rejet_comptable:this.state.liste.rejet_comptable, rejet_directeur:false, 
            valid_comptable:this.state.liste.valid_comptable, valid_directeur:true}
    
   
        fetch(`http://localhost:8000/mandatement/MandatementBc/${this.props.id}/`,{
        method: 'PUT',
        headers: {
            Accept: 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify(dataToSend)
        }).then(
            data => console.log(data)
        )
        alert('Mandat validé avec succés');
        this.refs.btn.setAttribute("disabled", "disabled");

    }


    render() {
        return(
            <>
                <button type="button" ref="btn" className='btn btn-lg btn-success' onClick={this.handleSubmitBc}>
                    <Ok/> Validation Mandat
                </button>
            </>
        )
    }
}

export default InitButtonBC;