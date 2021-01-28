import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBRow, MDBCol, MDBIcon } from
        'mdbreact';
import FD from "./FD.png";
import {Link} from "react-router-dom";

class FdView extends React.Component {
    render() {
        return (
            <MDBCol style={{ maxWidth: "22rem" }}>
                <MDBCard>
                    <div className='row' style={{Padding:'20px'}}>
                        <div className="col-md-3"/>
                        <div className="col-md-6">
                            <MDBCardImage className="img-fluid" src={FD} style={{width:'100px',height:'100px'}}
                                          waves  />
                        </div>
                        <div className="col-md-3"/>
                    </div>
                    <br/>
                    <MDBCardBody>
                        <MDBCardTitle className="text-center">Facture Definitive</MDBCardTitle>
                        <br/>
                        <div className='text-center'>
                            <Link to={`/finance/fdpdfbc/${this.props.idFD}`}>
                                <MDBBtn href="#">Apercu</MDBBtn>
                            </Link>
                        </div>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
        )
    }
}


export default FdView;