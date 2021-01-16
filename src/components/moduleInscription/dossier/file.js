import React, { Component } from 'react'
import { Button } from '@material-ui/core';
import {Redirect,Link} from 'react-router-dom'
import img from './image.webp'

class File extends Component{
    render() {
        const style = {"font-size" : "20em"}
        return (
            <div className="col-lg-3 mt-3 text-center">
                <Link to = {this.props.lien}>
                    <img style={{width:"200px"}} src={img}/>
                    <div> {this.props.nom}</div>
                </Link>
                
            </div>
           
        )
    }
}
export default File;