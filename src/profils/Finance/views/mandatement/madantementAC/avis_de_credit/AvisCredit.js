import React from 'react';
import '../mandat/forms.css';
import '../mandat/pv.css';
import "./print.css"
import ReactToPrint from "react-to-print";


class AvisCredit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {exercice: '', gestion:'', sommeMandate:'', nomCreancier:'',sommeNette1:'',sommeNette2:'',anneeOrigine:'',date:'',nBordereau:'',nMandat:'',nCheque:'',imputation:'',justification:'',
        liste:[], bord:[]};
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
      handleChangeSommeNette1=(event)=>{
        this.setState({sommeNette1: event.target.value });
      }
      handleChangeSommeNette2=(event)=>{
        this.setState({sommeNette2: event.target.value });
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
      handleChangeNCheque=(event)=>{
        this.setState({nCheque: event.target.value });
      }
      handleChangeImputation=(event)=>{
        this.setState({imputation: event.target.value });
      }
      handleChangeJustification=(event)=>{
        this.setState({justification: event.target.value });
      }

     
     componentDidMount(){
      fetch('http://127.0.0.1:8000/mandatement/last')
      .then(res => res.json())
      .then(data => this.setState({liste: data}))
      .catch(err => console.error(err));

      fetch(`http://127.0.0.1:8000/mandatement/mandatAc`)
      .then(res => res.json())
      .then(data => this.setState({bord: data}))
      .catch(err => console.error(err))

     }

      handleSubmit=(event) =>{
        
        event.preventDefault();
        const dataToSend = {exercice: this.state.exercice, gestion: this.state.gestion, sommeMandate:this.state.sommeMandate, nomCreancier:this.state.nomCreancier, sommeNette1:this.state.sommeNette1, sommeNette2:this.state.sommeNette2, anneeOrigine:this.state.anneeOrigine, date:this.state.date, nBordereau:this.state.nBordereau, nMandat:this.state.nMandat, nCheque:this.state.nCheque, imputation:this.state.imputation, justification:this.state.justification}
        fetch(`http://127.0.0.1:8000/mandatement/avis/${this.state.liste[1]}/`,{
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
      <>
      
      <form onSubmit={this.handleSubmit}>
        <div className="container">
            <table className="table table-bordered text-center shadow p-3 mb-5 bg-white rounded largeur" style={{width:"1150px",fontSize:"1em"}}>
                <thead className="jaune" id="page">
                    <tr className="centre">
                        <th scope="col" colspan="2" class="lefta" style={{border:"1px solid #dee2e6",fontWeight:"bold"}}>
                            Ministere de l'enseignement superieur <br/> et de la recherche <br/>
                            **_*_** <br/>
                            AGENT COMPTABLE DE L'ECOLE <br/>
                            POLYTECHNIQUE THIES<br/>
                            **_*_**
                        </th>
                        <th scope="col" colspan="4" class="align-middle taille"><button class="sub" variant="contained" type="submit">AVIS DE CREDIT</button></th>
                        <th scope="col" colspan="5" class="align-middle" style={{border:"1px solid #dee2e6",fontWeight:"bold"}}>  Budget / ept <br/><br/> Exercice: <span class="spanner"><input type="number" class="bas abc" required name="exercice" autoComplete="off" onChange={this.handleChangeExercice} value={this.state.exercice=this.state.liste[13]} style={{width: "50px"}} /> </span>
                            Gestion: <span class="spanner"><input type="number" class="bas abc" name="gestion" required autoComplete="off" onChange={this.handleChangeGestion} value={this.state.gestion} style={{width: "50px",fontSize:"1em"}} /> </span></th>
                    </tr>
                    <tr class="centre">
                            <th scope="col" rowspan="2" class="align-middle creancier" style={{border:"1px solid #dee2e6",fontWeight:"bold"}}>Nom et adresse du Creancier <br/> Compte à crediter</th>
                            <th scope="col" rowspan="2" class="align-middle mandatee1" style={{border:"1px solid #dee2e6",fontWeight:"bold"}}>Somme Nette <br/> Revenant au creancier</th>
                            <th scope="col" colspan="6" class="align-middle reference1" style={{border:"1px solid #dee2e6",fontWeight:"bold"}}>Reference de Mandatement - Objet de la dépense - pieces justificatives</th>
                            <th scope="col" class="align-middle mandatee1" style={{border:"1px solid #dee2e6",fontWeight:"bold"}}>Somme Mandatée</th>
                        </tr>
                        <tr class="centre">
                            <th scope="col" style={{border:"1px solid #dee2e6",fontWeight:"bold"}} class="bordd">Année d'origine</th>
                            <th scope="col" style={{border:"1px solid #dee2e6",fontWeight:"bold",width:"11%"}} class="align-middle">date</th>
                            <th scope="col" style={{border:"1px solid #dee2e6",fontWeight:"bold"}} class="bord">N° bordereau</th>
                            <th scope="col" style={{border:"1px solid #dee2e6",fontWeight:"bold"}} class="align-middle bord" >N° mandat</th>
                            <th scope="col" style={{border:"1px solid #dee2e6",fontWeight:"bold"}} class="bord">N° du cheque</th>
                            <th scope="col" style={{border:"1px solid #dee2e6",fontWeight:"bold"}} class="align-middle bord">Imputation</th>
                            <th scope="col" style={{border:"1px solid #dee2e6",fontWeight:"bold"}} class="align-down somme" rowspan="5"> <span class="spanner"><input class="input-group-text abc" name="sommeMandate" autoComplete="off" onChange={this.handleChangeSommeMandate} value={this.state.sommeMandate} type="number" style={{fontSize:"0.8em"}}/></span> </th>
                        </tr>
                        <tr class="centre">
                            <th scope="col" style={{border:"1px solid #dee2e6",fontWeight:"bold"}} rowspan="2" class=" align-top"> <span className="spanner"><textarea class="form-control cab" name="nomCreancier" required onChange={this.handleChangeNomCreancier} value={this.state.nomCreancier} rows="4" style={{border:"none", LineWeight:"20px;",fontSize:"0.8em"}}></textarea></span></th>
                            <th scope="col" ><span class="spanner"><input class="input-group-text abc"  name="sommeNette1" required autoComplete="off" onChange={this.handleChangeSommeNette1} value={this.state.sommeNette1} type="number" style={{fontSize:"0.8em"}}/></span></th>
                            <th scope="col" style={{border:"1px solid #dee2e6",fontWeight:"bold"}} class=" align-top" rowspan="2" ><span class="spanner"> <input type="text" class="input-group-text abc" name="anneeOrigine" disabled autoComplete="off" onChange={this.handleChangeAnneeOrigine} value={this.state.anneeOrigine=this.state.liste[13]} type="number" style={{fontSize:"0.8em"}}/> </span></th>
                            <th scope="col" style={{border:"1px solid #dee2e6",fontWeight:"bold"}} class=" align-top" rowspan="2" ><span class="spanner"> <input class="input-group-text abc" name="date" required autoComplete="off" onChange={this.handleChangeDate} value={this.state.date} type="date" style={{fontSize:"0.8em"}}/></span></th>
                            <th scope="col" style={{border:"1px solid #dee2e6",fontWeight:"bold"}} class=" align-top" rowspan="2" ><span class="spanner"> <input class="input-group-text abc" name="nBordereau" disabled autoComplete="off" onChange={this.handleChangeNBordereau} value={this.state.nBordereau=this.state.liste[6]} type="number" style={{fontSize:"0.8em"}}/></span></th>
                            <th scope="col" style={{border:"1px solid #dee2e6",fontWeight:"bold"}} class=" align-top" rowspan="2" ><span class="spanner"> <input class="input-group-text abc" name="nMandat" disabled autoComplete="off" onChange={this.handleChangeNMandat} value={this.state.nMandat=this.state.liste[0]} type="number" style={{fontSize:"0.8em"}}/></span></th>
                            <th scope="col" style={{border:"1px solid #dee2e6",fontWeight:"bold"}} class=" align-top" rowspan="4" ><span class="spanner"> <input class="input-group-text abc" name="nCheque" required autoComplete="off" onChange={this.handleChangeNCheque} value={this.state.nCheque} type="number" style={{fontSize:"0.8em"}}/> </span></th>
                            <th scope="col" style={{border:"1px solid #dee2e6",fontWeight:"bold"}} class=" align-top" rowspan="4" ><span class="spanner"> <input class="input-group-text abc" name="imputation" required autoComplete="off" onChange={this.handleChangeImputation} value={this.state.imputation} type="text" style={{fontSize:"0.8em"}}/> </span></th>
                        </tr>
                        <tr class="centre">
                            <th scope="col" style={{border:"1px solid #dee2e6",fontWeight:"bold"}}><span class="spanner"> <input  class="input-group-text abc" name="sommeNette2" required autoComplete="off" onChange={this.handleChangeSommeNette2} value={this.state.sommeNette2} type="number" style={{fontSize:"0.8em"}}/> </span></th>
                        </tr>
                        <tr class="centre">
                            <th scope="col" style={{border:"1px solid #dee2e6",fontWeight:"bold"}} rowspan="1" class=" align-middle comptables">(RESERVE AU COMPTABLE)</th>
                            <th scope="col" style={{border:"1px solid #dee2e6",fontWeight:"bold"}} rowspan="1"></th>
                            <th scope="col" style={{border:"1px solid #dee2e6",fontWeight:"bold"}} rowspan="2" colspan="4"><span class="spanner">  <textarea class="form-control cab" name="justification" required onChange={this.handleChangeJustification} value={this.state.justification} rows="4" style={{fontSize:"0.8em",border:"none"}}></textarea></span></th>
                        </tr>
                        <tr class="centre">
                            <th scope="col" style={{border:"1px solid #dee2e6",fontWeight:"bold"}}>Net à payer ou A virer</th>
                            <th scope="col" style={{border:"1px solid #dee2e6",fontWeight:"bold"}} class="douze"> <span class="spanner"></span>  </th>
                        </tr>
                        <tr class="centre">
                          <th scope="col" style={{border:"1px solid #dee2e6",fontWeight:"bold"}} colspan="2"  rowspan="4">Operations comptabilisées dans les ecritures du: ...............................................<br/><br/></th>
                          <th scope="col" style={{border:"1px solid #dee2e6",fontWeight:"bold"}} rowspan="4" colspan="4" class="align-top">.................................................................................................. <br/>
                              .................................................................................................. <br/>
                          </th>
                          <th scope="col" style={{border:"1px solid #dee2e6",fontWeight:"bold"}} rowspan="4" colspan="3" class="align-top">L'ordonnateur <br/> <img src="sign.png" class="sign" alt="signature"/><br/></th>
                        </tr>
                </thead> 
            </table> 
        </div> 
       
      </form> 
      </>
    );
    }
}

class AvisCreditPrint extends React.PureComponent {
    render() {
        return (
            <div>
                <AvisCredit ref={el => (this.componentRef = el)} />
                <ReactToPrint
                    trigger={() => {
                        // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                        // to the root node of the returned component as it will be overwritten.
                        return <button className="btn btn--radius-2 btn--blue" >Imprimer</button>;
                    }}
                    content={() => this.componentRef}
                />

            </div>
        );
    }
}

export default AvisCreditPrint;