import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import img from './image.png'

class Under extends Component{
    render() {
        return (
            <div className="col-lg-3 mt-3 text-cenetr">
                <Link to= {`/etudiant/fichiers/${this.props.anneeScolaire}`}>
                    <img style={{width:"200px"}} src={img}/>
                    <div>{this.props.sousDossier.classe}</div>
                    <div> {this.props.sousDossier.nom}</div>
                </Link>
                
            </div>
           
        )
    }
}
export default Under;