import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import img from './image.png'

class Under_scol extends Component{
    render() {
        console.log(this.props.sousDossier)
        return (
            <div className="col-sm-3 container">
                <Link className="row"  to= {`/scolarite/fichiers/${this.props.email}/${this.props.anneeScolaire}`}>
                    <img style={{width:"200px"}} src={img}/>
                </Link>
                <label className=" col-12"> {this.props.sousDossier.nom}</label>
            </div>
           
        )
    }
}
export default Under_scol;