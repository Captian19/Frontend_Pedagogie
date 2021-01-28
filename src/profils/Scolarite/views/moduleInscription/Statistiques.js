import React, { Component } from "react";
import {connect} from "react-redux";
import moment from 'moment';
import localization from 'moment/locale/fr';
import axios from 'axios';
import { Link } from 'react-router-dom';

import {

    CCard,
    CCardBody,
    CCol,
    CProgress,
    CRow,
  } from '@coreui/react'
  moment.updateLocale('fr', localization);

class Statistiques extends Component {
    state = {
        TC1 : '',
        TC1T: '',
        TC2 : '',
        TC2T : '',
        DIC1G : '',
        DIC1GT : '',
        DIC1C : '',
        DIC1CT : '',
        DIC1M : '',
        DIC1MT : '',
        DIC1A : '',
        DIC1AT : '',
        DIC2G : '',
        DIC2GT : '',
        DIC2C : '',
        DIC2CT : '',
        DIC2M : '',
        DIC2MT : '',
        DIC2A : '',
        DIC2AT : '',
        DIC3G : '',
        DIC3GT : '',
        DIC3C : '',
        DIC3CT : '',
        DIC3M : '',
        DIC3MT : '',
        DIC3A : '',
        DIC3AT : '',
        etudiants : '',
        etudiantsClasse:''
    }
    componentDidMount(){
        let anneeScolaire = `${(this.props.user.CurrentRoles[0].annee.split("/")[0])}-${(this.props.user.CurrentRoles[0].annee.split("/")[1])}`
        let url = `http://127.0.0.1:8000/api/Statistiques/${anneeScolaire}/TC1/TC`;

        axios.get(url, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(response => {
            this.setState({
                TC1 : response.data
            })
        })
        .catch(e =>{
            console.log(e)    
        
        })

        let url1 = `https://users-ent.herokuapp.com/api/auth/ETUDIANT/TC1/TC`;
        axios.get(url1, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(response => {
            this.setState({
                TC1T : response.data
            })
        })
        .catch(e =>{
            console.log(e)    
        
        })

        let url2 = `http://127.0.0.1:8000/api/Statistiques/${anneeScolaire}/TC2/TC`;

        axios.get(url2, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(response => {
            this.setState({
                TC2 : response.data
            })
        })
        .catch(e =>{
            console.log(e)    
        
        })

        let url3 = `https://users-ent.herokuapp.com/api/auth/ETUDIANT/TC2/TC`;
        axios.get(url3, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(response => {
            this.setState({
                TC2T : response.data
            })
        })
        .catch(e =>{
            console.log(e)    
        
        })

        let url4 = `http://127.0.0.1:8000/api/Statistiques/${anneeScolaire}/DIC1/GIT`;

        axios.get(url4, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(response => {
            this.setState({
                DIC1G : response.data
            })
        })
        .catch(e =>{
            console.log(e)    
        
        })

        let url5 = `https://users-ent.herokuapp.com/api/auth/ETUDIANT/DIC1/GIT`;
        axios.get(url5, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(response => {
            this.setState({
                DIC1GT : response.data
            })
        })
        .catch(e =>{
            console.log(e)    
        
        })

        let url6 = `http://127.0.0.1:8000/api/Statistiques/${anneeScolaire}/DIC1/GC`;

        axios.get(url6, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(response => {
            this.setState({
                DIC1C : response.data
            })
        })
        .catch(e =>{
            console.log(e)    
        
        })

        let url7 = `https://users-ent.herokuapp.com/api/auth/ETUDIANT/DIC1/GC`;
        axios.get(url7, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(response => {
            this.setState({
                DIC1CT : response.data
            })
        })
        .catch(e =>{
            console.log(e)    
        
        })

        let url8 = `http://127.0.0.1:8000/api/Statistiques/${anneeScolaire}/DIC1/GEM`;

        axios.get(url8, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(response => {
            this.setState({
                DIC1M : response.data
            })
        })
        .catch(e =>{
            console.log(e)    
        
        })

        let url9 = `https://users-ent.herokuapp.com/api/auth/ETUDIANT/DIC1/GEM`;
        axios.get(url9, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(response => {
            this.setState({
                DIC1MT : response.data
            })
        })
        .catch(e =>{
            console.log(e)    
        
        })

        let url10 = `http://127.0.0.1:8000/api/Statistiques/${anneeScolaire}/DIC1/AERO`;

        axios.get(url10, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(response => {
            this.setState({
                DIC1A : response.data
            })
        })
        .catch(e =>{
            console.log(e)    
        
        })

        let url11 = `https://users-ent.herokuapp.com/api/auth/ETUDIANT/DIC1/AERO`;
        axios.get(url11, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(response => {
            this.setState({
                DIC1AT : response.data
            })
        })
        .catch(e =>{
            console.log(e)    
        
        })


        let url12 = `http://127.0.0.1:8000/api/Statistiques/${anneeScolaire}/DIC2/GIT`;

        axios.get(url12, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(response => {
            this.setState({
                DIC2G : response.data
            })
        })
        .catch(e =>{
            console.log(e)    
        
        })

        let url13 = `https://users-ent.herokuapp.com/api/auth/ETUDIANT/DIC2/GIT`;
        axios.get(url13, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(response => {
            this.setState({
                DIC2GT : response.data
            })
        })
        .catch(e =>{
            console.log(e)    
        
        })

        let url14 = `http://127.0.0.1:8000/api/Statistiques/${anneeScolaire}/DIC2/GC`;

        axios.get(url14, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(response => {
            this.setState({
                DIC2C : response.data
            })
        })
        .catch(e =>{
            console.log(e)    
        
        })

        let url15 = `https://users-ent.herokuapp.com/api/auth/ETUDIANT/DIC2/GC`;
        axios.get(url15, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(response => {
            this.setState({
                DIC2CT : response.data
            })
        })
        .catch(e =>{
            console.log(e)    
        
        })

        let url16 = `http://127.0.0.1:8000/api/Statistiques/${anneeScolaire}/DIC2/GEM`;

        axios.get(url16, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(response => {
            this.setState({
                DIC2M : response.data
            })
        })
        .catch(e =>{
            console.log(e)    
        
        })

        let url17 = `https://users-ent.herokuapp.com/api/auth/ETUDIANT/DIC2/GEM`;
        axios.get(url17, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(response => {
            this.setState({
                DIC2MT : response.data
            })
        })
        .catch(e =>{
            console.log(e)    
        
        })

        let url18 = `http://127.0.0.1:8000/api/Statistiques/${anneeScolaire}/DIC2/AERO`;

        axios.get(url18, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(response => {
            this.setState({
                DIC2A : response.data
            })
        })
        .catch(e =>{
            console.log(e)    
        
        })

        let url19 = `https://users-ent.herokuapp.com/api/auth/ETUDIANT/DIC2/AERO`;
        axios.get(url19, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(response => {
            this.setState({
                DIC2AT : response.data
            })
        })
        .catch(e =>{
            console.log(e)    
        
        })

        let url20 = `http://127.0.0.1:8000/api/Statistiques/${anneeScolaire}/DIC3/GIT`;

        axios.get(url20, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(response => {
            this.setState({
                DIC3G : response.data
            })
        })
        .catch(e =>{
            console.log(e)    
        
        })

        let url21 = `https://users-ent.herokuapp.com/api/auth/ETUDIANT/DIC3/GIT`;
        axios.get(url21, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(response => {
            this.setState({
                DIC3GT : response.data
            })
        })
        .catch(e =>{
            console.log(e)    
        
        })

        let url22 = `http://127.0.0.1:8000/api/Statistiques/${anneeScolaire}/DIC3/GC`;

        axios.get(url22, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(response => {
            this.setState({
                DIC3C : response.data
            })
        })
        .catch(e =>{
            console.log(e)    
        
        })

        let url23 = `https://users-ent.herokuapp.com/api/auth/ETUDIANT/DIC3/GC`;
        axios.get(url23, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(response => {
            this.setState({
                DIC3CT : response.data
            })
        })
        .catch(e =>{
            console.log(e)    
        
        })

        let url24 = `http://127.0.0.1:8000/api/Statistiques/${anneeScolaire}/DIC3/GEM`;

        axios.get(url24, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(response => {
            this.setState({
                DIC3M : response.data
            })
        })
        .catch(e =>{
            console.log(e)    
        
        })

        let url25 = `https://users-ent.herokuapp.com/api/auth/ETUDIANT/DIC3/GEM`;
        axios.get(url25, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(response => {
            this.setState({
                DIC2MT : response.data
            })
        })
        .catch(e =>{
            console.log(e)    
        
        })

        let url26 = `http://127.0.0.1:8000/api/Statistiques/${anneeScolaire}/DIC3/AERO`;

        axios.get(url26, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(response => {
            this.setState({
                DIC3A : response.data
            })
        })
        .catch(e =>{
            console.log(e)    
        
        })

        let url27 = `https://users-ent.herokuapp.com/api/auth/ETUDIANT/DIC3/AERO`;
        axios.get(url27, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(response => {
            this.setState({
                DIC3AT : response.data
            })
        })
        .catch(e =>{
            console.log(e)    
        
        })

        let url28 = `http://127.0.0.1:8000/api/InfoEtudiantByAnneeScolaireValide/${anneeScolaire}`;
        axios.get(url28, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(response => {
            this.setState({
                etudiants : response.data
            })
            // console.log(this.state.b)
        
            
        })
        .catch(e =>{
            console.log(e)    
        
        })

        let url29 = `https://users-ent.herokuapp.com/api/auth/ETUDIANT`;
        axios.get(url29, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(response => {
            this.setState({
                etudiantsClasse : response.data
            })
            // console.log(this.state.b)
        
            
        })
        .catch(e =>{
            console.log(e)    
        
        })
    
    }
    render(){
        let  p = (100 * this.state.etudiants.length/this.state.etudiantsClasse.length).toFixed(2)
        let  pn = (100 - 100 * this.state.etudiants.length/this.state.etudiantsClasse.length).toFixed(2)

        return(
            <CCard>
            <CCardBody>
            <CRow>
                <CCol sm="12">
                    <div className="card container  text-center pt-3 mb-5 bg-primary white-text">
                        <h1 style={{color:"white"}}>STATISTIQUES ANNEE SCOLAIRE 2019-2020  </h1>
                    </div>

                    <div className="row mt-5 mb-5 ">
                    <div className="col-6 text-center">
                        <h2>{this.state.etudiants.length} ETUDIANTS INSCRITS</h2>
                        <div class="progress mb-3" style={{height: "25px"}}>
                            <div class="progress-bar progress-bar-animated progress-bar-striped" role="progressbar" style={{width:`${p}%`, backgroundColor:"green"}} aria-valuenow={p} aria-valuemin="0" aria-valuemax="100">{p}%</div>
                        </div>
                    </div>
                    <div className="col-6 text-center">
                        <h2>{this.state.etudiantsClasse.length - this.state.etudiants.length} ETUDIANTS NON INSCRITS</h2>
                        <div class="progress mb-3" style={{height: "25px"}}>
                            <div class="progress-bar progress-bar-animated progress-bar-striped" role="progressbar" style={{width:`${pn}%`, backgroundColor:"red"}} aria-valuenow={pn} aria-valuemin="0" aria-valuemax="100">{pn}%</div>
                        </div>
                    </div>
                </div>

                    <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                        <thead className="thead-light">
                        <tr>
                            <th className="text-center">CLASSE</th>
                            <th>TAUX D'INSCRIPTION</th>
                        </tr>
                        </thead>
                        <tbody>

                            <tr>
                                <td>
                                <div style={{fontSize:"30px"}}><strong><Link to="/scolarite/inscription-administrative-statistiques-details/TC1/TC">TC1</Link></strong> </div>
                                <div className="small text-muted">
                                   <strong> Nombre Total : {this.state.TC1T.length} Etudiants</strong>
                                </div>
                                </td>
                                <td>
                                <div className="clearfix">
                                    
                                    <div className="float-center">
                                    <strong>{this.state.TC1.nombreEtudiantInscrits}  Etudiants Inscrits ( {(this.state.TC1.nombreEtudiantInscrits / this.state.TC1T.length * 100).toFixed(2)}% )</strong>
                                    </div>
                                    <div className="float-right">
                                    <small className="text-muted">{moment().format('Do MMMM YYYY')}</small>
                                    </div>
                                </div>
                                <CProgress className="progress-xs" color="success" value={(this.state.TC1.nombreEtudiantInscrits / this.state.TC1T.length * 100).toFixed(2)}/>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                <div style={{fontSize:"30px"}}><strong><Link to="/scolarite/inscription-administrative-statistiques-details/TC2/TC">TC2</Link></strong> </div>
                                <div className="small text-muted">
                                   <strong> Nombre Total : {this.state.TC2T.length} Etudiants</strong>
                                </div>
                                </td>
                                <td>
                                <div className="clearfix">
                                    
                                    <div className="float-center">
                                    <strong>{this.state.TC2.nombreEtudiantInscrits}  Etudiants Inscrits ( {this.state.TC2.nombreEtudiantInscrits / this.state.TC2T.length * 100}% )</strong>
                                    </div>
                                    <div className="float-right">
                                    <small className="text-muted">{moment().format('Do MMMM YYYY')}</small>
                                    </div>
                                </div>
                                <CProgress className="progress-xs" color="success" value={(this.state.TC2.nombreEtudiantInscrits / this.state.TC2T.length * 100).toFixed(2)}/>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                <div style={{fontSize:"30px"}}><strong><Link to="/scolarite/inscription-administrative-statistiques-details/DIC1/GIT">DIC1 GIT</Link></strong> </div>
                                <div className="small text-muted">
                                   <strong> Nombre Total : {this.state.DIC1GT.length} Etudiants</strong>
                                </div>
                                </td>
                                <td>
                                <div className="clearfix">
                                    
                                    <div className="float-center">
                                    <strong>{this.state.DIC1G.nombreEtudiantInscrits}  Etudiants Inscrits ( {(this.state.DIC1G.nombreEtudiantInscrits / this.state.DIC1GT.length * 100).toFixed(2)}% )</strong>
                                    </div>
                                    <div className="float-right">
                                    <small className="text-muted">{moment().format('Do MMMM YYYY')}</small>
                                    </div>
                                </div>
                                <CProgress className="progress-xs" color="success" value={(this.state.DIC1G.nombreEtudiantInscrits / this.state.DIC1GT.length * 100).toFixed(2)}/>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                <div style={{fontSize:"30px"}}><strong><Link to="/scolarite/inscription-administrative-statistiques-details/DIC1/GC">DIC1 GC</Link></strong> </div>
                                <div className="small text-muted">
                                   <strong> Nombre Total : {this.state.DIC1CT.length} Etudiants</strong>
                                </div>
                                </td>
                                <td>
                                <div className="clearfix">
                                    
                                    <div className="float-center">
                                    <strong>{this.state.DIC1C.nombreEtudiantInscrits}  Etudiants Inscrits ( {(this.state.DIC1C.nombreEtudiantInscrits / this.state.DIC1CT.length * 100).toFixed(2)}% )</strong>
                                    </div>
                                    <div className="float-right">
                                    <small className="text-muted">{moment().format('Do MMMM YYYY')}</small>
                                    </div>
                                </div>
                                <CProgress className="progress-xs" color="success" value={(this.state.DIC1C.nombreEtudiantInscrits / this.state.DIC1CT.length * 100).toFixed(2)}/>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                <div style={{fontSize:"30px"}}><strong><Link to="/scolarite/inscription-administrative-statistiques-details/DIC1/GEM">DIC1 GEM</Link></strong> </div>
                                <div className="small text-muted">
                                   <strong> Nombre Total : {this.state.DIC1MT.length} Etudiants</strong>
                                </div>
                                </td>
                                <td>
                                <div className="clearfix">
                                    
                                    <div className="float-center">
                                    <strong>{this.state.DIC1M.nombreEtudiantInscrits}  Etudiants Inscrits ( {(this.state.DIC1M.nombreEtudiantInscrits / this.state.DIC1MT.length * 100).toFixed(2)}% )</strong>
                                    </div>
                                    <div className="float-right">
                                    <small className="text-muted">{moment().format('Do MMMM YYYY')}</small>
                                    </div>
                                </div>
                                <CProgress className="progress-xs" color="success" value={(this.state.DIC1M.nombreEtudiantInscrits / this.state.DIC1MT.length * 100).toFixed(2)}/>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                <div style={{fontSize:"30px"}}><strong><Link to="/scolarite/inscription-administrative-statistiques-details/DIC1/AERO">DIC1 AERO</Link></strong> </div>
                                <div className="small text-muted">
                                   <strong> Nombre Total : {this.state.DIC1AT.length} Etudiants</strong>
                                </div>
                                </td>
                                <td>
                                <div className="clearfix">
                                    
                                    <div className="float-center">
                                    <strong>{this.state.DIC1A.nombreEtudiantInscrits}  Etudiants Inscrits ( {(this.state.DIC1A.nombreEtudiantInscrits / this.state.DIC1AT.length * 100).toFixed(2)}% )</strong>
                                    </div>
                                    <div className="float-right">
                                    <small className="text-muted">{moment().format('Do MMMM YYYY')}</small>
                                    </div>
                                </div>
                                <CProgress className="progress-xs" color="success" value={(this.state.DIC1A.nombreEtudiantInscrits / this.state.DIC1AT.length * 100).toFixed(2)}/>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                <div style={{fontSize:"30px"}}><strong><Link to="/scolarite/inscription-administrative-statistiques-details/DIC2/GIT">DIC2 GIT</Link></strong> </div>
                                <div className="small text-muted">
                                   <strong> Nombre Total : {this.state.DIC2GT.length} Etudiants</strong>
                                </div>
                                </td>
                                <td>
                                <div className="clearfix">
                                    
                                    <div className="float-center">
                                    <strong>{this.state.DIC2G.nombreEtudiantInscrits}  Etudiants Inscrits ( {(this.state.DIC2G.nombreEtudiantInscrits / this.state.DIC2GT.length * 100).toFixed(2)}% )</strong>
                                    </div>
                                    <div className="float-right">
                                    <small className="text-muted">{moment().format('Do MMMM YYYY')}</small>
                                    </div>
                                </div>
                                <CProgress className="progress-xs" color="success" value={(this.state.DIC2G.nombreEtudiantInscrits / this.state.DIC2GT.length * 100).toFixed(2)}/>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                <div style={{fontSize:"30px"}}><strong><Link to="/scolarite/inscription-administrative-statistiques-details/DIC2/GC">DIC2 GC</Link></strong> </div>
                                <div className="small text-muted">
                                   <strong> Nombre Total : {this.state.DIC2CT.length} Etudiants</strong>
                                </div>
                                </td>
                                <td>
                                <div className="clearfix">
                                    
                                    <div className="float-center">
                                    <strong>{this.state.DIC2C.nombreEtudiantInscrits}  Etudiants Inscrits ( {(this.state.DIC2C.nombreEtudiantInscrits / this.state.DIC2CT.length * 100).toFixed(2)}% )</strong>
                                    </div>
                                    <div className="float-right">
                                    <small className="text-muted">{moment().format('Do MMMM YYYY')}</small>
                                    </div>
                                </div>
                                <CProgress className="progress-xs" color="success" value={(this.state.DIC2C.nombreEtudiantInscrits / this.state.DIC2CT.length * 100).toFixed(2)}/>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                <div style={{fontSize:"30px"}}><strong><Link to="/scolarite/inscription-administrative-statistiques-details/DIC2/GEM">DIC2 GEM</Link></strong> </div>
                                <div className="small text-muted">
                                   <strong> Nombre Total : {this.state.DIC2MT.length} Etudiants</strong>
                                </div>
                                </td>
                                <td>
                                <div className="clearfix">
                                    
                                    <div className="float-center">
                                    <strong>{this.state.DIC2M.nombreEtudiantInscrits}  Etudiants Inscrits ( {(this.state.DIC2M.nombreEtudiantInscrits / this.state.DIC2MT.length * 100).toFixed(2)}% )</strong>
                                    </div>
                                    <div className="float-right">
                                    <small className="text-muted">{moment().format('Do MMMM YYYY')}</small>
                                    </div>
                                </div>
                                <CProgress className="progress-xs" color="success" value={(this.state.DIC2M.nombreEtudiantInscrits / this.state.DIC2MT.length * 100).toFixed(2)}/>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                <div style={{fontSize:"30px"}}><strong><Link to="/scolarite/inscription-administrative-statistiques-details/DIC2/AERO">DIC2 AERO</Link></strong> </div>
                                <div className="small text-muted">
                                   <strong> Nombre Total : {this.state.DIC2AT.length} Etudiants</strong>
                                </div>
                                </td>
                                <td>
                                <div className="clearfix">
                                    
                                    <div className="float-center">
                                    <strong>{this.state.DIC2A.nombreEtudiantInscrits}  Etudiants Inscrits ( {(this.state.DIC2A.nombreEtudiantInscrits / this.state.DIC2AT.length * 100).toFixed(2)}% )</strong>
                                    </div>
                                    <div className="float-right">
                                    <small className="text-muted">{moment().format('Do MMMM YYYY')}</small>
                                    </div>
                                </div>
                                <CProgress className="progress-xs" color="success" value={(this.state.DIC2A.nombreEtudiantInscrits / this.state.DIC2AT.length * 100).toFixed(2)}/>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                <div style={{fontSize:"30px"}}><strong><Link to="/scolarite/inscription-administrative-statistiques-details/DIC3/GIT">DIC3 GIT</Link></strong> </div>
                                <div className="small text-muted">
                                   <strong> Nombre Total : {this.state.DIC3GT.length} Etudiants</strong>
                                </div>
                                </td>
                                <td>
                                <div className="clearfix">
                                    
                                    <div className="float-center">
                                    <strong>{this.state.DIC3G.nombreEtudiantInscrits}  Etudiants Inscrits ( {(this.state.DIC3G.nombreEtudiantInscrits / this.state.DIC3GT.length * 100).toFixed(2)}% )</strong>
                                    </div>
                                    <div className="float-right">
                                    <small className="text-muted">{moment().format('Do MMMM YYYY')}</small>
                                    </div>
                                </div>
                                <CProgress className="progress-xs" color="success" value={(this.state.DIC3G.nombreEtudiantInscrits / this.state.DIC3GT.length * 100).toFixed(2)}/>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                <div style={{fontSize:"30px"}}><strong><Link to="/scolarite/inscription-administrative-statistiques-details/DIC3/GC">DIC3 GC</Link></strong> </div>
                                <div className="small text-muted">
                                   <strong> Nombre Total : {this.state.DIC3CT.length} Etudiants</strong>
                                </div>
                                </td>
                                <td>
                                <div className="clearfix">
                                    
                                    <div className="float-center">
                                    <strong>{this.state.DIC3C.nombreEtudiantInscrits}  Etudiants Inscrits ( {(this.state.DIC3C.nombreEtudiantInscrits / this.state.DIC3CT.length * 100).toFixed(2)}% )</strong>
                                    </div>
                                    <div className="float-right">
                                    <small className="text-muted">{moment().format('Do MMMM YYYY')}</small>
                                    </div>
                                </div>
                                <CProgress className="progress-xs" color="success" value={(this.state.DIC3C.nombreEtudiantInscrits / this.state.DIC3CT.length * 100).toFixed(2)}/>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                <div style={{fontSize:"30px"}}><strong><Link to="/scolarite/inscription-administrative-statistiques-details/DIC3/GEM">DIC3 GEM</Link></strong> </div>
                                <div className="small text-muted">
                                   <strong> Nombre Total : {this.state.DIC3MT.length} Etudiants</strong>
                                </div>
                                </td>
                                <td>
                                <div className="clearfix">
                                    
                                    <div className="float-center">
                                    <strong>{this.state.DIC3M.nombreEtudiantInscrits}  Etudiants Inscrits ( {(this.state.DIC3M.nombreEtudiantInscrits / this.state.DIC3MT.length * 100).toFixed(2)}% )</strong>
                                    </div>
                                    <div className="float-right">
                                    <small className="text-muted">{moment().format('Do MMMM YYYY')}</small>
                                    </div>
                                </div>
                                <CProgress className="progress-xs" color="success" value={(this.state.DIC3M.nombreEtudiantInscrits / this.state.DIC3MT.length * 100).toFixed(2)}/>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                <div style={{fontSize:"30px"}}><strong><Link to="/scolarite/inscription-administrative-statistiques-details/DIC3/AERO">DIC3 AERO</Link></strong> </div>
                                <div className="small text-muted">
                                   <strong> Nombre Total : {this.state.DIC3AT.length} Etudiants</strong>
                                </div>
                                </td>
                                <td>
                                <div className="clearfix">
                                    
                                    <div className="float-center">
                                    <strong>{this.state.DIC3A.nombreEtudiantInscrits}  Etudiants Inscrits ( {(this.state.DIC3A.nombreEtudiantInscrits / this.state.DIC3AT.length * 100).toFixed(2)}% )</strong>
                                    </div>
                                    <div className="float-right">
                                    <small className="text-muted">{moment().format('Do MMMM YYYY')}</small>
                                    </div>
                                </div>
                                <CProgress className="progress-xs" color="success" value={(this.state.DIC3A.nombreEtudiantInscrits / this.state.DIC3AT.length * 100).toFixed(2)}/>
                                </td>
                            </tr>
                        
                        </tbody>
                    </table>
                </CCol>
            </CRow>
            </CCardBody>
            </CCard>
        )
    }
}
const mapStateToProps = state => ({
    user: state.auth.user
  })

export default connect(mapStateToProps,null)(Statistiques)