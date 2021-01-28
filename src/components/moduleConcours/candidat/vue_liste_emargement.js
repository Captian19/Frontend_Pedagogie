import React, {useState, } from 'react';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import ReactDataGrid from '@inovua/reactdatagrid-community';


import {
    CCard,
    CCardBody,
    CRow,
} from '@coreui/react';

import {Input} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


// Filtre par centre et etablissement
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

// Export format excel et pdf
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';


// Header
import AppBar from '@material-ui/core/AppBar';
import {ExportCSV} from "../document/upload_doc";
import generatePDF from "../document/upload pdf";

const useStylesHeader = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const Header = function() {
  const classes = useStylesHeader();

  return (
      <>
    <div className={classes.root}>
      <AppBar position="static">
          <center><h2>LISTE D'EMARGEMENT</h2></center>
      </AppBar>
    </div><br/><br/></>
  );
}


const useStylesFiltre = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));






const options = ['Export to PDF', 'Export to Excel', ];

const Export = function() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item xs={12}>
        <ButtonGroup variant="contained" color="primary" ref={anchorRef} aria-label="split button" >
          <Button onClick={handleClick} >{options[selectedIndex]}</Button>
          <Button
            color="primary"
            size="small"
            aria-controls={open ? 'split-button-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggle}

          >
          </Button>
        </ButtonGroup>

      </Grid>
    </Grid>
  );
}



const Filtre = function(props) {
    const classes = useStylesFiltre();
    const [open, setOpen] = React.useState(false);
    const [centre, setCentre] = React.useState('rien');
    const [etablissement, setEtablissement] = React.useState('rien');
    const [filterApplied, setFilterApplied] = React.useState(false)

    const handleChangeCentre = (event) => {
      setCentre(event.target.value);
      console.log(event.target.value)
    };

    const handleChangeLycee = (event) => {
        setEtablissement(event.target.value);
        console.log(event.target.value)
      };



    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({centre, etablissement})
        switch(true){
            case etablissement === 'rien' && centre === 'rien':
                props.setKindOfFilter('Aucun filtre')
                break;
            case etablissement !== 'rien' && centre === 'rien':
                props.getByLycee(new Date().getFullYear(), etablissement)
                    .then(res => {
                        props.setListe(res.data.results)
                        setFilterApplied(true)
                        props.setKindOfFilter('Liste filtrée par établissement: ' + etablissement)
                    });
                break;
            case etablissement === 'rien' && centre !== 'rien':
                props.getByCentre(new Date().getFullYear(), centre)
                    .then(res => {
                        props.setListe(res.data.results)
                        setFilterApplied(true)
                        props.setKindOfFilter('Liste filtrée par centre: ' + centre)
                    })
                break;
            case etablissement !== 'rien' && centre !== 'rien':
                props.getByBoth(new Date().getFullYear(), centre, etablissement)
                    .then(res => {
                        props.setListe(res.data.results)
                        setFilterApplied(true)
                        props.setKindOfFilter('Liste filtrée par centre: ' + centre + " et par établissement: " + etablissement)
                    })
                break;
            default:
                props.setKindOfFilter('Aucun filtre')
        }
    }
    const alertSuccessFilter = () => {
        if (filterApplied){
            return (<div className="alert alert-success" id="success-alert" role="alert">
                Filtre appliqué avec succés!
            </div>)
        }
        else {
            return (<div className="alert alert-info" id="success-alert" role="alert">
                Vous pouvez filtrer par centre et/ou par etablissement!
            </div>)
        }
    }


    return (
      <div>
        <button onClick={handleClickOpen} className="btn btn-pill btn-outline-info" ><i className="fas fa-chevron-down"/>Trier par</button>
        <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
          <DialogTitle>
              <div className="alert alert-info" id="success-alert" role="alert">
                Vous pouvez filtrer par centre et/ou par etablissement!
              </div>
          </DialogTitle>
          <DialogContent>
            <form className={classes.container} onSubmit={handleSubmit}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="demo-dialog-native">Centre</InputLabel>
                <Select
                  native
                  onChange={handleChangeCentre}
                  input={<Input id="demo-dialog-native" />}
                >
                  <option hidden />
                    {props.liste_centre.map(centre => {
                        return (
                            <option
                                value={centre.nom_centre}>{centre.nom_centre}</option>
                        )
                    })}
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-dialog-select-label">Etablissement</InputLabel>
                <Select
                  labelId="demo-dialog-select-label"
                  id="demo-dialog-select"
                  onChange={handleChangeLycee}
                  input={<Input />}
                >
                  <option hidden/>
                    {props.liste_lycee.map(lycee => {
                        return (
                            <option
                                value={lycee.nom_lycee}>{lycee.nom_lycee}</option>
                        )
                    })}
                </Select>
              </FormControl>
                <button className="btn btn-outline-primary">
                    Valider
                </button>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>

          </DialogActions>
        </Dialog>
      </div>
    );
}


export function Vue_Liste_Emargement (props) {

    const classes = useStyles();
    const [state, setState] = React.useState({
        nom_centre: 'rien',
        nom_lycee: 'rien'
    });
    const [liste, setListe] = React.useState([])
    const [kindOfFilter, setKindOfFilter] = useState("Liste non filtrée");
    const handleChange = (event) => {
        let {name, value} = event.target;
        let newFilter={...state, [name]: value}
        setState(newFilter);

        console.log(newFilter)
    };

    const columns = [

        { name: 'num_table', header: 'Numero table', defaultWidth: 80, resizable: false,},
        { name: 'prenom', header: 'Prénom', defaultWidth: 150, resizable: false,},
        { name: 'nom', header: 'Nom', defaultWidth: 80, resizable: false,},
        { name: 'date_naissance', header: 'Date de Naissance', },
        { name: 'lieu_naissance', header: 'Lieu de Naissance', },
        { name: 'serie', header: 'Serie', defaultWidth: 80, resizable: false,},
        { name: 'lycee', header: 'Etablissement', defaultWidth: 150, },
        { name: 'nom_centre', header: 'Centre', defaultWidth: 150, },
        { name: 'emargement', header: 'Emargement', defaultWidth: 150, resizable: false,},

    ];


    const gridStyle = {
        minHeight: 500,
        border: '1px solid #dee2e6',
        boxShadow: '0 0 8px 2px #f8f9fa'
    }

    const dataSource = liste.length > 0 ? liste : props.defaultListeCandidats;




    return(
        <>
            <CCard>

                <Header/>

            <CCardBody>
                <CRow className="alert alert-heading" align="center" style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                    <div className="col-md-3">
                        <ExportCSV csvData={dataSource} fileName={"Liste emargement"}/>
                    </div>

                    <div className="col-md-3">
                        <button className="btn btn-pill btn-danger" onClick={() => generatePDF(dataSource, kindOfFilter, kindOfFilter)}><i className="fas fa-download"/>Telecharger le pdf</button>
                    </div>

                    <div className="col-md-3">
                        <Filtre liste_centre={props.liste_centre}
                                liste_lycee={props.liste_lycee}
                                setListe={setListe}
                                setKindOfFilter={setKindOfFilter}
                                getByCentre={props.get_CandidatSessionBySessionAndCentres}
                                getByLycee={props.get_CandidatSessionBySessionAndLycees}
                                getByBoth={props.get_CandidatSessionBySessionAndCentresAndLycees}
                        />
                    </div>
                </CRow>
                <hr/>
                <h1 align="center">
                    {kindOfFilter}
                </h1>
                <hr/>

            </CCardBody>

            <ReactDataGrid
                        idProperty="id"
                        columns={columns}
                        dataSource={dataSource}
                        style={gridStyle}
                        pagination={true}
                        activateRowOnFocus/>

            </CCard>

        </>
    )

}

export default Vue_Liste_Emargement;
