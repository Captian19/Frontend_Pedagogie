import React from 'react';
import './forms.css';
import './pv.css';
import "./print.css"


class MandatBC extends React.Component {

  constructor(props) {
    super(props);
    this.state = {exercice: React.createRef(), gestion: React.createRef(), sommeMandate: React.createRef(), nomCreancier: React.createRef(),
      sommeNette1: React.createRef(),sommeNette2: React.createRef(),anneeOrigine: React.createRef(),date: React.createRef(),nBordereau: React.createRef(),
      nMandat: React.createRef(),nCheque: React.createRef(),imputation: React.createRef(),justification: React.createRef(),
      liste:[],last:[]
  };
  }

async componentDidMount(){
  const delay = ms => new Promise(res => setTimeout(res, ms));
  await delay(100);
  fetch(`http://127.0.0.1:8000/mandatement/mandatBc/${this.props.id_Bc}`)
      .then(res => res.json())
      .then(data => this.setState({liste: data}))
      .catch(err => console.error(err));
    
  fetch('http://127.0.0.1:8000/mandatement/last1')
  .then(res => res.json())
  .then(data => this.setState({last: data}))
  .catch(err => console.error(err));
  
}

  handleSubmit=(event) =>{
    
    event.preventDefault();
    const dataToSend = {exercice: this.state.exercice.current.value, gestion: this.state.gestion.current.value, 
      sommeMandate:this.state.sommeMandate.current.value, nomCreancier:this.state.nomCreancier.current.value, 
      sommeNette1:this.state.sommeNette1.current.value, sommeNette2:this.state.sommeNette2.current.value,
       anneeOrigine:this.state.anneeOrigine.current.value, date:this.state.date.current.value,
        nBordereau:this.state.nBordereau.current.value, nMandat:this.state.nMandat.current.value,
         nCheque:this.state.nCheque.current.value, imputation:this.state.imputation.current.value, 
         justification:this.state.justification.current.value}
    
    fetch(`http://127.0.0.1:8000/mandatement/mandatBc/${this.props.id_Bc}/`,{
      method: 'PUT',
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
  
  <form onSubmit={this.handleSubmit}>
    <div className="container" >
        <table id="page" className="table table-bordered text-center shadow p-3 mb-5 bg-white rounded largeur" style={{borderRight:"13px solid rgb(255,255,255)", borderTop:"8px solid rgb(255,255,255)",width:"1123px",fontSize:"1em",height:"559.3700787402px",backgroundColor:"#76C4C7"}}>
            <thead className="alice">
                <tr className="centre">
                    <th scope="col" colspan="2" class="lefta" style={{border:"1px solid #dee2e6",fontWeight:"bold"}}>
                        Ministere de l'enseignement superieur <br/> et de la recherche <br/>
                        **_*_** <br/>
                        AGENT COMPTABLE DE L'ECOLE <br/>
                        POLYTECHNIQUE THIES<br/>
                        **_*_**
                    </th>
                    <th scope="col" colspan="4" class="align-middle taille"><button class="subr" variant="contained" type="submit" >Mandat</button></th>
                    <th scope="col" colspan="5" class="align-middle" style={{border:"1px solid #dee2e6",fontWeight:"bold"}}>  Budget / ept <br/><br/> Exercice: <span class="spanner gr"><input required type="number" class="bas abcd" name="exercice" autoComplete="off" disabled defaultValue={this.state.last[13]} ref={this.state.exercice} style={{width: "50px"}} /></span>
                        Gestion: <span class="spanner gr"><input type="number" class="bas abcd" name="gestion" required autoComplete="off"  defaultValue={this.state.liste.gestion} ref={this.state.gestion} style={{width: "50px"}} /> </span></th>
                </tr>
                <tr class="centre">
                        <th scope="col" rowspan="2" class="align-middle creancier" style={{border:"1px solid #dee2e6", fontWeight:"bold"}}>Nom et adresse du Creancier <br/> Compte à crediter</th>
                        <th scope="col" rowspan="2" class="align-middle mandatee1" style={{border:"1px solid #dee2e6",fontWeight:"bold"}}>Somme Nette <br/> Revenant au creancier</th>
                        <th scope="col" colspan="6" class="align-middle reference1" style={{border:"1px solid #dee2e6",fontWeight:"bold"}}>Reference de Mandatement - Objet de la dépense - pieces justificatives</th>
                        <th scope="col" class="align-middle" style={{border:"1px solid #dee2e6",fontWeight:"bold", width:"13%"}}>Somme Mandatée</th>
                    </tr>
                    <tr class="centre">
                        <th scope="col" style={{border:"1px solid #dee2e6",fontWeight:"bold"}} class="bordd">Année d'origine</th>
                        <th scope="col" style={{border:"1px solid #dee2e6",fontWeight:"bold", width:"11%"}} class="align-middle">date</th>
                        <th scope="col" style={{border:"1px solid #dee2e6",fontWeight:"bold"}} class="bord">N° bordereau</th>
                        <th scope="col" style={{border:"1px solid #dee2e6",fontWeight:"bold"}} class="align-middle bord" >N° mandat</th>
                        <th scope="col" style={{border:"1px solid #dee2e6",fontWeight:"bold"}} class="bordd">N° du cheque</th>
                        <th scope="col" style={{border:"1px solid #dee2e6",fontWeight:"bold"}} class="align-middle bord">Imputation</th>
                        <th scope="col" style={{border:"1px solid #dee2e6",fontWeight:"bold"}} class="align-down somme" rowspan="5"> <span class="spanner"><input class="input-group-text abcd" name="sommeMandate" autoComplete="off" defaultValue={this.state.liste.sommeMandate} ref={this.state.sommeMandate} type="number"/></span> </th>
                    </tr>
                    <tr class="centre">
                        <th scope="col" style={{border:"1px solid #dee2e6"}} rowspan="2" class=" align-top"> <span className="spanner"><textarea class="form-control abcde" required name="nomCreancier" defaultValue={this.state.liste.nomCreancier} ref={this.state.nomCreancier} rows={4} style={{border:"none", height:"120px", lineHeight:"20px"}}></textarea></span></th>
                        <th scope="col" ><span class="spanner"><input class="input-group-text abcd" required  name="sommeNette1" autoComplete="off" defaultValue={this.state.liste.sommeNette1} ref={this.state.sommeNette1} type="number"/></span></th>
                        <th scope="col" style={{border:"1px solid #dee2e6"}} class=" align-top" rowspan="2" ><span class="spanner"> <input type="text" required class="input-group-text abcd" name="anneeOrigine" autoComplete="off" disabled defaultValue={this.state.last[13]} ref={this.state.anneeOrigine} type="number"/> </span></th>
                        <th scope="col" style={{border:"1px solid #dee2e6"}} class=" align-top" rowspan="2" ><span class="spanner"> <input class="input-group-text abcd" required name="date" autoComplete="off" defaultValue={this.state.liste.date} ref={this.state.date} type="date" /></span></th>
                        <th scope="col" style={{border:"1px solid #dee2e6"}} class=" align-top" rowspan="2" ><span class="spanner"> <input class="input-group-text abcd" disabled name="nBordereau" autoComplete="off" defaultValue={this.state.last[6]} ref={this.state.nBordereau} type="number"/></span></th>
                        <th scope="col" style={{border:"1px solid #dee2e6"}} class=" align-top" rowspan="2" ><span class="spanner"> <input class="input-group-text abcd" disabled name="nMandat" autoComplete="off" defaultValue={this.state.last[0]} ref={this.state.nMandat} type="number"/></span></th>
                        <th scope="col" style={{border:"1px solid #dee2e6"}} class=" align-top" rowspan="4" ><span class="spanner"> <input class="input-group-text abcd" name="nCheque" autoComplete="off" defaultValue={this.state.liste.nCheque} ref={this.state.nCheque} type="number"/> </span></th>
                        <th scope="col" style={{border:"1px solid #dee2e6"}} class=" align-top" rowspan="4" ><span class="spanner"> <input class="input-group-text abcd" required name="imputation" autoComplete="off" defaultValue={this.state.liste.imputation} ref={this.state.imputation} type="text"/> </span></th>
                    </tr>
                    <tr class="centre">
                        <th scope="col" style={{border:"1px solid #dee2e6"}}><span class="spanner"> <input  class="input-group-text abcd" name="sommeNette2" required autoComplete="off" defaultValue={this.state.liste.sommeNette2} ref={this.state.sommeNette2} type="number"/> </span></th>
                    </tr>
                    <tr class="centre">
                        <th scope="col" style={{border:"1px solid #dee2e6",fontWeight:"bold"}} rowspan="1" class=" align-middle comptables">(RESERVE AU COMPTABLE)</th>
                        <th scope="col" style={{border:"1px solid #dee2e6"}} rowspan="1"></th>
                        <th scope="col" style={{border:"1px solid #dee2e6"}} rowspan="2" colspan="4"><span class="spanner">  <textarea class="form-control abcde" required name="justification" defaultValue={this.state.liste.justification} ref={this.state.justification} style={{border:"none", height:"150px", marginBottom:"2px",lineHeight:"20px"}} rows="4"></textarea></span></th>
                    </tr>
                    <tr class="centre">
                        <th scope="col" style={{border:"1px solid #dee2e6",fontWeight:"bold"}}>Net à payer ou A virer</th>
                        <th scope="col" style={{border:"1px solid #dee2e6"}} class="douze"> <span class="spanner"></span>  </th>
                    </tr>
                    <tr class="centre">
                      <th scope="col" style={{border:"1px solid #dee2e6",fontWeight:"bold"}} colspan="2"  rowspan="4">Operations comptabilisées dans les ecritures du: ...............................................<br/><br/></th>
                      <th scope="col" style={{border:"1px solid #dee2e6",fontWeight:"bold"}} rowspan="4" colspan="4" class="align-top">.......................................................................................... <br/>
                          .......................................................................................... <br/>
                      </th>
                      <th scope="col" style={{border:"1px solid #dee2e6",fontWeight:"bold"}} rowspan="4" colspan="3" class="align-top">L'ordonnateur <br/> <img src="sign.png" class="sign" alt="signature"/><br/></th>
                    </tr>
            </thead> 
        </table> 
    </div> 
  </form>
);
}
}

export default MandatBC;