import React, { Component } from "react";

import Statistique_Par_region from './statistique_par_etablissement';
import Statistique_Par_Centre from './autres_stats';


class Vue_Statistique extends Component {

    render(){
        return(
            <>
                {/* Statitique Par Region et Par Departement */}
                <Statistique_Par_region />

                {/* Nombre de centre qu'on a suivant les regions */}
                <Statistique_Par_Centre />

            </>
        );
    }

}

export default Vue_Statistique;