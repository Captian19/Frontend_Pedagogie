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
    constructor(props) {
        super(props);
        this.state = {liste:[]};
    }

    componentDidMount(){
        fetch(`http://127.0.0.1:8000/mandatement/MandatementAc/${this.props.match.params.id_Ac}`)
            .then(res => res.json())
            .then(data => this.setState({liste: data}))
            .catch(err => console.error(err));
    }
    render() {
        return (
            <>
            <div>
                <div className="row">
                    <div className="col-md-3">
                        <FpView idFP={this.state.liste.facture_proformat}/>
                    </div>
                    <div className="col-md-3">
                        <BengView idBE={this.state.liste.bon_d_engagementUpload}/>
                    </div>
                    <div className="col-md-3">
                        <FdView idFD={this.state.liste.facture_definitive} />
                    </div>
                    <div className="col-md-3">
                        <BLView idBL={this.state.liste.bl}/>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-3">
                        <PvView idPV={this.state.liste.pv_upload} />
                    </div>
                    <div className="col-md-3">
                        <MandatView idM={this.state.liste.mandatUpload}/>
                    </div>
                    <div className="col-md-3">
                        <AvisCrediView idAC={this.state.liste.avis_creditUpload}/>
                    </div>
                    <div className="col-md-3">
                        <BordereauView idBO={this.state.liste.bordereau_transUpload}/>
                    </div>
                </div>

        </div>
        </>
        )
    }
}


export default MandatViewsAllAC;

/*

 */