import React from 'react';
import './style.css'

class Page3BC extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nomCreancier:React.createRef(),sommeNette:React.createRef(),anneeOrigine:React.createRef(),date:React.createRef(),nBordereau:React.createRef(),nMandat:React.createRef(),nChapitre:React.createRef(),imputation:React.createRef(), 
            sommeMandate:React.createRef(),totalChap:React.createRef(),totalArticle:React.createRef(),exercice:React.createRef(),gestion:React.createRef(),bordereauNum:React.createRef(),feuilletNum:React.createRef(), liste:[], top:[]
        }
    }

    componentDidMount(){
    
        fetch('http://127.0.0.1:8000/mandatement/last1')
        .then(res => res.json())
        .then(data => this.setState({top: data}))
        .catch(err => console.error(err));
  
        fetch(`http://127.0.0.1:8000/mandatement/BordereauBc/${this.props.id_Bc}`)
        .then(res => res.json())
        .then(data => this.setState({liste: data}))
        .catch(err => console.error(err))
       }

    handleSubmit=(event) =>{
        
        event.preventDefault();
        const dataToSend = {nomCreancier:this.state.liste.nomCreancier, sommeNette:this.state.liste.sommeNette, anneeOrigine:this.state.liste.anneeOrigine, date:this.state.liste.date, 
                    nBordereau:this.state.liste.nBordereau, nMandat:this.state.liste.nMandat, nChapitre:this.state.liste.nChapitre, imputation:this.state.liste.imputation, sommeMandate:this.state.sommeMandate.current.value,
                    totalChap:this.state.totalChap.current.value, totalArticle:this.state.totalArticle.current.value, exercice:this.state.exercice.current.value, gestion:this.state.gestion.current.value, bordereauNum:0,
                    feuilletNum:this.state.feuilletNum.current.value}
        fetch(`http://127.0.0.1:8000/mandatement/BordereauBc/${this.props.id_Bc}/`,{
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
                <div className="container" style={{width: "1123px",border: "1px solid #0F1019", fontWeight: "bold",height:"1123px"}}>
                    <table className="table table-bordered text-center shadow p-3 mb-5 bg-white rounded largeur" style={{width:"1123px",height:"1123px",marginLeft:"-17px"}}>
                        <thead id="page">
                        <tr className="centre">
                            <th scope="col" colSpan='2' className="lefta" style={{border: "1px solid #0F1019", fontWeight: "bold"}}>
                                <div className='row'>
                                    <div className='col-md-2 marge'>
                                        <h1 style={{fontSize:"12em"}}>&#123;</h1>
                                    </div>
                                    <div className='col-md-4'>
                                        <p className='text-uppercase ecart'>virement</p><br/>
                                        <p className='ecart'>(1)</p><br/>
                                        <p className='text-uppercase ecart'>bons de caisses</p>
                                    </div>
                                    <div className='col-md-2' style={{marginRight:"-50px"}}>
                                        <h1 style={{fontSize:"6.5em"}}>&#123;</h1>
                                    </div>
                                    <div className='col-md-4'>
                                        <p className='text-uppercase eca'>postaux</p><br/>
                                        <p className='text-uppercase'>bancaires</p><br/>
                                        <p className='text-uppercase'>tresor</p>
                                    </div>
                                </div>
                            </th>
                            <th scope="col" colSpan="4" className="align-middle taille" style={{border:"1px solid black"}}>
                                <div className='container'>
                                    <h2 className='text-center text-uppercase'><button type="submit">Budget</button></h2><br/>
                                    <h2 className='text-uppercase text-center'>e.p.t</h2><br/>
                                    <span  style={{fontSize:"0.8em"}}>Exercice: <span className="spanner"><input type="number" className="bas ad siz" required="required"
                                                                                   name="exercice"
                                                                                   disabled
                                                                                   autoComplete="off"
                                                                                   defaultValue={this.state.top[13]}
                                                                                   ref={this.state.exercice}
                                                                                   style={{width: "70px"}}/></span>
                                    </span>
                                    <span style={{fontSize:"0.8em"}}>
                                        Gestion: <span className="spanner"><input type="number" className="bas ad siz"
                                                                                  name="gestion" autoComplete="off"
                                                                                  defaultValue={this.state.liste.gestion}
                                                                                  required
                                                                                  ref={this.state.gestion}
                                                                                  style={{width: "70px"}}/> </span>
                                    </span>
                                </div>
                            </th>
                            <th scope="col" colSpan="4" className="align-middle"
                                style={{border: "1px solid #0F1019", fontWeight: "bold",fontSize:"1.2em"}}>
                                <br/> 
                                Date: <span className="spanner"><input type="text" className="bas ad siz"
                                                                              name="gestion" autoComplete="off"
                                                                              disabled
                                                                              defaultValue={this.state.liste.date}
                                                                              ref={this.state.date}
                                                                              style={{width: "95px", marginBottom:"15px"}}/> </span>
                                Bordereau N&#176;: <span className="spanner"><input type="number"
                                                                                          className="bas ad siz"
                                                                                          disabled
                                                                                          name="exercice"
                                                                                          autoComplete="off"
                                                                                          defaultValue={this.state.top[6]}
                                                                                          ref={this.state.nBordereau}
                                                                                          style={{width: "50px", marginBottom:"15px"}}/></span>
                                Feuille N&#176;: <span className="spanner"><input type="number" className="bas ad siz"
                                                                          name="gestion" autoComplete="off"
                                                                          defaultValue={this.state.liste.feuilletNum}
                                                                          ref={this.state.feuilletNum}
                                                                          style={{width: "70px", marginBottom:"15px"}}/> </span>
                               
                            </th>
                        </tr>
                        <tr class="centre">
                            <th scope="col"  class="align-middle creancier" style={{border:"1px solid #0F1019",fontWeight:"bold", fontSize:"1.1em"}}>somme<br/>mandatee<br/>CFA</th>
                            <th scope="col"  class="align-middle mandatee1" style={{border:"1px solid #0F1019",fontWeight:"bold", fontSize:"1.1em"}}>total <br/>par <br/>chapitre</th>
                            <th scope="col" colspan="6" class="align-middle " style={{border:"1px solid #0F1019",fontWeight:"bold", fontSize:"1.1em"}}>Total par Article</th>
                            <th scope="col" class="align-middle mandatee1" style={{border:"1px solid #0F1019",fontWeight:"bold", fontSize:"1.1em"}}>reserve au comptable<br/>Assignataire</th>
                        </tr>
                        <tr className="centre" style={{height:'300px',border: "1px solid #0F1019"}}>
                            <th scope="col" className="align-middle creancier" style={{border: "1px solid #0F1019", fontWeight: "bold"}}>
                                <span className="spanner"> <input type="text" className="input-group-text ad" style={{ fontSize:"1em"}}
                                                                  name="anneeOrigine" autoComplete="off"
                                                                  required
                                                                  defaultValue={this.state.liste.sommeMandate}
                                                                  ref={this.state.sommeMandate} type="number"/></span>

                            </th>
                            <th scope="col" className="align-middle mandatee1"
                                style={{border: "1px solid #0F1019", fontWeight: "bold"}}>
                                <span className="spanner"> <input type="number" className="input-group-text ad" style={{ fontSize:"1em"}}
                                                                  name="anneeOrigine" autoComplete="off"
                                                                  defaultValue={this.state.liste.totalChap}
                                                                  ref={this.state.totalChap} type="number"/></span>
                            </th>
                            <th scope="col" colSpan="6" className="align-middle "
                                style={{border: "1px solid #0F1019", fontWeight: "bold"}}>
                                <span className="spanner"> <input type="number" className="input-group-text ad" style={{ fontSize:"1em"}}
                                                                  name="anneeOrigine" autoComplete="off"
                                                                  defaultValue={this.state.liste.totalArticle}
                                                                  ref={this.state.totalArticle} type="number"/></span>
                            </th>
                            <th scope="col" className="align-middle mandatee1"
                                style={{border: "1px solid #0F1019", fontWeight: "bold"}}>
                                <span className="spanner"> </span>
                            </th>
                        </tr>
                        </thead>

                        <tbody style={{border: "1px solid #0F1019", fontWeight: "bold"}}>
                        <tr>
                            <td scope="col" style={{border: "1px solid #0F1019", fontWeight: "bold"}}
                                className="align-down somme" >
                                <br/><br/><div  style={{border: "1px solid #0F1019", fontWeight: "bold"}}/><br/><br/>
                                <div  style={{border: "1px solid #0F1019", fontWeight: "bold"}}/><br/><br/>
                                <div  style={{border: "1px solid #0F1019", fontWeight: "bold"}}/><br/><br/>

                            </td>
                            <td colSpan='2' scope="col" style={{border: "1px solid #0F1019", fontWeight: "bold"}}
                                className="align-down somme" colSpan="4">
                                <br/><b/><br/>
                                <h5>(1)Rayer la mention intitule</h5><br/>
                                <h5>(2)A servir par le Compte</h5><br/>
                                <h5>Total Assignataire</h5>
                            </td>
                            <td scope="col" style={{border: "1px solid #0F1019", fontWeight: "bold"}}
                                className="align-down somme" colSpan="4">
                                <br/>
                                <div>
                                    <h4 className='text-center text-uppercase'>reserve au comptable assignataire</h4>
                                </div>
                                <br/><div  style={{border: "1px solid #0F1019", fontWeight: "bold"}}/><br/><br/>
                                <div >
                                    <h5>Passe en ecriture le:</h5>
                                </div>
                                <br/><div  style={{border: "1px solid #0F1019", fontWeight: "bold"}}/><br/><br/>
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

export default Page3BC;