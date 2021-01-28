import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBRow, MDBCol, MDBIcon } from
        'mdbreact';
import {
    Link
} from "react-router-dom";
import ac from "./ac.png"

class AvisCrediView extends React.Component {
    render() {
        return (
            <MDBCol style={{ maxWidth: "22rem" }}>
                <MDBCard>
                    <div className='row' style={{Padding:'10px'}}>
                        <div className="col-md-3"/>
                        <div className="col-md-6">
                            <MDBCardImage className="img-fluid" src={ac} style={{width:'125px',height:'125px'}}
                                          waves />
                        </div>
                        <div className="col-md-3"/>
                    </div>
                    <br/>
                    <MDBCardBody>
                        <MDBCardTitle className="text-center">Avis de Credit</MDBCardTitle>
                        <br/>
                        <div className='text-center'>
                                <Link to={`/finance/aviscreditpdf/${this.props.idAC}`}>
                                    <MDBBtn href="#">Apercu</MDBBtn>
                                </Link>
                        </div>

                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
        )
    }
}


export default AvisCrediView;