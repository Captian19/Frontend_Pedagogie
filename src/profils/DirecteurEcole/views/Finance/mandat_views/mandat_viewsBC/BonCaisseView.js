import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCol} from
        'mdbreact';

import ac from "./ac.png"

class BonCaisseView extends React.Component {
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
                        <MDBCardTitle className="text-center">Bon de Caisse</MDBCardTitle>
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


export default BonCaisseView;