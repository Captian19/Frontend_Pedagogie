import React, { Component } from 'react'
import { Button } from '@material-ui/core';
import {Link, Redirect} from 'react-router-dom'
import img from './image.png'

class Under_scol extends Component{
    render() {
        const style = {"font-size" : "20em"}
        console.log(this.props.sousDossier)
        return (
            <div className="col-sm-3 container">
                <Link className="row"  to= {`/etudiant/fichiers/${this.props.sousDossier.id}`}>
                    <img style={{width:"200px"}} src={img}/>
                </Link>
                <label className=" col-12"> {this.props.sousDossier.nom}</label>
            </div>
           
        )
    }
}
export default Under_scol;