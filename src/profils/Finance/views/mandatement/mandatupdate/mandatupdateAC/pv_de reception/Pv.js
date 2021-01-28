import React from 'react';
import './css/main.css';
import './vendor/mdi-font/css/material-design-iconic-font.min.css';
import './vendor/font-awesome-4.7/css/font-awesome.min.css';
import './vendor/select2/select2.min.css';
import './vendor/datepicker/daterangepicker.css';
import TextField from '@material-ui/core/TextField';

class Pv extends React.Component{
    constructor(props) { 
        super(props);
        this.state = {chapitre:React.createRef(), date:React.createRef(), designation_four:React.createRef(),num_nomenclature:React.createRef(),designation_mat:React.createRef(),unite:React.createRef(),quantite_mat:React.createRef(),decisions:React.createRef(),membres:React.createRef(),date_arrete:React.createRef(),liste:[]};

      }

      async componentDidMount(){       
        const delay = ms => new Promise(res => setTimeout(res, ms));
        await delay(100);    
            fetch(`http://localhost:8000/mandatement/pvAc/${this.props.id_Ac}/`)
                .then(res => res.json())
                .then(data => this.setState({liste:data}))
                .catch(err => console.error(err));
                console.log(this.state.liste)
        }
      handleSubmit=(event) =>{
        
        event.preventDefault();
        const dataToSend = {chapitre: this.state.chapitre.current.value, date: this.state.date.current.value, designation_four:this.state.designation_four.current.value,
             num_nomenclature:this.state.num_nomenclature.current.value, designation_mat:this.state.designation_mat.current.value,
              unite:this.state.unite.current.value, quantite_mat:this.state.quantite_mat.current.value, 
              decisions:this.state.decisions.current.value, membres:this.state.membres.current.value,
               date_arrete:this.state.date_arrete.current.value}
        fetch(`http://127.0.0.1:8000/mandatement/pvAc/${this.props.id_Ac}/`,{
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
                                                <input class="input--style-5" type="text" name="chapitre" defaultValue={this.state.liste.chapitre} ref={this.state.chapitre} />
                                                <label class="label--desc">Chapitre</label>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="input-group-desc">
                                                <input class="input--style-5" type="Date" name="date" defaultValue={this.state.liste.date} ref={this.state.date} style={{height:"50px"}}/>
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
                                                <input class="input--style-5" type="text" name="designation_four" defaultValue={this.state.liste.designation_four} ref={this.state.designation_four}/>
                                                <label class="label--desc">Désignations Fournitures</label>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="input-group-desc">
                                                <input class="input--style-5" type="text" name="num_nomenclature" defaultValue={this.state.liste.num_nomenclature} ref={this.state.num_nomenclature}/>
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
                                        <textarea class="tkr" rows="4" name="designation_mat" style={{width: "100%"}} defaultValue={this.state.liste.designation_mat} ref={this.state.designation_mat}></textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="form-row m-b-55">
                                <div class="name">Quantité</div>
                                <div class="value">
                                    <div class="row row-refine">
                                        <div class="col-3">
                                            <div class="input-group-desc">
                                                <input class="input--style-5" type="number" name="unite" defaultValue={this.state.liste.unite} ref={this.state.unite}/>
                                                <label class="label--desc">Unité</label>
                                            </div>
                                        </div>
                                        <div class="col-9">
                                            <div class="input-group-desc">
                                                <input class="input--style-5" type="text" name="quantite_mat" defaultValue={this.state.liste.quantite_mat} ref={this.state.quantite_mat}/>
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
                                        <textarea class="tkr" rows="4" name="decisions" style={{width: "100%"}} defaultValue={this.state.liste.decisions} ref={this.state.decisions}></textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="name">Membres</div>
                                <div class="value">
                                    <div class="input-group">
                                        <textarea class="tkr" rows="4" name="membres" style={{width: "100%"}} defaultValue={this.state.liste.membres} ref={this.state.membres}></textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="form-row m-b-55">
                                <div class="name"></div>
                                <div class="value">
                                    <div class="row row-refine">
                                        <div class="col-5">
                                            <div class="input-group-desc">
                                                <TextField id="standard-basic" type="Date" name="date_arrete" defaultValue={this.state.liste.date_arrete} ref={this.state.date_arrete} />
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


export default Pv;

