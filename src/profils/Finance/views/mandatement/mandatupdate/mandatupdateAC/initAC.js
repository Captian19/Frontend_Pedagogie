import React from "react";
import "../style.css"
import folder from "./folder2.png";
import {
    Link
} from "react-router-dom";
import InitButtonAC from "./initButtonAC";


class InitAC extends React.Component{
    constructor(props) {
        super(props);
        this.state = {liste:[]};
    }

    componentDidMount(){
        fetch('http://127.0.0.1:8000/mandatement/MandatementAc/')
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
                        <h5 className="section-title h1">
                            <InitButtonAC/>
                        </h5>
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

                                                    <h2 className="card-title">Mandat {i.id_Ac}</h2>
                                                    <h3 className="card-body">Date: {i.date_Ac}</h3>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="backside">
                                            <div className="card">
                                                <div className="card-body text-center mt-4">
                                                    <h2 className="card-title">Mandat {i.id_Ac}</h2><br/>
                                                    {i.valid_directeur && <h4 className="card-text">etat : validé </h4>}
                                                    {!i.valid_directeur && <h4 className="card-text">etat : En cours </h4>}
                                                    <h4 className="card-text">edite par : Daouda Thiaw</h4><br/><br/>
                                                    <button
                                                       className="btn btn-primary btn-lg"><i className="fa fa-plus"/>
                                                       <Link to="mandatviewac">voir plus</Link> </button>
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


export default InitAC