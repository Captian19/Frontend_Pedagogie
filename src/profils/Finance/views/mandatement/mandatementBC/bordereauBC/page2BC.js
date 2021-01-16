import React from 'react';
import './style.css';


class Page2BC extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nomCreancier:'',sommeNette:'',anneeOrigine:'',date:'',nBordereau:'',nMandat:'',nChapitre:'',imputation:'', 
            sommeMandate: 0,totalChap:0,totalArticle:0,exercice:0,gestion:0,bordereauNum:0,feuilletNum:0, mandat:[], liste:[]
        }
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
    handleChangeNChapitre=(event)=>{
        this.setState({nChapitre: event.target.value });
    }
    handleChangeImputation=(event)=>{
        this.setState({imputation: event.target.value });
    }
    handleChangeSommeMandate=(event)=>{
        this.setState({sommeMandate:event.target.value})
    }
    handleChangeTotalChap=(event)=>{
        this.setState({totalChap:event.target.value})
    }
    handleChangeTotalArticle=(event)=>{
        this.setState({totalArticle:event.target.value})
    }
    handleChangeExercice=(event)=>{
        this.setState({exercice: event.target.value });
    }
    handleChangeGestion=(event)=>{
    this.setState({gestion: event.target.value });
    }
    handleChangeBordereauNum=(event)=>{
        this.setState({bordereauNum:event.target.value})
    }
    handleChangeFeuilletNum=(event)=>{
        this.setState({feuilletNum:event.target.value})
    }

    componentDidMount(){
        fetch('http://127.0.0.1:8000/mandatement/last1')
        .then(res => res.json())
        .then(data => this.setState({liste: data}))
        .catch(err => console.error(err));
  
        fetch(`http://127.0.0.1:8000/mandatement/lastmandatAc`)
        .then(res => res.json())
        .then(data => this.setState({mandat: data}))
        .catch(err => console.error(err))
       }

    handleSubmit=(event) =>{
        
        event.preventDefault();
        const dataToSend = {nomCreancier:this.state.nomCreancier, sommeNette:this.state.sommeNette, anneeOrigine:this.state.anneeOrigine, date:this.state.date, 
                    nBordereau:this.state.nBordereau, nMandat:this.state.nMandat, nChapitre:this.state.nChapitre, imputation:this.state.imputation, sommeMandate:this.state.sommeMandate,
                    totalChap:this.state.totalChap, totalArticle:this.state.totalArticle, exercice:this.state.exercice, gestion:this.state.gestion, bordereauNum:this.state.bordereauNum,
                    feuilletNum:this.state.feuilletNum}
        fetch(`http://127.0.0.1:8000/mandatement/BordereauBc/${this.state.liste[6]}/`,{
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
            {this.state.mandat.map((i) => (
            <form onSubmit={this.handleSubmit}>
                <div className="container">
                    <table className="table table-bordered text-center shadow p-3 mb-5 bg-white rounded largeur"
                           style={{width: "1150px",border: "1px solid #0F1019", fontWeight: "bold"}}>
                        <thead  id="page">
                            <tr className="centre">
                                <th scope="col" colSpan='8' className="lefta"
                                    style={{border: "1px solid #0F1019", fontWeight: "bold"}}>
                                    <div>
                                        <h2 className='text-uppercase text-center'>bordereau-journal</h2>
                                        <h2 className='text-center text-uppercase'>des mandatements emis payables par</h2><br/>
                                        <h2>Assignes sur la Caisse de l'Agent Comptable de E.P.T</h2>
                                    </div>
                                </th>
                            </tr>
                            <tr className="centre">
                                <th scope="col" rowSpan="2" className="align-middle creancier"
                                    style={{border: "1px solid #0F1019", fontWeight: "bold", fontSize:"1.2em"}}>Nom et adresse du
                                    Creancier <br/> Compte à crediter
                                </th>
                                <th scope="col" rowSpan="2" className="align-middle mandatee1"
                                    style={{border: "1px solid #0F1019", fontWeight: "bold", fontSize:"1.2em"}}>Somme Nette <br/> Revenant
                                    au creancier
                                </th>
                                <th scope="col" colSpan="6" className="align-middle reference1"
                                    style={{border: "1px solid #0F1019", fontWeight: "bold", fontSize:"1.2em"}}>Reference de Mandatement -
                                    Objet de la dépense - pieces justificatives
                                </th>
                            </tr>
                            <tr className="centre">
                                <th scope="col" style={{border: "1px solid #0F1019", fontWeight: "bold", fontSize:"1.2em", width:"12%"}}
                                    className="bord">Année d'origine
                                </th>
                                <th scope="col" style={{border: "1px solid #0F1019", fontWeight: "bold", width: "11%", fontSize:"1.2em"}}
                                    className="align-middle">date
                                </th>
                                <th scope="col" style={{border: "1px solid #0F1019", fontWeight: "bold", fontSize:"1.2em"}}
                                    className="bord">N° bordereau
                                </th>
                                <th scope="col" style={{border: "1px solid #0F1019", fontWeight: "bold", fontSize:"1.2em"}}
                                    className="align-middle bord">N° mandat
                                </th>
                                <th scope="col" style={{border: "1px solid #0F1019", fontWeight: "bold", fontSize:"1.2em"}}
                                    className="bord">N° du chapitre
                                </th>
                                <th scope="col" style={{border: "1px solid #0F1019", fontWeight: "bold", fontSize:"1.2em"}}
                                    className="align-middle bord">Imputation
                                </th>
                            </tr>
                            <tr className="centre" style={{height:'300px',border: "1px solid #0F1019"}}>
                                <th scope="col" style={{border: "1px solid #0F1019", fontWeight: "bold"}} rowSpan="4"
                                    className=" align-top"><span className="spanner"><textarea
                                    className="form-control ad" name="nomCreancier"
                                    onChange={this.handleChangeNomCreancier} value={this.state.nomCreancier} rows="4"
                                    style={{border: "none", LineWeight: "20px;"}} required></textarea></span></th>

                                <th scope="col" style={{border: "1px solid #0F1019", fontWeight: "bold"}} rowSpan="2"
                                    className=" align-top" ><span className="spanner"><input className="input-group-text ad"
                                                                                 name="sommeNette1" autoComplete="off"
                                                                                 onChange={this.handleChangeSommeNette}
                                                                                 value={this.state.sommeNette}
                                                                                 type="number" required/></span></th>
                                <th scope="col" style={{border: "1px solid #0F1019", fontWeight: "bold"}}
                                    className=" align-top" rowSpan="4"><span className="spanner"> <input type="text"
                                                                                className="input-group-text ad"
                                                                                name="anneeOrigine"
                                                                                disabled
                                                                                autoComplete="off"
                                                                                onChange={this.handleChangeAnneeOrigine}
                                                                                value={this.state.anneeOrigine = i.anneeOrigine}
                                                                                type="number"/> </span>
                                </th>
                                <th scope="col" style={{border: "1px solid #0F1019", fontWeight: "bold"}}
                                    className=" align-top neuf" rowSpan="4"><span className="spanner"> <input
                                    className="input-group-text ad" name="date" autoComplete="off"
                                    onChange={this.handleChangeDate} value={this.state.date} type="date" required/></span></th>
                                <th scope="col" style={{border: "1px solid #0F1019", fontWeight: "bold"}}
                                    className=" align-top neuf" rowSpan="4"><span className="spanner"> <input
                                    className="input-group-text ad" name="nBordereau" autoComplete="off" 
                                    onChange={this.handleChangeNBordereau} value={this.state.nBordereau=this.state.liste[6]} disabled type="number"/></span>
                                </th>
                                <th scope="col" style={{border: "1px solid #0F1019", fontWeight: "bold"}}
                                    className=" align-top neuf" rowSpan="4"><span className="spanner"> <input
                                    className="input-group-text ad" name="nMandat" autoComplete="off"
                                    onChange={this.handleChangeNMandat} value={this.state.nMandat=this.state.liste[0]}
                                    type="number" disabled/></span></th>
                                <th scope="col" style={{border: "1px solid #0F1019", fontWeight: "bold"}}
                                    className=" align-top neuf" rowSpan="4"><span className="spanner"> <input
                                    className="input-group-text ad" name="nChapitre" autoComplete="off"
                                    onChange={this.handleChangeNChapitre} value={this.state.nChapitre}
                                    type="text" required/> </span></th>
                                <th scope="col" style={{border: "1px solid #0F1019", fontWeight: "bold"}}
                                    className=" align-top " rowSpan="4"><span className="spanner"> <input
                                    className="input-group-text ad" name="imputation" autoComplete="off"
                                    onChange={this.handleChangeImputation} value={this.state.imputation} required type="text"/> </span>
                                </th>
                            </tr>
                        </thead>
                        <tbody style={{border: "1px solid #0F1019", fontWeight: "bold"}}>
                            <tr>
                                <td scope="col" style={{border: "1px solid #0F1019", fontWeight: "bold"}}
                                    className="align-down somme" colSpan='4'>
                                    <div className='row'>
                                        <div className='col-md-5'>
                                            <h5>Total(1)(2).......................</h5><br/>
                                            <h5>A reporter(1)(2)..................</h5>
                                        </div>
                                        <div className='col-md-4' style={{border: "1px solid #0F1019", fontWeight: "bold"}}/>
                                        <div className='col-md-3'/>
                                    </div><br/>
                                    <div className='text-center'>
                                        <h5>Arrete le present Bordereau-Journal a la somme totale figurant colonne 9</h5><br/>
                                        <h5>l'ordonnateur</h5>
                                    </div>
                                </td>
                                <td scope="col" style={{border: "1px solid #0F1019", fontWeight: "bold"}}
                                    className="align-down somme" colSpan="4">
                                    <div>
                                        <h5>Total du present bordereau(1)(2)</h5><br/>
                                        <h5>A reporter(1)(2)...............</h5>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-5'>
                                            <br/>
                                            <h5>II A deduire</h5><br/>
                                            <h5>(Mandatement</h5><br/>
                                            <h5>Non Admis(3)</h5>
                                        </div>
                                        <div className='col-md-1'>

                                        </div>
                                        <div className='col-md-2'>
                                        <div className='col-md-2'><span style={{fontSize:"10em"}}>&#123;
                                        </span></div>
                                        </div>
                                        <div className='col-md-3'><br/><br/>
                                            ..................
                                            ..................
                                            ..................
                                            ..................
                                            ..................
                                            ..................
                                            ..................
                                        </div>
                                    </div><br/>
                                    <div>
                                        <h5><button type="submit">Montant General des mandatements</button></h5><br/>
                                        <h5>Admis(3)...............</h5>
                                    </div>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </form>
            ))}
            </>
        );
    }
}

export default Page2BC;




