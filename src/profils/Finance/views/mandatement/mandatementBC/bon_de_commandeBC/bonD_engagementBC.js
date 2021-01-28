import React from "react";
import '../bordereauBC/style.css';


class BonD_engagementBC extends React.Component{
    constructor(props) {
        super(props);
        this.state = {designation_mat_serv:'', quantity:'',prix_unitaire:'',montant:'',exercice:'',imputation:'',nom_fournisseur:'',nature_command:'',liste:[]};
    }

    componentDidMount(){
        fetch('http://127.0.0.1:8000/mandatement/last1')
            .then(res => res.json())
            .then(data => this.setState({liste: data}))
            .catch(err => console.error(err));
    }

    handleChangeDesignation=(event)=>{
        this.setState({designation_mat_serv: event.target.value });
    }
    handleChangeQuantite=(event)=>{
        this.setState({quantity: event.target.value });
    }
    handleChangePrixUnit=(event)=>{
        this.setState({prix_unitaire: event.target.value });
    }

    handleChangeMontant=(event)=>{
        this.setState({montant: event.target.value });
    }

    handleChangeExercice=(event)=>{
        this.setState({exercice: event.target.value });
    }

    handleChangeImputation=(event)=>{
        this.setState({imputation: event.target.value });
    }

    handleChangeNomFourn=(event)=>{
        this.setState({nom_fournisseur: event.target.value });
    }

    handleChangeNatureCom=(event)=>{
        this.setState({nature_command: event.target.value });
    }


    handleSubmit=(event) =>{

        event.preventDefault();
        const dataToSend = {designation_mat_serv: this.state.designation_mat_serv, quantity: this.state.quantity, prix_unitaire: this.state.prix_unitaire, montant: this.state.montant, exercice: this.state.exercice, imputation: this.state.imputation, nom_fournisseur:this.state.nom_fournisseur, nature_command:this.state.nature_command, }
        fetch(`http://127.0.0.1:8000/mandatement/BonEngagementBc/${this.state.liste[7]}/`,{
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
                        <button type="submit"> ECOLE POLYTECHNIQUE </button> <br/>DE THIES
                    </h2>
                </div>
                    <div className="text-center"><h3>***</h3></div>
                    <br/>
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className="row">
                                <div className="col-md-5">
                                    <h3>Exercice: </h3>
                                </div>
                                <div className="col-md-5">
                                    <h5><span className="spanner"> <input className="input-group-text" style={{fontSize:"1em"}}
                                                                          name="exercice" autoComplete="off"
                                                                          onChange={this.handleChangeExercice}
                                                                          value={this.state.exercice} required
                                                                          type="number"/></span></h5>
                                </div>
                                <div className="col-md-2"/>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className="row">
                                <div className="col-md-5">
                                    <h3>Imputation:</h3>
                                </div>
                                <div className="col-md-5">
                                    <h5><span className="spanner"> <input className="input-group-text" style={{fontSize:"1em"}}
                                                                          name="imputation" autoComplete="off"
                                                                          onChange={this.handleChangeImputation}
                                                                          value={this.state.imputation} required
                                                                          type="text"/></span></h5>
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
                                <h3>Nom du Fournisseur : </h3>
                            </div>
                            <div className="col-md-5">
                                <h5><span className="spanner"> <input className="input-group-text" style={{fontSize:"1em"}}
                                                                      name="nomFourn" autoComplete="off"
                                                                      onChange={this.handleChangeNomFourn}
                                                                      value={this.state.nom_fournisseur} required
                                                                      type="text"/></span></h5>
                            </div>
                            <div className="col-md-2"/>

                        </div><br/>
                        <div className='row'>
                            <div className="col-md-5">
                                <h3>Nature de la Commande : </h3>
                            </div>
                            <div className="col-md-5">
                                <h5><span className="spanner"> <input className="input-group-text " style={{fontSize:"1em"}}
                                                                      name="natureCom"
                                                                      autoComplete="off"
                                                                      onChange={this.handleChangeNatureCom}
                                                                      value={this.state.nature_command} required
                                                                      type="text"/></span></h5>
                            </div>
                            <div className="col-md-2"/>

                        </div>
                    </div>
                    <br/>
                    <table className="table table-bordered text-center shadow p-3 mb-5 bg-white rounded largeur" style={{width:"793.7007874016px" ,marginLeft:'-17px',height:"370px"}}>
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
                                                                     name="designation" autoComplete="off"
                                                                     onChange={this.handleChangeDesignation} required
                                                                     value={this.state.designation_mat_serv} rows='4'/></span>
                            </th>
                            <th scope="col" className="align-middle creancier"
                                style={{border: "1px solid #0F1019", fontWeight: "bold"}}>
                                <span className="spanner"> <textarea className="form-control ad" style={{fontSize:"1em"}}
                                                                     name="quantite" autoComplete="off"
                                                                     onChange={this.handleChangeQuantite} required
                                                                     value={this.state.quantity} rows='4'/></span>

                            </th>
                            <th scope="col" className="align-middle mandatee1"
                                style={{border: "1px solid #0F1019", fontWeight: "bold"}}>
                                <span className="spanner"> <textarea className="form-control ad" style={{fontSize:"1em"}}
                                                                     name="prixUnit" autoComplete="off"
                                                                     onChange={this.handleChangePrixUnit} required
                                                                     value={this.state.prix_unitaire} rows='4'/></span>
                            </th>

                            <th scope="col" className="align-middle mandatee1"
                                style={{border: "1px solid #0F1019", fontWeight: "bold"}}>
                                <span className="spanner"> <textarea className="form-control ad" name="montant" style={{fontSize:"1em",border: "none"}}
                                                                     onChange={this.handleChangeMontant}
                                                                     value={this.state.montant} required
                                                                     rows="4"/></span>
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
                </div><br/><br/><br/><br/>
            </form>
        )
    }
}


export default  BonD_engagementBC