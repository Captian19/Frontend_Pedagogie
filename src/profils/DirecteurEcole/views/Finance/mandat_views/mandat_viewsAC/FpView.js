import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBRow, MDBCol, MDBIcon } from
        'mdbreact';
import FP from "./FP.png"
import man from "./mandat.png";



class FpView extends React.Component {
    render() {
        return (
            <MDBCol style={{ maxWidth: "22rem" }}>
                <MDBCard>
                    <div className='row' style={{Padding:'10px'}}>
                        <div className="col-md-3"/>
                        <div className="col-md-6">
                            <MDBCardImage className="img-fluid" src={man} style={{width:'125px',height:'125px'}}
                                          waves  />
                        </div>
                        <div className="col-md-3"/>
                    </div>
                    <br/>
                    <MDBCardBody>
                        <MDBCardTitle className="text-center">Facture Proformat</MDBCardTitle>
                        <br/>
                        <div className='text-center'>
                            <MDBBtn href="#">Apercu{this.props.idFP}</MDBBtn>
                        </div>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
        )
    }
}


export default FpView;