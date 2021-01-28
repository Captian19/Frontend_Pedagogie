import React , {Component} from "react";
import axios from 'axios';
import { withRouter } from 'react-router-dom';


function Ajout_Note (props) {
        return(
            <>
                    <main className="c-main">
                       
                            <div className="card-body">
                                {props.alertMessage.ok === undefined ?
                                    <>
                                        <div className="alert alert-info w-100 m-0 alert-dismissible fade show" role="alert">
                                            <strong>ENT-EPT</strong> {props.alertMessage.message}
                                            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                    </>
                                    :
                                    <>
                                        {props.alertMessage.ok ? (
                                            <div className="alert alert-success w-100 m-0 alert-dismissible fade show" role="alert">
                                                <strong>ENT-EPT</strong> {props.alertMessage.message}
                                                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                        ):(
                                            <div className="alert alert-danger w-100 m-0 alert-dismissible fade show" role="alert">
                                                <strong>ENT-EPT</strong> {props.alertMessage.message}
                                                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                        )}
                                    </>
                                }
                                <form className="form-horizontal" onSubmit={props.handleSubmitNote}>
                                    <div className="form-group">
                                        <div className="controls">
                                            <div className="row">
                                                <div className="col col-md-2">
                                                <label className="col-form-label" for="prependedInput">IdLot</label>
                                                <input
                                                    type="text"
                                                    name="id_lot"
                                                    className="form-control"
                                                    onChange={props.handleChangeNote}
                                                    required
                                                />
                                                </div>
                                                <div className="col col-md-2">
                                                <label className="col-form-label" for="prependedInput">AnynymatCandiat</label>
                                                    <input
                                                        type="text"
                                                        name="anonymat_candidat"
                                                        className="form-control"
                                                        onChange={props.handleChangeNote}
                                                        required
                                                    />
                                                </div>
                                                <div className="col col-md-2">
                                                <label className="col-form-label" htmlFor="prependedInput">Note Mathematique</label>
                                                <input
                                                    type="text"
                                                    name="note_maths"
                                                    className="form-control"
                                                    onChange={props.handleChangeNote}
                                                    min = "0"
                                                    max = "20"
                                                    step="any"
                                                    required
                                                />
                                                </div>
                                                <div className="col col-md-2">
                                                <label className="col-form-label" htmlFor="prependedInput">Note Physique</label>
                                                    <input
                                                        type="text"
                                                        name="note_physique"
                                                        className="form-control"
                                                        onChange={props.handleChangeNote}
                                                        min = "0"
                                                        max = "20"
                                                        step="any"
                                                        required
                                                    />
                                                </div>
                                                <div className="col col-md-2">
                                                <label className="col-form-label" htmlFor="prependedInput">Note Anglais</label>
                                                    <input
                                                        type="text"
                                                        name="note_anglais"
                                                        className="form-control"
                                                        onChange={props.handleChangeNote}
                                                        min = "0"
                                                        max = "20"
                                                        step="any"
                                                        required
                                                    />
                                                </div>
                                                <div className="col col-md-2">
                                                <label className="col-form-label" htmlFor="prependedInput">Note Francais</label>
                                                    <input
                                                        type="text"
                                                        name="note_francais"
                                                        className="form-control"
                                                        onChange={props.handleChangeNote}
                                                        min = "0"
                                                        max = "20"
                                                        step="any"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-actions">
                                        <button className="btn btn-success" type="submit">Valider</button>
                                        <button className="btn btn-danger float-right" type="reset">Cancel</button>
                                    </div>
                                </form>
                            </div>
                    </main>             
        </>
        )
}
 
export default withRouter(Ajout_Note);