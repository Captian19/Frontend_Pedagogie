import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBRow, MDBCol, MDBIcon } from
        'mdbreact';

import BL from "./Bl.png"
import bor from "../mandat_viewsAC/bt.png";
import {Link} from "react-router-dom";

class BLView extends React.Component {
    render() {
        return (
            <MDBCol style={{ maxWidth: "22rem" }}>
                <MDBCard>
                    <div className='row' style={{Padding:'10px'}}>
                        <div className="col-md-3"/>
                        <div className="col-md-6">
                            <MDBCardImage className="img-fluid" src={bor} style={{width:'125px',height:'125px'}}
                                          waves  />
                        </div>
                        <div className="col-md-3"/>
                    </div>
                    <br/>
                    <MDBCardBody>
                        <MDBCardTitle className="text-center">Bordereau de Livraison</MDBCardTitle>
                        <br/>
                        <div className='text-center'>
                            <Link to={`/finance/blpdfbc/${this.props.idBL}`}>
                                <MDBBtn href="#">Apercu</MDBBtn>
                            </Link>
                        </div>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
        )
    }
}


export default BLView;