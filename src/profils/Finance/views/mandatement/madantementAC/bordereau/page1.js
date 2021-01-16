import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 645,
        maxHeight:550,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },

}));

const Page1 = () => {
    const classes = useStyles();
    return (
        <div className="container" className="table table-bordered text-center shadow p-3 mb-5 bg-white rounded largeur"
             style={{width: "1150px",border: "1px solid #0F1019", fontWeight: "bold"}}>
                    <div className='row '>
                        <div className="col-md-4 text-center">
                            <h2>
                                MODES <br/>DE <br/>REGLEMENT
                            </h2>
                        </div>
                        <div className="col-md-4  text-center">
                            <h2>
                                VIREMENT<br/> BANCAIRES <br/> BON DE CAISSE
                            </h2>
                        </div>
                        <div className="col-md-4  text-center">
                            <h2>
                                TRESORS <br/> POSTAUX
                            </h2>
                        </div>
                    </div>
                    <br/><br/><br/><br/><br/><br/>

                    <div className="text-center">
                        <h1>
                            MINISTERE DE L'ENSEIGNEMENT SUPERIEUR,<br/>
                            DE LA RECHERCHE ET DE L'INNOVATION
                        </h1>
                    </div>
                    <br/><br/><br/>
                    <div className="text-center"><h4>**_*_**</h4></div>
                    <div className="text-center">
                        <h1>
                            ECOLE POLYTECHNIQUE DE THIES
                        </h1>
                    </div>
                    <div className="text-center"><h4>**_*_**</h4></div>
                    <br/><br/><br/><br/>
                    <div className="text-center">
                        <h1>
                            BORDEREAU-JOURNAL<br/>DES MANDATEMENTS EMIS
                        </h1>
                    </div><br/>
                    <div className="text-center">
                        <h3>
                            Assignés sur la Caisse de l'Agent Comptable de <br/> de L'Ecole Polytechnique de THIES
                        </h3>
                    </div>
                    <div className="text-center"><h4>**_ _ _**</h4></div>
        </div>
    )
}

export default Page1