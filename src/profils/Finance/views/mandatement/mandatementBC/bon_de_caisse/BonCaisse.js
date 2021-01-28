import React from 'react';
import Button from '@material-ui/core/Button';
import '../../madantementAC/mandat/forms.css';
import '../../madantementAC/mandat/pv.css';

class BonCaisse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {liste:[], exercice: '', gestion:'', sommeMandate:'', nomCreancier:'',sommeNette:'',anneeOrigine:'',date:'',nBordereau:'',nMandat:'',imputation:'',justification:'',id_mandat:''};
      }
    
      handleChangeExercice=(event)=>{
        this.setState({exercice: event.target.value });
      }
      handleChangeGestion=(event)=>{
        this.setState({gestion: event.target.value });
      }
      handleChangeSommeMandate=(event)=>{
        this.setState({sommeMandate: event.target.value });
      }
      handleChangeNomCreancier=(event)=>{
        this.setState({nomCreancier: event.target.value });
      }
      handleChangeSommeNette=(event)=>{
        this.setState({sommeNette: event.target.value });
      }
      handleChangeAnneeOrigine=(event)=>{
        this.setState({anneeOrigine: event.target.value });
      }
      handleChangeDate=(event)=>{
        this.setState({date: event.target.value });
      }
      handleChangeNBordereau=(event)=>{
        this.setState({nBordereau: event.target.value });
      }
      handleChangeNMandat=(event)=>{
        this.setState({nMandat: event.target.value });
      }
      handleChangeImputation=(event)=>{
        this.setState({imputation: event.target.value });
      }
      handleChangeJustification=(event)=>{
        this.setState({justification: event.target.value });
      }

      componentDidMount(){
        fetch('http://127.0.0.1:8000/mandatement/last1')
        .then(res => res.json())
        .then(data => this.setState({liste: data}))
        .catch(err => console.error(err));
  
       }

      handleSubmit=(event)=> {
        
        event.preventDefault();
        const dataToSend = {exercice: this.state.exercice, gestion: this.state.gestion, sommeMandate:this.state.sommeMandate, nomCreancier:this.state.nomCreancier, sommeNette:this.state.sommeNette, anneeOrigine:this.state.anneeOrigine, date:this.state.date, nBordereau:this.state.nBordereau, nMandat:this.state.nMandat, imputation:this.state.imputation, justification:this.state.justification, id_mandat:this.state.liste[1]}
        fetch('http://127.0.0.1:8000/mandatement/bonCaisse/',{
            method: 'POST',
            headers: {
              Accept: 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify(dataToSend)
        }).then(
            data => console.log(data)
        )
        alert('enregistré');
      }

      render(){
        return (
            <div class="container">
                <form onSubmit={this.handleSubmit}>
            <div>
                <table class="table table-bordered text-center shadow-lg p-3 mb-5 bg-white rounded largeur" style={{width:"1123px",fontSize:"1em",height:"559.3700787402px",backgroundColor:"#F7DC6F"}}>
                    <thead class="jaune">
                        <tr class="centre">
                            <th scope="col" colspan="2" class="lefta" style={{border:"1px solid #dee2e6",fontWeight:"bold"}}>
                                Ministere de l'enseignement superieur <br/> et de la recherche <br/>
                                **_*_** <br/>
                                AGENT COMPTABLE DE L'ECOLE <br/>
                                POLYTECHNIQUE THIES<br/>
                                **_*_**
                            </th>
                            <th scope="col" colspan="4" class="align-middle taille" style={{border:"1px solid #dee2e6",fontWeight:"bold"}}> <Button class="sub" variant="contained" style={{color:"Black", fontSize:"1.2em"}} type="submit" >BON DE CAISSE</Button> <p style={{fontSize:"0.5em"}}>Attention La validité de ce bon de caisse est limitée En cas de retard apporté à son encaissement par le creancier, ce dernier court le risque de se voir opposer la prescription à l'expiration du délai de déchéance</p></th>
                            <th scope="col" colspan="5" class="align-middle" style={{border:"1px solid #dee2e6",fontWeight:"bold"}}>  Budget / ept <span class="gr spanner"></span>
                                <br/><br/> Exercice: <span class="gr spanner" style={{border:"1px solid #dee2e6"}}><input type="number" class="bas spanner abc" required onChange={this.handleChangeExercice} value={this.state.exercice} style={{width: "45px"}}/> </span> Gestion: <span class="gr spanner"><input type="number" required class="bas spanner abc" onChange={this.handleChangeGestion} value={this.state.gestion} style={{width: "45px"}}/></span></th>
                        </tr>
                    <tr class="centre">
                        <th scope="col" rowspan="2" class="align-middle creancier dte" style={{border:"1px solid #dee2e6",fontWeight:"bold"}}>Nom et adresse du Creancier <br/> Compte à crediter</th>
                        <th scope="col" rowspan="2" class="align-middle mandatee1 dte" style={{border:"1px solid #dee2e6",fontWeight:"bold"}}>Somme Nette <br/> Revenant au creancier</th>
                        <th scope="col" colspan="5" class="align-middle reference" style={{border:"1px solid #dee2e6",fontWeight:"bold"}}>Reference de Mandatement - Objet de la dépense - pieces justificatives</th>
                        <th scope="col" colspan="2" class="align-middle Date1" style={{border:"1px solid #dee2e6",fontWeight:"bold"}}>Somme Mandatée</th>
                    </tr>
                    <tr class="centre">
                        <th scope="col" class="bordd"style={{border:"1px solid #dee2e6",fontWeight:"bold"}}>Année d'origine</th>
                        <th scope="col" class="align-middle Date1" style={{border:"1px solid #dee2e6",fontWeight:"bold", width:"9%"}}>date</th>
                        <th scope="col" class="align-middle bordd" style={{border:"1px solid #dee2e6",fontWeight:"bold", width:"7%"}}>N° bordereau</th>
                        <th scope="col" class="align-middle bordd" style={{border:"1px solid #dee2e6",fontWeight:"bold", width:"7%"}}>N° mandat</th>
                        <th scope="col" class="align-middle bordd" style={{border:"1px solid #dee2e6",fontWeight:"bold"}}>Imputation</th>
                        <th scope="col" class="align-down Date1" rowspan="5" style={{border:"1px solid #dee2e6",fontWeight:"bold"}}> <span class="spanner"><input class="input-group-text abc" onChange={this.handleChangeSommeMandate} value={this.state.sommeMandate} type="text"/></span> </th>
                    </tr>
                    <tr class="centre">
                        <th scope="col" rowspan="2" style={{border:"1px solid #dee2e6",fontWeight:"bold"}}><span class="spanner"> <textarea style={{border:"none",lineHeight:"20px"}} required class="form-control cab" rows="4" onChange={this.handleChangeNomCreancier} value={this.state.nomCreancier}></textarea></span></th>
                        <th scope="col" rowspan="2" class=" align-top mille" style={{border:"1px solid #dee2e6",fontWeight:"bold"}}><span class="spanner"> <input class="input-group-text abc" type="number" required onChange={this.handleChangeSommeNette} value={this.state.sommeNette}/> </span></th>
                        <th scope="col" class=" align-top" rowspan="2" style={{border:"1px solid #dee2e6",fontWeight:"bold"}} ><span class="spanner"> <input class="input-group-text abc" type="number" disabled onChange={this.handleChangeAnneeOrigine} value={this.state.anneeOrigine=this.state.liste[13]}/> </span></th>
                        <th scope="col" class=" align-top" rowspan="2" style={{border:"1px solid #dee2e6",fontWeight:"bold"}}><span class="spanner"> <input class="input-group-text abc cq" type="date" required onChange={this.handleChangeDate} value={this.state.date}/></span></th>
                        <th scope="col" class=" align-top" rowspan="2" style={{border:"1px solid #dee2e6",fontWeight:"bold"}}><span class="spanner"> <input class="input-group-text abc" type="number" disabled onChange={this.handleChangeNBordereau} value={this.state.nBordereau=this.state.liste[6]}/> </span></th>
                        <th scope="col" class=" align-top" rowspan="2" style={{border:"1px solid #dee2e6",fontWeight:"bold"}}><span class="spanner"> <input class="input-group-text abc" type="number" disabled onChange={this.handleChangeNMandat} value={this.state.nMandat=this.state.liste[0]}/> </span></th>
                        <th scope="col" class=" align-top" rowspan="4" style={{border:"1px solid #dee2e6",fontWeight:"bold"}}><span class="spanner"> <input class="input-group-text abc" type="text" required onChange={this.handleChangeImputation} value={this.state.imputation}/> </span></th>
                        
                    </tr>
                    <tr class="centre"></tr>
                  
                    <tr class="centre">
                        <th scope="col" rowspan="1" class=" align-middle comptable" style={{border:"1px solid #dee2e6",fontWeight:"bold"}}>(RESERVE AU COMPTABLE)</th>
                        <th scope="col" rowspan="1" style={{border:"1px solid #dee2e6"}}>  </th>
                        <th scope="col" rowspan="2" colspan="4" style={{border:"1px solid #dee2e6",fontWeight:"bold"}}> <span class="spanner"><textarea style={{border:"none",lineHeight:"20px"}} required class="form-control cab" rows="4" onChange={this.handleChangeJustification} value={this.state.justification}></textarea></span></th>
                    </tr>
                    <tr class="centre">
                        <th scope="col" style={{border:"1px solid #dee2e6",fontWeight:"bold"}}>Net à payer ou A virer</th>
                        <th scope="col" style={{border:"1px solid #dee2e6"}}> </th>
                    </tr>
                    <tr class="centre">
                        <th style={{border:"1px solid #dee2e6",fontWeight:"bold"}} scope="col" colspan="2" rowspan="4" class="align-middle"> <span class="spanner">Timbre "vu bon à payer"</span></th>
                        <th scope="col" style={{border:"1px solid #dee2e6",fontWeight:"bold"}} rowspan="4" colspan="4" class="align-top">
                              ...........................................................................................................
                              ...........................................................................................................
                      <br/>   Le ......................................................................................................</th>
                        <th style={{border:"1px solid #dee2e6",fontWeight:"bold"}} scope="col" rowspan="4" colspan="3" class="align-top"><span class="arrete">Arrete le montant à la somme </span>
                            ...................................................... <br/>
                            ......................................................
                            L'ordonnateur <br/> <img src="sign.png" alt="signature" class="sign"/><br/></th>
                    </tr>
                    </thead>
                    <tbody>
                        
                    </tbody>
                </table>
            </div>
        </form>
    </div>
    
        )}

}

export default BonCaisse