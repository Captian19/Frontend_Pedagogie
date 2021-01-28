import React from 'react';
import '../mandat/forms.css';
import '../mandat/pv.css';
import "./print.css"
import ReactToPrint from "react-to-print";


class AvisCredit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {exercice: React.createRef(), gestion:React.createRef(), sommeMandate:React.createRef(), nomCreancier:React.createRef(),
          sommeNette1:React.createRef(),sommeNette2:React.createRef(),anneeOrigine:React.createRef(),date:React.createRef(),nBordereau:React.createRef(),
          nMandat:React.createRef(),nCheque:React.createRef(),imputation:React.createRef(),justification:React.createRef(),
        liste:[], last:[]};
      }
     
    async componentDidMount(){
      const delay = ms => new Promise(res => setTimeout(res, ms));
      await delay(100); 
      fetch(`http://127.0.0.1:8000/mandatement/avis/${this.props.id_Ac}`)
      .then(res => res.json())
      .then(data => this.setState({liste: data}))
      .catch(err => console.error(err));

      fetch('http://127.0.0.1:8000/mandatement/last')
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
        fetch(`http://127.0.0.1:8000/mandatement/avis/${this.props.id_Ac}/`,{
            method: 'PUT',
            headers: {
              Accept: 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify(dataToSend)
        }).then(
            data => console.log(data)
        )
       
      }


      render(){
    return (  
      <>
      <form onSubmit={this.handleSubmit}>
        <div className="container">
            <table className="table table-bordered text-center shadow p-3 mb-5 bg-white rounded largeur"  style={{width:"793.7007874016px",fontSize:"1em",height:"559.3700787402px",backgroundColor:"#F7DC6F"}}>
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
                        <th scope="col" colspan="5" class="align-middle" style={{border:"1px solid #dee2e6",fontWeight:"bold"}}>  Budget / ept <br/><br/> Exercice: <span class="spanner"><input type="number" disabled class="bas abc" required name="exercice" autoComplete="off" defaultValue={this.state.last[13]} ref={this.state.exercice} style={{width: "50px"}} /> </span>
                            Gestion: <span class="spanner"><input type="number" class="bas abc" name="gestion" required autoComplete="off" defaultValue={this.state.liste.gestion} ref={this.state.gestion} style={{width: "50px"}} /> </span></th>
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
                            <th scope="col" style={{border:"1px solid #dee2e6",fontWeight:"bold"}} class="align-down somme" rowspan="5"> <span class="spanner"><input class="input-group-text abc" name="sommeMandate" autoComplete="off" defaultValue={this.state.liste.sommeMandate} ref={this.state.sommeMandate} type="number" style={{fontSize:"0.8em"}}/></span> </th>
                        </tr>
                        <tr class="centre">
                            <th scope="col" style={{border:"1px solid #dee2e6",fontWeight:"bold"}} rowspan="2" class=" align-top"> <span className="spanner"><textarea class="form-control cab" name="nomCreancier" required defaultValue={this.state.liste.nomCreancier} ref={this.state.nomCreancier} rows="4" style={{border:"none", LineWeight:"20px;",fontSize:"0.8em"}}></textarea></span></th>
                            <th scope="col" ><span class="spanner"><input class="input-group-text abc"  name="sommeNette1" required autoComplete="off" defaultValue={this.state.liste.sommeNette1} ref={this.state.sommeNette1} type="number" style={{fontSize:"0.7em"}}/></span></th>
                            <th scope="col" style={{border:"1px solid #dee2e6",fontWeight:"bold"}} class=" align-top" rowspan="2" ><span class="spanner"> <input type="text" class="input-group-text abc" name="anneeOrigine" disabled autoComplete="off" defaultValue={this.state.last[13]} ref={this.state.anneeOrigine} type="number" style={{fontSize:"0.8em"}}/> </span></th>
                            <th scope="col" style={{border:"1px solid #dee2e6",fontWeight:"bold"}} class=" align-top" rowspan="2" ><span class="spanner"> <input class="input-group-text abc" name="date" required autoComplete="off" defaultValue={this.state.liste.date} ref={this.state.date} type="date" style={{fontSize:"0.8em"}} /></span></th>
                            <th scope="col" style={{border:"1px solid #dee2e6",fontWeight:"bold"}} class=" align-top" rowspan="2" ><span class="spanner"> <input class="input-group-text abc" name="nBordereau" disabled autoComplete="off" defaultValue={this.state.last[6]} ref={this.state.nBordereau} type="number" style={{fontSize:"0.8em"}} /></span></th>
                            <th scope="col" style={{border:"1px solid #dee2e6",fontWeight:"bold"}} class=" align-top" rowspan="2" ><span class="spanner"> <input class="input-group-text abc" name="nMandat" disabled autoComplete="off" defaultValue={this.state.last[0]} ref={this.state.nMandat} type="number" style={{fontSize:"0.8em"}}/></span></th>
                            <th scope="col" style={{border:"1px solid #dee2e6",fontWeight:"bold"}} class=" align-top" rowspan="4" ><span class="spanner"> <input class="input-group-text abc" name="nCheque" autoComplete="off" defaultValue={this.state.liste.nCheque} ref={this.state.nCheque} type="number" style={{fontSize:"0.8em"}}/> </span></th>
                            <th scope="col" style={{border:"1px solid #dee2e6",fontWeight:"bold"}} class=" align-top" rowspan="4" ><span class="spanner"> <input class="input-group-text abc" name="imputation" required autoComplete="off" defaultValue={this.state.liste.imputation} ref={this.state.imputation} type="text" style={{fontSize:"0.8em"}}/> </span></th>
                        </tr>
                        <tr class="centre">
                            <th scope="col" style={{border:"1px solid #dee2e6",fontWeight:"bold"}}><span class="spanner"> <input  class="input-group-text abc" name="sommeNette2" required autoComplete="off" defaultValue={this.state.liste.sommeNette2} ref={this.state.sommeNette2} type="number" style={{fontSize:"0.8em"}}/> </span></th>
                        </tr>
                        <tr class="centre">
                            <th scope="col" style={{border:"1px solid #dee2e6",fontWeight:"bold"}} rowspan="1" class=" align-middle comptables">(RESERVE AU COMPTABLE)</th>
                            <th scope="col" style={{border:"1px solid #dee2e6",fontWeight:"bold"}} rowspan="1"></th>
                            <th scope="col" style={{border:"1px solid #dee2e6",fontWeight:"bold"}} rowspan="2" colspan="4"><span class="spanner">  <textarea class="form-control cab" name="justification" required defaultValue={this.state.liste.justification} ref={this.state.justification} style={{border:"none",fontSize:"0.8em"}} rows="4"></textarea></span></th>
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

export default AvisCredit;