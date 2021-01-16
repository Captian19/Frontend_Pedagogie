import React, { Component } from 'react'
import { Button } from '@material-ui/core';
import {Link, Redirect} from 'react-router-dom'
import img from './image.png'

class Under extends Component{
    render() {
        const style = {"font-size" : "20em"}
        return (
            <div className="col-lg-3 mt-3 text-cenetr">
                <Link to= {`/etudiant/fichiers`}>
                    <img style={{width:"200px"}} src={img}/>
                    <div>{this.props.sousDossier.classe}</div>
                    <div> {this.props.sousDossier.nom}</div>
                </Link>
                
            </div>
           
        )
    }
}
export default Under;