import React, { Component } from "react"
import { CFooter } from '@coreui/react'

class Footer extends Component {
    render(){
        return(
            <CFooter fixed={false}>
            <div>
                ENT
                <span className="ml-1">&copy; 2020 </span>
            </div>
            <div className="mfs-auto">
                <span className="mr-1">Copyrights by </span>
                <a href="https://www.ept.sn" target="_blank" rel="Ecole Polytechnique de THIES">EPT</a>
            </div>
            </CFooter>
        )
    }
}

export default Footer