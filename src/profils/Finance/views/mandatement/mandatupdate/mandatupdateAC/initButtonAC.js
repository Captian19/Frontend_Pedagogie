import React from "react";
import CreateNewFolderIcon from "@material-ui/icons/CreateNewFolder";
import {Link} from "react-router-dom";

class InitButtonAC extends React.Component{
    constructor(props) {
        super(props);
        this.state =  { 
            exercice: 2020, gestion:0, sommeMandate:0, nomCreancier:'',sommeNette1:0,sommeNette2:0,anneeOrigine:2020,
            date:'2020-02-02',nBordereau:0,nMandat:0,nCheque:0,imputation:'',justification:'',chapitre:'', designation_four:'',
            num_nomenclature:0, designation_mat:'',unite:0, quantite_mat:0, decisions:'', membres:'',file_uploaded: '',
            nom_fournisseur:'', nature_command:''    
         }
      }




       handleSubmitAc=()=>{

        const dataToSend = {exercice: this.state.exercice, gestion: this.state.gestion, sommeMandate:this.state.sommeMandate, 
          nomCreancier:this.state.nomCreancier, sommeNette1:this.state.sommeNette1, sommeNette2:this.state.sommeNette2,
          anneeOrigine:this.state.anneeOrigine, date:this.state.date, nBordereau:this.state.nBordereau, 
          nMandat:this.state.nMandat, nCheque:this.state.nCheque, imputation:this.state.imputation,
          justification:this.state.justification}
    
        const dataToSend1 = {chapitre: this.state.chapitre, date: this.state.date, designation_four:this.state.designation_four,
          num_nomenclature:this.state.num_nomenclature, designation_mat:this.state.designation_mat, unite:this.state.unite,
          quantite_mat:this.state.quantite_mat, decisions:this.state.decisions, membres:this.state.membres, date_arrete:this.state.date}
       
        const dataToSend2 = {exercice:this.state.exercice, imputation:this.state.imputation,nom_fournisseur:this.state.nom_fournisseur,
          nature_command:this.state.nature_command, designation_mat_serv:this.state.designation_mat, quantity:this.state.quantite_mat,
          prix_unitaire:this.state.sommeNette1, montant:this.state.sommeNette1}
            
        const dataToSend6 = {nomCreancier:this.state.nomCreancier, sommeNette:this.state.nMandat, anneeOrigine:this.state.nMandat,
            date:this.state.date, nBordereau:this.state.nMandat, nMandat:this.state.nMandat,nChapitre:this.state.designation_four,
            imputation:this.state.designation_four,sommeMandate:this.state.sommeMandate,totalChap:this.state.sommeMandate,totalArticle:this.state.exercice,
            exercice:this.state.exercice,gestion:this.state.gestion, bordereauNum:this.state.exercice,feuilletNum:this.state.exercice}

        const formData = new FormData();
        formData.append('file',this.state.file_uploaded)
    
        fetch('http://127.0.0.1:8000/mandatement/avis/',{
        method: 'POST',
        headers: {
            Accept: 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify(dataToSend)
        }).then(
            data => console.log(data)
        )
        
        fetch('http://127.0.0.1:8000/mandatement/BordereauAc/',{
        method: 'POST',
        headers: {
            Accept: 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify(dataToSend6)
        }).then(
            data => console.log(data)
        )
          
          
        fetch('http://127.0.0.1:8000/mandatement/BonEngagementAc/',{
          method: 'POST',
            headers: {
              Accept: 'application/json', 'Content-Type': 'application/json'},
              body: JSON.stringify(dataToSend2)
        }).then(
            data => console.log(data)
        ) 
          
        fetch('http://127.0.0.1:8000/mandatement/mandatAc/',{
        method: 'POST',
        headers: {
            Accept: 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify(dataToSend)
    }).then(
        data => console.log(data)
    )
       
    
        fetch('http://127.0.0.1:8000/mandatement/pvAc/',{
            method: 'POST',
            headers: {
                Accept: 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify(dataToSend1)
        }).then(
            data => console.log(data)
        )
    
            
        fetch('http://127.0.0.1:8000/mandatement/uploadFPAc/',{
          method: 'POST',
          body: formData
        }).then(
            data => console.log(data)
        )

        fetch('http://127.0.0.1:8000/mandatement/uploadFDAc/',{
          method: 'POST',
          body: formData
        }).then(
            data => console.log(data)
        )

        fetch('http://127.0.0.1:8000/mandatement/uploadBLAc/',{
          method: 'POST',
          body: formData
        }).then(
            data => console.log(data)
        )

        fetch('http://127.0.0.1:8000/mandatement/uploadMandatAc/',{
          method: 'POST',
          body: formData
        }).then(
            data => console.log(data)
        )

        fetch('http://127.0.0.1:8000/mandatement/uploadAvisCredit/',{
          method: 'POST',
          body: formData
        }).then(
            data => console.log(data)
        )

        fetch('http://127.0.0.1:8000/mandatement/uploadBordereauAc/',{
          method: 'POST',
          body: formData
        }).then(
            data => console.log(data)
        )

        fetch('http://127.0.0.1:8000/mandatement/uploadBonEngagementAc/',{
            method: 'POST',
            body: formData
          }).then(
              data => console.log(data)
        )


          fetch('http://127.0.0.1:8000/mandatement/uploadPvReceptionAc/',{
            method: 'POST',
            body: formData
          }).then(
              data => console.log(data)
          )


    }


    render() {
        return(
            <>
                <button type="button" className='btn btn-lg btn-success' onClick={this.handleSubmitAc}>
                    <CreateNewFolderIcon/><Link to='mandatementac'>Mandatement Avis de credit</Link>
                </button>
            </>
        )
    }
}
export default InitButtonAC;