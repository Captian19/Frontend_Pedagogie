import React from 'react';
import FpView from "./FpView";
import BengView from "./BengView";
import FdView from "./FdView";
import MandatView from "./MandatView";
import AvisCrediView from "./AvisCrediView";
import BordereauView from "./BordereauView";
import PvView from "./PvView";
import BLView from "./BLView";
import ValiderAc from './initButtonAC';
import RejetAc from './RejetButtonAc';

class MandatViewsAllAC extends React.Component {
    constructor(props) {
        super(props);
        this.state = {liste:[]};
    }

    componentDidMount(){
        fetch(`http://127.0.0.1:8000/mandatement/MandatementAc/${this.props.match.params.id_Ac}`)
            .then(res => res.json())
            .then(data => this.setState({liste: data}))
            .catch(err => console.error(err));
            console.log(this.props.match.params.id)
    }
    render() {
        return (
            <>
            <div>
            <div className='container' style={{marginBottom:"20px"}}>
                <h5 className="section-title text-center" ><ValiderAc id={this.props.match.params.id_Ac}/> </h5>
            </div>
                <div className="row">
                    <div className="col-md-3">
                        <FpView idFP={this.props.match.params.id_Ac}/>
                    </div>
                    <div className="col-md-3">
                        <BengView idBE={this.props.match.params.id_Ac}/>
                    </div>
                    <div className="col-md-3">
                        <FdView idFD={this.props.match.params.id_Ac} />
                    </div>
                    <div className="col-md-3">
                        <BLView idBL={this.props.match.params.id_Ac}/>
                    </div>
                </div>
                <br/>
                <br/>
                <div className="row">
                    <div className="col-md-3">
                        <PvView idPV={this.props.match.params.id_Ac} />
                    </div>
                    <div className="col-md-3">
                        <MandatView idM={this.props.match.params.id_Ac}/>
                    </div>
                    <div className="col-md-3">
                        <AvisCrediView idAC={this.props.match.params.id_Ac}/>
                    </div>
                    <div className="col-md-3">
                        <BordereauView idBO={this.props.match.params.id_Ac}/>
                    </div>
                </div>
        </div>
        <div className='container' style={{marginTop:"20px"}}>
            <h5 className="section-title text-center"><RejetAc id={this.props.match.params.id_Ac}/> </h5>
        </div>
        </>
        )
    }
}


export default MandatViewsAllAC;

/*

 */