import React from "react";
import "./style.css"
import folder from "./folder2.png";
import coche from "./coche.png";
import {
    Link
} from "react-router-dom";


class DossierEncoursBc extends React.Component{
    constructor(props) {
        super(props);
        this.state = {liste:[]};
    }

    componentDidMount(){
        fetch("http://localhost:8000/mandatement/MandatDirBcEncours/")
            .then(res => res.json())
            .then(data => this.setState({liste: data}))
            .catch(err => console.error(err));
    }
    render() {
        return(
            <>
           
            <div>
                <section id="team" className="pb-5">
                    <div className="container">
                    {this.state.liste == "" && <div class="text-center"><div style={{width:"70px", height:"70px"}} class="spinner-grow text-secondary" role="status"><span class="sr-only">Loading...</span></div></div> }
                        <div className="row">
                        {this.state.liste.map((i) => (
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                <div className="image-flip">
                                    <div className="mainflip flip-0">
                                        <div className="frontside">
                                            <div className="card" >
                                                <div className="card-body text-center">
                                                    <p><img className=" img-fluid"
                                                            src={folder}
                                                            alt-text="card image"
                                                            style={{width:"150px"}}/></p><br/><br/>

                                                    <h2 className="card-title">Mandat {i.id_Bc}</h2>
                                                    <h4 className="card-body">Date: {i.date_Bc}</h4>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="backside">
                                            <div className="card" style={{marginBottom:"0px"}}>
                                                <div className="card-body text-center mt-4">
                                                    <h2 className="card-title">Mandat {i.id_Bc}</h2><br/>
                                                    {i.valid_comptable && <div class="d-flex justify-content-center card-title"><img src={coche} width="45px" height="45px"/></div>}
                                                    {!i.valid_comptable && <div class="spinner-border card-title" role="status"> <span class="sr-only">Loading...</span> </div>}<br/>
                                                    <h3 className="card-text" style={{fontSize:"1.2em"}}>edite par : {i.editeur}</h3><br/>
                                                    <button
                                                       className="btn btn-primary btn-lg"><i className="fa fa-plus"/>
                                                       <Link to={`mandatviewbc/${i.id_Bc}`}>voir plus</Link> </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                              ))}
                        </div>
                    </div>
                </section>
            </div>
          
            </>
        )
    }
}


export default DossierEncoursBc;