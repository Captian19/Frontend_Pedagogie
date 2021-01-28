import React from "react";
import '../bordereau/style.css'
import ReactToPrint from "react-to-print";
import './print.css'

class BonD_engagement extends React.Component{
    constructor(props) {
        super(props);
        this.state = {designation_mat_serv:'', quantity:'',prix_unitaire:'',montant:'',exercice:'',imputation:'',nom_fournisseur:'',nature_command:'',liste:[]};
    }

    componentDidMount(){
        fetch('http://127.0.0.1:8000/mandatement/last')
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
        fetch(`http://127.0.0.1:8000/mandatement/BonEngagementAc/${this.state.liste[7]}/`,{
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
            <>
            <div className='container' style={{border: "1px solid #0F1019", fontWeight: "bold" ,width:"793.7007874016px"}}>
                <br/><br/><div className="text-center">
                    <h2>
                        <button  type="submit" onClick={this.handleSubmit}>
                            ECOLE POLYTECHNIQUE <br/>DE THIES
                        </button>
                    </h2>
                </div>
                <div className="text-center"><h3>***</h3></div>
                <br/>
                <div className='row'>
                    <div className='col-md-6'>
                            <div className='row'>
                                <div className="col-md-5">
                                    <h3>Exercice:</h3>
                                </div>
                                <div className="col-md-5">
                                    <h3>
                                       <input style={{fontSize:"1em"}} className="input-group-text"
                                              name="exercice" autoComplete="off"
                                              onChange={this.handleChangeExercice}
                                              value={this.state.exercice}
                                              type="number"/>
                                    </h3>
                                </div>
                                <div className="col-md-2"/>
                            </div>
                    </div>
                    <div className='col-md-6'>
                        <div className='row'>
                            <div className="col-md-5">
                                <h3>Imputation:</h3>
                            </div>
                            <div className="col-md-5">
                                <h3>
                                    <input  className="input-group-text" style={{fontSize:"1em"}}
                                           name="imputation" autoComplete="off"
                                           onChange={this.handleChangeImputation}
                                           value={this.state.imputation}
                                           type="number"/>
                                </h3>
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
                    <div>
                        <div className='row'>
                            <div className="col-md-4">
                                <h3>Nom du Fournisseur :</h3>
                            </div>
                            <div className="col-md-6">
                                <h3>
                                    <input className="input-group-text" style={{fontSize:"1em"}}
                                           name="nomFourn" autoComplete="off"
                                           onChange={this.handleChangeNomFourn}
                                           value={this.state.nomFourn}
                                           type="text"/>
                                </h3>
                            </div>
                            <div className="col-md-2"/>
                        </div>
                    </div><br/>
                    <div>
                        <div className='row'>
                            <div className="col-md-4">
                                <h3>Nature de la Commande : </h3>
                            </div>
                            <div className="col-md-6">
                                <h4>
                                    <input className="input-group-text" style={{fontSize:"1em"}}
                                           name="natureCom"
                                           autoComplete="off"
                                           onChange={this.handleChangeNatureCom}
                                           value={this.state.natureCom}
                                           type="text"/>
                                </h4>
                            </div>
                            <div className="col-md-2"/>
                        </div>
                    </div>
                </div>
                <br/>
                <table className="table table-bordered text-center shadow p-3 mb-5 bg-white rounded largeur" style={{width:"793.7007874016px" ,marginLeft:'-16px',height:"350px"}}>
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
                                <span className="spanner"> <textarea style={{fontSize:"1.1em"}} className="form-control ad"
                                                                  name="designation" autoComplete="off" type="text"
                                                                  onChange={this.handleChangeDesignation} required
                                                                  value={this.state.designation_mat_serv} rows='4'/></span>
                        </th>
                        <th scope="col" className="align-middle creancier"
                            style={{border: "1px solid #0F1019", fontWeight: "bold"}}>
                                <span className="spanner"> <textarea style={{fontSize:"1.1em"}} className="form-control ad"
                                                                  name="quantite" autoComplete="off"
                                                                  onChange={this.handleChangeQuantite} required
                                                                  value={this.state.quantity} type="number" rows='4'/></span>

                        </th>
                        <th scope="col" className="align-middle mandatee1"
                            style={{border: "1px solid #0F1019", fontWeight: "bold"}}>
                                <span className="spanner"> <textarea style={{fontSize:"1.1em"}} className="form-control ad"
                                                                  onChange={this.handleChangePrixUnit} type="number"
                                                                  value={this.state.prix_unitaire} rows='4'/></span>
                        </th>

                        <th scope="col" className="align-middle mandatee1"
                            style={{border: "1px solid #0F1019", fontWeight: "bold"}}>
                                <span className="spanner"> <textarea   className="form-control ad" name="montant"
                                                                     onChange={this.handleChangeMontant} type="number"
                                                                     value={this.state.montant} required
                                                                     style={{border: "none",fontSize:"1.1em"}} rows="4"/></span>
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
                        <div className="input-group-desc">
                        </div>
                    </div>
                    <div className='col-md-6 text-center'>
                        <h4>Thies, le ...................................</h4>
                    </div>
                </div><br/><br/><br/>
            </div><br/><br/>

      

            </>
        )
    }
}

class BonD_engagementPrint extends React.PureComponent{
    render () {
        return (
            <div>
                <BonD_engagement ref={el => (this.componentRef = el)} />
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

export default  BonD_engagementPrint

