import React, { useState } from 'react';
import ReactDataGrid from '@inovua/reactdatagrid-community';
import ComboBox from '@inovua/reactdatagrid-community/packages/ComboBox';
import Button from '@material-ui/core/Button';

import '@inovua/reactdatagrid-community/index.css';
import '@inovua/reactdatagrid-community/base.css';

import '@inovua/reactdatagrid-community/theme/blue-dark.css';
import '@inovua/reactdatagrid-community/theme/default-light.css';
import '@inovua/reactdatagrid-community/theme/blue-light.css';

import { FullScreen, useFullScreenHandle } from "react-full-screen";

import {
    CCard,
    CCardBody,
    CCol,
    CRow,
} from '@coreui/react';
import generatePDF from "../document/upload_final";

// Header
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';

const useStylesHeader = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const Header1 = function() {
  const classes = useStylesHeader();

  return (
      <>
    <div className={classes.root}>
      <AppBar position="static">
          <center><h2>LISTE PRINCIPALE</h2></center>
      </AppBar>
    </div><br/><br/></>
  );
}

const Header2 = function() {
    const classes = useStylesHeader();
  
    return (
        <>
      <div className={classes.root}>
        <AppBar position="static">
            <center><h2>LISTE SECONDAIRE</h2></center>
        </AppBar>
      </div><br/><br/></>
    );
  }


function Vue_Liste_Globale(props) {

    const columns = [
        { name: 'Num', header: 'N°', defaultWidth: 60, resizable: true},
        { name: 'num_table', header: 'Numero Table', defaultWidth: 150, resizable: true,},
        { name: 'prenom', header: 'Prénom', defaultWidth: 150,},
        { name: 'nom', header: 'Nom', defaultWidth: 150,},
        { name: 'date_naissance', header: 'Date de Naissance', defaultWidth: 150,},
        { name: 'lieu_naissance', header: 'Lieu de Naissance', defaultWidth: 150,},
        { name: 'serie', header: 'Serie', defaultWidth: 60,},
        { name: 'lycee', header: 'Etablissement', defaultWidth: 150,},
        { name: 'mention', header: 'Mention', defaultWidth: 100,},

    ];

    const gridStyle = {
        minHeight: 400,
    }

    const dataSource1 = props.liste_principale
    const dataSource2 = props.liste_attente

    const handle = useFullScreenHandle();

    const themeDataSource1 = [
        { id: 'blue-dark', label: 'Dark theme' },
        { id: 'default-light', label: 'Light theme' }
    ]
    const themeDataSource2 = [
        { id: 'blue-dark', label: 'Dark theme' },
        { id: 'default-light', label: 'Light theme' }
    ]

    const [theme1, setTheme1] = useState('blue-light');
    const [theme, setTheme] = useState('blue-light');

    const [pagination] = useState(true);

    return(

        <>
        <CCard>
            <Header1 />
            <CCardBody>
                <CRow className="alert alert-heading" align="center" style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                    <div align="center">
                        <button className="btn btn-pill btn-success" onClick={() => generatePDF(dataSource1, new Date().getFullYear() + ' liste principale concours EPT', 'Liste principale du concours d\'entrée à L\'EPT session ' + new Date().getFullYear())}><i className="fas fa-download"/>Telecharger le pdf</button>
                    </div>
                </CRow>
                <CRow>
                    <CCol sm="12">
                        <div>
                            <div className="float-right">
                                <Button onClick={handle.enter} variant="contained" color="secondary">
                                    Plein Ecran
                                </Button>
                            </div>
                            <div style={{ marginBottom: 20 }}>
                                Theme:{' '}
                                <ComboBox
                                    inlineFlex
                                    collapseOnSelect
                                    clearIcon={false}
                                    searchable={true}
                                    changeValueOnNavigation
                                    dataSource={themeDataSource1}
                                    value={theme1}
                                    onChange={setTheme1}
                                />
                            </div>
                        </div>
                    </CCol>
                </CRow>
            </CCardBody>

            <FullScreen handle={handle}>
                <ReactDataGrid
                    idProperty="id"
                    columns={columns}
                    dataSource={dataSource1}
                    style={gridStyle}
                    theme={theme1}
                    pagination={pagination}
                    onEditComplete = {true}
                />
            </FullScreen>
        </CCard>

        <CCard>
            <Header2 />
            <CCardBody>
                    <CRow className="alert alert-heading" align="center" style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                        <div align="center" className="col">
                            <button className="btn btn-pill btn-info" style={{alignSelf:'center'}} onClick={() => generatePDF(dataSource2, new Date().getFullYear() + ' liste attente concours EPT', 'Liste attente du concours d\'entrée à L\'EPT session ' + new Date().getFullYear())}><i className="fas fa-download"/>Telecharger le pdf</button>
                        </div>
                    </CRow>
                    <CRow>
                        <CCol sm="12">
                            <div>
                                <div className="float-right">
                                    <Button onClick={handle.enter} variant="contained" color="secondary">
                                        Plein Ecran
                                    </Button>
                                </div>
                                <div style={{ marginBottom: 20 }}>
                                    Theme:{' '}
                                    <ComboBox
                                        inlineFlex
                                        collapseOnSelect
                                        clearIcon={false}
                                        searchable={true}
                                        changeValueOnNavigation
                                        dataSource={themeDataSource2}
                                        value={theme}
                                        onChange={setTheme}
                                    />
                                </div>
                            </div>
                        </CCol>
                    </CRow>
                </CCardBody>

                <FullScreen handle={handle}>
                    <ReactDataGrid
                        idProperty="id"
                        columns={columns}
                        dataSource={dataSource2}
                        style={gridStyle}
                        theme={theme}
                        pagination={pagination}
                        onEditComplete = {true}
                    />
                </FullScreen>
            </CCard>
            </>
    )
}

export default Vue_Liste_Globale;
