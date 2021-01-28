import React from "react";
import {connect} from 'react-redux' ;


  function EnteteMaquetteVueDensemble(props){


    return(
        <thead className="table-info">
            <tr id="entete">
                <th colSpan={41} className="py-3"><center><h3>Maquette Vue D'ensemble {props.role.departement} </h3> </center></th>
            </tr>
            <tr>
                
                <th className="text-center" colSpan={4} rowSpan="2">U.E.</th>
                <th className="text-center" colSpan={3} rowSpan="2">Code U.E.</th>
                <th className="text-center" colSpan={16} rowSpan="2">E.C.</th>
                <th className="text-center" colSpan={4} rowSpan="2">Code E.C.</th>
                <th className="text-center" rowSpan={2}>Classe</th>
                

            </tr>
            
        </thead>
        
    )
  }

  
const mapStateToProps = state => ({
    role: state.auth.user.CurrentRoles[0],
})
  export default connect(mapStateToProps,null)(EnteteMaquetteVueDensemble);