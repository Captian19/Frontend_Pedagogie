import React, { useState, useEffect } from "react";

import Vue_Liste_Centre from '../../../../components/moduleConcours/centre/vue_liste_centre';
import {delete_Centre, edit_Centre, get_Centres, add_Centre} from "../../../../actions/moduleConcours/action_Centre";
import Create_Centre from "../../../../components/moduleConcours/centre/ajout_centre"

import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import LinearProgress from '@material-ui/core/LinearProgress';

import {
    CCard,
    CCardBody,
    CCol,
    CRow,
  } from '@coreui/react';

import Header from '../../../../components/moduleConcours/centre/vue_centre';


const View_Liste_Centre = (props) => {
    const [centres, setCentres] = useState([]);
    const [centre_is_getted, setIsgetted] = useState(false)
    const getAllCentres = () => {
        props.get_Centres().then(res => {
            setCentres(res.data.results);
            setIsgetted(true);
        }).catch(e => console.log(e))
    }

    useEffect(() => {
        getAllCentres();
    }, [])

        return(
            <>
                <CCard>
                <Header />
                    <CCardBody>
                        <CRow> 
                            <CCol>
                                <Create_Centre add_Centre={props.add_Centre}
                                               getAllCentres={getAllCentres}
                                               get_Centres={props.get_Centres}
                                               setCentres = {setCentres}
                                               history={props.history}/>
                            </CCol>
                        </CRow>
                    </CCardBody>
                    
                    {centre_is_getted ? (
                        <Vue_Liste_Centre centres={centres}

                                          edit_Centre={props.edit_Centre}
                                          delete_Centre={props.delete_Centre}
                        />
                    ):(
                        <LinearProgress/>
                    )}
                </CCard>
            </>
        )

}
const mapStateToProps = state => ({
    auth: state.auth
});
export default compose(
    withRouter,
    connect(mapStateToProps, {get_Centres, edit_Centre, delete_Centre, add_Centre})
)(View_Liste_Centre);
