import React from 'react';

import FpView from "./FpView";
import BengView from "./BengView";
import FdView from "./FdView";
import MandatView from "./MandatView";
import BonCaisseView from "./BonCaisseView";
import BordereauView from "./BordereauView";
import PvView from "./PvView";
import BLView from "./BLView";
import ValiderBc from './initButtonBC';
import RejetBc from './RejetButtonBc';

class MandatViewsAllBC extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        return (
            <div className='container'>
            <div className='container'  style={{marginBottom:"20px"}}>
                <h5 className="section-title text-center"><ValiderBc id={this.props.match.params.id_Bc}/> </h5>
            </div>
           <div className="row">
               <div className="col-md-3">
                   <FpView idFP={this.props.match.params.id_Bc} />
               </div>
               <div className="col-md-3">
                   <BengView idBE={this.props.match.params.id_Bc} />
               </div>
               <div className="col-md-3">
                    <FdView idFD={this.props.match.params.id_Bc} />
               </div>
               <div className="col-md-3">
                   <BLView idBL={this.props.match.params.id_Bc} />
               </div>
           </div>
                <br/>
                <br/>
        <div className="row">
            <div className="col-md-3">
                <PvView idPV={this.props.match.params.id_Bc} />
            </div>
            <div className="col-md-3">
                <MandatView idMA={this.props.match.params.id_Bc} />
            </div>
            <div className="col-md-3">
                <BonCaisseView idBC={this.props.match.params.id_Bc} />
            </div>
            <div className="col-md-3">
                <BordereauView idBO={this.props.match.params.id_Bc} />
            </div>
        </div>
        <div className='container'  style={{marginTop:"20px"}}>
            <h5 className="section-title text-center"><RejetBc id={this.props.match.params.id_Bc}/> </h5>
        </div>
        </div>
        )
    }
}


export default MandatViewsAllBC;