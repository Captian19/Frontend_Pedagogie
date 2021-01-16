import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBRow, MDBCol, MDBIcon } from
        'mdbreact';
import doc from "../../madantementAC/doc.png"
import man from "./mandat.png"

class MandatView extends React.Component {
    render() {
        return (
            <MDBCol style={{ maxWidth: "22rem" }}>
                <MDBCard>
                    <div className='row' style={{Padding:'10px'}}>
                        <div className="col-md-6">
                            <MDBCardImage className="img-fluid" src={man} style={{width:'125px',height:'125px'}}
                                          waves />
                        </div>
                        <div className="col-md-6">
                            <MDBCardImage className="img-fluid" src={doc}
                                          waves />
                        </div>
                    </div>
                    <br/>
                    <MDBCardBody>
                        <MDBCardTitle className="text-center">Mandat</MDBCardTitle>
                        <br/>
                        <div className='row'>
                            <div className='col-md-6'>
                                <MDBBtn href="#">Apercu</MDBBtn>
                            </div>
                            <div className='col-md-6'>
                                <MDBBtn href="#">Editer</MDBBtn>
                            </div>
                        </div>

                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
        )
    }
}


export default MandatView;