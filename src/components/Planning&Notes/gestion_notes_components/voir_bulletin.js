import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { green } from '@material-ui/core/colors';
import { Card, Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Print from '@material-ui/icons/Print';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

export default function BulletinTables(props) {
    const classes = useStyles();
    const [bulletin, setBulletinState] = React.useState(props.bulletin)
    // For printing the bulletin
    const componentRef = useRef();
    const imprimer = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div>
            <TableContainer ref={componentRef} style={{ margin: 3 }} component={Paper}>
                <center className="centre">
                    <h5 scope="col" colspan="2" class="lefta" style={{ border: "1px solid #dee2e6", fontWeight: "bold" }}>
                        République du Sénégal<br />
                            **_*_** <br />
                            Ministere de l'enseignement superieur, de la recherche et de l'innovation <br />
                            **_*_** <br />

                            ECOLE POLYTECHNIQUE THIES<br />
                            **_*_** <br />
                        {/* We have to change the departement after */}
                            Département du Génie Informatique et Télécommunications<br />

                            RELEVE DE NOTES<br />
                            Année Académique 2019-2020
                            {/* {props.annee} */}
                    </h5>
                </center>
                <Grid container sm={12} spacing={3}>
                    <Grid item alignContent="flex-start" sm={8}>
                        <Typography color="primary" style={{ margin: 10, alignSelf: "flex-end" }}>
                            Prénom : {props.prenom.toUpperCase()}
                        </Typography>
                        <Typography color="primary" style={{ margin: 10 }}>
                            Nom : {props.nom.toUpperCase()}
                        </Typography>
                        <Typography color="primary" style={{ margin: 10 }}>
                            Date et Lieu de naissance : 17/09/1998 à Dakar
                            </Typography>
                    </Grid>
                    <Grid item sm={4} alignItems="flex-end">
                        <Typography color="primary" style={{ margin: 10 }}>
                            Classe : {props.classe.niveau + "-" + props.classe.departement}
                        </Typography>
                        <Typography color="primary" style={{ margin: 10 }}>
                            Nbre Etudiants : {bulletin.nb_eleves}
                        </Typography>
                        <Typography color="primary" style={{ margin: 10 }}>
                            Niveau LMD : L3
                            </Typography>
                    </Grid>
                </Grid>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Semestre 1</StyledTableCell>
                            <StyledTableCell align="right"></StyledTableCell>
                            <StyledTableCell align="right"></StyledTableCell>
                            <StyledTableCell align="right"></StyledTableCell>
                            <StyledTableCell align="right"></StyledTableCell>
                            <StyledTableCell align="right"></StyledTableCell>
                            <StyledTableCell align="right"></StyledTableCell>
                            <StyledTableCell align="right"></StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell>Unités d'Enseignement(U.E.)</StyledTableCell>
                            <StyledTableCell align="right">Crédit</StyledTableCell>
                            <StyledTableCell align="right">CodeEC</StyledTableCell>
                            <StyledTableCell align="right">Eléments Constitutifs (E.C.)</StyledTableCell>
                            <StyledTableCell align="right">Coef.</StyledTableCell>
                            <StyledTableCell align="right">Total Coef.</StyledTableCell>
                            <StyledTableCell align="right">Notes</StyledTableCell>
                            <StyledTableCell align="right">Moyenne U.E.</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {JSON.parse(bulletin.notesUE).map((noteUE) => {
                            const createRows = () => {
                                const rows = [];
                                const notesEC = JSON.parse(noteUE.notesEC);
                                rows.push(
                                    <TableRow>
                                        <StyledTableCell rowSpan={notesEC.length + 1}>{noteUE.ue}</StyledTableCell>
                                        <StyledTableCell rowSpan={notesEC.length + 1} align="right">{noteUE.credit}</StyledTableCell>
                                        <StyledTableCell style={{ height: 0, padding: 0, margin: 0 }} align="right"></StyledTableCell>
                                        <StyledTableCell style={{ height: 0, padding: 0, margin: 0 }} align="right"></StyledTableCell>
                                        <StyledTableCell style={{ height: 0, padding: 0, margin: 0 }} align="right"></StyledTableCell>
                                        <StyledTableCell rowSpan={notesEC.length + 1} align="right">{noteUE.coeff}</StyledTableCell>
                                        <StyledTableCell style={{ height: 0, padding: 0, margin: 0 }} align="right"></StyledTableCell>
                                        <StyledTableCell rowSpan={notesEC.length + 1} align="right">{noteUE.moyenne_UE}</StyledTableCell>
                                    </TableRow>
                                )
                                notesEC.map(noteEC => {
                                    rows.push(
                                        <TableRow>
                                            <StyledTableCell align="right">{noteEC.code_EC}</StyledTableCell>
                                            <StyledTableCell align="right">{noteEC.ec}</StyledTableCell>
                                            <StyledTableCell align="right">{noteEC.coeff}</StyledTableCell>
                                            <StyledTableCell align="right">{noteEC.note_EC}</StyledTableCell>
                                        </TableRow>
                                    )
                                })
                                return rows;
                            }
                            return (createRows().map(element => element));

                        })}
                        <TableRow>
                            <StyledTableCell>Totaux</StyledTableCell>
                            <StyledTableCell align="right">{bulletin.total_credits}</StyledTableCell>
                            <StyledTableCell align="right"></StyledTableCell>
                            <StyledTableCell align="right"></StyledTableCell>
                            <StyledTableCell align="right">{bulletin.total_coeffs}</StyledTableCell>
                            <StyledTableCell align="right">{bulletin.total_coeffs}</StyledTableCell>
                            <StyledTableCell align="right"></StyledTableCell>
                            <StyledTableCell align="right"></StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell align="right"></StyledTableCell>
                            <StyledTableCell align="right"></StyledTableCell>
                            <StyledTableCell align="right"></StyledTableCell>
                            <StyledTableCell align="right"></StyledTableCell>
                            <StyledTableCell align="right"></StyledTableCell>
                            <StyledTableCell align="right"></StyledTableCell>
                            <StyledTableCell align="right">Moyenne Générale</StyledTableCell>
                            <StyledTableCell style={{ backgroundColor: green[100], borderWidth: 1, borderStyle: "inset" }} align="right">{bulletin.moyenne_generale}</StyledTableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <Card style={{ minWidth: 170, margin: 10 }}>
                    <CardContent>
                        {props.moyenne_annuelle != 0 ?
                            <Typography color="textSecondary">
                                Moyenne annulle : {props.moyenne_annuelle}
                            </Typography>
                            : null
                        }
                        <Typography color="textSecondary">
                            Moyenne de classe : {bulletin.moyenne_de_classe}
                        </Typography>

                    </CardContent>
                </Card>
                {parseInt(bulletin.semestre) == 2 ?
                    <Card style={{ minWidth: 170, marginTop: 10 }}>
                        <Typography color="primary" style={{ margin: 10 }}>
                            <b>Decision du conseil de classe</b>
                        </Typography>
                        <CardContent>
                            <table border="1" style={{ margin: 10 }}>
                                <thead>
                                    <tr>
                                        <th>Promu(e) en classe Supérieure</th>
                                        <th>{props.etat === "Passage" ? "oui" : null}</th>
                                    </tr>
                                    <tr>
                                        <th>Autotisé(e) à redoubler</th>
                                        <th>{props.etat === "Redoublement" ? "oui" : null}</th>
                                    </tr>
                                    <tr>
                                        <th>Proposé(e) à l'exclusion</th>
                                        <th>{props.etat === "Exclusion" ? "oui" : null}</th>
                                    </tr>
                                </thead>
                            </table>

                            <Typography color="textSecondary">
                                Rang : {props.rang}
                            </Typography>
                        </CardContent>
                    </Card>
                    : null}
            </TableContainer>
            {props.print == false ?
                null
                :
                <Button variant="contained"
                    style={{ margin: 15 }}
                    color="secondary"
                    className={classes.button}
                    startIcon={<Print />} onClick={imprimer}>Imprimer
                </Button>                
            }
        </div>
    );
}