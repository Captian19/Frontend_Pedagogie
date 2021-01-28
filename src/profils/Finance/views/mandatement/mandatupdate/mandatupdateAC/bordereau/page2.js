import React from 'react';
import './style.css';


class Page2 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nomCreancier:React.createRef(),sommeNette:React.createRef(),anneeOrigine:React.createRef(),date:React.createRef(),nBordereau:React.createRef(),nMandat:React.createRef(),nChapitre:React.createRef(),imputation:React.createRef(), 
            sommeMandate: React.createRef(),totalChap:React.createRef(),totalArticle:React.createRef(),exercice:React.createRef(),gestion:React.createRef(),bordereauNum:React.createRef(),feuilletNum:React.createRef(), last:[], liste:[]
        }
    }

    componentDidMount(){
        fetch(`http://127.0.0.1:8000/mandatement/BordereauAc/${this.props.id_Ac}`)
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
        const dataToSend = {nomCreancier:this.state.nomCreancier.current.value, sommeNette:this.state.sommeNette.current.value, anneeOrigine:this.state.anneeOrigine.current.value, date:this.state.date.current.value, 
                    nBordereau:this.state.nBordereau.current.value, nMandat:this.state.nMandat.current.value, nChapitre:this.state.nChapitre.current.value, imputation:this.state.imputation.current.value, 
                    sommeMandate:this.state.liste.sommeMandate, totalChap:this.state.liste.totalChap, totalArticle:this.state.liste.totalArticle, exercice:this.state.liste.exercice,
                     gestion:this.state.liste.gestion, bordereauNum:this.state.liste.bordereauNum, feuilletNum:this.state.liste.feuilletNum}
        fetch(`http://127.0.0.1:8000/mandatement/BordereauAc/${this.props.id_Ac}/`,{
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
                <div className="container"  style={{width: "1123px",border: "1px solid #0F1019", fontWeight: "bold",height:"1123px"}}>
                    <table className="table table-bordered text-center shadow p-3 mb-5 bg-white rounded largeur"
                           style={{width: "1123px",border: "1px solid #0F1019", fontWeight: "bold",height:"1123px",marginLeft:"-17px",fontSize:"1.1em"}}>
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
                                    style={{border: "1px solid #0F1019", fontWeight: "bold", fontSize:"1.1em"}}>Nom et adresse du
                                    Creancier <br/> Compte à crediter
                                </th>
                                <th scope="col" rowSpan="2" className="align-middle mandatee1"
                                    style={{border: "1px solid #0F1019", fontWeight: "bold", fontSize:"1.1em"}}>Somme Nette <br/> Revenant
                                    au creancier
                                </th>
                                <th scope="col" colSpan="6" className="align-middle reference1"
                                    style={{border: "1px solid #0F1019", fontWeight: "bold", fontSize:"1.1em"}}>Reference de Mandatement -
                                    Objet de la dépense - pieces justificatives
                                </th>
                            </tr>
                            <tr className="centre">
                                <th scope="col" style={{border: "1px solid #0F1019", fontWeight: "bold", fontSize:"1.1em", width:"12%"}}
                                    className="bord">Année d'origine
                                </th>
                                <th scope="col" style={{border: "1px solid #0F1019", fontWeight: "bold", width: "11%", fontSize:"1.1em"}}
                                    className="align-middle">date
                                </th>
                                <th scope="col" style={{border: "1px solid #0F1019", fontWeight: "bold", fontSize:"1.1em"}}
                                    className="bord">N° bordereau
                                </th>
                                <th scope="col" style={{border: "1px solid #0F1019", fontWeight: "bold", fontSize:"1.1em"}}
                                    className="align-middle bord">N° mandat
                                </th>
                                <th scope="col" style={{border: "1px solid #0F1019", fontWeight: "bold", fontSize:"1.1em"}}
                                    className="bord">N° du chapitre
                                </th>
                                <th scope="col" style={{border: "1px solid #0F1019", fontWeight: "bold", fontSize:"1.1em"}}
                                    className="align-middle bord">Imputation
                                </th>
                            </tr>
                            <tr className="centre" style={{height:'300px',border: "1px solid #0F1019"}}>
                                <th scope="col" style={{border: "1px solid #0F1019", fontWeight: "bold"}} rowSpan="4"
                                    className=" align-top"><span className="spanner"><textarea
                                    className="form-control ad" name="nomCreancier"
                                    defaultValue={this.state.liste.nomCreancier} ref={this.state.nomCreancier} rows="4"
                                    style={{border: "none", LineWeight: "20px;", fontSize:"1em"}} required></textarea></span></th>

                                <th scope="col" style={{border: "1px solid #0F1019", fontWeight: "bold"}} rowSpan="2"
                                    className=" align-top" ><span className="spanner"><input className="input-group-text ad" style={{ fontSize:"1em"}}
                                                                                 name="sommeNette1" autoComplete="off"
                                                                                 defaultValue={this.state.liste.sommeNette}
                                                                                 ref={this.state.sommeNette}
                                                                                 type="number" required/></span></th>
                                <th scope="col" style={{border: "1px solid #0F1019", fontWeight: "bold"}}
                                    className=" align-top" rowSpan="4"><span className="spanner"> <input type="text" style={{ fontSize:"1em"}}
                                                                                className="input-group-text ad"
                                                                                name="anneeOrigine"
                                                                                disabled
                                                                                autoComplete="off"
                                                                                defaultValue={this.state.last[13]}
                                                                                ref={this.state.anneeOrigine}
                                                                                type="number"/> </span>
                                </th>
                                <th scope="col" style={{border: "1px solid #0F1019", fontWeight: "bold"}}
                                    className=" align-top neuf" rowSpan="4"><span className="spanner"> <input style={{ fontSize:"1em"}}
                                    className="input-group-text ad" name="date" autoComplete="off"
                                    defaultValue={this.state.liste.date} ref={this.state.date} type="date" required/></span></th>
                                <th scope="col" style={{border: "1px solid #0F1019", fontWeight: "bold"}}
                                    className=" align-top neuf" rowSpan="4"><span className="spanner"> <input
                                    className="input-group-text ad" name="nBordereau" autoComplete="off" 
                                    defaultValue={this.state.last[6]} ref={this.state.nBordereau} disabled type="number"/></span>
                                </th>
                                <th scope="col" style={{border: "1px solid #0F1019", fontWeight: "bold"}}
                                    className=" align-top neuf" rowSpan="4"><span className="spanner"> <input style={{ fontSize:"1em"}}
                                    className="input-group-text ad" name="nMandat" autoComplete="off"
                                    defaultValue={this.state.last[0]} ref={this.state.nMandat}
                                    type="number" disabled/></span></th>
                                <th scope="col" style={{border: "1px solid #0F1019", fontWeight: "bold"}}
                                    className=" align-top neuf" rowSpan="4"><span className="spanner"> <input style={{ fontSize:"1em"}}
                                    className="input-group-text ad" name="nChapitre" autoComplete="off"
                                    defaultValue={this.state.liste.nChapitre} ref={this.state.nChapitre}
                                    type="text" required/> </span></th>
                                <th scope="col" style={{border: "1px solid #0F1019", fontWeight: "bold"}}
                                    className=" align-top " rowSpan="4"><span className="spanner"> <input style={{ fontSize:"1em"}}
                                    className="input-group-text ad" name="imputation" autoComplete="off"
                                    defaultValue={this.state.liste.imputation} ref={this.state.imputation} required type="text"/> </span>
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
                                            .............
                                            .............
                                            .............
                                            .............
                                            .............
                                            .............
                                            .............
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
            </>
        );
    }
}

export default Page2;




