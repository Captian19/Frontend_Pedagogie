import React from 'react';
import './css/main.css';
import './vendor/mdi-font/css/material-design-iconic-font.min.css';
import './vendor/font-awesome-4.7/css/font-awesome.min.css';
import './vendor/select2/select2.min.css';
import './vendor/datepicker/daterangepicker.css';
import TextField from '@material-ui/core/TextField';

class PvBC extends React.Component{
    constructor(props) {
        super(props);
        this.state = {chapitre:'', date:'', designation_four:'',num_nomenclature:'',designation_mat:'',unite:'',quantite_mat:'',decisions:'',membres:'',date_arrete:'',liste:[]};

      }

      componentDidMount(){
        fetch('http://127.0.0.1:8000/mandatement/last1')
        .then(res => res.json())
        .then(data => this.setState({liste: data}))
        .catch(err => console.error(err));
    }

      handleChangeChapitre = (event)=>{
          this.setState({chapitre: event.target.value})
      }
      handleChangeDate=(event)=>{
        this.setState({date: event.target.value });
      }
      handleChangeDesignaFour=(event)=>{
        this.setState({designation_four: event.target.value });
      }
      handleChangeNumNomenclature=(event)=>{
        this.setState({num_nomenclature: event.target.value });
      }
      handleChangeDesignaMat=(event)=>{
        this.setState({designation_mat: event.target.value });
      }
      handleChangeUnite=(event)=>{
        this.setState({unite: event.target.value });
      }
      handleChangeQuantiteMat=(event)=>{
        this.setState({quantite_mat: event.target.value });
      }
      handleChangeDecisions=(event)=>{
        this.setState({decisions: event.target.value });
      }
      handleChangeMembres=(event)=>{
        this.setState({membres: event.target.value });
      }
      handleChangeDateArrete=(event)=>{
        this.setState({date_arrete: event.target.value });
      } 
      handleSubmit=(event) =>{
        
        event.preventDefault();
        const dataToSend = {chapitre: this.state.chapitre, date: this.state.date, designation_four:this.state.designation_four, num_nomenclature:this.state.num_nomenclature, designation_mat:this.state.designation_mat, unite:this.state.unite, quantite_mat:this.state.quantite_mat, decisions:this.state.decisions, membres:this.state.membres, date_arrete:this.state.date_arrete}
        fetch(`http://127.0.0.1:8000/mandatement/pvBc/${this.state.liste[2]}/`,{
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
          return(
            <div>
            <div class=" container page-wrapper bg-gra-3  p-b-50 tb">
            <div class="wrapper wrapper--w790" style={{overflow:"auto"}}>
                <div class="card card-5">
                    <div class="card-heading">
                        <h2 class="title">Proces verbal de reception</h2>
                    </div>
                    <div class="card-body" >
                        <form method="">
                        <div class="form-row m-b-55">
                                <div class="name">Titre</div>
                                <div class="value">
                                    <div class="row row-refine">
                                        <div class="col-6">
                                            <div class="input-group-desc">
                                                <input class="input--style-5" type="text" name="chapitre" onChange={this.handleChangeChapitre} value={this.state.chapitre} />
                                                <label class="label--desc">Chapitre</label>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="input-group-desc">
                                                <input class="input--style-5" type="Date" name="date" onChange={this.handleChangeDate} value={this.state.date} style={{height:"50px"}}/>
                                                <label class="label--desc">Date d'introduction</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-row m-b-55">
                                <div class="name">Fournitures</div>
                                <div class="value">
                                    <div class="row row-refine">
                                        <div class="col-6">
                                            <div class="input-group-desc">
                                                <input class="input--style-5" type="text" name="designation_four" onChange={this.handleChangeDesignaFour} value={this.state.designation_four}/>
                                                <label class="label--desc">Désignations Fournitures</label>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="input-group-desc">
                                                <input class="input--style-5" type="text" name="num_nomenclature" onChange={this.handleChangeNumNomenclature} value={this.state.num_nomenclature}/>
                                                <label class="label--desc">Nomenclature</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>                       
                            <div class="form-row">
                                <div class="name">Désignation</div>
                                <div class="value">
                                    <div class="input-group">
                                        <textarea class="tkr" rows="4" name="designation_mat" style={{width: "100%"}} onChange={this.handleChangeDesignaMat} value={this.state.designation_mat}></textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="form-row m-b-55">
                                <div class="name">Quantité</div>
                                <div class="value">
                                    <div class="row row-refine">
                                        <div class="col-3">
                                            <div class="input-group-desc">
                                                <input class="input--style-5" type="number" name="unite" onChange={this.handleChangeUnite} value={this.state.unite}/>
                                                <label class="label--desc">Unité</label>
                                            </div>
                                        </div>
                                        <div class="col-9">
                                            <div class="input-group-desc">
                                                <input class="input--style-5" type="text" name="quantite_mat" onChange={this.handleChangeQuantiteMat} value={this.state.quantite_mat}/>
                                                <label class="label--desc">Quantité de matiéres</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="name">Decisions</div>
                                <div class="value">
                                    <div class="input-group">
                                        <textarea class="tkr" rows="4" name="decisions" style={{width: "100%"}} onChange={this.handleChangeDecisions} value={this.state.decisions}></textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="name">Membres</div>
                                <div class="value">
                                    <div class="input-group">
                                        <textarea class="tkr" rows="4" name="membres" style={{width: "100%"}} onChange={this.handleChangeMembres} value={this.state.membres}></textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="form-row m-b-55">
                                <div class="name"></div>
                                <div class="value">
                                    <div class="row row-refine">
                                        <div class="col-5">
                                            <div class="input-group-desc">
                                                <TextField id="standard-basic" type="Date" name="date_arrete" onChange={this.handleChangeDateArrete} value={this.state.date_arrete} />
                                                <label class="label--desc">Fait a Thiés</label>
                                            </div>
                                        </div>
                                        <div class="col-2"> </div>
                                        <div class="col-2">
                                            <div class="input-group-desc">
                                                <button class="btn btn--radius-2 btn--red" type="submit" onClick={this.handleSubmit}>Register</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
    
    
        </div>
        </div>
          )
      }

}


export default PvBC;

