import React, { Component } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Paper } from '@material-ui/core/';
import axios from 'axios';
import { id_classe } from "../../../../../constants/Planning&Notes/constants";
import { css } from "@emotion/core";
import { red } from '@material-ui/core/colors';
import ClipLoader from "react-spinners/ClipLoader";
import SeanceViewer from '../../../../../components/Planning&Notes/planning_components/seanceViewer';
import DatePrinter from '../../../../../components/Planning&Notes/planning_components/datePrinter';
import { loadCourses } from "../../../../../actions/Planning&Notes/planning_functions";

// { path: '/enseignant/definirplanning/:id_classe', name:'Definir Planning', component: DefinirPlanning}

// Styling part!
const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

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

// For creating a row of celles
function createCells(heureDebut, plage) {
    return { heureDebut, plage };
}

var seances = [
    // {
    //     id: "lundi8",
    //     cours: "Design Web",
    //     prof: "Fallou Java",
    //     duree: 3,
    //     jour: "lundi",
    //     heureDebut: 8
    // },
    // {
    //     id: "mardi10",
    //     cours: "Design Mobile",
    //     prof: "Fallou Java 2",
    //     duree: 2,
    //     jour: "mardi",
    //     heureDebut: 10,
    // },

]; // For storing all the seances

class Tabler extends Component {
    constructor(props) {
        super(props);
        // Binding to all methods we use the 'this' statement
        this.changeCells = this.changeCells.bind(this);
        this.loader = this.loader.bind(this);

        // We create the rows containing the Cells of Seance named SeanceCell
        // cf to the createCells function
        this.rows_matin = [
            createCells(8, '8h-9h'),
            createCells(9, '9h-10h'),
            createCells(10, '10h-11h'),
            createCells(11, '11h-12h'),
        ];
        this.rows_soir = [
			createCells(15, '15h-16h'),
			createCells(16, '16h-17h'),
			createCells(17, '17h-18h'),
			createCells(18, '18h-19h'),
		];
        this.state = {
            cells_to_change: [], // To store the cells to change when we use a span or delete a span
            dateDebut: "",
            dateFin: "",
            loading: true,
        }

    }
    getValueOfCell(id_cell) {
        /*
        For give the value of a given cell
        Will return the value if the value is founded
        Will return null if the value of this cell is not found
        */
        var seance = {};
        for (var index = 0; index < this.state.seances.length; index++) {
            if (this.state.seances[index].id == id_cell) {
                seance = this.state.seances[index];
                return seance;
            }
        }
        return null;
    }
    componentDidMount() {
        if (this.state.loading) {
            axios.get("http://localhost:8000/api/plannings/"+ id_classe + "/").then(response => {
                const data = JSON.parse(response.data)[0];
                console.log(data)
                this.setState({
                    id_planning: data._id,
                    loading: false,
                    dateDebut: data.dateDebut,
                    dateFin: data.dateFin,
                    seances: JSON.parse(data.seances)
                })
            });
        }
        this.loader(id_classe);
    }
    changeCells(cells_to_change) {
        /*
        For managing the cells to change after a span
        */
        this.setState(state => ({
            cells_to_change: [...state.cells_to_change, ...cells_to_change],
        }));
        console.log("Changin!!" + cells_to_change)
    }

    loader = (classe) => {
		loadCourses(classe).then(response => this.setState({
			courses: response
		}));
    }
    render() {
        const loading = this.state.loading;
        return (
            <div style={{ marginLeft: 15, marginRight: 15, flexGrow: 1}}>
                {
                    loading && seances.length ==0 ?
                        <div className="sweet-loading">
                            <ClipLoader
                                css={override}
                                size={150}
                                color={"#123abc"}
                                loading={loading}
                            />
                        </div>
                        :
                        <TableContainer component={Paper}>
                            <DatePrinter dateDebut={this.state.dateDebut} dateFin={this.state.dateFin}/>
                            <Table className={useStyles.table} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell></StyledTableCell>
                                        <StyledTableCell align="center">Lundi</StyledTableCell>
                                        <StyledTableCell align="center">Mardi</StyledTableCell>
                                        <StyledTableCell align="center">Mercredi</StyledTableCell>
                                        <StyledTableCell align="center">Jeudi</StyledTableCell>
                                        <StyledTableCell align="center">Vendredi</StyledTableCell>
                                        <StyledTableCell align="center">Samedi</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.rows_matin.map((row, index) => (
                                        <StyledTableRow key={"matin" + index.toString()}>
                                            <StyledTableCell component="th" scope="row">
                                                {row.plage}
                                            </StyledTableCell>
                                            <SeanceViewer id_planning={this.state.id_planning} resetCellsToChange={this.resetCellsToChange} cells_to_change={this.state.cells_to_change} id={"lundi" + row.heureDebut} cellChanger={this.changeCells} heureDebut={row.heureDebut} courses={this.state.courses} jour="lundi" seance={this.getValueOfCell("lundi" + row.heureDebut)} />
                                            <SeanceViewer id_planning={this.state.id_planning} resetCellsToChange={this.resetCellsToChange} cells_to_change={this.state.cells_to_change} id={"mardi" + row.heureDebut} cellChanger={this.changeCells} heureDebut={row.heureDebut} courses={this.state.courses} jour="mardi" seance={this.getValueOfCell("mardi" + row.heureDebut)} />
                                            <SeanceViewer id_planning={this.state.id_planning} resetCellsToChange={this.resetCellsToChange} cells_to_change={this.state.cells_to_change} id={"mercredi" + row.heureDebut} cellChanger={this.changeCells} heureDebut={row.heureDebut} courses={this.state.courses} jour="mercredi" seance={this.getValueOfCell("mercredi" + row.heureDebut)} />
                                            <SeanceViewer id_planning={this.state.id_planning} resetCellsToChange={this.resetCellsToChange} cells_to_change={this.state.cells_to_change} id={"jeudi" + row.heureDebut} cellChanger={this.changeCells} heureDebut={row.heureDebut} courses={this.state.courses} jour="jeudi" seance={this.getValueOfCell("jeudi" + row.heureDebut)} />
                                            <SeanceViewer id_planning={this.state.id_planning} resetCellsToChange={this.resetCellsToChange} cells_to_change={this.state.cells_to_change} id={"vendredi" + row.heureDebut} cellChanger={this.changeCells} heureDebut={row.heureDebut} courses={this.state.courses} jour="vendredi" seance={this.getValueOfCell("vendredi" + row.heureDebut)} />
                                            <SeanceViewer id_planning={this.state.id_planning} resetCellsToChange={this.resetCellsToChange} cells_to_change={this.state.cells_to_change} id={"samedi" + row.heureDebut} cellChanger={this.changeCells} heureDebut={row.heureDebut} courses={this.state.courses} jour="samedi" seance={this.getValueOfCell("samedi" + row.heureDebut)} />
                                        </StyledTableRow>
                                    ))}
                                    <StyledTableRow style={{backgroundColor: red[300]}}><StyledTableCell/><StyledTableCell/><StyledTableCell/><StyledTableCell/><StyledTableCell/><StyledTableCell/><StyledTableCell/></StyledTableRow>
                                    {this.rows_soir.map((row, index) => (
                                        <StyledTableRow key={"soir" + index.toString()}>
                                            <StyledTableCell component="th" scope="row">
                                                {row.plage}
                                            </StyledTableCell>
                                            <SeanceViewer id_planning={this.state.id_planning} resetCellsToChange={this.resetCellsToChange} cells_to_change={this.state.cells_to_change} id={"lundi" + row.heureDebut} cellChanger={this.changeCells} heureDebut={row.heureDebut} courses={this.state.courses} jour="lundi" seance={this.getValueOfCell("lundi" + row.heureDebut)} />
                                            <SeanceViewer id_planning={this.state.id_planning} resetCellsToChange={this.resetCellsToChange} cells_to_change={this.state.cells_to_change} id={"mardi" + row.heureDebut} cellChanger={this.changeCells} heureDebut={row.heureDebut} courses={this.state.courses} jour="mardi" seance={this.getValueOfCell("mardi" + row.heureDebut)} />
                                            <SeanceViewer id_planning={this.state.id_planning} resetCellsToChange={this.resetCellsToChange} cells_to_change={this.state.cells_to_change} id={"mercredi" + row.heureDebut} cellChanger={this.changeCells} heureDebut={row.heureDebut} courses={this.state.courses} jour="mercredi" seance={this.getValueOfCell("mercredi" + row.heureDebut)} />
                                            <SeanceViewer id_planning={this.state.id_planning} resetCellsToChange={this.resetCellsToChange} cells_to_change={this.state.cells_to_change} id={"jeudi" + row.heureDebut} cellChanger={this.changeCells} heureDebut={row.heureDebut} courses={this.state.courses} jour="jeudi" seance={this.getValueOfCell("jeudi" + row.heureDebut)} />
                                            <SeanceViewer id_planning={this.state.id_planning} resetCellsToChange={this.resetCellsToChange} cells_to_change={this.state.cells_to_change} id={"vendredi" + row.heureDebut} cellChanger={this.changeCells} heureDebut={row.heureDebut} courses={this.state.courses} jour="vendredi" seance={this.getValueOfCell("vendredi" + row.heureDebut)} />
                                            <SeanceViewer id_planning={this.state.id_planning} resetCellsToChange={this.resetCellsToChange} cells_to_change={this.state.cells_to_change} id={"samedi" + row.heureDebut} cellChanger={this.changeCells} heureDebut={row.heureDebut} courses={this.state.courses} jour="samedi" seance={this.getValueOfCell("samedi" + row.heureDebut)} />
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                }
            </div>
        );
    }
}
export default Tabler;