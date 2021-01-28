//là on affiche que la liste des vacataires
import React, { useState, useEffect } from 'react';
import { forwardRef } from 'react';
import Avatar from 'react-avatar';
import Grid from '@material-ui/core/Grid'
import {connect} from "react-redux" 

import MaterialTable from "material-table";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import axios from 'axios'
import Alert from '@material-ui/lab/Alert';


const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const api = axios.create({
  baseURL: `http://localhost:8000`
})

function validateEmail(email){
  const re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
  return re.test(String(email).toLowerCase());
}


function Vacataire (props) {

  var columns = [
    { title: "id", field: "id", hidden: true},
    { title: "Avatar", render: rowData => <Avatar maxInitials={1} size={40} round={true} name={rowData === undefined ? " " : rowData.first_name} />  },
    { title: "Prénom(s)", field: "prenom", searchable: true},
    { title: "Nom", field: "nom" ,searchable: true},
    { title: "E-mail", field: "email",searchable: true },
    { title: "Département", field: "departement" ,searchable: true, filterOnItemSelect: true,
    filterPlaceholder: "placeholder",
    lookup: {
      "TC": "TC",
      "GIT": "GIT",
      "GEM": "GEM",
      "GC": "GC",
      "AERO": "AERO",
      
    },},
    { title: "Statut", field: "statut" ,lookup: {
      "vacataire": "vacataire",
      
    },},
  ]
  const [data, setData] = useState([]); //table data
  //for error handling
  const [iserror, setIserror] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])
  
  

  useEffect(() => { 
    
     api.get(`/vacataire`)
        .then(res => {               
            setData(res.data.data)
         })
         .catch(error=>{
             console.log("Error")
         })

  }, [])

 

  

    return (
      <div >
      
      <Grid container spacing={2} >
          <Grid item xs={12}></Grid>
          <Grid item xs={12}>
          <div>
            {iserror && 
              <Alert severity="error">
                  {errorMessages.map((msg, i) => {
                      return <div key={i}>{msg}</div>
                  })}
              </Alert>
            }       
          </div>
            <MaterialTable
              title="Liste des vacataires "
              columns={columns}
              data={(query) =>
                new Promise((resolve, reject) => {
                  let url = `http://localhost:8000/vacataire`;
                  fetch(url)
                    .then((response) => response.json())
                    .then((result) => {
                      resolve({
                        data: result,
                        page: 1,
                        totalCount: result.total,
                        
                      });
                    });
                })
              }
              icons={tableIcons}
              
              options={{
                search: true,
                filtering: true,
                sorting: true,
                grouping:true,
                paging:false,
              }}
              localization={{
                toolbar: {
                  searchPlaceholder: "Outlined Search Field",
                }}}
                
                onSearchChange={(e) => console.log("search changed: " + e)}
                  onColumnDragged={(oldPos, newPos) =>
                    console.log(
                      "Dropped column from " + oldPos + " to position " + newPos
                    )
                  }
            />
            
          </Grid>
          <Grid item xs={12}></Grid>
        </Grid>
    </div>
    );
  
};
const mapStateToProps = state => ({
  user:state.auth.user,
  role: state.auth.user.CurrentRoles[0],
  token:state.auth.token
})
export default connect(mapStateToProps,null)(Vacataire);