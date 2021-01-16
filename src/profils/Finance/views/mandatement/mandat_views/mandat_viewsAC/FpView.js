import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBRow, MDBCol, MDBIcon } from
        'mdbreact';
import FP from "./FP.png"



class FpView extends React.Component {
    render() {
        return (
            <MDBCol style={{ maxWidth: "22rem" }}>
                <MDBCard>
                    <div className='text-center' style={{Padding:'10px'}}>
                            <MDBCardImage className="img-fluid center" src={FP} style={{width:'125px',height:'125px'}}
                                          waves  />
                    </div>
                    <br/>
                    <MDBCardBody>
                        <MDBCardTitle className="text-center">Facture Proformat</MDBCardTitle>
                        <br/>
                        <div className='text-center'>
                            <MDBBtn href="#">Apercu</MDBBtn>
                        </div>

                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
        )
    }
}


export default FpView;