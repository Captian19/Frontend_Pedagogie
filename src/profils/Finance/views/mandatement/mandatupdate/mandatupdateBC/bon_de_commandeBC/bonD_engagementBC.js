import React from "react";
import '../bordereauBC/style.css';
import "./print.css"

class BonD_engagementBC extends React.Component{
    constructor(props) {
        super(props);
        this.state = {designation_mat_serv:React.createRef(), quantity:React.createRef(),prix_unitaire:React.createRef(),montant:React.createRef(),exercice:React.createRef(),imputation:React.createRef(),nom_fournisseur:React.createRef(),nature_command:React.createRef(), liste:[]};
    }

    async componentDidMount(){       
        const delay = ms => new Promise(res => setTimeout(res, ms));
        await delay(100);    
            fetch(`http://localhost:8000/mandatement/BonEngagementBc/${this.props.id_Bc}/`)
                .then(res => res.json())
                .then(data => this.setState({liste:data}))
                .catch(err => console.error(err));
                console.log(this.state.liste)
        }
    
    
        handleSubmit=(event) =>{
    
            event.preventDefault();
            const dataToSend = {designation_mat_serv: this.state.designation_mat_serv.current.value, quantity: this.state.quantity.current.value, prix_unitaire: this.state.prix_unitaire.current.value, montant: this.state.montant.current.value, exercice: this.state.exercice.current.value, imputation: this.state.imputation.current.value, nom_fournisseur:this.state.nom_fournisseur.current.value, nature_command:this.state.nature_command.current.value, }
            fetch(`http://localhost:8000/mandatement/BonEngagementBc/${this.props.id_Bc}/`,{
                method: 'PUT',
                headers: {
                    Accept: 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify(dataToSend)
            }).then(
                data => console.log(data)
            )
            alert('enregistré');
        }

    render() {

        return(
            <form onSubmit={this.handleSubmit}>
            <div className='container' style={{border: "1px solid #0F1019", fontWeight: "bold" ,width:"793.7007874016px"}}>
                <br/><br/><div className="text-center">
                    <h2>
                    <button type="submit">ECOLE POLYTECHNIQUE</button> <br/>DE THIES
                    </h2>
                </div>
                <div className="text-center"><h3>***</h3></div>
                <br/>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className="row">
                            <div className="col-md-5">
                                <h3>
                                    Exercice:
                                </h3>
                            </div>
                            <div className="col-md-5">
                                <h4> <span className="spanner"> <input className="input-group-text" style={{fontSize:"1em"}}
                                                                       name="exercice" autoComplete="off"
                                                                       defaultValue={this.state.liste.exercice}
                                                                       ref={this.state.exercice} required
                                                                       type="number"/></span></h4>
                            </div>
                            <div className="col-md-2"/>
                        </div>
                        
                    </div>
                    <div className='col-md-6'>
                        <div className="row">
                            <div className="col-md-5">
                                <h3>
                                    Imputation:
                                </h3>
                            </div>
                            <div className="col-md-5">
                                <h4><span className="spanner"> <input className="input-group-text" style={{fontSize:"1em"}}
                                                                      name="imputation" autoComplete="off"
                                                                      defaultValue={this.state.liste.imputation}
                                                                      ref={this.state.imputation} required
                                                                      type="text"/></span></h4>
                            </div>
                            <div className="col-md-2"/>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="text-center">
                    <h2>
                        BON D'ENGAGEMENT
                    </h2>
                    <h3>
                        (A JOINDRE A LA FACTURE)
                    </h3>
                </div>
                <br/>
                <div>
                    <div className='row'>
                        <div className="col-md-5">
                            <h3>
                                Nom du Fournisseur :  
                            </h3>
                        </div>
                        <div className="col-md-5">
                            <h4> <span className="spanner"> <input className="input-group-text" style={{fontSize:"1em"}}
                                                                   name="nomFourn" autoComplete="off"
                                                                   defaultValue={this.state.liste.nom_fournisseur}
                                                                   ref={this.state.nom_fournisseur} required
                                                                   type="text"/></span></h4>
                        </div>
                        <div className="col-md-2"/>
                        
                    </div><br/>
                    <div className='row'>
                        
                        <div className="col-md-5">
                            <h3>
                                Nature de la Commande :
                            </h3>
                        </div>
                        <div className="col-md-5">
                            <h4><span className="spanner"> <input className="input-group-text" style={{fontSize:"1em"}}
                                                                  name="natureCom"
                                                                  autoComplete="off"
                                                                  defaultValue={this.state.liste.nature_command}
                                                                  ref={this.state.nature_command} required
                                                                  type="text"/></span></h4>
                        </div>
                        <div className="col-md-2"/>

                    </div>
                </div>
                <br/>
                <table className="table table-bordered text-center shadow p-3 mb-5 bg-white rounded largeur" style={{width:"793.7007874016px" ,marginLeft:'-16px',height:"370px"}}>
                    <thead id="page">
                    <tr className="centre">
                        <th scope="col" colSpan="6" className="align-middle text-uppercase"
                            style={{border: "1px solid #0F1019", fontWeight: "bold"}}>Designation des matieres ou services
                        </th>
                        <th scope="col" className="align-middle creancier text-uppercase"
                            style={{border: "1px solid #0F1019", fontWeight: "bold"}}>quantite
                        </th>
                        <th scope="col" className="align-middle mandatee1 text-uppercase"
                            style={{border: "1px solid #0F1019", fontWeight: "bold"}}>prix unitaire
                        </th>

                        <th scope="col" className="align-middle mandatee1 text-uppercase"
                            style={{border: "1px solid #0F1019", fontWeight: "bold"}}>montant
                        </th>
                    </tr>
                    <tr className="centre" style={{height: '400px', border: "1px solid #0F1019"}}>
                        <th scope="col" colSpan="6" className="align-middle "
                            style={{border: "1px solid #0F1019", fontWeight: "bold"}}>
                                <span className="spanner"> <textarea className="form-control ad" style={{fontSize:"1em"}}
                                                                  name="designation" autoComplete="off" required
                                                                  defaultValue={this.state.liste.designation_mat_serv}
                                                                  ref={this.state.designation_mat_serv} rows='4'/></span>
                        </th>
                        <th scope="col" className="align-middle creancier"
                            style={{border: "1px solid #0F1019", fontWeight: "bold"}}>
                                <span className="spanner"> <textarea className="form-control ad" style={{fontSize:"1em"}}
                                                                  name="quantite" autoComplete="off"
                                                                  defaultValue={this.state.liste.quantity} required
                                                                  ref={this.state.quantity} rows='4'/></span>

                        </th>
                        <th scope="col" className="align-middle mandatee1"
                            style={{border: "1px solid #0F1019", fontWeight: "bold"}}>
                                <span className="spanner"> <textarea className="form-control ad" style={{fontSize:"1em"}}
                                                                  name="prixUnit" autoComplete="off"
                                                                  defaultValue={this.state.liste.prix_unitaire} required
                                                                  ref={this.state.prix_unitaire} rows='4'/></span>
                        </th>

                        <th scope="col" className="align-middle mandatee1"
                            style={{border: "1px solid #0F1019", fontWeight: "bold"}}>
                                <span className="spanner"> <textarea className="form-control ad" style={{fontSize:"1em"}}
                                                                  name="prixUnit" autoComplete="off"
                                                                  defaultValue={this.state.liste.montant} required
                                                                  ref={this.state.montant} rows='4'/></span>
                        </th>
                    </tr>
                    </thead>
                </table><br/>
                <div className='row'>
                    <div className='col-md-6 text-center'>
                        <h4 className='text-uppercase'>montant de la depense<br/>Visas de l'ordonnateur</h4>
                    </div>
                    <div className='col-md-6'>

                    </div>
                </div><br/>
                <div className='row'>
                    <div className='col-md-6'>

                    </div>
                    <div className='col-md-6 text-center'>
                        <h4>Thies, le ...................................</h4>
                    </div>
                </div><br/><br/><br/>
            </div><br/><br/>
            </form>
        )
    }
}



export default  BonD_engagementBC;