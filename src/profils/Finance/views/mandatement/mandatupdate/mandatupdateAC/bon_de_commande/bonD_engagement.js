import React from "react";
import '../bordereau/style.css'
import "./print.css"

class BonD_engagement extends React.Component{
    constructor(props) {
        super(props);
        this.state = {designation_mat_serv:React.createRef(), quantity:React.createRef(),prix_unitaire:React.createRef(),
            montant:React.createRef(),exercice:React.createRef(),imputation:React.createRef(),
            nom_fournisseur:React.createRef(),nature_command:React.createRef(),liste:[]};
    }

   async  componentDidMount(){       
    const delay = ms => new Promise(res => setTimeout(res, ms));
    await delay(100);    
        fetch(`http://localhost:8000/mandatement/BonEngagementAc/${this.props.id_Ac}/`)
            .then(res => res.json())
            .then(data => this.setState({liste:data}))
            .catch(err => console.error(err));
            console.log(this.state.liste)
    }


    handleSubmit=(event) =>{

        event.preventDefault();
        const id = this.props.id_Ac;
        const dataToSend = {designation_mat_serv: this.state.designation_mat_serv.current.value, quantity: this.state.quantity.current.value, prix_unitaire: this.state.prix_unitaire.current.value, montant: this.state.montant.current.value, exercice: this.state.exercice.current.value, imputation: this.state.imputation.current.value, nom_fournisseur:this.state.nom_fournisseur.current.value, nature_command:this.state.nature_command.current.value, }
        fetch(`http://127.0.0.1:8000/mandatement/BonEngagementAc/${id}/`,{
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
                            <div className="row">
                                <div className="col-md-5">
                                    <h3>Exercice:</h3>
                                </div>
                                <div className="col-md-5">
                                    <h3> <span className="spanner"> <input className="input-group-text "
                                                                           name="exercice" autoComplete="off"
                                                                           defaultValue={this.state.liste.exercice}
                                                                           ref={this.state.exercice}
                                                                           type="number"/></span></h3>
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
                                    <h3><span className="spanner"> <input className="input-group-text "
                                                                          name="imputation" autoComplete="off"
                                                                          defaultValue={this.state.liste.imputation}
                                                                          ref={this.state.imputation}
                                                                          type="text"/></span></h3>
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
                                <div className="col-md-5">
                                    <h3>Nom du Fournisseur :</h3>
                                </div>
                                <div className="col-md-5">

                                    <h3><span className="spanner"> <input className="input-group-text "
                                                                                               name="nomFourn" autoComplete="off"
                                                                                               defaultValue={this.state.liste.nom_fournisseur}
                                                                                               ref={this.state.nom_fournisseur}
                                                                                               type="text"/></span></h3>
                                </div>
                                <div className="col-md-2"/>
                            </div>

                        </div><br/>
                        <div>
                            <div className='row'>
                                <div className="col-md-5">
                                    <h3>Nature de la Commande : </h3>
                                </div>
                                <div className="col-md-5">
                                    <h3><span className="spanner"> <input className="input-group-text "
                                                                          name="natureCom"
                                                                          autoComplete="off"
                                                                          defaultValue={this.state.liste.nature_command}
                                                                          ref={this.state.nature_command}
                                                                          type="text"/></span></h3>
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
                        <tr className="centre" style={{height: '370px', border: "1px solid #0F1019"}}>
                            <th scope="col" colSpan="6" className="align-middle "
                                style={{border: "1px solid #0F1019", fontWeight: "bold"}}>
                                <span className="spanner"> <textarea className="form-control ad" style={{fontSize:"1.1em"}}
                                                                     name="designation" autoComplete="off" type="text"
                                                                     defaultValue={this.state.liste.designation_mat_serv}
                                                                     ref={this.state.designation_mat_serv} rows='4'/></span>
                            </th>
                            <th scope="col" className="align-middle creancier"
                                style={{border: "1px solid #0F1019", fontWeight: "bold"}}>
                                <span className="spanner"> <textarea className="form-control ad" style={{fontSize:"1.1em"}}
                                                                     name="quantity" autoComplete="off"
                                                                     defaultValue={this.state.liste.quantity}
                                                                     ref={this.state.quantity} rows='4'/></span>

                            </th>
                            <th scope="col" className="align-middle mandatee1"
                                style={{border: "1px solid #0F1019", fontWeight: "bold"}}>
                                <span className="spanner"> <textarea className="form-control ad" style={{fontSize:"1.1em"}}
                                                                     name="prixUnit" autoComplete="off"
                                                                     defaultValue={this.state.liste.prix_unitaire} type="text"
                                                                     ref={this.state.prix_unitaire} rows='4'/></span>
                            </th>

                            <th scope="col" className="align-middle mandatee1"
                                style={{border: "1px solid #0F1019", fontWeight: "bold"}}>
                                <span className="spanner"> <textarea className="form-control ad" style={{fontSize:"1.1em"}}
                                                                     name="prixUnit" autoComplete="off" name="montant"
                                                                     defaultValue={this.state.liste.montant} type="text"
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
            </>
        )
    }
}




export default  BonD_engagement;