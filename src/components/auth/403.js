import React from "react"

import photo from "./../../assets/img/403.svg"
import logo from "./../../assets/img/ept.png"

const DeniedAccess = (props) => {
    return(
        <div className="container-fluid">
                <div className="row no-gutter">
                    <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image">
                        <img src={photo} className="img-fluid" />
                    </div>
                    <div className="col-md-8 col-lg-6">
                    <div className="login d-flex align-items-center py-5">
                        <div className="container">
                        <div className="row">
                            <div className="col-md-9 col-lg-8 mx-auto">
                            <div className="text-center">
                            <img src={logo} className="img-fluid mb-3 text" width="150px" />
                            </div>
                            <div className="shadow py-4 mb-4">
                                <h3 className="text-center text-danger">ACCES NON AUTORISE</h3>
                                <h3 className="text-center text-danger">403</h3>
                            </div>
                            <p className="text-center">Accès autorisé aux utilisateurs qui ont le role de <q>{props.pass}</q></p>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    
                </div>
            </div>
    )
}


export default DeniedAccess