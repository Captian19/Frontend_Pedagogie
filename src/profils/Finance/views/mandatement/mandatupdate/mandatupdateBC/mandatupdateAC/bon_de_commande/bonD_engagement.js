import React from "react";

class BonD_engagement extends React.Component{
    constructor(props) {
        super(props);
        this.state = {designation:'', quantite:'',prixUnit:'',montant:'',exercice:'',imputation:'',nomFourn:'',natureComm:''};
    }

    handleChangeDesignation=(event)=>{
        this.setState({designation: event.target.value });
    }
    handleChangeQuantite=(event)=>{
        this.setState({quantite: event.target.value });
    }
    handleChangePrixUnit=(event)=>{
        this.setState({prixUnit: event.target.value });
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
        this.setState({nomFourn: event.target.value });
    }

    handleChangeNatureCom=(event)=>{
        this.setState({natureCom: event.target.value });
    }
    render() {

        return(
            <>
            <div className='container' style={{border: "1px solid #0F1019", fontWeight: "bold"}}>
                <br/><br/><div className="text-center">
                    <h2>
                        ECOLE POLYTECHNIQUE <br/>DE THIES
                    </h2>
                </div>
                <div className="text-center"><h3>***</h3></div>
                <br/>
                <div className='row'>
                    <div className='col-md-6'>
                        <h3>Exercice: <span className="spanner"> <input className="input-group-text abc"
                                                                        name="exercice" autoComplete="off"
                                                                        onChange={this.handleChangeExercice}
                                                                        value={this.state.exercice}
                                                                        type="number"/></span></h3>
                    </div>
                    <div className='col-md-6'>
                        <h3>Imputation:<span className="spanner"> <input className="input-group-text abc"
                                                                         name="imputation" autoComplete="off"
                                                                         onChange={this.handleChangeImputation}
                                                                         value={this.state.imputation}
                                                                         type="number"/></span></h3>
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
                        <h3>Nom du Fournisseur : <span className="spanner"> <input className="input-group-text abc"
                                                                                   name="nomFourn" autoComplete="off"
                                                                                   onChange={this.handleChangeNomFourn}
                                                                                   value={this.state.nomFourn}
                                                                                   type="number"/></span></h3>
                    </div><br/>
                    <div>
                        <h3>Nature de la Commande : <span className="spanner"> <input className="input-group-text abc"
                                                                                      name="natureCom"
                                                                                      autoComplete="off"
                                                                                      onChange={this.handleChangeNatureCom}
                                                                                      value={this.state.natureCom}
                                                                                      type="number"/></span></h3>
                    </div>
                </div>
                <br/>
                <table className="table table-bordered text-center shadow p-3 mb-5 bg-white rounded largeur" style={{width:"1000px" ,marginLeft:'50px',backgroundColor:'pink'}}>
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
                                <span className="spanner"> <textarea className="form-control cab"
                                                                  name="designation" autoComplete="off"
                                                                  onChange={this.handleChangeDesignation}
                                                                  value={this.state.designation} rows='4'/></span>
                        </th>
                        <th scope="col" className="align-middle creancier"
                            style={{border: "1px solid #0F1019", fontWeight: "bold"}}>
                                <span className="spanner"> <textarea className="form-control cab"
                                                                  name="quantite" autoComplete="off"
                                                                  onChange={this.handleChangeQuantite}
                                                                  value={this.state.quantite} rows='4'/></span>

                        </th>
                        <th scope="col" className="align-middle mandatee1"
                            style={{border: "1px solid #0F1019", fontWeight: "bold"}}>
                                <span className="spanner"> <textarea className="form-control cab"
                                                                  name="prixUnit" autoComplete="off"
                                                                  onChange={this.handleChangePrixUnit}
                                                                  value={this.state.prixUnit} rows='4'/></span>
                        </th>

                        <th scope="col" className="align-middle mandatee1"
                            style={{border: "1px solid #0F1019", fontWeight: "bold"}}>
                                <span className="spanner"> <textarea className="form-control cab" name="montant"
                                                                     onChange={this.handleChangeMontant}
                                                                     value={this.state.montant}
                                                                     style={{border: "none"}} rows="4"/></span>
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


export default BonD_engagement