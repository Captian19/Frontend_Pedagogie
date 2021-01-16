import React from 'react';

import FpView from "./FpView";
import BengView from "./BengView";
import FdView from "./FdView";
import MandatView from "./MandatView";
import AvisCrediView from "./AvisCrediView";
import BordereauView from "./BordereauView";
import PvView from "./PvView";
import BLView from "./BLView";

class MandatViewsAllAC extends React.Component {
    render() {
        return (
            <>
           <div className="row">
               <div className="col-md-3">
                   <FpView/>
               </div>
               <div className="col-md-3">
                   <BengView/>
               </div>
               <div className="col-md-3">
                    <FdView/>
               </div>
               <div className="col-md-3">
                   <BLView/>
               </div>
           </div>
                <br/>
                <br/>
        <div className="row">
            <div className="col-md-3">
                <PvView/>
            </div>
            <div className="col-md-3">
                <MandatView/>
            </div>
            <div className="col-md-3">
                <AvisCrediView/>
            </div>
            <div className="col-md-3">
                <BordereauView/>
            </div>
        </div>
        </>
        )
    }
}


export default MandatViewsAllAC;